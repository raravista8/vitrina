'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · intake v2 «In2_» — canon-порт (controlled). 0.12.0 «Фарфор и лак».
// Данные — пропсами, действия — колбэками; НЕТ window.SSIntake / fetch / Date.now / Math.random / localStorage.
// Zero-prop = canvas-mock. data-* хуки на шагах/чипах/CTA. Тексты — побайтово из прототипа/спеки.
// Стили — In2_Styles (scoped .in2, значения из tokens «Фарфор и лак»); компоненты используют var(--*).
// Требование: обернуть в <In2_Styles/> + элемент .in2 (In2_Modal его несёт; отдельные шаги — обернуть).
import React, { useState, useEffect, useRef } from 'react';

export const In2_CSS = ".in2{--bone:#F2EEE6;--paper:#FBF9F4;--ink:#1B1712;--ink-70:#4C463C;--ink-45:#6E675A;--line:#E5DFD3;--line-2:#D6CEBE;--accent:#7A2B34;--accent-dk:#631F27;--on-accent:#FBF9F4;--display:'Sofia Sans Condensed',system-ui,sans-serif;--text:'Onest',system-ui,sans-serif;--mono:'JetBrains Mono',ui-monospace,monospace;}.in2 *{box-sizing:border-box;border-radius:0;box-shadow:none;}.in2 button{font-family:inherit;}.in2 .btn{display:inline-flex;align-items:center;justify-content:center;gap:10px;height:52px;padding:0 24px;background:var(--accent);color:var(--on-accent);font-family:var(--text);font-weight:600;font-size:16px;line-height:1;white-space:nowrap;border:none;cursor:pointer;transition:background .16s;}.in2 .btn:hover:not(:disabled){background:var(--accent-dk);}.in2 .btn .arw{display:inline-block;transition:transform .16s;}.in2 .btn:hover:not(:disabled) .arw{transform:translateX(4px);}.in2 .btn--block{display:flex;width:100%;}.in2 .btn--sec{background:transparent;color:var(--ink);border:1px solid var(--line-2);}.in2 .btn--sec:hover:not(:disabled){background:var(--ink);color:var(--paper);border-color:var(--ink);}.in2 .chip{display:inline-flex;align-items:center;height:38px;padding:0 15px;border:1px solid var(--line-2);background:#fff;color:var(--ink);font-weight:600;line-height:1;cursor:pointer;transition:background .14s,border-color .14s;}.in2 .chip:hover{border-color:var(--ink-45);}.in2 .chip.is-active{background:var(--accent);border-color:var(--accent);color:var(--paper);font-weight:700;}.in2 .chip--other{border-style:dashed;}.in2 .tlink{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ink);background:none;border:none;cursor:pointer;text-decoration:none;font:inherit;line-height:inherit;}.in2 .tlink .u{text-decoration:underline;text-decoration-color:var(--accent);text-decoration-thickness:1.5px;text-underline-offset:3px;}.in2 .tlink .arw{display:inline-block;transition:transform .16s;}.in2 .tlink:hover .arw{transform:translateX(3px);}.in2 .ss-iconbtn{width:38px;height:38px;display:inline-flex;align-items:center;justify-content:center;color:var(--ink);background:none;border:none;cursor:pointer;transition:background .14s;}.in2 .ss-iconbtn:hover{background:var(--bone);}@keyframes in2Skel{from{background-position:200% 0}to{background-position:-200% 0}}@keyframes in2Spin{to{transform:rotate(360deg)}}.in2 .ss-skel{background:linear-gradient(90deg,var(--bone) 25%,#FAF7F0 50%,var(--bone) 75%);background-size:200% 100%;animation:in2Skel 1.3s linear infinite;}.in2 .ss-spin{animation:in2Spin .8s linear infinite;}.in2 .ss-demo-scroll::-webkit-scrollbar{width:8px;}.in2 .ss-demo-scroll::-webkit-scrollbar-thumb{background:rgba(27,23,18,.22);}";
export function In2_Styles() { return React.createElement('style', { 'data-samosite-canon-in2': '0.12', dangerouslySetInnerHTML: { __html: In2_CSS } }); }


  // ───────── примитивы ─────────
  function Icon({ d, size = 22, sw = 1.8, fill }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill || 'none'} stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">{d.map((p, i) => <path key={i} d={p} />)}</svg>;
  }
  const S = {
    label: { fontFamily: 'var(--mono)', fontSize: 11, fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--ink-45)' },
    input: { width: '100%', padding: '13px 14px', border: '1px solid var(--line-2)', background: '#fff', font: 'inherit', fontSize: 16, color: 'var(--ink)', outline: 'none' },
    field: { display: 'flex', flexDirection: 'column', gap: 7 },
    hint: { fontSize: 15.5, lineHeight: 1.5, color: 'var(--ink-70)' },
  };
  function Field({ label, children }) {
    return <label style={S.field}><span style={S.label}>{label}</span>{children}</label>;
  }
  function Chip({ active, children, onClick, dashed, ...rest }) {
    return <button type="button" onClick={onClick} role="radio" aria-checked={!!active} {...rest} className={'chip' + (active ? ' is-active' : '') + (dashed ? ' chip--other' : '')} style={{ fontSize: 14.5 }}>{children}</button>;
  }
  function Cta({ ok, onClick, missing, children, ...rest }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <button className="btn btn--block" type="button" onClick={onClick} disabled={!ok} {...rest} style={{ opacity: ok ? 1 : .5, cursor: ok ? 'pointer' : 'not-allowed' }}>{children} <span className="arw">→</span></button>
        {!ok && missing ? <span style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-45)' }}>Осталось: {missing}</span> : null}
      </div>
    );
  }

  // ───────── данные ─────────
  const NICHE_ORDER = ['Маникюр', 'Брови и ресницы', 'Барбершоп', 'Косметолог', 'Колорист'];
  const NICHE_TILE = {
    'Маникюр': { color: '#C0392B', tint: '#F7ECEA' }, 'Брови и ресницы': { color: '#7A5A3C', tint: '#F1ECE3' },
    'Барбершоп': { color: '#8C4A22', tint: '#F4ECE2' }, 'Косметолог': { color: '#2F7A68', tint: '#E9F2EF' },
    'Колорист': { color: '#9C2A8E', tint: '#F5EAF3' }, 'Другое': { color: '#8A8173', tint: '#F0EDE6' },
  };
  const BOOKING = [{ id: 'dikidi', label: 'Dikidi' }, { id: 'yclients', label: 'YClients' }, { id: 'phone', label: 'По телефону и в мессенджерах' }, { id: 'none', label: 'Пока никак' }];
  const CHANNELS = ['Telegram', 'MAX', 'WhatsApp', 'Email', 'Телефон/SMS'];
  const STEP_TITLE = { example: 'Вот такой сайт соберём', source: 'Найдём ваше дело', recognize: 'Распознаём карточку…', notfound: 'Не нашли карточку', confirm: 'Какая карточка ваша?', booking: 'Записью пользуетесь?', contacts: 'Куда прислать готовый черновик?', done: 'Готово' };
  const PHONE_CH = ['WhatsApp', 'Телефон/SMS'];
  const CITIES = ['Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань', 'Нижний Новгород', 'Челябинск', 'Самара', 'Уфа', 'Ростов-на-Дону', 'Краснодар', 'Омск', 'Воронеж', 'Пермь', 'Волгоград', 'Сочи', 'Тюмень', 'Красноярск', 'Саратов', 'Тольятти'];

  const demoSrc = (img, w) => img.indexOf('photo-') === 0 ? 'https://images.unsplash.com/' + img + '?auto=format&fit=crop&w=' + w + '&q=80' : img;

  // ── NICHE_LIB_V2 — 5 полных лендингов + «Другое» (фикстуры примера; гамма из фото) ──
  const DEMO_FIX = {
    'Маникюр': { brand: 'Студия Анны', host: 'anna-nails', cat: 'Маникюр · Екатеринбург', h: ['Аппаратный маникюр,', 'держится 3 недели'], img: 'img/nails.png', items: [['Маникюр с покрытием', '2 200 ₽', 'аппаратный, бережно · 1,5 ч'], ['Укрепление акригелем', '+600 ₽', 'для тонких и ломких'], ['Дизайн — два ногтя', 'от 300 ₽', 'от простого до сложного'], ['Педикюр с покрытием', '2 800 ₽', 'смарт-педикюр · 2 ч'], ['Снятие чужого покрытия', '500 ₽', 'без спешки и фрезы «на живую»']], gal: ['img/nails.png', 'photo-1519014816548-bf5fe059798b', 'photo-1604654894610-df63bc536371', 'photo-1610992015732-2449b76344bc'], revs: [['«Анна спокойная, объясняет, что делает. Никогда не было сколов.»', 'Олеся Н. · Яндекс · 3 дня назад'], ['«Записалась вечером, утром уже с ногтями. В кабинете чисто, всё стерильно.»', 'Марина К. · 2ГИС · неделю назад'], ['«Хожу полгода — покрытие реально держится три недели.»', 'Даша Т. · Яндекс · месяц назад']], addr: 'Малышева 12, Екатеринбург', rating: '4.9', n: 137, brand2: 'Anna Nails Studio', addr2: 'Ленина 40, Екатеринбург', rating2: '4.7', n2: 41 },
    'Брови и ресницы': { brand: 'Брови Веры', host: 'vera-brows', cat: 'Брови · Казань', h: ['Брови по вашей', 'форме лица'], img: 'photo-1616683693504-3ea7e9ad6fec', items: [['Коррекция + окрашивание', '1 200 ₽', 'воск или пинцет · 40 мин'], ['Ламинирование с окрашиванием', '2 000 ₽', 'держится 4–6 недель'], ['Архитектура с нуля', '1 500 ₽', 'подбор формы по лицу'], ['Окрашивание ресниц', '800 ₽', 'краска или хна'], ['Коррекция мужских бровей', '1 000 ₽', 'естественная форма']], gal: ['photo-1616683693504-3ea7e9ad6fec', 'photo-1594736797933-d0501ba2fe65', 'photo-1583001931096-959e9a1a6223', 'photo-1588514912908-8f5891714f8d'], revs: [['«Первый раз мастер не сделала мне чужие брови — свои, но аккуратные.»', 'Карина Т. · Яндекс · неделю назад'], ['«Форму подобрали идеально, лицо будто открылось.»', 'Марина В. · Яндекс · 5,0'], ['«Не рисую брови утром вообще. Экономия получаса каждый день.»', 'Аня С. · 2ГИС · 2 недели назад']], addr: 'Баумана 8, Казань', rating: '5.0', n: 89, brand2: 'Vera Brows', addr2: 'Кремлёвская 21, Казань', rating2: '4.8', n2: 27 },
    'Барбершоп': { brand: 'Бритва', host: 'britva', cat: 'Барбершоп · Тюмень', h: ['Стрижка + борода', 'за 45 минут'], img: 'photo-1503951914875-452162b0f3f1', items: [['Мужская стрижка', '1 800 ₽', 'машинка + ножницы · 45 мин'], ['Стрижка + борода', '2 900 ₽', 'с горячим полотенцем'], ['Борода', '1 400 ₽', 'форма + окантовка'], ['Опасной бритвой', '1 600 ₽', 'голова или борода'], ['Отец + сын', '2 800 ₽', 'ребёнок до 12 лет']], gal: ['photo-1503951914875-452162b0f3f1', 'photo-1585747860715-2ba37e788b70', 'photo-1622287162716-f311baa1a2b8', 'photo-1521490878406-4b7f8f5f9cd4'], revs: [['«Хожу третий год. Всегда помнит, как стригли в прошлый раз.»', 'Антон К. · Яндекс Карты · 4 дня назад'], ['«Без лишних разговоров: пришёл, постригли, ушёл. 40 минут.»', 'Игорь М. · Яндекс · 3 дня назад'], ['«Сын перестал бояться стричься. Это лучшая рекомендация.»', 'Павел Д. · 2ГИС · месяц назад']], addr: 'Республики 55, Тюмень', rating: '4.8', n: 214, brand2: 'Бритва на Ленина', addr2: 'Ленина 4, Тюмень', rating2: '4.6', n2: 58 },
    'Косметолог': { brand: 'Кабинет Ирины', host: 'irina-skin', cat: 'Косметолог · Сочи', h: ['Сначала смотрим кожу,', 'потом выбираем уход'], img: 'photo-1616394584738-fc6e612e71b9', items: [['Комбинированная чистка', '3 000 ₽', 'с уходом по типу кожи · 1,5 ч'], ['Пилинг по показаниям', 'от 2 500 ₽', 'подбираем после диагностики'], ['Уход по типу кожи', '2 800 ₽', 'домашняя схема в подарок'], ['Массаж лица', '2 000 ₽', 'буккальный или классический'], ['Первичная диагностика', 'бесплатно', 'разбор кожи и план']], gal: ['photo-1570172619644-dfd03ed5d881', 'photo-1616394584738-fc6e612e71b9', 'photo-1512290923902-8a9f81dc236c', 'photo-1519824145371-296894a0daa9'], revs: [['«Не впаривает лишнего: сказала, что хватит трёх чисток, а не курса из десяти.»', 'Ольга В. · 2ГИС · неделю назад'], ['«Кожа перестала шелушиться через месяц по её схеме.»', 'Наташа Б. · Яндекс · 2 месяца назад'], ['«Диагностика бесплатная и честная — без навязывания курсов.»', 'Вера Л. · Яндекс · неделю назад']], addr: 'Навагинская 3, Сочи', rating: '4.9', n: 76, brand2: 'Ирина Косметолог', addr2: 'Горького 30, Сочи', rating2: '4.7', n2: 19 },
    'Колорист': { brand: 'Колорист Кира', host: 'kira-color', cat: 'Колорист · Москва', h: ['Цвет волос по', 'вашему исходному'], img: 'photo-1580618672591-eb180b1a973f', items: [['Сложное окрашивание', 'от 9 000 ₽', 'airtouch, балаяж · от 3 ч'], ['Тонирование', '4 500 ₽', 'освежить цвет · 1,5 ч'], ['Окрашивание в один тон', 'от 5 000 ₽', 'корни или полностью'], ['Ботокс для волос', '5 000 ₽', 'восстановление после осветления'], ['Уход за цветом', '2 000 ₽', 'домашняя схема в подарок']], gal: ['photo-1580618672591-eb180b1a973f', 'photo-1560066984-138dadb4c035', 'photo-1522337660859-02fbefca4702', 'photo-1595476108010-b4d1f102b1b1'], revs: [['«Не сжёг длину и попал в оттенок с первого раза.»', 'Настя Р. · Яндекс · 3 дня назад'], ['«Показала на палитре, что получится. Получилось ровно это.»', 'Юля В. · 2ГИС · 2 недели назад'], ['«После осветления волосы живые. Не думала, что так бывает.»', 'Катя М. · Яндекс · месяц назад']], addr: 'Пятницкая 24, Москва', rating: '4.9', n: 137, brand2: 'Kira Color Bar', addr2: 'Тверская 9, Москва', rating2: '4.8', n2: 63 },
  };
  DEMO_FIX['Другое'] = DEMO_FIX['Маникюр'];
  const DEMO_PAL = {
    'Маникюр': { bg: '#F7EFEC', ink: '#2A2320', soft: '#8A7C74', line: '#EEE1DC', accent: '#B0656F', btn: '#2A2320', onBtn: '#FAF4F1', serif: "'Cormorant', Georgia, serif", hl: '#F4C9C4' },
    'Брови и ресницы': { bg: '#EFE7DA', ink: '#241E17', soft: '#6E6053', line: '#DBD0BE', accent: '#7A5A3C', btn: '#241E17', onBtn: '#F5EFE4', serif: "'Playfair Display', Georgia, serif", hl: '#E8D9BF' },
    'Барбершоп': { bg: '#E7E2D6', ink: '#231C15', soft: '#6B5C48', line: '#D6CCB8', accent: '#8C4A22', btn: '#231C15', onBtn: '#F1EADC', serif: "'Oswald', sans-serif", hl: '#E8C9A8' },
    'Косметолог': { bg: '#FFFFFF', ink: '#1A1D1C', soft: '#727975', line: '#ECECEA', accent: '#2F7A68', btn: '#1A1D1C', onBtn: '#FFFFFF', serif: "'Spectral', Georgia, serif", hl: '#BFE0D6' },
    'Колорист': { bg: '#F6F0F3', ink: '#221A24', soft: '#6E6472', line: '#E7DBE4', accent: '#9C2A8E', btn: '#221A24', onBtn: '#F9F0F6', serif: "'Cormorant', Georgia, serif", hl: '#EAC6E3' },
  };
  DEMO_PAL['Другое'] = DEMO_PAL['Маникюр'];
  const NICHE_LIB_V2 = NICHE_ORDER.concat(['Другое']).map(id => ({ id, label: id, fixture: DEMO_FIX[id], palette: DEMO_PAL[id], other: id === 'Другое' }));

  // ───────── helpers ─────────
  function formatPhone(v) {
    let digits = (v || '').replace(/\D/g, '');
    if (digits[0] === '8') digits = '7' + digits.slice(1);
    if (digits && digits[0] !== '7') digits = '7' + digits;
    digits = digits.slice(0, 11);
    const p = digits.slice(1);
    let out = '+7';
    if (p.length) out += ' (' + p.slice(0, 3);
    if (p.length >= 3) out += ') ' + p.slice(3, 6);
    if (p.length >= 6) out += '-' + p.slice(6, 8);
    if (p.length >= 8) out += '-' + p.slice(8, 10);
    return out;
  }
  const kindOf = (ch) => PHONE_CH.indexOf(ch) >= 0 ? 'phone' : (ch === 'Email' ? 'email' : 'nick');
  function contactValid(channel, value) {
    const v = (value || '').trim(); if (!v) return false;
    if (PHONE_CH.indexOf(channel) >= 0) return v.replace(/\D/g, '').length === 11;
    if (channel === 'Email') return /^\S+@\S+\.\S+$/.test(v);
    return /^@?[A-Za-z0-9_.]{2,}$/.test(v);
  }
  function contactError(channel) {
    if (PHONE_CH.indexOf(channel) >= 0) return 'Введите номер полностью: +7 и 10 цифр';
    if (channel === 'Email') return 'Проверьте адрес — нужен вид you@mail.ru';
    return 'Минимум 2 символа, латиница/цифры';
  }
  function linkInfo(raw) {
    const v = (raw || '').trim();
    if (!v) return { state: 'empty' };
    if (/\s/.test(v) || !/[.]/.test(v)) return { state: 'invalid', msg: 'Похоже, это не ссылка — проверьте адрес' };
    const s = v.toLowerCase();
    const providers = [{ re: /(yandex\.|ya\.ru|maps\.yandex)/, name: 'Яндекс Карты' }, { re: /2gis\./, name: '2ГИС' }, { re: /(t\.me|telegram\.)/, name: 'Telegram' }, { re: /avito\./, name: 'Avito' }, { re: /(vk\.com|vk\.ru)/, name: 'ВКонтакте' }, { re: /(dikidi|yclients)/, name: 'запись' }];
    const hit = providers.find(p => p.re.test(s));
    if (hit) return { state: 'ok', provider: hit.name, msg: 'Узнали источник: ' + hit.name };
    return { state: 'unknown', msg: 'Ссылку примем — источник определим сами' };
  }
  function bookingUrlInfo(raw) {
    const v = (raw || '').trim();
    if (!v) return { state: 'empty' };
    if (/\s/.test(v) || !/\./.test(v)) return { state: 'invalid', msg: 'Похоже, это не ссылка — проверьте адрес' };
    if (/(dikidi|yclients)/i.test(v)) return { state: 'ok', msg: 'Ссылка на запись — подключим кнопку «Записаться»' };
    return { state: 'unknown', msg: 'Не похоже на Dikidi или YClients — проверим сами' };
  }

  // ───────── альт-пути источника (02 · C — список подтверждён: Карты, 2ГИС, Telegram, Avito, ВКонтакте) ─────────
  const ALT_PATHS = {
    name: { icon: ['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'm20 20-3.5-3.5'], label: 'Ввести название и город', sub: 'Найдём карточку на Картах сами' },
    screenshot: { icon: ['M3 4.5h18v15H3z', 'm3 15 5-5 4 4 3-3 6 6'], label: 'Есть скриншот карточки', sub: 'Из Карт или 2ГИС — распознаем сами' },
    link: { icon: ['M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1', 'M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1'], label: 'Есть ссылка на профиль', sub: 'Карты, 2ГИС, Telegram, Avito, ВКонтакте' },
    photo: { icon: ['M3 4.5h18v15H3z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'm21 16-5-5-8 8'], label: 'Нет страницы в интернете', sub: 'Соберём из фото работ или прайса' },
  };
  function AltPath({ icon, label, sub, onClick, active, ...rest }) {
    const [h, setH] = useState(false);
    return (
      <button type="button" onClick={active ? undefined : onClick} onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)} aria-current={active ? 'true' : undefined} {...rest}
        style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left', padding: '11px 12px', border: active ? '1.5px solid var(--accent)' : '1px solid ' + (h ? 'var(--line-2)' : 'var(--line)'), background: (active || h) ? 'var(--bone)' : '#fff', cursor: active ? 'default' : 'pointer', transition: 'background .14s, border-color .14s', font: 'inherit' }}>
        <span style={{ flex: '0 0 auto', width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: active ? 'var(--accent)' : 'var(--bone)', border: '1px solid ' + (active ? 'var(--accent)' : 'var(--line)'), color: active ? 'var(--paper)' : 'var(--accent)' }}><Icon d={icon} size={17} /></span>
        <span style={{ flex: 1, minWidth: 0 }}>
          <span style={{ display: 'block', fontWeight: 600, fontSize: 14.5, color: 'var(--ink)' }}>{label}</span>
          {sub ? <span style={{ display: 'block', fontSize: 12.5, color: 'var(--ink-45)', marginTop: 1 }}>{sub}</span> : null}
        </span>
        {active ? <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', flex: 'none' }}>выбран</span>
          : <span style={{ color: 'var(--ink-45)', flex: 'none' }}><Icon d={['m9 18 6-6-6-6']} size={16} sw={2} /></span>}
      </button>
    );
  }

  // ───────── поля ─────────
  function CityInput({ value, onChange, forceOpen }) {
    const [open, setOpen] = useState(!!forceOpen);
    const [active, setActive] = useState(-1);
    const wrapRef = useRef(null);
    const q = (value || '').trim().toLowerCase();
    const matches = q ? CITIES.filter(c => c.toLowerCase().includes(q)).slice(0, 6) : CITIES.slice(0, 6);
    const exact = CITIES.some(c => c.toLowerCase() === q);
    const none = !!q && matches.length === 0;
    const show = open && (matches.length > 0 || none) && !(exact && matches.length === 1);
    useEffect(() => { const onDoc = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); }; document.addEventListener('mousedown', onDoc); return () => document.removeEventListener('mousedown', onDoc); }, []);
    const pick = (c) => { onChange(c); setOpen(false); setActive(-1); };
    const onKey = (e) => {
      if (!show) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(a + 1, matches.length - 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(a - 1, 0)); }
      else if (e.key === 'Enter' && active >= 0) { e.preventDefault(); pick(matches[active]); }
      else if (e.key === 'Escape') setOpen(false);
    };
    return (
      <div ref={wrapRef}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={['M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z', 'M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8z']} size={17} /></span>
          <input style={{ ...S.input, paddingLeft: 36 }} value={value} placeholder="Начните вводить город" onFocus={() => setOpen(true)} onChange={e => { onChange(e.target.value); setOpen(true); setActive(-1); }} onKeyDown={onKey} autoComplete="off" role="combobox" aria-expanded={show} aria-autocomplete="list" />
        </div>
        {show && (
          <ul style={{ listStyle: 'none', margin: '6px 0 0', padding: 4, background: '#fff', border: '1px solid var(--line-2)', maxHeight: 232, overflowY: 'auto' }}>
            {none && <li><button type="button" onMouseDown={(e) => { e.preventDefault(); pick(value.trim()); }} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none', background: 'var(--bone)', color: 'var(--ink)', font: 'inherit', fontSize: 15, cursor: 'pointer' }}>Оставим как есть: «{value.trim()}»</button></li>}
            {matches.map((c, i) => <li key={c}><button type="button" onMouseDown={(e) => { e.preventDefault(); pick(c); }} onMouseEnter={() => setActive(i)} style={{ width: '100%', textAlign: 'left', padding: '10px 12px', border: 'none', background: i === active ? 'var(--bone)' : 'transparent', color: 'var(--ink)', font: 'inherit', fontSize: 15, cursor: 'pointer' }}>{c}</button></li>)}
          </ul>
        )}
      </div>
    );
  }
  function LinkInput({ value, onChange }) {
    const [touched, setTouched] = useState(false);
    const info = linkInfo(value);
    const showState = (touched || (value || '').trim().length > 3) && info.state !== 'empty';
    const tone = info.state === 'invalid' ? '#B23B3B' : info.state === 'ok' ? '#2F7A68' : 'var(--ink-70)';
    const border = !showState ? 'var(--line-2)' : (info.state === 'invalid' ? '#D98A8A' : info.state === 'ok' ? '#8FC3B4' : 'var(--line-2)');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={['M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1', 'M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1']} size={17} /></span>
          <input style={{ ...S.input, paddingLeft: 36, borderColor: border }} value={value} placeholder="Я.Карты, 2ГИС, Telegram, Avito…" onChange={e => onChange(e.target.value)} onBlur={() => setTouched(true)} inputMode="url" autoComplete="off" />
        </div>
        {showState && <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: tone }}><Icon d={info.state === 'invalid' ? ['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z'] : info.state === 'ok' ? ['M20 6 9 17l-5-5'] : ['M12 8v4', 'M12 16h.01', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z']} size={15} sw={2} />{info.msg}</span>}
      </div>
    );
  }
  function ContactInput({ channel, value, onChange, initialTouched }) {
    const [touched, setTouched] = useState(!!initialTouched);
    const phone = PHONE_CH.indexOf(channel) >= 0;
    const ph = { 'Telegram': '@username', 'MAX': '@username', 'WhatsApp': '+7 (___) ___-__-__', 'Email': 'you@mail.ru', 'Телефон/SMS': '+7 (___) ___-__-__' }[channel];
    const label = channel === 'Email' ? 'Почта' : (phone ? 'Телефон' : 'Ник в ' + channel);
    const valid = contactValid(channel, value);
    const showErr = touched && !!(value || '').trim() && !valid;
    const border = showErr ? '#D98A8A' : (touched && valid ? '#8FC3B4' : 'var(--line-2)');
    const handle = (e) => { const raw = e.target.value; onChange(phone ? formatPhone(raw) : raw); };
    const iconD = phone ? ['M6.6 3.5 9 3l2 4.5-2 1.3a12 12 0 0 0 5.7 5.7l1.3-2 4.5 2-.5 2.4a2 2 0 0 1-2.3 1.6A16 16 0 0 1 3.4 5.8 2 2 0 0 1 5 3.5z'] : channel === 'Email' ? ['M3 5.5h18v13H3z', 'm3 6 9 7 9-7'] : ['M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M4.5 20a7.5 7.5 0 0 1 15 0'];
    return (
      <Field label={label}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={iconD} size={17} /></span>
          <input style={{ ...S.input, paddingLeft: 36, borderColor: border }} value={value} placeholder={ph} inputMode={phone ? 'tel' : (channel === 'Email' ? 'email' : 'text')} autoComplete="off" onChange={handle} onBlur={() => setTouched(true)} />
        </div>
        {showErr && <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#B23B3B' }}><Icon d={['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z']} size={15} sw={2} /> {contactError(channel)}</span>}
      </Field>
    );
  }
  function BookingLink({ value, onChange }) {
    const [touched, setTouched] = useState(false);
    const info = bookingUrlInfo(value);
    const show = (touched || (value || '').trim().length > 3) && info.state !== 'empty';
    const tone = info.state === 'invalid' ? '#B23B3B' : info.state === 'ok' ? '#2F7A68' : 'var(--ink-70)';
    const border = !show ? 'var(--line-2)' : info.state === 'invalid' ? '#D98A8A' : info.state === 'ok' ? '#8FC3B4' : 'var(--line-2)';
    return (
      <Field label="Ссылка на онлайн-запись (необязательно)">
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={['M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 1 0-7-7l-1 1', 'M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 1 0 7 7l1-1']} size={17} /></span>
          <input style={{ ...S.input, paddingLeft: 36, borderColor: border }} value={value} placeholder="https://dikidi.net/…" onChange={e => onChange(e.target.value)} onBlur={() => setTouched(true)} inputMode="url" autoComplete="off" />
        </div>
        {show && <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: tone }}><Icon d={info.state === 'invalid' ? ['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z'] : info.state === 'ok' ? ['M20 6 9 17l-5-5'] : ['M12 8v4', 'M12 16h.01', 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z']} size={15} sw={2} />{info.msg}</span>}
      </Field>
    );
  }
  function BookingPhone({ value, onChange }) {
    const [touched, setTouched] = useState(false);
    const bad = touched && (value || '').trim() !== '' && (value || '').replace(/\D/g, '').length !== 11;
    return (
      <Field label="Номер для записи (необязательно)">
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={['M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.4 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.9 2.2z']} size={17} /></span>
          <input style={{ ...S.input, paddingLeft: 36, borderColor: bad ? '#D98A8A' : 'var(--line-2)' }} value={value} placeholder="+7 (___) ___-__-__" onChange={e => onChange(formatPhone(e.target.value))} onBlur={() => setTouched(true)} inputMode="tel" autoComplete="off" />
        </div>
        <span style={{ fontSize: 13.5, color: bad ? '#B23B3B' : 'var(--ink-45)' }}>{bad ? 'Введите номер полностью: +7 и 10 цифр' : 'Кнопка «Записаться» откроет звонок или WhatsApp на этот номер. Пусто — возьмём из карточки.'}</span>
      </Field>
    );
  }
  function Uploader({ label, sub, multiple, accept, icon, onFiles, initial, max }) {
    max = max || 5;
    const fmtMB = (b) => (b / 1048576).toFixed(1).replace('.', ',') + ' МБ';
    const ref = useRef(null);
    const [files, setFiles] = useState(initial || []);
    const [err, setErr] = useState('');
    const [over, setOver] = useState(false);
    const apply = (arr, e) => { setFiles(arr); setErr(e || ''); onFiles && onFiles(arr); };
    const push = (list) => {
      let arr = multiple ? files.slice() : []; let e = '';
      Array.from(list).forEach(f => {
        if (f.type && f.type.indexOf('image/') !== 0) { e = 'Это не изображение — нужен JPG, PNG или скриншот'; return; }
        if (f.size > 8 * 1024 * 1024) { e = 'Файл больше 8 МБ — пришлите полегче'; return; }
        const it = { name: f.name || 'изображение', url: URL.createObjectURL(f), size: f.size };
        if (multiple) { if (arr.length < max) arr.push(it); else e = 'Не больше ' + max + ' фото'; } else arr = [it];
      });
      apply(arr, e);
    };
    const removeAt = (i) => { const arr = files.slice(); arr.splice(i, 1); apply(arr, ''); };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button type="button" onClick={() => ref.current && ref.current.click()} onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)} onDrop={(e) => { e.preventDefault(); setOver(false); if (e.dataTransfer && e.dataTransfer.files.length) push(e.dataTransfer.files); }}
          style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 14, textAlign: 'left', padding: '18px 16px', border: '1.5px dashed ' + (over ? 'var(--accent)' : 'var(--line-2)'), background: over ? '#F4E9E6' : 'var(--bone)', color: 'var(--ink)', cursor: 'pointer', transition: 'border-color .14s, background .14s' }}>
          <span style={{ flex: '0 0 auto', width: 42, height: 42, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#fff', border: '1px solid var(--line)', color: 'var(--accent)' }}>{icon}</span>
          <span style={{ minWidth: 0 }}><span style={{ display: 'block', fontWeight: 600, fontSize: 15.5 }}>{label}</span><span style={{ display: 'block', fontSize: 13, color: 'var(--ink-70)', marginTop: 2 }}>{sub}</span></span>
        </button>
        {files.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'flex-start' }}>
            {files.map((f, i) => (
              <span key={i} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 3, width: 62 }}>
                <span title={f.name} style={{ position: 'relative', width: 62, height: 62, border: '1px solid var(--line-2)', background: '#fff', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ink-45)' }}>
                  {f.url ? <img src={f.url} alt={f.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <Icon d={['M3 4.5h18v15H3z', 'm3 15 5-5 4 4 3-3 6 6']} size={22} />}
                  <button type="button" aria-label={'Убрать ' + f.name} onClick={() => removeAt(i)} style={{ position: 'absolute', top: 3, right: 3, width: 20, height: 20, borderRadius: '50%', border: 'none', background: 'rgba(27,23,18,.75)', color: '#fff', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: 0 }}><Icon d={['M18 6 6 18', 'm6 6 12 12']} size={11} sw={2.4} /></button>
                </span>
                {f.size ? <span style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-45)', whiteSpace: 'nowrap' }}>{fmtMB(f.size)}</span> : null}
              </span>
            ))}
            {multiple ? <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--ink-45)', alignSelf: 'center' }}>{files.length} из {max}</span>
              : <span style={{ fontSize: 13, color: 'var(--ink-70)', maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', alignSelf: 'center' }}>{files[0].name}</span>}
          </div>
        )}
        {err && <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13.5, color: '#B23B3B' }}><Icon d={['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z']} size={15} sw={2} /> {err}</span>}
        <input ref={ref} type="file" accept={accept} multiple={multiple} style={{ display: 'none' }} onChange={(e) => { push(e.target.files || []); e.target.value = ''; }} />
      </div>
    );
  }

  // ───────── пример ниши (полный лендинг со скроллом) ─────────
  function Ph({ src, w, pos, P, label, style }) {
    const [err, setErr] = useState(false);
    if (err) return <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(135deg, ' + P.line + ' 0 12px, ' + P.bg + ' 12px 24px)', display: 'flex', alignItems: 'flex-end', padding: 8, ...(style || {}) }}>{label ? <span style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '.05em', textTransform: 'uppercase', color: P.soft, background: 'rgba(255,255,255,.72)', padding: '2px 6px' }}>{label}</span> : null}</div>;
    return <img src={demoSrc(src, w)} alt="" loading="lazy" onError={() => setErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos || 'center', display: 'block', ...(style || {}) }} />;
  }
  function DemoSite({ niche, height }) {
    const f = DEMO_FIX[niche] || DEMO_FIX['Маникюр'];
    const P = DEMO_PAL[niche] || DEMO_PAL['Маникюр'];
    const Label = ({ children }) => <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.soft, marginBottom: 12 }}>{children}</div>;
    const BtnD = ({ children }) => <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: P.btn, color: P.onBtn, fontWeight: 700, fontSize: 14, padding: '13px 18px' }}>{children} <span>→</span></span>;
    return (
      <div style={{ height, background: P.bg, display: 'flex', flexDirection: 'column', overflow: 'hidden', userSelect: 'none' }} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', borderBottom: '1px solid var(--line)', background: 'var(--bone)', flex: '0 0 auto' }}>
          <span style={{ display: 'inline-flex', gap: 5 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--line-2)' }} />)}</span>
          <span style={{ flex: 1, textAlign: 'center' }}><span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-70)', background: '#fff', border: '1px solid var(--line)', padding: '2px 12px' }}>{f.host}.samosite.online</span></span>
          <span style={{ width: 31 }} />
        </div>
        <div className="ss-demo-scroll" style={{ flex: 1, minHeight: 0, overflowY: 'auto', overscrollBehavior: 'contain' }}>
          <div style={{ position: 'relative', height: 280 }}>
            <Ph src={f.img} w={1200} pos={'center 24%'} P={P} label="фото работ" />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,15,.66) 0%, rgba(20,16,15,0) 46%)' }} />
            <div style={{ position: 'absolute', top: 14, left: 20, right: 20, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', opacity: .92 }}>{f.brand} · {f.cat}</span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: '#fff', background: 'rgba(20,16,15,.45)', padding: '3px 9px' }}>★ {f.rating} · {f.n} отзывов</span>
            </div>
            <h3 style={{ position: 'absolute', left: 20, right: 20, bottom: 16, margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: 36, lineHeight: 1.0, letterSpacing: '-.01em', color: '#FBFBFC' }}>{f.h[0]}<br /><span style={{ fontStyle: 'italic', color: P.hl }}>{f.h[1]}</span></h3>
          </div>
          <div style={{ padding: '22px 24px 8px' }}>
            <Label>Услуги и цены</Label>
            {f.items.map((it, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 14, padding: '9px 0', borderBottom: i < f.items.length - 1 ? '1px solid ' + P.line : 'none' }}>
                <div style={{ minWidth: 0, flex: 1 }}><div style={{ fontWeight: 600, fontSize: 14, color: P.ink }}>{it[0]}</div>{it[2] ? <div style={{ fontSize: 11.5, color: P.soft, marginTop: 2 }}>{it[2]}</div> : null}</div>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: P.ink, whiteSpace: 'nowrap' }}>{it[1]}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px 24px 26px' }}><BtnD>Записаться</BtnD></div>
          <div style={{ padding: '0 24px 26px' }}>
            <Label>Отзывы</Label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {f.revs.map((r, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 7, padding: '14px 16px', background: P.line, borderLeft: '3px solid ' + P.accent }}>
                  <span aria-label="5 из 5" style={{ color: '#C9922E', fontSize: 13, letterSpacing: '1.5px' }}>★★★★★</span>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 15.5, lineHeight: 1.45, color: P.ink }}>{r[0]}</p>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: P.ink, opacity: .75 }}>{r[1]}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '0 24px 12px' }}>
            <Label>Работы</Label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>{f.gal.map((g, i) => <div key={i} style={{ aspectRatio: '1 / 1', overflow: 'hidden' }}><Ph src={g} w={600} P={P} label={'фото ' + (i + 1)} /></div>)}</div>
          </div>
          <div style={{ padding: '18px 24px 22px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}><BtnD>Записаться</BtnD><span style={{ fontSize: 12, color: P.soft }}>{f.addr} · ★ {f.rating} · {f.n} отзывов</span></div>
          <div style={{ borderTop: '1px solid ' + P.line, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', gap: 12, fontFamily: 'var(--mono)', fontSize: 10, color: P.soft }}><span>{f.host}.samosite.online</span><span>Сделано на Самосайте</span></div>
        </div>
      </div>
    );
  }
  function MiniDemo({ niche, height }) {
    const f = DEMO_FIX[niche] || DEMO_FIX['Маникюр'];
    const t = NICHE_TILE[niche] || NICHE_TILE['Другое'];
    const [imgErr, setImgErr] = useState(false);
    const compact = height < 360;
    return (
      <div style={{ height, background: '#fff', display: 'flex', flexDirection: 'column', pointerEvents: 'none', userSelect: 'none', overflow: 'hidden' }} aria-hidden="true">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderBottom: '1px solid var(--line)', background: 'var(--bone)', flex: '0 0 auto' }}>
          <span style={{ display: 'inline-flex', gap: 5 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--line-2)' }} />)}</span>
          <span style={{ flex: 1, textAlign: 'center' }}><span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-70)', background: '#fff', border: '1px solid var(--line)', padding: '2px 10px' }}>{f.host}.samosite.online</span></span>
          <span style={{ width: 31 }} />
        </div>
        <div style={{ flex: 1, overflow: 'hidden', padding: compact ? '10px 14px' : '15px 18px', display: 'flex', flexDirection: 'column', gap: compact ? 7 : 10 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'stretch' }}>
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 9.5, letterSpacing: '.14em', textTransform: 'uppercase', color: t.color }}>{f.cat}</span>
              <div style={{ fontFamily: 'var(--display)', fontWeight: 800, fontSize: compact ? 21 : 25, lineHeight: .98, letterSpacing: '-.01em', color: 'var(--ink)' }}>{f.h[0]}<br />{f.h[1]}</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10.5, color: 'var(--ink-70)' }}>★ {f.rating} · {f.n} отзывов</span>
            </div>
            <div style={{ flex: '0 0 40%', height: compact ? 82 : 150, overflow: 'hidden', border: '1px solid var(--line)' }}>
              {imgErr ? <div style={{ width: '100%', height: '100%', backgroundImage: 'repeating-linear-gradient(135deg, ' + t.tint + ' 0 10px, #fff 10px 20px)', display: 'flex', alignItems: 'flex-end', padding: 6 }}><span style={{ fontFamily: 'var(--mono)', fontSize: 8.5, letterSpacing: '.05em', textTransform: 'uppercase', color: t.color, background: 'rgba(255,255,255,.7)', padding: '2px 5px' }}>фото работ</span></div>
                : <img src={demoSrc(f.img, 480)} alt="" onError={() => setImgErr(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />}
            </div>
          </div>
          <div style={{ borderTop: '1px solid var(--line)' }}>
            {f.items.slice(0, compact ? 2 : 3).map((it, i) => <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 10, padding: compact ? '5px 0' : '6px 0', borderBottom: '1px solid var(--line)', fontSize: 12.5 }}><span style={{ color: 'var(--ink)', fontWeight: 500 }}>{it[0]}</span><span style={{ flex: 1, borderBottom: '1px dotted var(--line-2)' }} /><span style={{ fontFamily: 'var(--mono)', fontSize: 11.5 }}>{it[1]}</span></div>)}
          </div>
          <div style={{ borderLeft: '2px solid ' + t.color, paddingLeft: 10 }}>
            <div style={{ fontStyle: 'italic', fontSize: compact ? 12 : 12.5, lineHeight: 1.35, color: 'var(--ink)' }}>{f.revs[0][0]}</div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 9.5, color: 'var(--ink-45)', marginTop: 3 }}>{f.revs[0][1]}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto' }}>
            <span style={{ background: t.color, color: '#fff', fontWeight: 700, fontSize: 12.5, padding: compact ? '8px 13px' : '9px 15px', flex: 'none' }}>Записаться</span>
            <span style={{ fontSize: 11, color: 'var(--ink-45)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.addr}</span>
          </div>
        </div>
      </div>
    );
  }
  function SkeletonDemo({ height }) {
    const L = (w, h, extra) => <span className="ss-skel" style={{ display: 'block', width: w, height: h || 12, ...(extra || {}) }} />;
    return (
      <div style={{ height, background: '#fff', display: 'flex', flexDirection: 'column' }} aria-label="Загружаем пример…">
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '9px 12px', borderBottom: '1px solid var(--line)', background: 'var(--bone)', flex: '0 0 auto' }}>
          <span style={{ display: 'inline-flex', gap: 5 }}>{[0, 1, 2].map(i => <span key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--line-2)' }} />)}</span>
          <span style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>{L(130, 18)}</span><span style={{ width: 31 }} />
        </div>
        <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13, overflow: 'hidden' }}>
          {L('34%', 10)}{L('82%', 28)}{L('60%', 28)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 6 }}>{L('100%', 13)}{L('100%', 13)}{L('90%', 13)}</div>
          <div style={{ display: 'flex', gap: 12, marginTop: 6, alignItems: 'center' }}>{L(118, 36)}{L(90, 11)}</div>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--ink-45)', textAlign: 'center', marginTop: 4 }}>Загружаем пример…</span>
        </div>
      </div>
    );
  }

  // ═════════ In2_ шаги (controlled) ═════════
  // 01 · Пример
  function In2_StepExample({ niche = 'Маникюр', onNicheChange, loading, onClaim, mobile }) {
    const other = niche === 'Другое';
    return (
      <div data-intake-step="example" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div role="tablist" aria-label="Тип деятельности" style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {NICHE_ORDER.map(n => <button key={n} type="button" role="tab" aria-selected={niche === n} data-niche-id={n} onClick={() => onNicheChange && onNicheChange(n)} className={'chip' + (niche === n ? ' is-active' : '')} style={{ fontSize: 14.5 }}>{n}</button>)}
          <button type="button" role="tab" aria-selected={other} data-niche-id="Другое" onClick={() => onNicheChange && onNicheChange('Другое')} className={'chip chip--other' + (other ? ' is-active' : '')} style={{ fontSize: 14.5 }}>Другое</button>
        </div>
        {other ? (
          <div style={{ padding: '30px 22px', textAlign: 'center', border: '1px dashed var(--line-2)', background: 'var(--bone)' }}>
            <div style={{ fontFamily: 'var(--display)', fontSize: 22, color: 'var(--ink)', marginBottom: 8 }}>Соберём под ваше направление</div>
            <p style={{ ...S.hint, maxWidth: 380, margin: '0 auto' }}>Дизайн и тексты подстроим под ваши работы — примеры выше показывают, как это выглядит у бьюти-мастеров.</p>
          </div>
        ) : mobile ? (
          <div style={{ margin: '2px -18px -20px', padding: '16px 18px 0', background: '#E9E0CD', borderTop: '1px solid var(--line-2)' }}>
            <div style={{ overflow: 'hidden' }}>{loading ? <SkeletonDemo height={452} /> : <DemoSite niche={niche} height={452} />}</div>
          </div>
        ) : (
          <div style={{ margin: '2px -32px -26px', padding: '24px 32px 0', background: '#E9E0CD', borderTop: '1px solid var(--line-2)' }}>
            <div style={{ maxWidth: 830, margin: '0 auto', overflow: 'hidden' }}>{loading ? <SkeletonDemo height={520} /> : <DemoSite niche={niche} height={520} />}</div>
          </div>
        )}
      </div>
    );
  }
  function In2_StepExampleFooter({ onClaim }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className="btn btn--block" type="button" data-cta="claim-example" onClick={onClaim}>Собрать такой для меня <span className="arw">→</span></button>
        <span style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-70)' }}>Меньше минуты. Контакты пока не нужны</span>
      </div>
    );
  }

  // 02 · Источник (+ ✗A / ✗B возвраты)
  function AltList({ title, mode, onPick, exclude }) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={S.label}>{title}</span>
        {['name', 'screenshot', 'link', 'photo'].filter(id => id !== exclude).map(id => <AltPath key={id} icon={ALT_PATHS[id].icon} label={ALT_PATHS[id].label} sub={ALT_PATHS[id].sub} active={id === mode} data-source-path={id} onClick={() => onPick(id)} />)}
      </div>
    );
  }
  function In2_StepSource(props) {
    const { path = 'name', onPathChange, name = '', city = '', onName, onCity, openCity, link = '', onLink, screenshotName = '', onScreenshot, photos = 0, onPhotos, refineHint, niche = 'Маникюр', mobile } = props;
    let pane = null, cta = null;
    if (path === 'name') {
      pane = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {refineHint && <div style={{ border: '1px solid #DFC391', background: '#F8F1E1', color: '#8A5A24', padding: '10px 13px', fontSize: 13.5, lineHeight: 1.45 }}>Сверьте название с вывеской и добавьте город — так найдём точнее.</div>}
          <Field label="Название вашего дела">
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-45)', pointerEvents: 'none' }}><Icon d={['M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14z', 'm20 20-3.5-3.5']} size={17} /></span>
              <input style={{ ...S.input, paddingLeft: 36 }} value={name} placeholder="Студия Анны" onChange={e => onName && onName(e.target.value)} />
            </div>
          </Field>
          <Field label="Город (необязательно)"><CityInput value={city} onChange={v => onCity && onCity(v)} forceOpen={openCity} /></Field>
        </div>
      );
      cta = <Cta ok={!!name.trim()} onClick={props.onSubmit} missing="название" data-cta="source-next">Найти на Картах</Cta>;
    } else if (path === 'screenshot') {
      pane = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Uploader key="shot" label="Скриншот карточки" sub="Перетащите, вставьте (Ctrl+V) или выберите файл" accept="image/*" icon={<Icon d={['M3 4.5h18v15H3z', 'm3 15 5-5 4 4 3-3 6 6']} size={20} />} initial={screenshotName ? [{ name: screenshotName, size: 1363149 }] : []} onFiles={arr => onScreenshot && onScreenshot(arr[0] ? arr[0].name : '')} />
          <p style={S.hint}>Распознаём только название и город — качество не важно. Не распознаем — попросим ввести руками.</p>
        </div>
      );
      cta = <Cta ok={!!screenshotName} onClick={props.onSubmit} missing="скриншот" data-cta="source-next">Распознать карточку</Cta>;
    } else if (path === 'link') {
      const li = linkInfo(link);
      const linkOk = li.state === 'ok' || li.state === 'unknown';
      const lf = DEMO_FIX[niche] || DEMO_FIX['Маникюр'];
      pane = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Field label="Ссылка на профиль"><LinkInput value={link} onChange={v => onLink && onLink(v)} /></Field>
          {li.state === 'ok' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 13, padding: '12px 14px', border: '1px solid var(--line)', background: 'var(--bone)' }}>
              <img src={demoSrc(lf.img, 120)} alt="" style={{ width: 46, height: 46, objectFit: 'cover', flex: 'none', border: '1px solid var(--line-2)' }} />
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 14.5, color: 'var(--ink)' }}>{lf.brand} <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--accent)', border: '1px solid var(--line-2)', padding: '2px 8px', marginLeft: 6, verticalAlign: '2px' }}>{li.provider}</span></div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-45)', marginTop: 2 }}>Подтянем отсюда фото, услуги и цены</div>
              </div>
            </div>
          )}
        </div>
      );
      cta = <Cta ok={linkOk} onClick={props.onSubmit} missing={li.state === 'invalid' ? 'рабочая ссылка' : 'ссылка'} data-cta="source-next">Собрать по ссылке</Cta>;
    } else {
      pane = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Uploader key="ph" label="Фото работ или прайса" sub="Перетащите, вставьте (Ctrl+V) или выберите до 5 фото" multiple accept="image/*" icon={<Icon d={['M3 4.5h18v15H3z', 'M8.5 10a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3', 'm21 16-5-5-8 8']} size={20} />} initial={photos ? Array.from({ length: Math.min(photos, 5) }, (_, i) => ({ name: 'Фото ' + (i + 1), size: [2516582, 1887436, 3250585, 2306867, 1677722][i] })) : []} onFiles={arr => onPhotos && onPhotos(arr.length)} />
          <p style={S.hint}>Нечитаемый прайс не помешает отправке — попросим переснять уже в мессенджере.</p>
        </div>
      );
      cta = <Cta ok={!!photos} onClick={props.onSubmit} missing="хотя бы одно фото" data-cta="source-next">Собрать из фото</Cta>;
    }
    const alts = <AltList title="Способы" mode={path} onPick={id => onPathChange && onPathChange(id)} />;
    return {
      body: (
        <div data-intake-step="source">
          {mobile ? <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{pane}<div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>{alts}</div></div>
            : <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}><div style={{ flex: 1.25, minWidth: 0 }}>{pane}</div><div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--line)', paddingLeft: 30 }}>{alts}</div></div>}
        </div>
      ),
      footer: cta,
    };
  }
  // ✗A / ✗B — «не нашли»
  function In2_StepNotFound({ path = 'name', name = '', city = '', onPick, onRetry, mobile }) {
    const shot = path === 'screenshot';
    const text = <p style={S.hint}>{shot ? 'Не смогли прочитать название со скриншота — такое бывает с обрезанными кадрами. Попробуйте другой способ: всё, что вы ввели, сохранено.' : 'По запросу «' + ((name || '').trim() || 'без названия') + '»' + (city ? ' · ' + city : '') + ' ничего не нашли на Картах и в 2ГИС. Проверьте написание — или зайдите с другой стороны.'}</p>;
    const alts = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <span style={S.label}>Другие способы</span>
        {!shot && <AltPath icon={ALT_PATHS.screenshot.icon} label={ALT_PATHS.screenshot.label} sub={ALT_PATHS.screenshot.sub} data-source-path="screenshot" onClick={() => onPick('screenshot')} />}
        <AltPath icon={ALT_PATHS.link.icon} label={ALT_PATHS.link.label} sub={ALT_PATHS.link.sub} data-source-path="link" onClick={() => onPick('link')} />
        <AltPath icon={ALT_PATHS.photo.icon} label={ALT_PATHS.photo.label} sub={ALT_PATHS.photo.sub} data-source-path="photo" onClick={() => onPick('photo')} />
      </div>
    );
    return {
      body: <div data-intake-step="source">{mobile ? <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>{text}<div style={{ borderTop: '1px solid var(--line)', paddingTop: 16 }}>{alts}</div></div> : <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}><div style={{ flex: 1.25, minWidth: 0 }}>{text}</div><div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--line)', paddingLeft: 30 }}>{alts}</div></div>}</div>,
      footer: <button className="btn btn--block" type="button" data-cta="source-next" onClick={onRetry}>{shot ? 'Ввести название руками' : 'Изменить название и город'} <span className="arw">→</span></button>,
    };
  }

  // 2.5 · Распознавание
  function In2_StepRecognize({ onCancel }) {
    return {
      body: (
        <div data-intake-step="recognize" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 18, padding: '32px 0' }}>
          <div className="ss-spin" style={{ width: 46, height: 46, borderRadius: '50%', border: '3px solid var(--line-2)', borderTopColor: 'var(--accent)' }} />
          <p style={{ ...S.hint, textAlign: 'center' }}>Читаем название и город со скриншота, ищем карточку на Картах…</p>
        </div>
      ),
      footer: <button className="tlink" type="button" onClick={onCancel} style={{ display: 'block', margin: '0 auto', fontWeight: 500, color: 'var(--ink-45)' }}>Отменить</button>,
    };
  }

  // 03 · Подтверждение карточки
  function In2_StepConfirmCard({ candidates = [], selectedId = 0, onSelect, onConfirm, onReject, path, mobile }) {
    return {
      body: (
        <div data-intake-step="confirm" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <p style={S.hint}>{path === 'screenshot' ? 'Распознали скриншот и нашли похожие карточки. Выберите вашу:' : 'Нашли похожие карточки. Выберите вашу:'}</p>
          <div role="radiogroup" aria-label="Найденные карточки" style={{ display: mobile ? 'flex' : 'grid', flexDirection: 'column', gridTemplateColumns: '1fr 1fr', gap: 10, alignItems: 'stretch' }}>
            {candidates.map((c, i) => {
              const on = i === selectedId;
              return (
                <button key={i} type="button" role="radio" aria-checked={on} data-candidate-idx={i} onClick={() => onSelect && onSelect(i)} style={{ position: 'relative', textAlign: 'left', padding: '15px 16px', border: on ? '1.5px solid var(--accent)' : '1px solid var(--line-2)', background: on ? 'var(--bone)' : '#fff', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6, font: 'inherit', transition: 'border-color .14s, background .14s' }}>
                  <span style={{ position: 'absolute', top: 12, right: 12, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--ink-45)', border: '1px solid var(--line-2)', background: '#fff', padding: '3px 7px' }}>{c.source}</span>
                  <span style={{ fontFamily: 'var(--display)', fontSize: 21, color: 'var(--ink)', paddingRight: 92, lineHeight: 1.05 }}>{c.brand}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--ink-70)', fontSize: 14 }}><Icon d={['M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z', 'M12 10.2a2.2 2.2 0 1 0 0-.1']} size={15} sw={2} /> {c.address}</span>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--ink)' }}>★ {c.rating} · {c.reviewsN} отзывов</span>
                </button>
              );
            })}
          </div>
        </div>
      ),
      footer: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button className="btn btn--block" type="button" data-cta="card-confirm" onClick={onConfirm}>Да, собирать <span className="arw">→</span></button>
          <button className="tlink" type="button" onClick={onReject} style={{ alignSelf: 'center', fontWeight: 500, color: 'var(--ink-45)' }}>Ничего из этого — искать ещё</button>
        </div>
      ),
    };
  }

  // 04 · Запись
  function In2_StepBooking({ platform = 'dikidi', onPlatformChange, url = '', onUrl, phone = '', onPhone, mobile }) {
    const showUrl = platform === 'dikidi' || platform === 'yclients';
    const showPhone = platform === 'phone';
    const ui = bookingUrlInfo(url);
    const phoneOk = !showPhone || (phone || '').trim() === '' || (phone || '').replace(/\D/g, '').length === 11;
    const bok = !!platform && (showUrl ? ui.state !== 'invalid' : true) && phoneOk;
    const form = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={S.hint}>Запись оставим вашей: кнопка «Записаться» на сайте поведёт туда, где вам удобно.</p>
        <div role="radiogroup" aria-label="Как записываетесь" style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {BOOKING.map(b => <Chip key={b.id} active={platform === b.id} data-booking-platform={b.id} onClick={() => onPlatformChange && onPlatformChange(b.id)}>{b.label}</Chip>)}
        </div>
        {showUrl && <BookingLink value={url} onChange={v => onUrl && onUrl(v)} />}
        {showPhone && <BookingPhone value={phone} onChange={v => onPhone && onPhone(v)} />}
        {platform === 'none' && <p style={{ ...S.hint, fontSize: 13.5, color: 'var(--ink-45)' }}>Не страшно: поставим кнопку «Написать» — заявки придут в мессенджер.</p>}
      </div>
    );
    const aside = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={S.label}>Как это работает</span>
        {[['01', 'На сайте появится кнопка «Записаться»'], ['02', 'Она ведёт туда, где вы уже ведёте запись'], ['03', 'Поменять способ можно в любой момент']].map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', flex: 'none' }}>{r[0]}</span><span style={{ fontSize: 14.5, color: 'var(--ink-70)' }}>{r[1]}</span></div>)}
      </div>
    );
    return {
      body: <div data-intake-step="booking">{mobile ? form : <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}><div style={{ flex: 1.25, minWidth: 0 }}>{form}</div><div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--line)', paddingLeft: 30 }}>{aside}</div></div>}</div>,
      footer: <Cta ok={bok} onClick={props => {}} missing={!platform ? 'выбрать, как записываетесь' : showPhone ? 'номер целиком — или очистите поле' : 'рабочая ссылка — или очистите поле'} data-cta="booking-next">Дальше</Cta>,
      bok,
    };
  }

  // 05 · Контакты
  function In2_StepContacts({ channel = 'Telegram', onChannel, contact = '', onContact, consent = false, onConsent, submitError, hrefs, touched, mobile }) {
    const okContact = contactValid(channel, contact);
    const ok = okContact && consent;
    const missing = [okContact ? null : 'контакт', consent ? null : 'согласие'].filter(Boolean).join(' и ');
    const aStyle = { color: 'var(--accent)', textDecoration: 'underline', textUnderlineOffset: 2 };
    const H = hrefs || { politika: 'docs/politika.html', oferta: 'docs/oferta.html' };
    const form = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={S.hint}>Готовый черновик пришлём туда, где удобно отвечать. Ничего не публикуем без вашего «да».</p>
        <div role="radiogroup" aria-label="Канал связи" style={{ display: 'flex', flexWrap: 'wrap', gap: 9 }}>
          {CHANNELS.map(c => <Chip key={c} active={channel === c} data-contact-channel={c} onClick={() => onChannel && onChannel(c)}>{c}</Chip>)}
        </div>
        <ContactInput channel={channel} value={contact} onChange={v => onContact && onContact(v)} initialTouched={touched} />
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 13.5, color: 'var(--ink-70)' }}>
          <input type="checkbox" checked={consent} onChange={e => onConsent && onConsent(e.target.checked)} style={{ marginTop: 2, accentColor: 'var(--accent)', width: 17, height: 17 }} />
          <span>Согласен на <a href={H.politika} target="_blank" rel="noopener" style={aStyle}>обработку персональных данных</a> и с <a href={H.oferta} target="_blank" rel="noopener" style={aStyle}>офертой</a></span>
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: 'var(--ink-45)' }}><Icon d={['M12 3l7 3v5c0 4.6-3 8.4-7 10-4-1.6-7-5.4-7-10V6z', 'm9 12 2 2 4-4']} size={15} sw={1.8} /> От роботов защищает невидимая проверка — вводить ничего не нужно</div>
        {submitError && <div role="alert" style={{ display: 'flex', alignItems: 'flex-start', gap: 9, border: '1px solid #D98A8A', background: '#FAEFEE', padding: '11px 13px', fontSize: 13.5, lineHeight: 1.45, color: '#B23B3B' }}><span style={{ flex: 'none', marginTop: 1 }}><Icon d={['M12 8v5', 'M12 16h.01', 'M12 3 2 20h20L12 3z']} size={16} sw={2} /></span><span>Не получилось отправить заявку. Проверьте интернет и попробуйте ещё раз — форма заполнена, вводить заново ничего не нужно.</span></div>}
      </div>
    );
    const aside = (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={S.label}>Что дальше</span>
        {[['01', 'Пришлём черновик — посмотрите по ссылке'], ['02', 'Скажете «да» — или что поправить'], ['03', 'Публикуем. Адрес и запись — ваши']].map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', flex: 'none' }}>{r[0]}</span><span style={{ fontSize: 14.5, color: 'var(--ink-70)' }}>{r[1]}</span></div>)}
        <p style={{ fontSize: 12.5, color: 'var(--ink-45)', marginTop: 4 }}>Контакт нужен только для черновика — никаких рассылок.</p>
      </div>
    );
    return {
      body: <div data-intake-step="contacts">{mobile ? form : <div style={{ display: 'flex', gap: 30, alignItems: 'stretch' }}><div style={{ flex: 1.25, minWidth: 0 }}>{form}</div><div style={{ flex: 1, minWidth: 0, borderLeft: '1px solid var(--line)', paddingLeft: 30 }}>{aside}</div></div>}</div>,
      footer: <Cta ok={ok} onClick={props => {}} missing={missing} data-cta="submit">{submitError ? 'Повторить отправку' : 'Отправить заявку →'}</Cta>,
      ok,
    };
  }

  // ✓ · Готово
  function In2_StepDone({ channel = 'Telegram', contact = '@anna_nails', onEditContact, onClose, foundCard, mobile }) {
    return {
      body: (
        <div data-intake-step="done" style={{ display: 'flex', flexDirection: 'column', gap: 18, padding: '4px 0 2px', maxWidth: 520, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 13, textAlign: 'center' }}>
            <span style={{ width: 62, height: 62, borderRadius: '50%', background: 'var(--accent)', color: 'var(--on-accent)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon d={['M20 6 9 17l-5-5']} size={30} sw={2.4} /></span>
            <h3 style={{ fontFamily: 'var(--display)', fontSize: 26, color: 'var(--ink)' }}>Собираем ваш черновик</h3>
            <p style={{ ...S.hint, maxWidth: 400 }}>Пришлём в {channel}{contact ? ' на ' + contact : ''} примерно через 2 часа.{' '}<button className="tlink" type="button" onClick={onEditContact} style={{ fontWeight: 600, color: 'var(--accent)' }}>Изменить</button></p>
          </div>
          <div style={{ borderTop: '1px solid var(--line)', paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span style={S.label}>Что дальше</span>
            {[['01', 'Посмотрите черновик по ссылке'], ['02', 'Скажете «да» — или что поправить'], ['03', 'Публикуем. Адрес и запись — ваши']].map(r => <div key={r[0]} style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}><span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', flex: 'none' }}>{r[0]}</span><span style={{ fontSize: 14.5, color: 'var(--ink-70)' }}>{r[1]}</span></div>)}
          </div>
          {foundCard && <p style={{ fontFamily: 'var(--mono)', fontSize: 12.5, color: 'var(--ink-70)' }}>Карточка: {foundCard.brand}</p>}
        </div>
      ),
      footer: <button className="btn btn--block" type="button" data-cta="done-close" onClick={onClose}>Понятно</button>,
    };
  }

  // ═════════ In2_Modal — оболочка + прогресс + баннеры ═════════
  function In2_Modal({ step, title, canBack, onBack, onClose, progress, restored, onDraftReset, submitError, onRetry, closeConfirm, onConfirmClose, onCancelClose, body, footer, footerOverride, mobile, embedded }) {
    const cardMax = 960;
    const outer = embedded
      ? { position: 'relative', height: '100%', display: 'flex', alignItems: 'stretch', justifyContent: 'center', background: 'transparent' }
      : { position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(27,23,18,.55)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)', display: 'flex', alignItems: mobile ? 'flex-end' : 'center', justifyContent: 'center' };
    const sheet = embedded
      ? { width: '100%', height: '100%', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }
      : { width: mobile ? '100%' : 'min(' + cardMax + 'px, calc(100vw - 40px))', maxHeight: mobile ? '94vh' : '90vh', background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' };
    return (
      <div className="in2" style={outer} role="dialog" aria-modal="true" aria-label="Собрать сайт">
        <div style={sheet}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 16px', borderBottom: '1px solid var(--line)', flex: '0 0 auto' }}>
            {canBack ? <button className="ss-iconbtn" type="button" onClick={onBack} aria-label="Назад"><Icon d={['M15 18l-6-6 6-6']} size={20} sw={2} /></button> : <span style={{ width: 38 }} />}
            <div style={{ flex: 1, minWidth: 0, textAlign: 'center' }}>{title ? <div style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: mobile ? 21 : 24, lineHeight: 1.04, letterSpacing: '-.01em', color: 'var(--ink)' }}>{title}</div> : null}</div>
            <button className="ss-iconbtn" type="button" onClick={onClose} aria-label="Закрыть"><Icon d={['M18 6 6 18', 'm6 6 12 12']} size={20} sw={2} /></button>
          </div>
          {progress != null && <div style={{ height: 3, background: 'var(--line)', flex: '0 0 auto' }}><div style={{ height: '100%', width: (progress * 100) + '%', background: 'var(--accent)', transition: 'width .3s cubic-bezier(.2,.7,.3,1)' }} /></div>}
          <div style={{ padding: mobile ? '20px 18px' : '26px 32px', overflowY: 'auto', flex: 1 }}>
            {restored && <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10, background: 'var(--bone)', border: '1px solid var(--line-2)', padding: '9px 12px', marginBottom: 16, fontSize: 13.5, color: 'var(--ink-70)' }}><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Icon d={['M3 12a9 9 0 1 0 3-6.7', 'M3 4v5h5']} size={15} sw={2} /> Продолжаем с сохранённого места</span><button className="tlink" type="button" onClick={onDraftReset} style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-45)', whiteSpace: 'nowrap' }}>Начать заново</button></div>}
            {body}
          </div>
          {footer && <div style={{ padding: mobile ? '14px 18px' : '16px 26px 22px', borderTop: '1px solid var(--line)', flex: '0 0 auto' }}><div style={{ maxWidth: mobile ? 'none' : 460, margin: '0 auto' }}>{footer}</div></div>}
          {closeConfirm && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 6, background: 'rgba(251,249,244,.95)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }} role="alertdialog" aria-label="Закрыть форму?">
              <div style={{ textAlign: 'center', maxWidth: 340, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontFamily: 'var(--display)', fontWeight: 700, fontSize: 26, color: 'var(--ink)' }}>Закрыть форму?</h3>
                <p style={{ ...S.hint, marginBottom: 10 }}>Ввод сохранили — когда вернётесь, продолжите с этого же места.</p>
                <button className="btn btn--block" type="button" onClick={onCancelClose}>Продолжить заполнение</button>
                <button className="tlink" type="button" onClick={onConfirmClose} style={{ marginTop: 6, fontWeight: 500, color: 'var(--ink-45)' }}>Закрыть</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

// [vitrina] converter repair: In2_CSS/In2_Styles уже экспортированы инлайном выше —
// дубли в этом блоке ломали ESM-сборку (Multiple exports). Отправлено Claude Design.
export { In2_Modal, In2_StepExample, In2_StepExampleFooter, In2_StepSource, In2_StepNotFound, In2_StepRecognize, In2_StepConfirmCard, In2_StepBooking, In2_StepContacts, In2_StepDone, NICHE_LIB_V2 };
