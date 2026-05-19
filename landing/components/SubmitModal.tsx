"use client";

/**
 * Step-2 modal (T1.5). Opened by Hero CTA after the URL has been
 * classified as an MVP source (Telegram / Yandex.Maps). Renders the
 * ApplicationForm; on successful submit swaps to a confirmation view.
 *
 * Built on Radix Dialog so focus-trap, ESC-to-close, and
 * `aria-modal`/labelledby/describedby are correct out of the box.
 */

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

import { ApplicationForm } from "./ApplicationForm";

const CONFIRMATION_TITLE = "Готовим вашу витрину";
const CONFIRMATION_BODY =
  "Мы получили заявку. Напишем вам когда сайт будет готов — обычно через 2–24 часа.";

interface SubmitModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceUrl: string;
  sourceType: "ymaps" | "telegram" | "photo";
}

export function SubmitModal({ open, onOpenChange, sourceUrl, sourceType }: SubmitModalProps) {
  const [submitted, setSubmitted] = useState(false);

  function handleOpenChange(next: boolean) {
    onOpenChange(next);
    // Reset to the form view when the modal is closed so the next open
    // starts fresh (rather than landing on the confirmation screen again).
    if (!next) setSubmitted(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-neutral-900/50 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-8 shadow-2xl focus:outline-none"
          aria-describedby={undefined}
        >
          {submitted ? (
            <>
              <Dialog.Title className="text-2xl font-semibold text-neutral-900">
                {CONFIRMATION_TITLE}
              </Dialog.Title>
              <p className="mt-3 text-sm text-neutral-600">{CONFIRMATION_BODY}</p>
              <button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Закрыть
              </button>
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-semibold text-neutral-900">
                Как с вами связаться?
              </Dialog.Title>
              <p className="mt-2 text-sm text-neutral-600">
                Источник: <span className="font-mono text-xs">{sourceUrl}</span>
              </p>
              <div className="mt-6">
                <ApplicationForm
                  sourceUrl={sourceUrl}
                  sourceType={sourceType}
                  onSubmitted={() => setSubmitted(true)}
                />
              </div>
            </>
          )}

          <Dialog.Close asChild>
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute right-4 top-4 text-neutral-400 hover:text-neutral-700"
            >
              ✕
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
