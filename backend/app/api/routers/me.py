"""`/api/me/*` — user self-service endpoints (T6.2 + T6.5 stub).

Right-to-erasure flow (FR-071):

  POST /api/me/delete-data            — request deletion (sends magic link)
  GET  /api/me/delete-data/confirm    — magic-link landing, performs erasure
"""

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import HTMLResponse
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.dependencies import (
    application_rate_limiter,
    get_client_ip,
    get_notification_dispatcher,
    get_session,
)
from app.api.schemas.me import (
    DeleteDataConfirmedData,
    DeleteDataConfirmedResponse,
    DeleteDataRequest,
    DeleteDataRequestedResponse,
)
from app.config import get_settings
from app.core.contact.auto_detect import detect_contact
from app.core.erasure.service import (
    ErasureError,
    confirm_erasure,
    request_erasure,
)
from app.core.notify.dispatcher import NotificationDispatcher, UserContact
from app.core.notify.ports import (
    ChannelType,
    NotificationKind,
    NotificationMessage,
)
from app.utils.logging import get_logger

router = APIRouter(prefix="/api/me", tags=["me"])
_log = get_logger("api.me")


@router.post(
    "/delete-data",
    response_model=DeleteDataRequestedResponse,
    status_code=202,
)
async def request_data_deletion(
    body: DeleteDataRequest,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
    notifier: Annotated[NotificationDispatcher, Depends(get_notification_dispatcher)],
    _ratelimit: Annotated[None, Depends(application_rate_limiter)],
) -> DeleteDataRequestedResponse:
    """FR-071 step 1. Always returns 202 — never leaks whether the
    contact has an account (anti-enumeration)."""
    detected = detect_contact(body.contact)
    if detected is None:
        raise HTTPException(status_code=400, detail="invalid_contact")

    ip = get_client_ip(request)
    outcome = await request_erasure(
        session=session,
        contact_type=detected.contact_type.value,
        contact_value=detected.value,
        ip=ip,
        user_agent=request.headers.get("user-agent"),
    )

    if outcome.user_existed and outcome.token is not None:
        confirm_url = _confirm_url(outcome.token)
        await notifier.notify_user(
            contact=UserContact(
                primary_type=ChannelType(detected.contact_type.value),
                primary_value=detected.value,
            ),
            kind=NotificationKind.magic_link,
            message=NotificationMessage(
                title="Подтвердите удаление данных",
                body=(
                    "Чтобы окончательно удалить ваши данные с Vitrina, "
                    "перейдите по ссылке (действует 15 минут):\n\n"
                    f"{confirm_url}\n\n"
                    "Если вы не запрашивали удаление, проигнорируйте письмо."
                ),
                links=(("Подтвердить удаление", confirm_url),),
            ),
        )

    _log.info(
        "erasure_request_handled",
        contact_type=detected.contact_type.value,
        user_existed=outcome.user_existed,
    )

    # Identical response either way — anti-enumeration.
    return DeleteDataRequestedResponse(
        data={
            "status": "requested",
            "message": (
                "Если на указанный контакт есть аккаунт, мы отправили туда "
                "письмо со ссылкой для подтверждения удаления."
            ),
        }
    )


@router.get(
    "/delete-data/confirm",
    response_class=HTMLResponse,
    include_in_schema=False,
)
async def confirm_data_deletion(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> HTMLResponse:
    """FR-071 step 2. The magic link lands here; success returns a
    minimal HTML confirmation (no JS, no PII)."""
    token = request.query_params.get("token", "")
    if not token:
        raise HTTPException(status_code=400, detail="missing_token")

    try:
        result = await confirm_erasure(session=session, raw_token=token)
    except ErasureError as exc:
        return HTMLResponse(
            _failure_page(reason=str(exc)),
            status_code=400,
        )

    return HTMLResponse(
        _success_page(sites_deleted=result.sites_deleted),
        status_code=200,
    )


@router.post(
    "/delete-data/confirm",
    response_model=DeleteDataConfirmedResponse,
    include_in_schema=False,
)
async def confirm_data_deletion_json(
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
) -> DeleteDataConfirmedResponse:
    """JSON form of the same endpoint — used by tests and by the user
    dashboard (T6.5) which posts the token from inside the app."""
    token = request.query_params.get("token", "")
    if not token:
        raise HTTPException(status_code=400, detail="missing_token")
    try:
        result = await confirm_erasure(session=session, raw_token=token)
    except ErasureError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None

    return DeleteDataConfirmedResponse(
        data=DeleteDataConfirmedData(
            deletion_request_id=str(result.deletion_request_id),
            sites_deleted=result.sites_deleted,
        )
    )


# --- HTML pages ----------------------------------------------------------


def _confirm_url(token: str) -> str:
    base = get_settings().app_base_url.rstrip("/")
    return f"{base}/api/me/delete-data/confirm?token={token}"


def _success_page(sites_deleted: int) -> str:
    return f"""<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>Vitrina · удаление данных</title></head>
<body style="font-family: system-ui; max-width: 32rem; margin: 4rem auto; padding: 0 1rem;">
<h1>Данные удалены</h1>
<p>Мы удалили ваш аккаунт и связанные с ним {sites_deleted} сайт(а).</p>
<p>Согласие на обработку и юридический след удаления сохранены 3 года
(требование ФЗ-152).</p>
</body></html>"""


def _failure_page(reason: str) -> str:
    return f"""<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>Vitrina · удаление данных</title></head>
<body style="font-family: system-ui; max-width: 32rem; margin: 4rem auto; padding: 0 1rem;">
<h1>Ссылка недействительна</h1>
<p>Ссылка устарела или уже была использована (<code>{reason}</code>).
Запросите удаление повторно: <a href="/">vitrina.site</a></p>
</body></html>"""
