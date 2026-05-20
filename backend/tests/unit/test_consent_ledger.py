"""Tests for the consent ledger (T6.1, FR-070)."""

from __future__ import annotations

import pytest

from app.core.consent.ledger import (
    CURRENT_POLICY_TEXT,
    CURRENT_POLICY_VERSION,
    POLICY_TEXTS,
)


@pytest.mark.unit
def test_current_text_matches_current_version() -> None:
    """The CURRENT_* constants stay in sync — if a future version is
    added the constant must move with it."""
    assert POLICY_TEXTS[CURRENT_POLICY_VERSION] == CURRENT_POLICY_TEXT


@pytest.mark.unit
def test_policy_v1_mentions_oferta_anchor_points() -> None:
    """The on-disk MDX policy / oferta version 1 names exactly these
    anchor phrases; the in-DB row must too so the ledger is searchable
    end-to-end. If a lawyer revises the wording, bump POLICY_VERSION
    and the new row stays paired with that version."""
    text = POLICY_TEXTS[1]
    assert "ИП «Vitrina»" in text
    assert "samosite.online/privacy" in text
    assert "*.samosite.online" in text
    assert "заявок" in text


@pytest.mark.unit
def test_policy_versions_are_a_dense_sequence_from_1() -> None:
    versions = sorted(POLICY_TEXTS.keys())
    assert versions[0] == 1
    assert versions == list(range(1, versions[-1] + 1))


@pytest.mark.unit
def test_unknown_policy_version_raises_keyerror() -> None:
    """A versioned consent row referencing a key we don't have on disk
    is a programming error — the ledger must surface it loudly."""
    with pytest.raises(KeyError):
        _ = POLICY_TEXTS[999]
