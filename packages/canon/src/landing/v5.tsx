'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · landing v5 «Фарфор и лак» — 11 секций (canon-порт прототипа Витрина v5).
// Controlled: CTA → onIntake(entry); никаких window.SSIntake / data-intake делегирования.
// Аналитика — data-metric на секциях, data-entry на CTA (трекер вешает консьюмер).
// FAQ — внутренний UI-стейт + onFaqOpen(id). Reveal — IntersectionObserver внутри,
// мгновенно при prefers-reduced-motion + fail-safe. Копи — побайтово из прототипа.
// Скругления/тени — нет (правило из токенов; V5_CSS также несёт *{border-radius:0;box-shadow:none}).
// Internally-responsive (брейкпоинты 1000/900/720) — консьюмер монтирует один раз.

import React, { useState, useEffect, useRef } from 'react';
import { VT } from '../tokens';

type IntakeCb = (entry: string, niche?: string) => void;
const noop: IntakeCb = () => {};

const MONO = VT.font.mono;
const SANS = VT.font.sans;
const INK = VT.ink, INK70 = VT.inkSoft, INK45 = VT.inkFaint;
const LINE = VT.line, LINE2 = VT.lineStrong, BONE = VT.bg, ACCENT = VT.accent;

// ─────────────────────────────────────────────────────────────
// Стили страницы «Фарфор и лак». :root — из токенов (VT), не хардкод.
// Инжектится <V5_Styles/> (в V5_Page уже включён) либо `import '@samosite/canon/styles.css'`.
// ─────────────────────────────────────────────────────────────
export const V5_CSS = `
:root{
  --bone:${VT.bg};--paper:${VT.white};--ink:${VT.ink};--ink-70:${VT.inkSoft};--ink-45:${VT.inkFaint};
  --line:${VT.line};--line-2:${VT.lineStrong};--accent:${VT.accent};--accent-dk:${VT.accentHover};
  --on-accent:${VT.onAccent};--dark:${VT.dark};--dark-70:${VT.darkSoft};--accent-on-dark:${VT.accentOnDark};
  --wrap:1320px;--pad:clamp(20px,4vw,44px);
  --display:${VT.font.display};--text:${VT.font.sans};--mono:${VT.font.mono};
  --fs-body:clamp(15px,1.05vw,17px);--fs-lead:clamp(18px,1.35vw,21px);--fs-small:16px;--fs-label:12px;
}
.v5 *{box-sizing:border-box;}
.v5{background:var(--bone);color:var(--ink);font-family:var(--text);font-size:var(--fs-body);line-height:1.55;font-weight:400;-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;}
.v5 h1,.v5 h2,.v5 h3,.v5 p{margin:0;}
.v5 img{display:block;max-width:100%;}
.v5 *{border-radius:0 !important;box-shadow:none !important;}
.v5 button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit;}
.v5 a{color:var(--accent);text-decoration:none;}
.v5 a:hover{color:var(--accent-dk);}
.v5 ::selection{background:var(--accent);color:var(--on-accent);}
.v5 :focus-visible{outline:2px solid var(--accent);outline-offset:3px;}
.v5 .wrap{max-width:var(--wrap);margin-inline:auto;padding-inline:var(--pad);}
.v5 .bento12{display:grid;grid-template-columns:repeat(12,1fr);gap:clamp(24px,3vw,52px);}
.v5 .hero-h{font-family:var(--display);font-weight:800;font-size:clamp(52px,7.6vw,104px);line-height:.95;letter-spacing:-.01em;text-wrap:balance;overflow-wrap:normal;word-break:keep-all;hyphens:manual;}
.v5 .h2{font-family:var(--display);font-weight:700;font-size:clamp(38px,4.6vw,64px);line-height:1.04;letter-spacing:-.01em;text-wrap:balance;padding-bottom:.04em;overflow-wrap:normal;word-break:keep-all;hyphens:manual;}
.v5 .lead{font-size:var(--fs-lead);line-height:1.5;color:var(--ink-70);text-wrap:pretty;}
.v5 .small{font-size:var(--fs-small);line-height:1.55;color:var(--ink-70);}
.v5 .how-mon__head .small,.v5 .msg__d{font-size:16px;line-height:1.55;}
.v5 .accent{color:var(--accent);}
.v5 .label{font-family:var(--mono);font-weight:500;font-size:var(--fs-label);line-height:1.3;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-45);}
.v5 .btn{--h:54px;display:inline-flex;align-items:center;justify-content:center;gap:10px;height:var(--h);padding:0 26px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;transition:background .16s ease;}
.v5 .btn .arw{display:inline-block;transition:transform .16s ease;}
.v5 .btn:hover{background:var(--accent-dk);color:var(--on-accent);}
.v5 .btn:hover .arw{transform:translateX(4px);}
.v5 .btn--56{--h:56px;font-size:16.5px;padding:0 30px;}
.v5 .btn--44{--h:44px;font-size:15px;padding:0 20px;}
.v5 .btn--sec{background:transparent;color:var(--ink);border:1px solid var(--line-2);}
.v5 .btn--sec:hover{background:var(--ink);color:var(--paper);border-color:var(--ink);}
.v5 .btn--block{display:flex;width:100%;}
.v5 .tlink{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);text-decoration:none;transition:color .16s ease;background:none;}
.v5 .tlink .u{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;transition:text-underline-offset .16s ease;}
.v5 .tlink:hover{color:var(--ink);}
.v5 .tlink:hover .u{text-underline-offset:5px;}
.v5 .tlink .arw{display:inline-block;transition:transform .16s ease;}
.v5 .tlink:hover .arw{transform:translateX(3px);}
.v5 .section{margin-top:clamp(64px,8vw,116px);}
.v5 .shead{padding-bottom:22px;margin-bottom:clamp(30px,3.4vw,44px);border-bottom:1px solid var(--line-2);display:flex;flex-direction:column;align-items:flex-start;gap:12px;}
.v5 .shead__l{display:flex;flex-direction:column;gap:14px;min-width:0;}
.v5 .shead__l .h2{max-width:26ch;}
.v5 #story-h{max-width:none;}
.v5 #how .shead,.v5 #reviews .shead{border-bottom:none;padding-bottom:0;}
.v5 .shead__note{max-width:72ch;text-align:left;font-size:16px;line-height:1.5;color:var(--ink-70);text-wrap:pretty;}
.v5 .hdr{position:sticky;top:0;z-index:60;background:color-mix(in srgb,var(--bone) 88%,transparent);backdrop-filter:saturate(1.2) blur(8px);border-bottom:1px solid var(--line);}
.v5 .hdr__in{height:66px;display:flex;align-items:center;justify-content:space-between;gap:24px;}
.v5 .logo{font-family:var(--display);font-weight:800;font-size:26px;letter-spacing:-.01em;color:var(--ink);}
.v5 .logo b{color:var(--accent);font-weight:800;}
.v5 .hdr__nav{display:flex;align-items:center;gap:30px;}
.v5 .hdr__links{display:flex;align-items:center;gap:24px;}
.v5 .hdr__links a{font-family:var(--text);font-weight:500;font-size:14.5px;color:var(--ink);}
.v5 .hdr__links a:hover{color:var(--accent);}
.v5 .hdr__cta-m{display:none;}
.v5 .hdr__anchors{display:none;}
.v5 .hero{position:relative;padding-block:clamp(30px,3.6vw,52px) clamp(44px,5vw,72px);}
.v5 .hero__grid{display:grid;grid-template-columns:minmax(0,1.05fr) min(46vw,680px);gap:clamp(32px,5vw,64px);align-items:start;}
.v5 .hero__copy{display:flex;flex-direction:column;align-items:flex-start;gap:clamp(18px,2vw,26px);max-width:none;}
.v5 .hero__lead{max-width:40ch;}
.v5 .hero__cta{display:flex;flex-direction:column;align-items:flex-start;gap:14px;}
.v5 .hero__examples{display:inline-flex;align-items:center;gap:8px;font-family:var(--text);font-weight:600;font-size:16px;color:var(--ink);text-decoration:none;transition:color .16s;}
.v5 .hero__examples span:first-child{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:4px;transition:text-underline-offset .16s;}
.v5 .hero__examples:hover span:first-child{text-underline-offset:6px;}
.v5 .hero__examples .arw{text-decoration:none;}
.v5 .hero__proof{font-family:var(--mono);font-size:13.5px;line-height:1.6;letter-spacing:.01em;color:var(--ink-70);max-width:46ch;}
.v5 .hero__proof b{color:var(--ink);font-weight:500;}
.v5 .hero__preview{position:relative;align-self:start;height:clamp(510px,54vw,660px);margin:0;}
.v5 .hero__preview #hero-preview-root{height:100%;}
.v5 .story{display:grid;grid-template-columns:1fr;gap:clamp(28px,4vw,72px);align-items:start;}
.v5 .story__lead{max-width:70ch;}
.v5 .src{display:flex;flex-wrap:wrap;align-items:center;gap:14px 24px;margin-top:26px;padding-top:22px;border-top:1px solid var(--line);}
.v5 .src__i{display:inline-flex;align-items:center;gap:9px;font-family:var(--text);font-weight:500;font-size:15px;color:var(--ink);}
.v5 .src__i svg{color:var(--accent);flex:none;}
.v5 .steps{position:relative;border-top:2px solid var(--ink);}
.v5 .steprow{position:relative;display:grid;grid-template-columns:clamp(96px,11vw,168px) minmax(0,1fr);gap:clamp(18px,3vw,44px);padding:clamp(30px,3.6vw,52px) 0;border-bottom:1px solid var(--line-2);}
.v5 .steprow:last-child{border-bottom:none;}
.v5 .steprow__n{font-family:var(--display);font-weight:800;font-size:clamp(64px,9vw,132px);line-height:.74;letter-spacing:-.02em;color:var(--accent);}
.v5 .steprow__c{display:flex;flex-direction:column;gap:14px;padding-top:clamp(4px,.6vw,10px);}
.v5 .steprow__head{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;}
.v5 .steprow__t{font-family:var(--display);font-weight:700;font-size:clamp(26px,2.3vw,36px);line-height:1.02;letter-spacing:-.01em;max-width:24ch;}
.v5 .steprow__when{color:var(--accent);font-weight:600;}
.v5 .steprow__d{color:var(--ink-70);max-width:54ch;font-size:18px;line-height:1.55;}
.v5 .how-mon{margin-top:clamp(34px,4vw,56px);display:grid;grid-template-columns:.82fr 1.18fr;gap:clamp(24px,3.6vw,56px);align-items:center;}
.v5 .how-mon__head{display:flex;flex-direction:column;gap:12px;}
.v5 .how-mon__h{font-family:var(--display);font-weight:700;font-size:clamp(22px,2vw,30px);line-height:1.06;}
.v5 .how-mon__head .small{max-width:40ch;}
.v5 .msg{position:relative;background:#fff;border:1px solid var(--ink);border-left:3px solid var(--accent);padding:22px;color:var(--ink);}
.v5 .msg::before{content:"";position:absolute;top:10px;left:10px;right:-10px;bottom:-10px;border:1px solid var(--accent);z-index:-1;pointer-events:none;}
.v5 .msg__head{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.v5 .msg__head .label{color:var(--accent);}
.v5 .msg__head .tag2{margin-left:auto;font-family:var(--mono);font-size:10px;letter-spacing:.08em;color:var(--ink-45);border:1px solid var(--line-2);padding:3px 8px;}
.v5 .msg__t{font-weight:600;font-size:18px;line-height:1.3;margin-bottom:7px;color:var(--ink);}
.v5 .msg__d{color:var(--ink-70);}
.v5 .msg__act{display:flex;align-items:center;gap:20px;margin-top:16px;flex-wrap:wrap;}
.v5 .msg__act .btn{background:var(--accent);color:var(--on-accent);}
.v5 .msg__act .glink{font-weight:500;color:var(--ink-45);}
.v5 .msg__act .glink:hover{color:var(--ink);}
.v5 .pt-name{font-family:var(--display);font-weight:700;font-size:27px;line-height:1;letter-spacing:-.01em;}
.v5 .pt-tag{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:none;color:var(--accent);}
.v5 .pt-sub{font-size:12.5px;color:var(--ink-70);}
.v5 .pt-price{font-family:var(--display);font-weight:700;font-size:40px;line-height:1;margin-top:4px;}
.v5 .pt-price span{font-family:var(--text);font-size:15px;font-weight:500;color:var(--ink-45);}
.v5 .tcards{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch;}
.v5 .tcard{border:1px solid var(--ink);background:var(--paper);padding:26px 24px;display:flex;flex-direction:column;}
.v5 .tcard .btn{margin-top:auto;}
.v5 .tcard--hi{border-top:3px solid var(--accent);}
.v5 .tcard--hi .pt-name{color:var(--accent);}
.v5 .tcard__head{display:flex;flex-direction:column;gap:5px;margin-bottom:16px;}
.v5 .tcard__head .pt-name{font-size:32px;}
.v5 .tcard__head .pt-sub{min-height:0;max-width:none;}
.v5 .tcard__list{list-style:none;margin:0 0 18px;padding:0;}
.v5 .tcard__list li{display:flex;justify-content:space-between;align-items:baseline;gap:16px;padding:11px 0;border-bottom:1px solid var(--line);font-size:14.5px;color:var(--ink-70);}
.v5 .tcard__list li:last-child{border-bottom:none;}
.v5 .tcard__list b{font-family:var(--mono);font-weight:500;font-size:13px;color:var(--ink);white-space:nowrap;}
.v5 .tcard__list b.no{color:var(--ink-45);}
.v5 .tcard .btn{white-space:normal;height:auto;min-height:48px;padding-top:12px;padding-bottom:12px;line-height:1.2;}
.v5 .tcommon{margin-top:20px;font-size:14.5px;line-height:1.55;color:var(--ink-70);max-width:74ch;}
.v5 .tcommon b{color:var(--ink);font-weight:600;}
.v5 .revs{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(24px,3vw,52px);}
.v5 .rev{margin:0;display:flex;flex-direction:column;gap:16px;border-top:2px solid var(--ink);padding-top:18px;}
.v5 .rev__q{margin:0;font-family:var(--display);font-weight:600;font-size:clamp(20px,1.75vw,25px);line-height:1.16;letter-spacing:-.005em;text-wrap:pretty;}
.v5 .rev__a{margin-top:auto;display:flex;align-items:center;gap:12px;}
.v5 .rev__ph{width:44px;height:44px;border-radius:50% !important;overflow:hidden;flex:none;position:relative;background:repeating-linear-gradient(135deg,#E5DFD3 0 8px,#D6CEBE 8px 16px);display:flex;align-items:center;justify-content:center;font-family:var(--text);font-weight:600;font-size:16px;color:var(--ink-70);}
.v5 .rev__ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}
.v5 .rev__at{font-family:var(--mono);font-size:11.5px;letter-spacing:.05em;line-height:1.5;color:var(--ink-70);display:flex;flex-direction:column;gap:4px;min-width:0;}
.v5 .rev__at span{color:var(--ink-45);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.v5 .hrow{display:grid;grid-template-columns:1fr 1fr;gap:clamp(20px,4vw,64px);align-items:baseline;padding:clamp(22px,2.4vw,32px) 0;border-bottom:1px solid var(--line);}
.v5 .hrow__t{font-family:var(--display);font-weight:700;font-size:clamp(24px,2.4vw,34px);line-height:1.04;letter-spacing:-.01em;}
.v5 .hrow__d{color:var(--ink-70);max-width:44ch;font-size:16px;}
.v5 .faq-short{grid-column:2 / 12;}
.v5 .faq-short .tlink{display:inline !important;font:inherit;line-height:inherit;letter-spacing:inherit;color:var(--ink);vertical-align:baseline;padding:0;}
.v5 .faq-short .tlink .u,.v5 .faq-short .tlink{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;}
.v5 .faq{grid-column:2 / 12;border-top:1px solid var(--line);}
.v5 .acc{border-bottom:1px solid var(--line);}
.v5 .acc__btn{display:flex;align-items:center;justify-content:space-between;gap:22px;width:100%;text-align:left;padding:22px 2px;font-weight:500;font-size:17px;color:var(--ink);transition:color .12s;}
.v5 .acc__btn:hover{color:var(--accent);}
.v5 .acc__plus{font-family:var(--text);font-weight:400;font-size:26px;line-height:1;color:var(--accent);transition:transform .18s ease;flex:none;}
.v5 .acc.is-open .acc__plus{transform:rotate(45deg);}
.v5 .acc__panel{display:grid;grid-template-rows:0fr;transition:grid-template-rows .22s ease;}
.v5 .acc.is-open .acc__panel{grid-template-rows:1fr;}
.v5 .acc__panel>div{overflow:hidden;}
.v5 .acc__a{padding:0 48px 24px 2px;color:var(--ink-70);}
.v5 .final{margin-top:clamp(64px,8vw,116px);background:var(--dark);color:var(--paper);padding-block:clamp(76px,9vw,132px);}
.v5 .final__h{color:var(--paper);max-width:20ch;}
.v5 .final__h .accent{color:var(--accent-on-dark);}
.v5 .final__p{max-width:52ch;color:var(--dark-70);margin-top:26px;}
.v5 .final__cta{display:flex;align-items:center;gap:26px;flex-wrap:wrap;margin-top:38px;}
.v5 .final .tlink,.v5 .final .tlink:hover{color:var(--paper);}
.v5 .ft{background:var(--dark);color:var(--paper);border-top:1px solid #2E2820;}
.v5 .ft__in{display:flex;align-items:center;justify-content:space-between;gap:22px;min-height:92px;padding-block:22px;flex-wrap:wrap;}
.v5 .ft__logo{font-family:var(--display);font-weight:800;font-size:22px;color:var(--paper);}
.v5 .ft__meta{color:var(--dark-70);font-family:var(--mono);font-size:11px;letter-spacing:.08em;text-transform:uppercase;}
.v5 .ft__links{display:flex;gap:20px;}
.v5 .ft__links a{font-size:var(--fs-small);color:var(--paper);}
.v5 .ft__links a:hover{color:var(--accent-on-dark);}
@media (prefers-reduced-motion:no-preference){.v5.js .reveal{opacity:0;transform:translateY(14px);transition:opacity .6s cubic-bezier(.2,0,0,1),transform .6s cubic-bezier(.2,0,0,1);}.v5.js .reveal.in{opacity:1;transform:none;}}
@media (max-width:1000px){.v5 .story{grid-template-columns:1fr;}.v5 .how-mon{grid-template-columns:1fr;}}
@media (max-width:900px){.v5 .hero__grid{grid-template-columns:1fr;}.v5 .hero__preview{align-self:auto;min-height:0;height:auto;margin-bottom:26px;}.v5 .hero{padding-top:14px;min-height:0;}.v5 .hero__copy{gap:16px;}}
@media (max-width:720px){.v5 .hdr__links,.v5 .hdr__cta{display:none;}.v5 .hdr__cta-m{display:inline-flex;}.v5 .hdr__anchors{display:flex;gap:20px;overflow-x:auto;-webkit-overflow-scrolling:touch;padding:0 var(--pad) 11px;scrollbar-width:none;}.v5 .hdr__anchors::-webkit-scrollbar{display:none;}.v5 .hdr__anchors a{font-family:var(--mono);font-size:11.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink);white-space:nowrap;}.v5 .revs{grid-template-columns:1fr;}.v5 .shead__l .h2,.v5 .shead__note{max-width:none;}.v5 .steprow{grid-template-columns:clamp(64px,17vw,96px) 1fr;gap:14px 18px;}.v5 .steprow__t{font-size:clamp(24px,7vw,30px);}.v5 .hrow{grid-template-columns:1fr;gap:8px;}.v5 .faq-short,.v5 .faq{grid-column:1 / -1;}.v5 .tcards{grid-template-columns:1fr;}}
@media (prefers-reduced-motion:reduce){.v5 *,.v5 *::before,.v5 *::after{transition-duration:0ms !important;animation-duration:0ms !important;}}
`;

export function V5_Styles() {
  return <style data-samosite-canon-v5="0.12" dangerouslySetInnerHTML={{ __html: V5_CSS }} />;
}

// ── reveal-хук ──
function useReveal(): [React.RefObject<any>, string] {
  const ref = useRef<any>(null);
  const [inv, setInv] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce || !('IntersectionObserver' in window)) { setInv(true); return; }
    const io = new IntersectionObserver((es) => { es.forEach(e => { if (e.isIntersecting) { setInv(true); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    io.observe(el);
    const t = setTimeout(() => setInv(true), 1600);
    return () => { io.disconnect(); clearTimeout(t); };
  }, []);
  return [ref, 'reveal' + (inv ? ' in' : '')];
}
const useMedia = (limit: number) => {
  const [n, setN] = useState(typeof window !== 'undefined' && window.innerWidth < limit);
  useEffect(() => { const on = () => setN(window.innerWidth < limit); window.addEventListener('resize', on); return () => window.removeEventListener('resize', on); }, [limit]);
  return n;
};
const useCompact = () => useMedia(640);
const useNarrow = () => useMedia(900);

// ─────────────────────────────────────────────────────────────
// 03 · Примеры — 5 анатомий, реестр EXAMPLES, SiteViewer (controlled)
// ─────────────────────────────────────────────────────────────
const uns = (id: string, w?: number) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w || 900}&q=80`;

function Img({ id, w, label, ph, style, pos, src }: any) {
  const [err, setErr] = useState(false);
  const base: React.CSSProperties = { display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center' };
  if (err || (!id && !src)) {
    return (
      <div style={{ ...base, ...style, backgroundImage: `repeating-linear-gradient(135deg, ${ph[0]} 0 11px, ${ph[1]} 11px 22px)`, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
        <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.05em', textTransform: 'uppercase', color: ph[2], background: ph[3] || 'rgba(255,255,255,.6)', padding: '3px 7px' }}>{label}</span>
      </div>
    );
  }
  return <img src={src || uns(id, w)} alt={label} loading="lazy" onError={() => setErr(true)} style={{ ...base, ...style }} />;
}
function FakeCTA({ style, children }: any) {
  return <a href="#" onClick={(e) => e.preventDefault()} tabIndex={-1} aria-hidden="true" style={{ cursor: 'default', ...style }}>{children}</a>;
}
function Tail({ P, priceLabel, rows, quote, cta, compact }: any) {
  return (
    <div style={{ padding: compact ? '16px 20px 20px' : '18px 22px 22px', display: 'flex', flexDirection: 'column', gap: 15 }}>
      <div>
        <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.soft, marginBottom: 11 }}>{priceLabel}</div>
        {rows.map((r: any, i: number) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 12, padding: '9px 0', borderBottom: i < rows.length - 1 ? `1px solid ${P.line}` : 'none' }}>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 14, color: P.ink }}>{r[0]}</div>
              {r[2] && <div style={{ fontFamily: SANS, fontSize: 11.5, color: P.soft, marginTop: 2 }}>{r[2]}</div>}
            </div>
            <div style={{ fontFamily: MONO, fontSize: 12.5, color: P.ink, whiteSpace: 'nowrap' }}>{r[1]}</div>
          </div>
        ))}
      </div>
      {quote && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px', background: P.line, borderLeft: `3px solid ${P.accent}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span aria-label="5 из 5" style={{ color: '#C9922E', fontSize: 13, letterSpacing: '1.5px' }}>★★★★★</span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.06em', color: P.soft }}>5,0 · Яндекс</span>
          </div>
          <p style={{ margin: 0, fontFamily: P.serif, fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.34, color: P.ink }}>{quote[0]}</p>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.03em', color: P.soft }}>{quote[1]}</span>
        </div>
      )}
      <FakeCTA style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: P.btn || P.accent, color: P.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 14, padding: '13px 18px', textDecoration: 'none' }}>{cta} <span aria-hidden="true">→</span></FakeCTA>
    </div>
  );
}

const Pn = { bg: '#F7EFEC', ink: '#2A2320', soft: '#8A7C74', line: '#EEE1DC', accent: '#B0656F', btn: '#2A2320', onAccent: '#FAF4F1', serif: "'Cormorant', Georgia, serif" };
function NailHero() {
  const compact = useCompact();
  return (
    <div style={{ background: Pn.bg, color: Pn.ink }}>
      <div style={{ position: 'relative', height: (compact ? 300 : 520) }}>
        <Img src="img/nails.png" label="маникюр · макро" ph={['#E7C9C9', '#D9AEB2', '#7A3A44']} pos="center 45%" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,15,.62) 0%, rgba(20,16,15,0) 42%)' }} />
        <div style={{ position: 'absolute', top: 16, left: 18, fontFamily: MONO, fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', opacity: .92 }}>Студия Анны · Екатеринбург</div>
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 18 }}>
          <h3 style={{ margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontSize: 38, lineHeight: 1.0, letterSpacing: '-.01em', color: '#FBFBFC' }}>Аппаратный маникюр,<br /><span style={{ fontStyle: 'italic', color: '#F4C9C4' }}>держится 3 недели</span></h3>
        </div>
      </div>
      <Tail P={Pn} priceLabel="Цены за июль"
        rows={[['Маникюр + покрытие', '2 400 ₽', 'аппаратный, бережно · 1,5 ч'], ['Дизайн на 2 ногтя', '300 ₽', 'от простого до сложного'], ['Укрепление акригелем', '600 ₽', 'для тонких и ломких']]}
        quote={['«Анна спокойная, объясняет, что делает. Никогда не было сколов.»', 'Олеся Н. · Яндекс · 3 дня назад']}
        cta="Записаться в Telegram" />
    </div>
  );
}
const Pb = { bg: '#E7E2D6', ink: '#231C15', soft: '#6B5C48', line: '#D6CCB8', accent: '#8C4A22', btn: '#231C15', onAccent: '#F1EADC', serif: "'Oswald', sans-serif" };
function BarberPoster() {
  const compact = useCompact();
  return (
    <div style={{ background: Pb.bg, color: Pb.ink }}>
      <div style={{ padding: '26px 22px 20px' }}>
        <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: Pb.soft, marginBottom: 14 }}>Барбершоп «Фёдор» · Москва · с 2018</div>
        <h3 style={{ margin: 0, fontFamily: Pb.serif, fontWeight: 700, fontSize: 62, lineHeight: .9, letterSpacing: '.004em', textTransform: 'uppercase', color: Pb.ink }}>
          Стрижка<br /><span style={{ color: Pb.accent }}>+ борода</span><br />за 45 минут
        </h3>
        <p style={{ margin: '18px 0 0', fontFamily: SANS, fontSize: 13, lineHeight: 1.5, color: Pb.soft, maxWidth: '34ch' }}>Только мужские стрижки. Виски бесплатно, если зайдёте после стрижки</p>
      </div>
      <div style={{ height: (compact ? 120 : 150), borderTop: `1px solid ${Pb.line}`, borderBottom: `1px solid ${Pb.line}` }}>
        <Img id="photo-1503951914875-452162b0f3f1" w={900} label="кресло, суббота" ph={['#3A2A1E', '#2A1E14', '#D8C4A8', 'rgba(0,0,0,.4)']} pos="center 20%" />
      </div>
      <Tail P={Pb} priceLabel="Прайс" compact
        rows={[['Мужская стрижка', '2 200 ₽', 'машинка + ножницы'], ['Стрижка + борода', '3 000 ₽', 'с горячим полотенцем'], ['Опасной бритвой', '1 800 ₽', 'голова или борода']]}
        quote={['«Хожу к Глебу третий год. Всегда вспоминает, как стригли в прошлый раз.»', 'Антон К. · Яндекс.Карты · 4 дня назад']}
        cta="Записаться к мастеру" />
    </div>
  );
}
const Ps = { bg: '#FFFFFF', ink: '#1A1D1C', soft: '#727975', line: '#ECECEA', accent: '#2F7A68', btn: '#1A1D1C', onAccent: '#FFFFFF', serif: "'Spectral', Georgia, serif" };
function SkinBeforeAfter() {
  const compact = useCompact();
  const Half = ({ id, tag, ph, pos }: any) => (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}><Img id={id} w={520} label={tag} ph={ph} pos={pos} /></div>
  );
  return (
    <div style={{ background: Ps.bg, color: Ps.ink }}>
      <div style={{ padding: '22px 22px 16px' }}>
        <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: Ps.accent, marginBottom: 11 }}>Кабинет Юлии · косметолог</div>
        <h3 style={{ margin: 0, fontFamily: Ps.serif, fontWeight: 600, fontSize: 28, lineHeight: 1.08, color: Ps.ink }}>Сначала смотрим кожу, <span style={{ fontStyle: 'italic', color: Ps.accent }}>потом выбираем уход</span></h3>
      </div>
      <div style={{ display: 'flex', gap: 3, height: (compact ? 168 : 240), padding: '0 22px' }}>
        <Half id="photo-1570172619644-dfd03ed5d881" tag="чистка" ph={['#D8C9BE', '#C9B6A8', '#4A3C32']} pos="center 30%" />
        <Half id="photo-1616394584738-fc6e612e71b9" tag="уход" ph={['#E7E7E5', '#D6D6D3', '#3A3E3C']} pos="center 30%" />
      </div>
      <Tail P={Ps} priceLabel="Прайс"
        rows={[['Комбинированная чистка', '3 200 ₽', 'с уходом по типу кожи · 1,5 ч'], ['Пилинг по показаниям', 'от 2 400 ₽', 'подбираем после диагностики'], ['Первичная диагностика', 'бесплатно', 'разбор кожи и план']]}
        quote={['«Не впаривает лишнего. Сказала, что хватит трёх чисток, а не курса из десяти.»', 'Ольга В. · 2ГИС · 1 неделю назад']}
        cta="Записаться на диагностику" />
    </div>
  );
}
const Pr = { bg: '#EFE7DA', ink: '#241E17', soft: '#6E6053', line: '#DBD0BE', accent: '#7A5A3C', btn: '#241E17', onAccent: '#F5EFE4', serif: "'Playfair Display', Georgia, serif" };
function BrowMinimal() {
  const compact = useCompact();
  return (
    <div style={{ background: Pr.bg, color: Pr.ink }}>
      <div style={{ padding: '46px 30px 30px', textAlign: 'center' }}>
        <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.2em', textTransform: 'uppercase', color: Pr.soft }}>Brow Bar Соль · Сочи</div>
        <h3 style={{ margin: '22px auto 0', fontFamily: Pr.serif, fontWeight: 600, fontSize: 34, lineHeight: 1.06, color: Pr.ink, maxWidth: '15ch' }}>Брови по вашей <span style={{ fontStyle: 'italic' }}>форме лица</span></h3>
      </div>
      <div style={{ height: (compact ? 188 : 250), margin: '0 30px' }}>
        <Img id="photo-1616683693504-3ea7e9ad6fec" w={720} label="брови крупно" ph={['#DED3C0', '#CFC1A8', '#3A3128']} pos="center 30%" />
      </div>
      <div style={{ padding: '30px 30px 34px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 34, fontFamily: SANS, fontSize: 13.5 }}>
          <div><div style={{ fontWeight: 600 }}>Коррекция + цвет</div><div style={{ fontFamily: MONO, fontSize: 12.5, color: Pr.soft, marginTop: 3 }}>1 400 ₽</div></div>
          <div><div style={{ fontWeight: 600 }}>Ламинирование</div><div style={{ fontFamily: MONO, fontSize: 12.5, color: Pr.soft, marginTop: 3 }}>2 200 ₽</div></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7, padding: '16px 18px', background: Pr.line }}>
          <span aria-label="5 из 5" style={{ color: '#C9922E', fontSize: 13, letterSpacing: '2px' }}>★★★★★</span>
          <p style={{ margin: 0, fontFamily: Pr.serif, fontStyle: 'italic', fontSize: 16.5, lineHeight: 1.34, color: Pr.ink, maxWidth: '24ch' }}>«Форму подобрали идеально, лицо будто открылось»</p>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.03em', color: Pr.soft }}>Марина В. · 5,0 · Яндекс</span>
        </div>
        <FakeCTA style={{ alignSelf: 'center', fontFamily: SANS, fontWeight: 600, fontSize: 14, color: Pr.ink, textDecoration: 'underline', textUnderlineOffset: 4, textDecorationColor: Pr.accent, textDecorationThickness: '1.5px' }}>Записаться онлайн →</FakeCTA>
      </div>
    </div>
  );
}
const Pc = { bg: '#F6F0F3', ink: '#221A24', soft: '#6E6472', line: '#E7DBE4', accent: '#9C2A8E', btn: '#221A24', onAccent: '#F9F0F6', serif: "'Cormorant', Georgia, serif" };
function ColoristMenu() {
  const items = [
    ['01', 'Сложное окрашивание', 'airtouch, балаяж · от 3 ч', 'от 6 500 ₽'],
    ['02', 'Тонирование', 'освежить цвет · 1,5 ч', '3 200 ₽'],
    ['03', 'Окрашивание в один тон', 'корни или полностью', 'от 3 800 ₽'],
    ['04', 'Ботокс для волос', 'восстановление после осветления', '4 500 ₽'],
    ['05', 'Уход за цветом', 'домашняя схема в подарок', '1 500 ₽'],
  ];
  return (
    <div style={{ background: Pc.bg, color: Pc.ink }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 14, padding: '22px 22px 16px', borderBottom: `1px solid ${Pc.line}` }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: Pc.accent, marginBottom: 9 }}>Колорист Кира · Москва</div>
          <h3 style={{ margin: 0, fontFamily: Pc.serif, fontWeight: 600, fontSize: 30, lineHeight: 1.02, color: Pc.ink }}>Прайс <span style={{ fontStyle: 'italic', color: Pc.accent }}>без звёздочек</span></h3>
        </div>
        <div style={{ width: 74, height: 74, flex: '0 0 auto', overflow: 'hidden' }}>
          <Img id="photo-1580618672591-eb180b1a973f" w={200} label="цвет" ph={['#E7D9E2', '#D6C0CF', '#5A3A50']} pos="center 30%" />
        </div>
      </div>
      <div style={{ padding: '6px 22px 4px' }}>
        {items.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '13px 0', borderBottom: i < items.length - 1 ? `1px solid ${Pc.line}` : 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: 11, color: Pc.soft, flex: '0 0 auto' }}>{r[0]}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 15, color: Pc.ink }}>{r[1]}</div>
              <div style={{ fontFamily: SANS, fontSize: 11.5, color: Pc.soft, marginTop: 2 }}>{r[2]}</div>
            </div>
            <span style={{ fontFamily: MONO, fontSize: 13, color: Pc.ink, whiteSpace: 'nowrap' }}>{r[3]}</span>
          </div>
        ))}
      </div>
      <div style={{ padding: '16px 22px 22px' }}>
        <FakeCTA style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: Pc.btn, color: Pc.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 14, padding: '13px 18px', textDecoration: 'none' }}>Записаться к колористу <span aria-hidden="true">→</span></FakeCTA>
      </div>
    </div>
  );
}

export interface ExampleEntry { id: string; niche: string; anatomy: string; domain: string; Comp: React.ComponentType; note: string; palette: string[]; }
export const EXAMPLES: ExampleEntry[] = [
  { id: 'nails',    niche: 'Маникюр',         anatomy: 'фото-герой',       domain: 'anna-nails',   Comp: NailHero,        note: 'Мягкий нюд с фото стал цветом сайта — тёплый и спокойный.', palette: ['#F7EFEC', '#B0656F', '#2A2320'] },
  { id: 'barber',   niche: 'Барбершоп',       anatomy: 'заголовок-плакат', domain: 'fedor-barber', Comp: BarberPoster,    note: 'У Фёдора одно фото, поэтому сайт держится на крупных буквах.', palette: ['#E7E2D6', '#8C4A22', '#231C15'] },
  { id: 'skin',     niche: 'Косметолог',      anatomy: 'до-после',         domain: 'yulia-skin',   Comp: SkinBeforeAfter, note: 'Два кадра работ Юлии в первом экране — без стоковых картинок.', palette: ['#FFFFFF', '#2F7A68', '#1A1D1C'] },
  { id: 'brows',    niche: 'Брови и ресницы', anatomy: 'минимал',          domain: 'sol-brows',    Comp: BrowMinimal,     note: 'В прайсе две услуги. Сайт вышел коротким: один кадр и много пустого места.', palette: ['#EFE7DA', '#7A5A3C', '#241E17'] },
  { id: 'colorist', niche: 'Колорист',        anatomy: 'прайс-меню',       domain: 'kira-color',   Comp: ColoristMenu,    note: 'Пять услуг с ценами. Прайс стал главным блоком, сайт читается как меню.', palette: ['#F6F0F3', '#9C2A8E', '#221A24'] },
];
const ROWS = [{ ratio: [7, 5], side: 'left' }, { ratio: [6, 6], side: 'right' }, { ratio: [7, 5], side: 'left' }, { ratio: [6, 6], side: 'right' }, { ratio: [7, 5], side: 'left' }];

function SitePreview({ children, stretch, decorative }: any) {
  return <div aria-hidden={decorative ? 'true' : undefined} style={{ border: `1px solid ${INK}`, overflow: 'hidden', background: '#fff', height: stretch ? '100%' : 'auto' }}>{children}</div>;
}
function PreviewWithCTA({ children, stretch, onView, label }: any) {
  const narrow = useNarrow();
  const [hover, setHover] = useState(false);
  const show = narrow || hover;
  const btn: React.CSSProperties = narrow
    ? { position: 'absolute', top: 0, left: 0, right: 0, justifyContent: 'center', padding: '11px 14px', background: 'rgba(27,23,18,.9)', color: '#F2EEE6' }
    : { position: 'absolute', top: '50%', left: '50%', transform: `translate(-50%,-50%) scale(${hover ? 1 : .96})`, padding: '13px 22px', background: '#1B1712', color: '#F2EEE6' };
  return (
    <div onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{ position: 'relative', height: stretch ? '100%' : 'auto' }}>
      <SitePreview stretch={stretch} decorative>{children}</SitePreview>
      {!narrow && <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,23,18,.28)', opacity: hover ? 1 : 0, transition: 'opacity .18s ease', pointerEvents: 'none' }} />}
      <button type="button" onClick={onView} aria-label={label ? `Посмотреть сайт — ${label}` : 'Посмотреть сайт'}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 8, font: 'inherit', fontWeight: 700, fontSize: 14, cursor: 'pointer', border: 'none', whiteSpace: 'nowrap', opacity: show ? 1 : 0, transition: 'opacity .18s ease, transform .18s ease', pointerEvents: show ? 'auto' : 'none', ...btn }}>
        Посмотреть сайт <span aria-hidden="true">→</span>
      </button>
    </div>
  );
}

export interface V5_SiteViewerProps { data: ExampleEntry; onClose: () => void; onClaim?: IntakeCb; }
export function V5_SiteViewer({ data, onClose, onClaim }: V5_SiteViewerProps) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('is-locked');
    if (closeRef.current) closeRef.current.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('is-locked'); document.removeEventListener('keydown', onKey); if (opener && opener.focus) opener.focus(); };
  }, []);
  const trapTab = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !panelRef.current) return;
    const f = panelRef.current.querySelectorAll('button');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); (last as HTMLElement).focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); (first as HTMLElement).focus(); }
  };
  const build = () => { onClose(); if (onClaim) onClaim('example-' + data.id, data.niche); };
  const Comp = data.Comp;
  return (
    <div role="dialog" aria-modal="true" aria-label={`Пример сайта — ${data.niche}`} onKeyDown={trapTab} style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', justifyContent: 'center' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(27,23,18,.7)', cursor: 'pointer' }} />
      <div ref={panelRef} style={{ position: 'relative', width: 'min(480px,100%)', height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', borderInline: `1px solid ${INK}` }}>
        <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 10px 10px 18px', background: BONE, borderBottom: `1px solid ${INK}` }}>
          <span style={{ flex: 1, minWidth: 0, fontFamily: MONO, fontSize: 11.5, letterSpacing: '.04em', color: INK70, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ color: ACCENT }}>▸</span> {data.domain}.samosite.online</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Закрыть просмотр" style={{ width: 44, height: 44, flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: `1px solid ${LINE2}`, color: INK, fontSize: 20, lineHeight: 1, cursor: 'pointer' }}>×</button>
        </div>
        <div style={{ flex: '1 1 auto', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}><Comp /></div>
        <div style={{ flex: '0 0 auto', padding: '14px 18px', background: BONE, borderTop: `1px solid ${INK}`, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <button type="button" onClick={build} data-entry={'example-' + data.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, width: '100%', minHeight: 52, padding: '13px 20px', background: ACCENT, color: VT.onAccent, border: 'none', font: 'inherit', fontFamily: SANS, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
            Собрать такой же за 2 часа <span aria-hidden="true">→</span>
          </button>
          <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.04em', color: INK70, textAlign: 'center' }}>{data.niche} · собран из профиля мастера</span>
        </div>
      </div>
    </div>
  );
}

function Swatches({ palette }: { palette: string[] }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      {palette.map((c, i) => <span key={i} title={c} style={{ width: 28, height: 28, borderRadius: '50%', background: c, border: `1px solid ${LINE2}`, flex: '0 0 auto' }} />)}
      <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.04em', color: INK45, marginLeft: 2 }}>палитра из фото</span>
    </div>
  );
}
function Meta({ data }: { data: ExampleEntry }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, alignSelf: 'start', position: 'sticky', top: 96 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: VT.font.display, fontWeight: 700, fontSize: 34, lineHeight: 1, letterSpacing: '-.01em', color: INK }}>{data.niche}</span>
      </div>
      <p style={{ margin: 0, fontFamily: SANS, fontSize: 15.5, lineHeight: 1.5, color: INK70, maxWidth: '34ch', textWrap: 'pretty' }}>{data.note}</p>
      <Swatches palette={data.palette} />
    </div>
  );
}
function ExampleRowC({ data, row, onView, idx }: any) {
  const narrow = useNarrow();
  const Comp = data.Comp;
  const preview = <PreviewWithCTA onView={() => onView(data)} label={data.niche}><Comp /></PreviewWithCTA>;
  const meta = <Meta data={data} />;
  if (narrow) return <div data-example-idx={idx} style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>{meta}{preview}</div>;
  const [a, b] = row.ratio;
  const previewFirst = row.side === 'left';
  return (
    <div data-example-idx={idx} style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 'clamp(24px,3vw,52px)', alignItems: 'start' }}>
      {previewFirst
        ? (<><div style={{ gridColumn: `span ${a}` }}>{preview}</div><div style={{ gridColumn: `span ${b}` }}>{meta}</div></>)
        : (<><div style={{ gridColumn: `span ${b}` }}>{meta}</div><div style={{ gridColumn: `span ${a}` }}>{preview}</div></>)}
    </div>
  );
}
function CarouselCard({ data, onView }: any) {
  const Comp = data.Comp;
  return (
    <div style={{ flex: '0 0 auto', width: 'clamp(300px,80vw,376px)', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
        <span style={{ fontFamily: VT.font.display, fontWeight: 700, fontSize: 26, lineHeight: 1, letterSpacing: '-.01em', color: INK }}>{data.niche}</span>
        <p style={{ margin: 0, fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: INK70, textWrap: 'pretty', minHeight: '3em' }}>{data.note}</p>
        <Swatches palette={data.palette} />
      </div>
      <PreviewWithCTA onView={() => onView(data)} label={data.niche}><Comp /></PreviewWithCTA>
    </div>
  );
}
function CarouselExamples({ items, onView }: any) {
  const scroller = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [pos, setPos] = useState(1);
  const cardStep = () => { const el = scroller.current; if (!el) return 0; const card = el.querySelector('[data-card]'); return card ? (card as HTMLElement).getBoundingClientRect().width + 24 : el.clientWidth * 0.8; };
  const onScroll = () => { const el = scroller.current; if (!el) return; setAtStart(el.scrollLeft <= 4); setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4); const step = cardStep(); if (step) setPos(Math.min(items.length, Math.max(1, Math.round(el.scrollLeft / step) + 1))); };
  useEffect(() => { onScroll(); window.addEventListener('resize', onScroll); return () => window.removeEventListener('resize', onScroll); }, [items.length]);
  const nudge = (dir: number) => { const el = scroller.current; if (el) el.scrollBy({ left: dir * cardStep(), behavior: 'smooth' }); };
  const onKey = (e: React.KeyboardEvent) => { if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1); } else if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1); } };
  const Arrow = ({ dir, disabled }: any) => (
    <button type="button" aria-label={dir < 0 ? 'Назад' : 'Вперёд'} onClick={() => nudge(dir)} disabled={disabled} style={{ width: 46, height: 46, flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: disabled ? 'transparent' : '#fff', border: `1px solid ${disabled ? LINE : INK}`, color: disabled ? LINE2 : INK, cursor: disabled ? 'default' : 'pointer', fontSize: 20, lineHeight: 1, transition: 'background .15s, border-color .15s, color .15s' }}>{dir < 0 ? '←' : '→'}</button>
  );
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 16, marginBottom: 20 }}>
        <span aria-live="polite" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: '.1em', color: INK70 }}>{pos} / {items.length}</span>
        <div style={{ display: 'flex', gap: 10 }}><Arrow dir={-1} disabled={atStart} /><Arrow dir={1} disabled={atEnd} /></div>
      </div>
      <div ref={scroller} onScroll={onScroll} tabIndex={0} role="region" aria-label={`Примеры сайтов, ${items.length} карточек — прокрутка стрелками`} onKeyDown={onKey}
        style={{ display: 'flex', gap: 24, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 14, margin: '0 calc(-1*var(--pad))', paddingInline: 'var(--pad)', scrollPaddingInline: 'var(--pad)', WebkitOverflowScrolling: 'touch' } as React.CSSProperties}>
        {items.map((e: ExampleEntry, i: number) => <div data-card data-example-idx={i} key={e.id} id={'ex-' + e.id} style={{ display: 'flex' }}><CarouselCard data={e} onView={onView} /></div>)}
      </div>
    </div>
  );
}

export interface V5_ExamplesProps { layout?: 'carousel' | 'zigzag'; onIntake?: IntakeCb; }
export function V5_Examples({ layout = 'carousel', onIntake = noop }: V5_ExamplesProps) {
  const [viewer, setViewer] = useState<ExampleEntry | null>(null);
  const onView = (data: ExampleEntry) => setViewer(data);
  return (
    <section className="section" id="examples" aria-labelledby="ex-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="ex-h">Пять сайтов, собранных из&nbsp;профилей мастеров</h2></div></div>
        <div id="examples-root" data-layout={layout} aria-label="Примеры сгенерированных сайтов" style={{ minHeight: 600 }}>
          {layout === 'carousel'
            ? <CarouselExamples items={EXAMPLES} onView={onView} />
            : <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(56px,7vw,104px)' }}>{EXAMPLES.map((e, i) => <div key={e.id} id={'ex-' + e.id}><ExampleRowC data={e} row={ROWS[i]} onView={onView} idx={i} /></div>)}</div>}
        </div>
        <p className="lead" style={{ marginTop: 'clamp(40px,4vw,64px)', maxWidth: '74ch' }}>Палитру и&nbsp;шрифт Самосайт берёт из&nbsp;ваших фото. Если стиль не&nbsp;понравится, поменяете в&nbsp;один клик.</p>
        {viewer && <V5_SiteViewer data={viewer} onClose={() => setViewer(null)} onClaim={onIntake} />}
      </div>
    </section>
  );
}

export function V5_HeroSite() {
  const compact = useCompact();
  const rows = [['Маникюр + покрытие', '2 400 ₽'], ['Дизайн на 2 ногтя', '300 ₽'], ['Укрепление акригелем', '600 ₽'], ['Снятие чужого покрытия', '400 ₽']];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: (compact ? 'auto' : '100%'), minHeight: 0, background: Pn.bg, color: Pn.ink }}>
      <div style={{ flex: '0 0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, padding: '12px 16px', borderBottom: `1px solid ${Pn.line}` }}>
        <span style={{ fontFamily: Pn.serif, fontWeight: 600, fontSize: 18, color: Pn.ink }}>Студия Анны</span>
        <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: '.12em', textTransform: 'uppercase', color: Pn.soft }}>Екатеринбург · маникюр</span>
      </div>
      <div style={{ position: 'relative', flex: (compact ? '0 0 auto' : '1 1 auto'), height: (compact ? 300 : 'auto'), minHeight: 0 }}>
        <Img src="img/nails.png" label="маникюр · макро" ph={['#E7C9C9', '#D9AEB2', '#7A3A44']} style={{ objectPosition: 'center 28%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,15,.66) 0%, rgba(20,16,15,0) 50%)' }} />
        <h3 style={{ position: 'absolute', left: 16, right: 16, bottom: 14, margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontSize: 25, lineHeight: 1.0, letterSpacing: '-.01em', color: '#FBFBFC' }}>Аппаратный маникюр, <span style={{ fontStyle: 'italic', color: '#F4C9C4' }}>держится 3 недели</span></h3>
      </div>
      <div style={{ flex: '0 0 auto', padding: '11px 16px 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, paddingBottom: i < rows.length - 1 ? 8 : 0, borderBottom: i < rows.length - 1 ? `1px solid ${Pn.line}` : 'none' }}>
            <span style={{ fontFamily: SANS, fontWeight: 600, fontSize: 13.5, color: Pn.ink }}>{r[0]}</span>
            <span style={{ fontFamily: MONO, fontSize: 12, color: Pn.ink, whiteSpace: 'nowrap' }}>{r[1]}</span>
          </div>
        ))}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 14px', background: '#F0E3DE', borderLeft: `3px solid ${Pn.accent}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span aria-label="5 из 5" style={{ color: '#C9922E', fontSize: 13, letterSpacing: '1.5px' }}>★★★★★</span>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.06em', color: Pn.soft }}>5,0 · Яндекс</span>
          </div>
          <p style={{ margin: 0, fontFamily: Pn.serif, fontWeight: 600, fontStyle: 'italic', fontSize: 17.5, lineHeight: 1.3, color: Pn.ink }}>«Никогда не было сколов, держится ровно три недели»</p>
          <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.03em', color: Pn.soft }}>Олеся Н. · 3 дня назад</span>
        </div>
        <FakeCTA style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: Pn.btn, color: Pn.onAccent, fontFamily: SANS, fontWeight: 700, fontSize: 13.5, padding: '11px 16px', textDecoration: 'none', marginTop: 2 }}>Записаться в Telegram <span aria-hidden="true">→</span></FakeCTA>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Секции
// ─────────────────────────────────────────────────────────────
export interface V5_Anchor { href: string; label: string; }
export const DEFAULT_ANCHORS: V5_Anchor[] = [
  { href: '#examples', label: 'Примеры' }, { href: '#how', label: 'Как работает' },
  { href: '#reviews', label: 'Отзывы' }, { href: '#tariffs', label: 'Тарифы' }, { href: '#faq', label: 'Вопросы' },
];

export interface V5_HeaderProps { anchors?: V5_Anchor[]; onIntake?: IntakeCb; }
export function V5_Header({ anchors = DEFAULT_ANCHORS, onIntake = noop }: V5_HeaderProps) {
  return (
    <header className="hdr">
      <div className="wrap hdr__in">
        <a className="logo" href="#top">Само<b>сайт</b></a>
        <nav className="hdr__nav" aria-label="Основная навигация">
          <div className="hdr__links">{anchors.map(a => <a key={a.href} href={a.href}>{a.label}</a>)}</div>
          <button className="btn btn--44 hdr__cta" type="button" data-entry="header" onClick={() => onIntake('header')}>Собрать за 2 часа</button>
          <button className="btn btn--44 hdr__cta-m" type="button" data-entry="header" onClick={() => onIntake('header')}>Собрать сайт</button>
        </nav>
      </div>
      <nav className="hdr__anchors" aria-label="Разделы страницы">{anchors.map(a => <a key={a.href} href={a.href}>{a.label}</a>)}</nav>
    </header>
  );
}

export interface V5_HeroProps { onIntake?: IntakeCb; }
export function V5_Hero({ onIntake = noop }: V5_HeroProps) {
  const [copyRef, copyCls] = useReveal();
  const [prevRef, prevCls] = useReveal();
  return (
    <section className="hero" id="top" aria-label="Оффер">
      <div className="hero__grid wrap">
        <div ref={copyRef} className={'hero__copy ' + copyCls}>
          <h1 className="hero-h">Сайт для бьюти-мастера <span className="accent">за&nbsp;2&nbsp;часа</span></h1>
          {/* [vitrina] copy patch (founder, июль 2026): лид-абзац переписан под
              SEO-сниппет бьюти-кластера — Яндекс берёт его как description.
              Отправлено Claude Design для синка исходника. */}
          <p className="lead hero__lead">Назовите город: Самосайт найдёт вашу карточку в&nbsp;2ГИС или на&nbsp;Яндекс&nbsp;Картах, заберёт оттуда услуги, цены, отзывы и&nbsp;фото работ и&nbsp;соберёт из&nbsp;них сайт бьюти-мастера.</p>
          <div className="hero__cta">
            <button className="btn btn--56" type="button" data-entry="hero" onClick={() => onIntake('hero')}>Собрать сайт за 2 часа <span className="arw">→</span></button>
            <a className="hero__examples" href="#examples"><span>Посмотреть примеры</span> <span className="arw" aria-hidden="true">→</span></a>
          </div>
          <p className="hero__proof">Старт: <b>0&nbsp;₽</b> навсегда · платные <b>от&nbsp;690&nbsp;₽/мес</b>, первый месяц бесплатно без&nbsp;карты</p>
        </div>
        <figure ref={prevRef} className={'hero__preview ' + prevCls} aria-label="Пример сайта, собранного Самосайтом">
          <div id="hero-preview-root"><SitePreview stretch decorative><V5_HeroSite /></SitePreview></div>
        </figure>
      </div>
    </section>
  );
}

export interface V5_StoryProps { onIntake?: IntakeCb; }
export function V5_Story({ onIntake = noop }: V5_StoryProps) {
  const [ref, cls] = useReveal();
  return (
    <section className="section" id="story" data-metric="story_view" aria-labelledby="story-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="story-h">Запись в&nbsp;Dikidi, фото в&nbsp;2ГИС, отзывы на&nbsp;Картах. Вместе нигде</h2></div></div>
        <div className="story">
          <div ref={ref} className={'story__lead ' + cls}>
            <p className="lead">Самосайт соберёт всё в&nbsp;одно место. Хватит профиля в&nbsp;2ГИС или на&nbsp;Яндекс&nbsp;Картах, фото работ, снимка прайса. Запись остаётся у&nbsp;вас: кнопка «Записаться» поведёт в&nbsp;ваш Dikidi или YClients.</p>
            <div className="src" aria-label="Источники, из которых собирается витрина">
              <span className="src__i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" /><circle cx="12" cy="10" r="2.6" /></svg>Я.Карты</span>
              <span className="src__i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 4 3 6.2v14L9 18l6 2.2 6-2.2v-14L15 6.2 9 4z" /><path d="M9 4v14M15 6.2v14" /></svg>2ГИС</span>
              <span className="src__i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3 2 11l6 2.3L11 20l3-4.6L20 20z" /><path d="m8 13.3 9-6.8-6 8" /></svg>Telegram</span>
              <span className="src__i"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4.5" width="18" height="15" rx="0" /><circle cx="8.5" cy="10" r="1.8" /><path d="m21 16-5-5-8 8" /></svg>фото</span>
            </div>
            <a className="tlink" href="#start" data-entry="story" onClick={(e) => { e.preventDefault(); onIntake('story'); }} style={{ marginTop: 26 }}><span className="u">Собрать сайт из профиля</span> <span className="arw">→</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

const STEPS: [string, string, string, React.ReactNode][] = [
  ['01', 'Показываете профиль', '2 минуты.', <>Яндекс Карты, 2ГИС, Telegram или папка с&nbsp;фото. Самосайт заберёт услуги, цены, отзывы и&nbsp;фото.</>],
  ['02', 'Смотрите готовый сайт', 'Через 2 часа.', <>Тексты пишет сам, палитру и&nbsp;шрифт берёт из&nbsp;ваших фото. Вы говорите «ок» — сайт выходит на&nbsp;адресе вида anna-nails.samosite.online</>],
  ['03', 'Обновляется сам', 'Раз в неделю.', <>Самосайт отбирает лучшие отзывы и&nbsp;выводит их&nbsp;на&nbsp;сайт, а&nbsp;если в&nbsp;профиле обновились услуги или цены — обновляет их&nbsp;у&nbsp;вас.</>],
  ['04', 'Присылает идеи роста', 'По понедельникам в 9:00.', <>До&nbsp;трёх идей; каждая опирается на&nbsp;ваши цифры и&nbsp;предлагает одно действие. Применяется в&nbsp;один клик.</>],
];
function StepRow({ n, t, when, d }: any) {
  const [ref, cls] = useReveal();
  return (
    <div ref={ref} className={'steprow ' + cls}>
      <span className="steprow__n">{n}</span>
      <div className="steprow__c"><div className="steprow__head"><h3 className="steprow__t">{t}</h3></div><p className="steprow__d"><b className="steprow__when">{when}</b> {d}</p></div>
    </div>
  );
}
export function V5_HowItWorks() {
  const [monRef, monCls] = useReveal();
  return (
    <section className="section" id="how" aria-labelledby="how-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="how-h">Собрали за&nbsp;2 часа — дальше сайт развивает себя сам</h2></div><p className="small shead__note">Четыре шага. Вы участвуете только в&nbsp;первом</p></div>
        <div className="steps">{STEPS.map(s => <StepRow key={s[0]} n={s[0]} t={s[1]} when={s[2]} d={s[3]} />)}</div>
        <div ref={monRef} className={'how-mon ' + monCls}>
          <div className="how-mon__head">
            <span className="label" style={{ color: 'var(--accent)' }}>Пример · по понедельникам в 9:00</span>
            <h3 className="how-mon__h">Так выглядит письмо в&nbsp;понедельник</h3>
            <p className="small">Ничего не&nbsp;меняется, пока вы не&nbsp;нажмёте «Применить». Приходит в&nbsp;Telegram, MAX, на&nbsp;почту или SMS.</p>
          </div>
          <div className="msg">
            <div className="msg__head"><span className="label">Пн 09:00 · Идея</span><span className="tag2">1 / 3</span></div>
            <p className="msg__t">«Дизайн ногтей» смотрят, но не записываются</p>
            <p className="msg__d">У услуги нет цены и фото. Добавить 3–4 фото и цену «от 300&nbsp;₽»?</p>
            <div className="msg__act" aria-hidden="true"><span className="btn btn--44" style={{ cursor: 'default' }}>Применить</span><span className="tlink glink"><span className="u">Свой вариант</span></span><span className="tlink glink"><span className="u">Не надо</span></span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS: { q: React.ReactNode; ini: string; img: string; who: string; site: string }[] = [
  { q: <>«Раньше отправляла прайс скриншотом в&nbsp;директ. Теперь кидаю ссылку — человек сам всё видит и&nbsp;записывается»</>, ini: 'А', img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=96&q=80', who: 'Анна · маникюр · Екатеринбург', site: 'anna-nails.samosite.online' },
  { q: <>«Сайт собрался из&nbsp;моего 2ГИС, пока я стриг клиента. Поменял одно фото и&nbsp;нажал «ок»»</>, ini: 'Ф', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=96&q=80', who: 'Фёдор · барбершоп · Москва', site: 'fedor-barber.samosite.online' },
  { q: <>«Понедельничные идеи — как администратор, которого у&nbsp;меня нет. Одно дело в&nbsp;неделю — сделала и&nbsp;забыла»</>, ini: 'Ю', img: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=96&q=80', who: 'Юлия · косметолог · Казань', site: 'yulia-skin.samosite.online' },
];
function ReviewCard({ q, ini, img, who, site }: any) {
  const [ref, cls] = useReveal();
  return (
    <figure ref={ref} className={'rev ' + cls}>
      <blockquote className="rev__q">{q}</blockquote>
      <figcaption className="rev__a">
        <span className="rev__ph" aria-hidden="true"><b>{ini}</b><img src={img} alt="" loading="lazy" onError={(e) => (e.target as HTMLElement).remove()} /></span>
        <span className="rev__at">{who}<span>{site}</span></span>
      </figcaption>
    </figure>
  );
}
export function V5_Reviews() {
  return (
    <section className="section" id="reviews" data-metric="reviews_view" aria-labelledby="rev-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="rev-h">Мастера о&nbsp;Самосайте</h2></div></div>
        <div className="revs">{REVIEWS.map((r, i) => <ReviewCard key={i} {...r} />)}</div>
      </div>
    </section>
  );
}

interface Tier { entry: string; name: string; tag: string | null; sub: React.ReactNode; price: React.ReactNode; hi: boolean; cta: string; secondary: boolean; rows: [string, string, boolean][]; }
const TIERS: Tier[] = [
  { entry: 'pricing-start', name: 'Старт', tag: null, sub: <>Бесплатно навсегда</>, price: <>0&nbsp;₽</>, hi: false, cta: 'Начать бесплатно', secondary: true, rows: [['Сайтов в аккаунте', '1', false], ['Страниц на сайте', '1', false], ['Свой домен', 'нет', true], ['Идей по понедельникам', 'нет', true], ['Поддержка', 'обычная', false]] },
  { entry: 'pricing-lichny', name: 'Личный', tag: 'популярный', sub: <>Первый месяц бесплатно, карта не&nbsp;нужна</>, price: <>690&nbsp;₽<span>/мес</span></>, hi: true, cta: 'Попробовать бесплатно', secondary: false, rows: [['Сайтов в аккаунте', '1', false], ['Страниц на сайте', 'до 5', false], ['Свой домен', 'да', false], ['Идей по понедельникам', 'до 3', false], ['Поддержка', 'обычная', false]] },
  { entry: 'pricing-biznes', name: 'Бизнес', tag: null, sub: <>Для студий с&nbsp;несколькими мастерами</>, price: <>1 490&nbsp;₽<span>/мес</span></>, hi: false, cta: 'Попробовать бесплатно', secondary: true, rows: [['Сайтов в аккаунте', '3', false], ['Страниц на сайте', 'до 15', false], ['Свой домен', 'да', false], ['Идей по понедельникам', 'до 10', false], ['Поддержка', 'приоритетная', false]] },
];
export interface V5_PricingProps { onIntake?: IntakeCb; }
export function V5_Pricing({ onIntake = noop }: V5_PricingProps) {
  return (
    <section className="section" id="tariffs" data-metric="pricing_view" aria-labelledby="tf-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="tf-h">Окупится с&nbsp;1 заказа</h2></div><p className="small shead__note">Средний чек маникюра — около 2&nbsp;400&nbsp;₽: один клиент с&nbsp;сайта окупает «Личный» на&nbsp;три месяца вперёд. Со&nbsp;«Старта» можно перейти на&nbsp;платный: сайт и&nbsp;данные останутся</p></div>
        <div className="tcards" aria-label="Тарифы">
          {TIERS.map(t => (
            <div key={t.entry} className={'tcard' + (t.hi ? ' tcard--hi' : '')} data-pricing-tier={t.entry.replace('pricing-', '')}>
              <div className="tcard__head"><span className="pt-name">{t.name}</span>{t.tag ? <span className="pt-tag">{t.tag}</span> : null}<span className="pt-sub">{t.sub}</span><span className="pt-price">{t.price}</span></div>
              <ul className="tcard__list">{t.rows.map((r, i) => <li key={i}><span>{r[0]}</span><b className={r[2] ? 'no' : undefined}>{r[1]}</b></li>)}</ul>
              <button className={'btn btn--44 btn--block' + (t.secondary ? ' btn--sec' : '')} type="button" data-entry={t.entry} onClick={() => onIntake(t.entry)}>{t.cta}</button>
            </div>
          ))}
        </div>
        <p className="tcommon"><b>Во всех тарифах:</b> адрес на&nbsp;samosite.online, обновление раз в&nbsp;неделю, экспорт сайта архивом, удаление данных по&nbsp;одному нажатию.</p>
      </div>
    </section>
  );
}

const HONEST: [string, string][] = [
  ['Без вашего «да» ничего не\u00A0меняется', 'Понедельничные идеи ждут кнопки «Применить». Сами на\u00A0сайт не\u00A0попадают'],
  ['Заберёте сайт архивом в\u00A0один клик', 'HTML и\u00A0все материалы, перенесёте на\u00A0любой хостинг'],
  ['Удалим по\u00A0одному нажатию', 'Данные стираем по\u00A0запросу, без уговоров и\u00A0удержания'],
];
function HonestRow({ t, d }: any) {
  const [ref, cls] = useReveal();
  return <div ref={ref} className={'hrow ' + cls}><p className="hrow__t">{t}</p><p className="hrow__d">{d}</p></div>;
}
export function V5_Honest() {
  return (
    <section className="section" aria-labelledby="honest-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="honest-h">Сайт остаётся вашим</h2></div></div>
        <div className="honest">{HONEST.map((h, i) => <HonestRow key={i} t={h[0]} d={h[1]} />)}</div>
      </div>
    </section>
  );
}

export interface FaqItem { id: string; q: string; a: string; }
export const FAQ_ITEMS: FaqItem[] = [
  { id: 'karty', q: 'У меня страница в Яндекс.Картах. Зачем ещё сайт?', a: 'Карты показывают вас тем, кто уже ищет рядом. Свой сайт попадает в поиск по широким запросам — «маникюр + район», «брови + город» — и приводит клиента до того, как он открыл Карты и увидел там всех остальных.' },
  { id: 'why-2h', q: 'Почему 2 часа? А если не соберётся?', a: '2 часа — время сборки черновика после того, как вы показали профиль. Обычно быстрее. Если источник большой и нужен человек — предупредим сразу и пришлём ссылку, как только сайт готов. Без вашего «ок» ничего не публикуется.' },
  { id: 'dikidi', q: 'Я записываю через Dikidi или YClients. Что будет с записью?', a: 'Запись остаётся у вас: кнопка «Записаться» поведёт в ваш Dikidi или YClients. Самосайт показывает услуги, цены и отзывы, запись ведёт ваш сервис.' },
  { id: 'edit', q: 'Тексты, фото и цены смогу править сам?', a: 'Да, всё редактируется в кабинете. Ваши правки Самосайт не перезаписывает.' },
  { id: 'photos-only', q: 'У меня только фото работ. Этого хватит?', a: 'Хватит. Соберём из фото и подписей. Если чего-то не хватит, спросим один раз, списком.' },
  { id: 'tg-closed', q: 'Мой Telegram-канал закрытый. Самосайт его прочитает?', a: 'Только если вы добавите бота в канал. Без доступа канал не используется.' },
  { id: 'seo', q: 'Сайт попадёт в поиск Яндекса и Google?', a: 'Да. У сайта свой адрес и разметка для поисковиков. Обычно индексация занимает 1–2 недели.' },
  { id: 'no-pay', q: 'Не заплачу после бесплатного месяца. Что будет с сайтом?', a: 'Сайт не выключится в тот же день. Месяц он работает как есть, только перестаёт обновляться. Ещё через месяц отключается. Архив со всеми материалами заберёте в любой день до отключения.' },
  { id: 'leave', q: 'Что будет с данными, если я уйду?', a: 'Сайт заберёте архивом, данные удалим по одному нажатию.' },
];
export interface V5_FaqProps { items?: FaqItem[]; onFaqOpen?: (id: string) => void; }
export function V5_Faq({ items = FAQ_ITEMS, onFaqOpen = () => {} }: V5_FaqProps) {
  const [open, setOpen] = useState<string | null>(items.length ? items[0].id : null);
  const toggle = (it: FaqItem) => { const next = open === it.id ? null : it.id; setOpen(next); if (next === it.id) onFaqOpen(it.id); };
  return (
    <section className="section" id="faq" aria-labelledby="faq-h">
      <div className="wrap">
        <div className="shead"><div className="shead__l"><h2 className="h2" id="faq-h">Что обычно хотят уточнить</h2></div></div>
        <div className="bento12">
          <p className="lead faq-short">Не&nbsp;нашли ответ — <a className="tlink" href="https://t.me/samosite" target="_blank" rel="noopener">напишите нам в Telegram</a>, отвечаем в&nbsp;течение дня.</p>
          <div className="faq">
            {items.map(it => {
              const isOpen = open === it.id;
              return (
                <div key={it.id} className={'acc' + (isOpen ? ' is-open' : '')} data-faq data-faq-item={it.id}>
                  <button className="acc__btn" aria-expanded={isOpen} onClick={() => toggle(it)}><span>{it.q}</span><span className="acc__plus" aria-hidden="true">+</span></button>
                  <div className="acc__panel"><div><p className="acc__a">{it.a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export interface V5_FinalCtaProps { onIntake?: IntakeCb; }
export function V5_FinalCta({ onIntake = noop }: V5_FinalCtaProps) {
  return (
    <section className="final" id="start" aria-labelledby="final-h">
      <div className="wrap">
        <h2 className="h2 final__h" id="final-h" style={{ marginTop: 16 }}>Назовите своё дело и&nbsp;город — <span className="accent">через 2 часа</span> посмотрите готовый сайт</h2>
        <p className="final__p">Тариф «Старт» бесплатный навсегда. Платные от&nbsp;690&nbsp;₽/мес, первый месяц бесплатно, карта не&nbsp;нужна.</p>
        <div className="final__cta">
          <button className="btn btn--56" type="button" data-entry="final" onClick={() => onIntake('final')}>Собрать сайт за 2 часа <span className="arw">→</span></button>
          <a className="tlink" href="https://t.me/samosite" target="_blank" rel="noopener"><span className="u">Написать нам в Telegram</span> <span className="arw">→</span></a>
        </div>
      </div>
    </section>
  );
}

export interface V5_FooterProps { links?: { politika: string; oferta: string; support: string }; }
export function V5_Footer({ links }: V5_FooterProps) {
  const L = links || { politika: 'docs/politika.html', oferta: 'docs/oferta.html', support: 'https://t.me/samosite' };
  return (
    <footer className="ft">
      <div className="wrap ft__in">
        <span className="ft__logo">Само<span style={{ color: VT.accentOnDark }}>сайт</span></span>
        <span className="ft__meta">© 2026 · samosite.online · ИП Иванова А. А. · ИНН 660000000000 · данные хранятся в РФ</span>
        <nav className="ft__links" aria-label="Документы">
          <a href={L.politika}>Политика данных</a>
          <a href={L.oferta}>Оферта</a>
          <a href={L.support} target="_blank" rel="noopener">Поддержка</a>
        </nav>
      </div>
    </footer>
  );
}

export interface V5_PageProps { onIntake?: IntakeCb; onFaqOpen?: (id: string) => void; anchors?: V5_Anchor[]; withStyles?: boolean; }
export function V5_Page({ onIntake = noop, onFaqOpen = () => {}, anchors, withStyles = true }: V5_PageProps) {
  return (
    <div className="v5 js">
      {withStyles && <V5_Styles />}
      <V5_Header anchors={anchors} onIntake={onIntake} />
      <main id="top">
        <V5_Hero onIntake={onIntake} />
        <V5_Story onIntake={onIntake} />
        <V5_Examples layout="carousel" onIntake={onIntake} />
        <V5_HowItWorks />
        <V5_Reviews />
        <V5_Pricing onIntake={onIntake} />
        <V5_Honest />
        <V5_Faq onFaqOpen={onFaqOpen} />
      </main>
      <V5_FinalCta onIntake={onIntake} />
      <V5_Footer />
    </div>
  );
}
