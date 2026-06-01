"use client";

import { Gift } from "lucide-react";
import { useEffect, useState } from "react";

import { useLk } from "@/components/lk/LkShell";
import { type BillingData, lkApi } from "@/lib/lk-api";

export default function BillingPage() {
  const { toast } = useLk();
  const [b, setB] = useState<BillingData | null>(null);

  useEffect(() => {
    void (async () => {
      const r = await lkApi.billing();
      if (r.ok) setB(r.data);
    })();
  }, []);

  if (!b) {
    return (
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-line border-t-accent" />
    );
  }

  return (
    <div data-section="lk-billing">
      <h1 className="mb-5 text-[26px] font-extrabold tracking-tight">Оплата</h1>

      {b.free && (
        <div className="border-accent/30 bg-accent-soft/50 mb-5 flex items-start gap-3 rounded-2xl border p-4">
          <Gift className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
          <div>
            <p className="text-[15px] font-bold text-ink">Сейчас — бесплатно</p>
            <p className="mt-0.5 text-[13.5px] text-ink-soft">
              Сайт работает без оплаты, карту привязывать не нужно. Предупредим минимум за 14 дней
              до первого списания.
            </p>
          </div>
        </div>
      )}

      {/* tariff */}
      <div className="mb-4 rounded-2xl border border-line bg-white p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-bold text-ink">Тариф «{b.planName}»</p>
            <p className="mt-0.5 text-[13.5px] text-ink-soft">
              {b.free ? `0 ₽ · потом ${b.price}/${b.period}` : `${b.price}/${b.period}`}
            </p>
          </div>
          {b.free ? (
            <span className="rounded-full bg-success-soft px-2.5 py-1 text-[12px] font-bold text-ink">
              Бесплатно
            </span>
          ) : (
            <span className="text-right text-[13px] text-ink-soft">
              Следующее списание
              <br />
              <b className="text-ink">
                {b.nextAmount} · {b.nextDate}
              </b>
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={() => toast("Смена тарифа скоро будет доступна")}
          className="mt-4 rounded-full border border-line px-4 py-2 text-[13.5px] font-semibold text-ink hover:bg-paper-soft"
        >
          Сменить тариф
        </button>
      </div>

      {/* payment method */}
      <div className="mb-4 rounded-2xl border border-line bg-white p-5">
        <div className="mb-2 flex items-center gap-2">
          <p className="text-[14px] font-bold text-ink">Способ оплаты</p>
          {!b.method && (
            <span className="rounded-full bg-paper-soft px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
              В разработке
            </span>
          )}
        </div>
        <p className="text-[13.5px] text-ink-soft">
          {b.method ? `Карта ${b.method}` : "Карта не привязана"}
        </p>
      </div>

      {/* history */}
      <div className="rounded-2xl border border-line bg-white p-5">
        <p className="mb-2 text-[14px] font-bold text-ink">История платежей</p>
        {b.history.length === 0 ? (
          <p className="text-[13.5px] text-ink-soft">Платежей ещё не было.</p>
        ) : (
          <div className="flex flex-col divide-y divide-line">
            {b.history.map((h, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 text-[13.5px]">
                <span className="text-ink">{h.date}</span>
                <span className="text-ink-soft">{h.amount}</span>
                <span className="text-success">{h.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
