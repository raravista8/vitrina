"use client";

// src/feedback/index.tsx
import React, { useState, useEffect, useRef } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var COPY = {
  "blocker.title": "\u0427\u0442\u043E \u043E\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0435\u0442 \u043F\u0440\u044F\u043C\u043E \u0441\u0435\u0439\u0447\u0430\u0441?",
  "blocker.note.label": "\u041F\u043E\u0447\u0435\u043C\u0443 \u2014 \u043E\u0434\u043D\u0438\u043C \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u0435\u043C",
  "blocker.offer.title": "\u0421\u043E\u0431\u0435\u0440\u0443 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\u0430\u0448\u0435\u0433\u043E \u0441\u0430\u0439\u0442\u0430 \u0431\u0435\u0441\u043F\u043B\u0430\u0442\u043D\u043E \u2014 \u043A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C?",
  "blocker.cta": "\u041F\u0440\u0438\u0441\u043B\u0430\u0442\u044C \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A",
  "blocker.skip": "\u041F\u0440\u043E\u0441\u0442\u043E \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C \u043E\u0442\u0432\u0435\u0442",
  "question.fab": "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441",
  "question.cta": "\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C",
  "question.sign": "\u0427\u0438\u0442\u0430\u044E \u043A\u0430\u0436\u0434\u044B\u0439 \u043E\u0442\u0432\u0435\u0442 \u0441\u0430\u043C \u0438\xA0\u043E\u0442\u0432\u0435\u0447\u0430\u044E \u043B\u0438\u0447\u043D\u043E",
  "thanks.blocker.contact": "\u041F\u0440\u0438\u0448\u043B\u044E \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0432\xA0{channel}",
  "thanks.blocker.plain": "\u0421\u043F\u0430\u0441\u0438\u0431\u043E, \u044D\u0442\u043E \u043F\u0440\u0430\u0432\u0434\u0430 \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442",
  "thanks.question": "\u041E\u0442\u0432\u0435\u0447\u0443 \u043B\u0438\u0447\u043D\u043E \u0432\xA0{channel}"
};
var REASONS = [
  { code: "enough_maps", label: "\u041C\u043D\u0435 \u0445\u0432\u0430\u0442\u0430\u0435\u0442 \u042F\u043D\u0434\u0435\u043A\u0441.\u041A\u0430\u0440\u0442 \u0438 2\u0413\u0418\u0421" },
  { code: "booking_covers", label: "\u0417\u0430\u043F\u0438\u0441\u044C \u0443\u0436\u0435 \u0432 Dikidi/YClients \u2014 \u0437\u0430\u0447\u0435\u043C \u0435\u0449\u0451 \u0441\u0430\u0439\u0442?" },
  { code: "unclear_value", label: "\u041D\u0435 \u043F\u043E\u043D\u044F\u043B, \u0447\u0442\u043E \u0438\u043C\u0435\u043D\u043D\u043E \u043F\u043E\u043B\u0443\u0447\u0443" },
  { code: "price", label: "\u0414\u043E\u0440\u043E\u0433\u043E" },
  { code: "no_trust", label: "\u041D\u0435 \u0434\u043E\u0432\u0435\u0440\u044F\u044E: \u043D\u0435\u043F\u043E\u043D\u044F\u0442\u043D\u043E, \u043A\u0442\u043E \u0432\u044B" },
  { code: "not_now", label: "\u041F\u043E\u043A\u0430 \u043F\u0440\u043E\u0441\u0442\u043E \u0441\u043C\u043E\u0442\u0440\u044E \u2014 \u0432\u0435\u0440\u043D\u0443\u0441\u044C \u043F\u043E\u0437\u0436\u0435" },
  { code: "other", label: "\u0414\u0440\u0443\u0433\u043E\u0435 \u2014 \u043D\u0430\u043F\u0438\u0448\u0443 \u0441\u043B\u043E\u0432\u0430\u043C\u0438" }
];
var CHANNELS = [
  { id: "telegram", label: "Telegram", ph: "@username", icon: ["M22 3 L1.5 11 L8 13.5 L17 7 L11 14 L11.5 20 L15 16 L20 19 Z"] },
  { id: "whatsapp", label: "WhatsApp", ph: "+7 (___) ___-__-__", icon: ["M12 2a10 10 0 0 0-9 15L2 22l5-1a10 10 0 1 0 5-19z", "M9 7c.5 0 1 .5 1.5 2 .5 1 .5 1.5-.5 2-.5.5-1 1 0 2s2 1.5 2.5 1c.5-1 1-1 2-.5s1.5 1 1.5 1.5c0 2-3 2-5 1-2-1-4-3-4-5 0-2 1-4 2-4z"] },
  { id: "email", label: "Email", ph: "you@mail.ru", icon: ["M3 5.5h18v13H3z", "m3 6 9 7 9-7"] }
];
var channelLabel = (id) => (CHANNELS.find((c) => c.id === id) || CHANNELS[0]).label;
var sub = (key, ch) => COPY[key].replace("{channel}", channelLabel(ch));
function formatPhone(v) {
  let d = (v || "").replace(/\D/g, "");
  if (d[0] === "8") d = "7" + d.slice(1);
  if (d && d[0] !== "7") d = "7" + d;
  d = d.slice(0, 11);
  const p = d.slice(1);
  let out = "+7";
  if (p.length) out += " (" + p.slice(0, 3);
  if (p.length >= 3) out += ") " + p.slice(3, 6);
  if (p.length >= 6) out += "-" + p.slice(6, 8);
  if (p.length >= 8) out += "-" + p.slice(8, 10);
  return out;
}
function contactValid(channel, value) {
  const v = (value || "").trim();
  if (!v) return false;
  if (channel === "whatsapp") return v.replace(/\D/g, "").length === 11;
  if (channel === "email") return /^\S+@\S+\.\S+$/.test(v);
  return /^@?[A-Za-z0-9_.]{2,}$/.test(v);
}
function contactError(channel) {
  if (channel === "whatsapp") return "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043D\u043E\u043C\u0435\u0440 \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E: +7 \u0438 10 \u0446\u0438\u0444\u0440";
  if (channel === "email") return "\u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u2014 \u043D\u0443\u0436\u0435\u043D \u0432\u0438\u0434 you@mail.ru";
  return "\u041C\u0438\u043D\u0438\u043C\u0443\u043C 2 \u0441\u0438\u043C\u0432\u043E\u043B\u0430, \u043B\u0430\u0442\u0438\u043D\u0438\u0446\u0430/\u0446\u0438\u0444\u0440\u044B";
}
function Icon({ d, size = 22, sw = 1.9, fill }) {
  return /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: fill || "none", stroke: "currentColor", strokeWidth: sw, strokeLinecap: "round", strokeLinejoin: "round", children: d.map((p, i) => /* @__PURE__ */ jsx("path", { d: p }, i)) });
}
var S = {
  label: { fontFamily: "var(--mono)", fontSize: 11, fontWeight: 500, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--ink-45)" },
  input: { width: "100%", padding: "13px 14px", border: "1px solid var(--line-2)", background: "#fff", font: "inherit", fontSize: 16, color: "var(--ink)", outline: "none" },
  hint: { fontSize: 15, lineHeight: 1.5, color: "var(--ink-70)" }
};
function ReasonCard({ reason, active, first, onSelect, mobile }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": active,
      tabIndex: active || first ? 0 : -1,
      "data-fb-reason": reason.code,
      onClick: () => onSelect(reason.code),
      className: "rcard" + (active ? " is-active" : ""),
      style: { fontSize: mobile ? 15.5 : 15 },
      children: [
        /* @__PURE__ */ jsx("span", { className: "rdot", "aria-hidden": "true", children: active ? /* @__PURE__ */ jsx(Icon, { d: ["M20 6 9 17l-5-5"], size: 13, sw: 3 }) : null }),
        /* @__PURE__ */ jsx("span", { style: { flex: 1, minWidth: 0, textWrap: "pretty" }, children: reason.label })
      ]
    }
  );
}
function ChannelChips({ channel, onChannel }) {
  return /* @__PURE__ */ jsx("div", { role: "radiogroup", "aria-label": "\u041A\u0443\u0434\u0430 \u043F\u0440\u0438\u0441\u043B\u0430\u0442\u044C", style: { display: "flex", flexWrap: "wrap", gap: 9 }, children: CHANNELS.map((c) => /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      role: "radio",
      "aria-checked": channel === c.id,
      "data-fb-channel": c.id,
      onClick: () => onChannel(c.id),
      className: "chip" + (channel === c.id ? " is-active" : ""),
      children: [
        /* @__PURE__ */ jsx("span", { style: { marginRight: 8, display: "inline-flex" }, children: /* @__PURE__ */ jsx(Icon, { d: c.icon, size: 15, sw: 1.9, fill: c.id === "telegram" ? "currentColor" : void 0 }) }),
        c.label
      ]
    },
    c.id
  )) });
}
function ContactField({ channel, value, onChange }) {
  const [touched, setTouched] = useState(false);
  const meta = CHANNELS.find((c) => c.id === channel) || CHANNELS[0];
  const valid = contactValid(channel, value);
  const showErr = touched && !!(value || "").trim() && !valid;
  const border = showErr ? "#D98A8A" : touched && valid ? "#8FC3B4" : "var(--line-2)";
  const handle = (e) => {
    const raw = e.target.value;
    onChange(channel === "whatsapp" ? formatPhone(raw) : raw);
  };
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsx("span", { style: { position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-45)", pointerEvents: "none", display: "inline-flex" }, children: /* @__PURE__ */ jsx(Icon, { d: meta.icon, size: 16, sw: 1.9, fill: channel === "telegram" ? "currentColor" : void 0 }) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          style: { ...S.input, paddingLeft: 38, borderColor: border },
          value,
          placeholder: meta.ph,
          inputMode: channel === "whatsapp" ? "tel" : channel === "email" ? "email" : "text",
          autoComplete: "off",
          onChange: handle,
          onBlur: () => setTouched(true),
          "aria-label": "\u041A\u043E\u043D\u0442\u0430\u043A\u0442"
        }
      )
    ] }),
    showErr && /* @__PURE__ */ jsxs("span", { style: { display: "flex", alignItems: "center", gap: 7, fontSize: 13.5, color: "#B23B3B" }, children: [
      /* @__PURE__ */ jsx(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 15, sw: 2 }),
      " ",
      contactError(channel)
    ] })
  ] });
}
function Spinner({ size = 16 }) {
  return /* @__PURE__ */ jsx("span", { className: "fb2-spin", style: { display: "inline-block", width: size, height: size, borderRadius: "50%", border: "2px solid rgba(251,249,244,.4)", borderTopColor: "var(--on-accent)" } });
}
function ErrorBanner() {
  return /* @__PURE__ */ jsxs("div", { role: "alert", style: { display: "flex", alignItems: "flex-start", gap: 9, border: "1px solid #D98A8A", background: "#FAEFEE", padding: "11px 13px", fontSize: 13.5, lineHeight: 1.45, color: "#B23B3B", marginTop: 4 }, children: [
    /* @__PURE__ */ jsx("span", { style: { flex: "none", marginTop: 1 }, children: /* @__PURE__ */ jsx(Icon, { d: ["M12 8v5", "M12 16h.01", "M12 3 2 20h20L12 3z"], size: 16, sw: 2 }) }),
    /* @__PURE__ */ jsx("span", { children: "\u041D\u0435 \u043F\u043E\u043B\u0443\u0447\u0438\u043B\u043E\u0441\u044C \u043E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C. \u041F\u0440\u043E\u0432\u0435\u0440\u044C\u0442\u0435 \u0438\u043D\u0442\u0435\u0440\u043D\u0435\u0442 \u0438 \u043F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437 \u2014 \u0432\u0441\u0451 \u0437\u0430\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u043E\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u043B\u043E\u0441\u044C." })
  ] });
}
function Thanks({ mode, channel, contactSent, onClose }) {
  const text = mode === "question" ? sub("thanks.question", channel) : contactSent ? sub("thanks.blocker.contact", channel) : COPY["thanks.blocker.plain"];
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 15, textAlign: "center", padding: "20px 4px 6px", maxWidth: 420, margin: "0 auto" }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 58, height: 58, borderRadius: "50%", background: "var(--accent)", color: "var(--on-accent)", display: "inline-flex", alignItems: "center", justifyContent: "center" }, children: /* @__PURE__ */ jsx(Icon, { d: ["M20 6 9 17l-5-5"], size: 28, sw: 2.4 }) }),
    /* @__PURE__ */ jsx("h3", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: 27, lineHeight: 1.04, color: "var(--ink)", margin: 0 }, children: "\u0421\u043F\u0430\u0441\u0438\u0431\u043E" }),
    /* @__PURE__ */ jsx("p", { style: { ...S.hint, margin: 0 }, children: text }),
    /* @__PURE__ */ jsx("button", { className: "btn btn--block", type: "button", "data-fb-cta": "thanks-close", onClick: onClose, style: { marginTop: 6 }, children: "\u041F\u043E\u043D\u044F\u0442\u043D\u043E" })
  ] });
}
function FeedbackV2Modal(props = {}) {
  const {
    mode = "blocker",
    open: openProp,
    onOpenChange,
    reasons = REASONS,
    reason: reasonProp,
    onReasonChange,
    note: noteProp,
    onNoteChange,
    question: questionProp,
    onQuestionChange,
    channel: channelProp,
    onChannelChange,
    contact: contactProp,
    onContactChange,
    onSubmit,
    submitting = false,
    error = false,
    submitted: submittedProp,
    mobile = false,
    embedded: embeddedProp
  } = props;
  const isControlled = openProp !== void 0;
  const isCanvas = !isControlled && typeof onSubmit !== "function";
  const embedded = embeddedProp !== void 0 ? embeddedProp : isCanvas;
  const [openI, setOpenI] = useState(isCanvas);
  const isOpen = isControlled ? openProp : openI;
  const setOpen = (v) => {
    if (onOpenChange) onOpenChange(v);
    if (!isControlled) setOpenI(v);
  };
  const [reasonI, setReasonI] = useState(reasonProp ?? null);
  const [noteI, setNoteI] = useState(noteProp ?? "");
  const [questionI, setQuestionI] = useState(questionProp ?? "");
  const [channelI, setChannelI] = useState(channelProp ?? "telegram");
  const [contactI, setContactI] = useState(contactProp ?? "");
  const [submittedI, setSubmittedI] = useState(false);
  const reason = onReasonChange ? reasonProp ?? null : reasonI;
  const note = onNoteChange ? noteProp ?? "" : noteI;
  const question = onQuestionChange ? questionProp ?? "" : questionI;
  const channel = onChannelChange ? channelProp ?? "telegram" : channelI;
  const contact = onContactChange ? contactProp ?? "" : contactI;
  const submitted = submittedProp !== void 0 ? submittedProp : submittedI;
  const setReason = onReasonChange || setReasonI;
  const setNote = onNoteChange || setNoteI;
  const setQuestion = onQuestionChange || setQuestionI;
  const setChannel = onChannelChange || setChannelI;
  const setContact = onContactChange || setContactI;
  const dialogRef = useRef(null);
  const groupRef = useRef(null);
  useEffect(() => {
    if (!isOpen || embedded) return;
    const node = dialogRef.current;
    const onKey = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setOpen(false);
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const f = node.querySelectorAll('button,[href],input,textarea,select,[tabindex]:not([tabindex="-1"])');
      const list = Array.prototype.filter.call(f, (el) => !el.disabled && el.offsetParent !== null);
      if (!list.length) return;
      const first = list[0], last = list[list.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey, true);
    const t = setTimeout(() => {
      if (node) {
        const el = node.querySelector("input,textarea,button");
        el && el.focus();
      }
    }, 30);
    return () => {
      document.removeEventListener("keydown", onKey, true);
      clearTimeout(t);
    };
  }, [isOpen, embedded, mode]);
  if (!isOpen) return null;
  const contactOk = contactValid(channel, contact);
  const doSubmit = (payload, withContact) => {
    if (submitting) return;
    if (typeof onSubmit === "function") {
      onSubmit(payload);
    } else {
      setSubmittedI(true);
    }
  };
  const submitBlocker = () => {
    if (!reason || !contactOk) return;
    const p = { mode: "blocker", reason };
    const n = (note || "").trim();
    if (n) p.note = n;
    p.channel = channel;
    p.contact = (contact || "").trim();
    doSubmit(p, true);
  };
  const submitPlain = () => {
    if (!reason) return;
    const p = { mode: "blocker", reason };
    const n = (note || "").trim();
    if (n) p.note = n;
    doSubmit(p, false);
  };
  const submitQuestion = () => {
    if (!(question || "").trim() || !contactOk) return;
    doSubmit({ mode: "question", question: (question || "").trim(), channel, contact: (contact || "").trim() }, true);
  };
  const onGroupKey = (e) => {
    const codes = reasons.map((r) => r.code);
    const i = codes.indexOf(reason);
    if (["ArrowDown", "ArrowRight"].includes(e.key)) {
      e.preventDefault();
      setReason(codes[Math.min((i < 0 ? -1 : i) + 1, codes.length - 1)]);
    } else if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
      e.preventDefault();
      setReason(codes[Math.max((i < 0 ? codes.length : i) - 1, 0)]);
    }
  };
  let inner;
  if (submitted) {
    inner = /* @__PURE__ */ jsx(Thanks, { mode, channel, contactSent: mode === "question" ? true : !!(contact || "").trim(), onClose: () => setOpen(false) });
  } else if (mode === "question") {
    const qOk = !!(question || "").trim() && contactOk;
    inner = /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "fb2-h", children: "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441" }),
        /* @__PURE__ */ jsx("p", { style: { ...S.hint, marginTop: 6 }, children: "\u0421\u043F\u0440\u0430\u0448\u0438\u0432\u0430\u0439\u0442\u0435 \u0447\u0442\u043E \u0443\u0433\u043E\u0434\u043D\u043E \u043F\u0440\u043E \u0421\u0430\u043C\u043E\u0441\u0430\u0439\u0442 \u2014 \u043A\u0430\u043A \u044D\u0442\u043E \u0440\u0430\u0431\u043E\u0442\u0430\u0435\u0442, \u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0441\u0442\u043E\u0438\u0442, \u043F\u043E\u0434\u043E\u0439\u0434\u0451\u0442 \u043B\u0438 \u0432\u0430\u043C." })
      ] }),
      /* @__PURE__ */ jsx("textarea", { className: "fb2-ta", value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "\u0412\u0430\u0448 \u0432\u043E\u043F\u0440\u043E\u0441\u2026", rows: mobile ? 4 : 3, "aria-label": "\u0412\u043E\u043F\u0440\u043E\u0441" }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 11 }, children: [
        /* @__PURE__ */ jsx("span", { style: S.label, children: "\u041A\u0443\u0434\u0430 \u043E\u0442\u0432\u0435\u0442\u0438\u0442\u044C" }),
        /* @__PURE__ */ jsx(ChannelChips, { channel, onChannel: setChannel }),
        /* @__PURE__ */ jsx(ContactField, { channel, value: contact, onChange: setContact })
      ] }),
      error && /* @__PURE__ */ jsx(ErrorBanner, {}),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn btn--block", type: "button", "data-fb-cta": "send-question", disabled: !qOk || submitting, onClick: submitQuestion, style: { opacity: !qOk || submitting ? 0.5 : 1, cursor: !qOk || submitting ? "not-allowed" : "pointer" }, children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          " \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u2026"
        ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
          COPY["question.cta"],
          " ",
          /* @__PURE__ */ jsx("span", { className: "arw", children: "\u2192" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "fb2-sign", children: COPY["question.sign"] })
      ] })
    ] });
  } else {
    const blockerCtaOk = !!reason && contactOk;
    inner = /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ jsx("h2", { className: "fb2-h", children: COPY["blocker.title"] }),
      /* @__PURE__ */ jsx("div", { ref: groupRef, role: "radiogroup", "aria-label": COPY["blocker.title"], onKeyDown: onGroupKey, style: { display: "flex", flexDirection: "column", gap: 8 }, children: reasons.map((r, i) => /* @__PURE__ */ jsx(ReasonCard, { reason: r, active: reason === r.code, first: i === 0 && !reason, onSelect: setReason, mobile }, r.code)) }),
      reason && /* @__PURE__ */ jsxs("div", { className: "fb2-a2", style: { display: "flex", flexDirection: "column", gap: 18, borderTop: "1px solid var(--line)", paddingTop: 18 }, children: [
        /* @__PURE__ */ jsxs("label", { style: { display: "flex", flexDirection: "column", gap: 7 }, children: [
          /* @__PURE__ */ jsx("span", { style: S.label, children: COPY["blocker.note.label"] }),
          /* @__PURE__ */ jsx("input", { style: S.input, value: note, onChange: (e) => setNote(e.target.value), maxLength: 200, placeholder: "\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E" })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, borderLeft: "3px solid var(--accent)", paddingLeft: 15 }, children: [
          /* @__PURE__ */ jsx("strong", { style: { fontFamily: "var(--display)", fontWeight: 700, fontSize: 20, lineHeight: 1.1, letterSpacing: "-.01em", color: "var(--ink)" }, children: COPY["blocker.offer.title"] }),
          /* @__PURE__ */ jsx(ChannelChips, { channel, onChannel: setChannel }),
          /* @__PURE__ */ jsx(ContactField, { channel, value: contact, onChange: setContact })
        ] }),
        error && /* @__PURE__ */ jsx(ErrorBanner, {}),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
          /* @__PURE__ */ jsx("button", { className: "btn btn--block", type: "button", "data-fb-cta": "send-blocker", disabled: !blockerCtaOk || submitting, onClick: submitBlocker, style: { opacity: !blockerCtaOk || submitting ? 0.5 : 1, cursor: !blockerCtaOk || submitting ? "not-allowed" : "pointer" }, children: submitting ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            " \u041E\u0442\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u043C\u2026"
          ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
            COPY["blocker.cta"],
            " ",
            /* @__PURE__ */ jsx("span", { className: "arw", children: "\u2192" })
          ] }) }),
          /* @__PURE__ */ jsx("button", { className: "tlink", type: "button", "data-fb-cta": "send-plain", disabled: submitting, onClick: submitPlain, style: { alignSelf: "center", fontWeight: 500, color: "var(--ink-45)" }, children: COPY["blocker.skip"] })
        ] })
      ] })
    ] });
  }
  const outer = embedded ? { position: "relative", height: "100%", display: "flex", alignItems: "stretch", justifyContent: "center", background: "transparent" } : { position: "fixed", inset: 0, zIndex: 200, background: "rgba(27,23,18,.55)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", display: "flex", alignItems: mobile ? "flex-end" : "center", justifyContent: "center", padding: mobile ? 0 : "32px 20px" };
  const sheet = embedded ? { width: "100%", height: "100%", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" } : { width: mobile ? "100%" : "min(520px, calc(100vw - 40px))", maxHeight: mobile ? "94vh" : "90vh", background: "var(--paper)", border: "1px solid var(--line)", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fb2" + (embedded ? "" : " fb2-enter"),
      style: outer,
      "data-feedback-v2": "",
      "data-fb-mode": mode,
      onClick: embedded ? void 0 : (e) => {
        if (e.target === e.currentTarget) setOpen(false);
      },
      children: /* @__PURE__ */ jsxs("div", { ref: dialogRef, style: sheet, role: "dialog", "aria-modal": embedded ? void 0 : "true", "aria-label": mode === "question" ? "\u0417\u0430\u0434\u0430\u0442\u044C \u0432\u043E\u043F\u0440\u043E\u0441" : COPY["blocker.title"], children: [
        /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "12px 12px 0", flex: "0 0 auto" }, children: /* @__PURE__ */ jsx("button", { className: "ss-iconbtn", type: "button", onClick: () => setOpen(false), "aria-label": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C", children: /* @__PURE__ */ jsx(Icon, { d: ["M18 6 6 18", "m6 6 12 12"], size: 20, sw: 2 }) }) }),
        /* @__PURE__ */ jsx("div", { style: { padding: mobile ? "4px 18px 22px" : "2px 32px 28px", overflowY: "auto", flex: 1 }, children: inner })
      ] })
    }
  );
}
function FeedbackV2Fab({ onClick, embedded }) {
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      "data-fb-fab": "",
      onClick,
      className: "fb2 fb2-fab",
      style: { position: embedded ? "absolute" : "fixed", right: 24, bottom: 24, zIndex: 190 },
      children: [
        /* @__PURE__ */ jsx("span", { style: { display: "inline-flex" }, children: /* @__PURE__ */ jsx(Icon, { d: ["M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z"], size: 18, sw: 2 }) }),
        COPY["question.fab"]
      ]
    }
  );
}
var Fb2_CSS = ".fb2{--bone:#F2EEE6;--paper:#FBF9F4;--ink:#1B1712;--ink-70:#4C463C;--ink-45:#6E675A;--line:#E5DFD3;--line-2:#D6CEBE;--accent:#7A2B34;--accent-dk:#631F27;--on-accent:#FBF9F4;--display:'Sofia Sans Condensed',system-ui,sans-serif;--text:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;font-family:var(--text);color:var(--ink);line-height:1.55;}.fb2 *{box-sizing:border-box;border-radius:0;box-shadow:none;}.fb2 h2,.fb2 h3,.fb2 p{margin:0;}.fb2 button{font-family:inherit;}.fb2 .fb2-h{font-family:var(--display);font-weight:700;font-size:27px;line-height:1.04;letter-spacing:-.01em;color:var(--ink);padding-right:8px;text-wrap:balance;}.fb2 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:52px;padding:0 24px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;border:none;cursor:pointer;transition:background .16s;}.fb2 .btn:hover:not(:disabled){background:var(--accent-dk);}.fb2 .btn--block{display:flex;width:100%;}.fb2 .btn .arw{display:inline-block;transition:transform .16s;}.fb2 .btn:hover:not(:disabled) .arw{transform:translateX(4px);}.fb2 .chip{display:inline-flex;align-items:center;height:40px;padding:0 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:600;font-size:14.5px;line-height:1;cursor:pointer;transition:background .14s,border-color .14s;}.fb2 .chip:hover{border-color:var(--ink-45);}.fb2 .chip.is-active{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700;}.fb2 .rcard{display:flex;align-items:center;gap:13px;width:100%;text-align:left;padding:14px 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:500;line-height:1.3;cursor:pointer;transition:background .14s,border-color .14s;}.fb2 .rcard:hover{border-color:var(--ink-45);}.fb2 .rcard.is-active{border:1.5px solid var(--accent);background:var(--bone);font-weight:600;}.fb2 .rdot{flex:0 0 auto;width:22px;height:22px;border-radius:50%;border:2px solid var(--line-2);background:#fff;display:inline-flex;align-items:center;justify-content:center;color:var(--on-accent);transition:background .14s,border-color .14s;}.fb2 .rcard.is-active .rdot{background:var(--accent);border-color:var(--accent);}.fb2 .tlink{background:none;border:none;cursor:pointer;color:var(--ink);text-decoration:underline;text-decoration-color:var(--line-2);text-underline-offset:3px;font:inherit;padding:4px 2px;}.fb2 .tlink:hover:not(:disabled){color:var(--accent);text-decoration-color:var(--accent);}.fb2 .tlink:disabled{opacity:.5;cursor:default;}.fb2 .fb2-ta{width:100%;padding:13px 14px;border:1px solid var(--line-2);background:#fff;font:inherit;font-size:16px;color:var(--ink);outline:none;resize:vertical;min-height:84px;}.fb2 .fb2-ta:focus{border-color:var(--ink-45);}.fb2 .fb2-sign{font-size:13.5px;font-style:italic;color:var(--ink-45);text-align:center;text-wrap:pretty;}.fb2 .ss-iconbtn{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);background:none;border:none;cursor:pointer;transition:background .14s;}.fb2 .ss-iconbtn:hover{background:var(--bone);}.fb2.fb2-fab{display:inline-flex;align-items:center;gap:9px;height:auto;padding:14px 20px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:14.5px;line-height:1;border:none;cursor:pointer;transition:background .16s;}.fb2.fb2-fab:hover{background:var(--accent-dk);}@keyframes fb2Reveal{from{opacity:0;transform:translateY(-6px)}to{opacity:1;transform:none}}@keyframes fb2Enter{from{opacity:0}to{opacity:1}}@keyframes fb2Spin{to{transform:rotate(360deg)}}.fb2 .fb2-a2{animation:fb2Reveal .26s cubic-bezier(.2,.7,.2,1);}.fb2.fb2-enter{animation:fb2Enter .18s ease;}.fb2 .fb2-spin{animation:fb2Spin .8s linear infinite;}@media (prefers-reduced-motion: reduce){.fb2 .fb2-a2,.fb2.fb2-enter{animation:none;}.fb2 .btn .arw{transition:none;}}";
function Fb2_Styles() {
  return React.createElement("style", { "data-samosite-canon-fb2": "0.13", dangerouslySetInnerHTML: { __html: Fb2_CSS } });
}
export {
  CHANNELS,
  COPY,
  Fb2_CSS,
  Fb2_Styles,
  FeedbackV2Fab,
  FeedbackV2Modal,
  REASONS,
  contactValid,
  formatPhone
};
//# sourceMappingURL=index.js.map