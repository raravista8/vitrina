import type { Metadata } from "next";
import Link from "next/link";

import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Политика конфиденциальности",
  description:
    "Как Vitrina обрабатывает персональные данные мастеров и конечных посетителей сайтов согласно ФЗ-152.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <main className="mx-auto max-w-3xl px-6 py-20 text-base text-neutral-700">
        <h1 className="text-3xl font-semibold text-neutral-900 sm:text-4xl">
          Политика конфиденциальности
        </h1>
        <p className="mt-3 text-sm text-neutral-500">
          Версия 1 · последняя редакция от 2026-05-19 · публикуется в редакции, согласованной
          юристом РФ перед публичным запуском (см. <code>docs/legal/lawyer-review.md</code>). В
          DB-ledger (<code>consents.policy_version = 1</code>) каждая запись о согласии пары (IP,
          user-agent, timestamp) ссылается на конкретную версию документа — изменение текста создаёт
          версию 2, а собранные ранее согласия остаются привязанными к версии 1.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-neutral-900">1. Оператор</h2>
          <p>
            Оператор персональных данных — ИП «Vitrina», сайт{" "}
            <Link className="underline" href="/">
              samosite.online
            </Link>
            . Уведомление подано в реестр операторов Роскомнадзора через{" "}
            <a className="underline" href="https://pd.rkn.gov.ru" rel="noreferrer noopener">
              pd.rkn.gov.ru
            </a>{" "}
            до начала обработки данных (реквизит уведомления публикуется отдельно после одобрения
            регулятором).
          </p>
          <p>
            Цели обработки: предоставление услуг по созданию сайта мастера и передача мастеру заявок
            от конечных посетителей сайта.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">2. Категории данных</h2>
          <ul className="list-disc pl-6">
            <li>ФИО, контактный телефон, адрес электронной почты, имя в Telegram / MAX</li>
            <li>IP-адрес, user-agent (для антифрод-защиты и аналитики)</li>
            <li>Контент, размещённый мастером в источнике (Telegram-канал, Я.Карты, фото)</li>
            <li>Заявки конечных посетителей: имя, телефон, текст обращения (шифруются Fernet)</li>
          </ul>

          <h2 className="text-xl font-semibold text-neutral-900">3. Правовое основание</h2>
          <p>Согласие субъекта персональных данных (ст. 6 ч. 1 п. 1 ФЗ-152).</p>

          <h2 className="text-xl font-semibold text-neutral-900">4. Способ и срок обработки</h2>
          <p>
            С использованием средств автоматизации. Срок обработки — до отзыва согласия или
            прекращения деятельности оператора, но не более 3 лет после последней активности
            субъекта. Согласия хранятся 3 года после удаления учётной записи как доказательство
            законного основания обработки.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">5. Локализация</h2>
          <p>
            Все данные хранятся в Российской Федерации — на серверах Yandex Cloud (Москва /
            Татарстан) и Selectel (Санкт-Петербург / Москва). Трансграничная передача отсутствует.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">6. Удаление данных</h2>
          <p>
            Запрос на удаление подаётся через <code>POST /api/me/delete-data</code> с указанием
            контакта (email / телефон / Telegram / MAX). Vitrina отправляет одноразовую ссылку (15
            минут) на этот контакт; после клика данные удаляются в течение 10 календарных дней.
            Согласия и аудит-лог операции удаления сохраняются 3 года.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">7. Безопасность</h2>
          <p>
            Передача данных — только по HTTPS (TLS 1.3). Заявки от посетителей сайтов шифруются на
            уровне приложения алгоритмом Fernet (AES-128-CBC + HMAC-SHA256) до записи в базу данных.
            Доступ к расшифрованным данным имеет ИП «Vitrina» и владелец конкретного сайта; каждая
            операция расшифровки фиксируется в незаменяемом аудит-логе.
          </p>

          <h2 className="text-xl font-semibold text-neutral-900">8. Контакты оператора</h2>
          <p>
            По вопросам обработки персональных данных: <code>privacy@samosite.online</code>. В
            течение 10 рабочих дней оператор предоставит подтверждение факта обработки или
            обоснованный отказ согласно ст. 14 ФЗ-152.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
