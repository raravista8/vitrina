'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
// @samosite/canon · landing v5 — 5 полноразмерных сайтов-примеров + takeover-просмотрщик (canon 0.14.0).
// Каждый сайт = развитая версия миниатюры из EXAMPLES (v5.tsx): первый экран узнаваемо совпадает,
// ниже сайт «разворачивается» — полный прайс, галерея, отзывы, о мастере, контакты, футер-watermark.
// Наследует палитру/шрифт/персонажа/анатомию. Все CTA внутри сайтов — FakeCTA (инертны).
// Публичный API §4: FullComp-компоненты (Nail/Barber/Skin/Brow/ColoristSite) + V5_SiteViewer.
import React, { useState, useEffect, useRef } from 'react';
import { VT } from '../tokens';
import {
  MONO, SANS, INK, INK70, LINE2, BONE, ACCENT,
  Pn, Pb, Ps, Pr, Pc, Img, Stars, SiteHead, Wrap,
  SectionHead, PriceList, Gallery, Reviews, About, Contacts, Watermark,
  useCompact, useNarrow,
} from './v5-sites-kit';
import { type ExampleEntry } from './v5';


  // ритм-обёртка секции
  function Sec({ P, bg, pad, top, children, wrap = true, max }: any) {
    const inner = wrap ? <Wrap max={max}>{children}</Wrap> : children;
    return <section style={{ background: bg || P.bg, paddingBlock: pad || 'clamp(48px,6vw,92px)', paddingTop: top }}>{inner}</section>;
  }

  // ─────────────────────────── 1 · МАНИКЮР — Студия Анны ───────────────────────────
  export function NailSite() {
    const P = Pn, compact = useCompact();
    const gal = [
      { src: 'img/nails.png', label: 'аппаратный · нюд', pos: 'center 40%', span: 2, ratio: '2 / 1' },
      { id: 'photo-1604654894610-df63bc536371', label: 'френч', ph: ['#E7C9C9', '#D9AEB2', '#7A3A44'] },
      { src: 'img/manicure.jpg', label: 'глянец', pos: 'center' },
      { id: 'photo-1632345031435-8727f6897d53', label: 'дизайн на два', ph: ['#E7C9C9', '#D9AEB2', '#7A3A44'] },
      { id: 'photo-1519014816548-bf5fe059798b', label: 'снятие · чистка', ph: ['#E7C9C9', '#D9AEB2', '#7A3A44'] },
      { id: 'photo-1610992015732-2449b76344bc', label: 'уход за кутикулой', ph: ['#E7C9C9', '#D9AEB2', '#7A3A44'] },
      { id: 'photo-1607779097040-26e80aa78e66', label: 'втирка', ph: ['#E7C9C9', '#D9AEB2', '#7A3A44'] },
    ];
    return (
      <div style={{ background: P.bg, color: P.ink }}>
        <SiteHead P={P} name="Студия Анны" meta="Екатеринбург · маникюр" anchors={['Услуги', 'Работы', 'Отзывы', 'Контакты']} cta={'Записаться в Telegram'} />
        <div style={{ position: 'relative', height: compact ? 380 : 'clamp(460px,58vw,600px)' }}>
          <Img src="img/nails.png" label="маникюр · макро" ph={['#E7C9C9', '#D9AEB2', '#7A3A44']} pos="center 45%" />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,15,.64) 0%, rgba(20,16,15,0) 46%)' }} />
          <Wrap style={{ position: 'absolute', left: 0, right: 0, bottom: compact ? 22 : 40 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: '#fff', opacity: .92, marginBottom: 14 }}>Аппаратный маникюр · без спешки</div>
            <h1 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: compact ? 40 : 'clamp(52px,6.4vw,84px)', lineHeight: .96, letterSpacing: '-.01em', color: '#FBFBFC', maxWidth: '15ch' }}>Аппаратный маникюр,<br /><span style={{ fontStyle: 'italic', color: '#F4C9C4' }}>держится 3&nbsp;недели</span></h1>
          </Wrap>
        </div>
        <Sec P={P} pad="clamp(40px,5vw,72px)">
          <About P={P} kicker="О мастере"
            title={'Работаю одна, без спешки — один клиент в час'}
            text={['Аппаратный маникюр без пропилов и боли: спиливаю только огрубевшую кожу, ногтевую пластину не трогаю. Инструмент после каждого клиента проходит сухожаровой шкаф.', 'Работаю сама, поэтому знаю каждого по имени и помню, что делали в прошлый раз.']}
            facts={[['8 лет', 'у кресла'], ['3 недели', 'носибельность покрытия'], ['1 час', 'на одного клиента']]}
            photo={{ src: 'img/manicure.jpg', label: 'Анна · за работой', pos: 'center' }} />
        </Sec>
        <Sec P={P} bg="#FBF4F1" pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Цены за июль" title="Прайс" accentWord="без догоняющих доплат" />
          <PriceList P={P} groups={[
            { label: 'Маникюр', rows: [['Маникюр + однотонное покрытие', '2 400 ₽', 'аппаратный, бережно · 1,5 ч'], ['Маникюр без покрытия', '1 500 ₽', 'форма, кутикула, уход'], ['Снятие чужого покрытия', '400 ₽', 'аккуратно, без пропилов']] },
            { label: 'Дизайн и укрепление', rows: [['Дизайн на 2 ногтя', '300 ₽', 'от простого до сложного'], ['Френч / лунки', '500 ₽', 'ровная линия от руки'], ['Укрепление акригелем', '600 ₽', 'для тонких и ломких'], ['Втирка / хром', '350 ₽', 'зеркальный блеск']] },
            { label: 'Уход', rows: [['Парафинотерапия рук', '700 ₽', 'тёплый уход · 20 мин'], ['SPA-уход с массажем', '900 ₽', 'кожа рук после зимы']] },
          ]} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Работы" title="Свежие работы" accentWord="из Instagram" />
          <Gallery items={gal} cols={3} />
        </Sec>
        <Sec P={P} bg="#FBF4F1" pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Отзывы · Яндекс" title="Что пишут клиенты" />
          <Reviews P={P} items={[
            { n: 5, source: 'Яндекс', text: '«Анна спокойная, объясняет, что делает. Никогда не было сколов»', who: 'Олеся Н. · 3 дня назад' },
            { n: 5, source: 'Яндекс', text: '«Держится ровно три недели, как и обещали. Хожу только к ней»', who: 'Марина К. · 2 недели назад' },
            { n: 5, source: '2ГИС', text: '«Стерильно, не больно, тихая музыка. Выхожу как из спа, а не с маникюра»', who: 'Дарья П. · месяц назад' },
          ]} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <Contacts P={P} title="Записаться к Анне"
            addr={'Екатеринбург, ул. Малышева 51,\nБЦ «Высоцкий», офис по записи'}
            hours={'Пн–Сб 10:00–20:00\nВс — по договорённости'}
            phone={'Telegram и WhatsApp @anna_nails'}
            cta={'Записаться в Telegram'} note={'Ответ обычно в течение часа'} />
        </Sec>
        <Watermark P={P} name="Студия Анны" city="Екатеринбург · маникюр" />
      </div>
    );
  }

  // ─────────────────────────── 2 · БАРБЕРШОП — «Фёдор» ───────────────────────────
  export function BarberSite() {
    const P = Pb, narrow = useNarrow(), compact = useCompact();
    const Poster = ({ children, size }: any) => <h2 style={{ margin: 0, fontFamily: P.serif, fontWeight: 700, fontSize: size || 'clamp(30px,4vw,52px)', lineHeight: .92, letterSpacing: '.004em', textTransform: 'uppercase', color: P.ink }}>{children}</h2>;
    return (
      <div style={{ background: P.bg, color: P.ink }}>
        <SiteHead P={P} name="БАРБЕРШОП «ФЁДОР»" meta="Москва · с 2018" anchors={['Прайс', 'Мастера', 'Работы', 'Адрес']} cta="Записаться" />
        <div style={{ display: 'grid', gridTemplateColumns: narrow ? '1fr' : '1.1fr .9fr', borderBottom: `1px solid ${P.line}` }}>
          <div style={{ padding: compact ? '30px 20px' : 'clamp(40px,5vw,72px) clamp(28px,4vw,56px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.soft, marginBottom: 18 }}>Только мужские стрижки · Москва</div>
            <h1 style={{ margin: 0, fontFamily: P.serif, fontWeight: 700, fontSize: compact ? 60 : 'clamp(76px,9vw,132px)', lineHeight: .86, letterSpacing: '.004em', textTransform: 'uppercase', color: P.ink }}>Стрижка<br /><span style={{ color: P.accent }}>+ борода</span><br />за 45 минут</h1>
            <p style={{ margin: '24px 0 0', fontFamily: SANS, fontSize: 15, lineHeight: 1.5, color: P.soft, maxWidth: '34ch' }}>Виски бесплатно, если зайдёте подравняться между стрижками. Кофе за&nbsp;счёт заведения</p>
          </div>
          <div style={{ minHeight: compact ? 240 : 'auto', borderTop: narrow ? `1px solid ${P.line}` : 'none' }}>
            <Img id="photo-1503951914875-452162b0f3f1" w={900} label="кресло, суббота" ph={['#3A2A1E', '#2A1E14', '#D8C4A8', 'rgba(0,0,0,.4)']} pos="center 25%" />
          </div>
        </div>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <Poster>Прайс</Poster>
          <div style={{ height: 24 }} />
          <PriceList P={P} dense groups={[
            { label: 'Стрижка', rows: [['Мужская стрижка', '2 200 ₽', 'машинка + ножницы'], ['Стрижка + борода', '3 000 ₽', 'с горячим полотенцем'], ['Детская (до 12 лет)', '1 500 ₽', 'терпеливо, без слёз'], ['Камуфляж седины', '1 200 ₽', 'естественно, +к стрижке']] },
            { label: 'Борода и бритьё', rows: [['Моделирование бороды', '1 600 ₽', 'форма под лицо'], ['Опасной бритвой', '1 800 ₽', 'голова или борода'], ['Королевское бритьё', '2 200 ₽', 'полотенца, массаж, уход']] },
          ]} />
        </Sec>
        <Sec P={P} bg="#DED8C9" pad="clamp(44px,5.5vw,80px)">
          <Poster>Как это выглядит</Poster>
          <p style={{ margin: '14px 0 26px', fontFamily: SANS, fontSize: 14.5, color: P.soft, maxWidth: '38ch' }}>Одно фото зала и&nbsp;работы мастеров — снимаем на&nbsp;телефон, без ретуши</p>
          <Gallery items={[
            { id: 'photo-1503951914875-452162b0f3f1', label: 'зал', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'], span: 2, ratio: '2 / 1', pos: 'center 40%' },
            { id: 'photo-1599351431202-1e0f0137899a', label: 'фейд', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'] },
            { id: 'photo-1621605815971-fbc98d665033', label: 'борода', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'] },
            { id: 'photo-1585747860715-2ba37e788b70', label: 'классика', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'] },
            { id: 'photo-1622286342621-4bd786c2447c', label: 'бритьё', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'] },
          ]} cols={3} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <About P={P} kicker="Мастера" reverse
            title={'Три мастера, стрижём с 2018 года'}
            text={['Фёдор, Глеб и Артём. К каждому можно записаться лично — мастер помнит, как стриг вас в прошлый раз, и ведёт свою историю.', 'Не гонимся за потоком: между записями всегда есть 10 минут, чтобы убрать за собой и встретить следующего спокойно.']}
            facts={[['6 лет', 'на одном месте'], ['3', 'мастера в смене'], ['45 мин', 'стрижка + борода']]}
            photo={{ id: 'photo-1622286342621-4bd786c2447c', label: 'мастер за работой', ph: ['#3A2A1E', '#2A1E14', '#D8C4A8'], pos: 'center 30%' }} />
        </Sec>
        <Sec P={P} bg="#DED8C9" pad="clamp(44px,5.5vw,80px)">
          <Poster size="clamp(26px,3vw,40px)">Отзывы</Poster>
          <div style={{ height: 24 }} />
          <Reviews P={P} items={[
            { n: 5, source: 'Яндекс.Карты', text: '«Хожу к Глебу третий год. Всегда вспоминает, как стригли в прошлый раз»', who: 'Антон К. · 4 дня назад' },
            { n: 5, source: 'Яндекс.Карты', text: '«Записался онлайн, пришёл — уже ждут. За 45 минут стрижка, борода и кофе»', who: 'Илья Р. · неделю назад' },
            { n: 5, source: '2ГИС', text: '«Нормальные мужики, без модного пафоса. Делают ровно то, что просишь»', who: 'Сергей В. · 3 недели назад' },
          ]} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <Contacts P={P} title="Записаться в «Фёдор»"
            addr={'Москва, Большая Дмитровка 17\nвход со двора, 2 этаж'}
            hours={'Ежедневно 10:00–22:00\nбез выходных'}
            phone={'Онлайн-запись и Telegram @fedor_barber'}
            cta="Выбрать мастера и время" note={'Можно без записи — в очередь на месте'} />
        </Sec>
        <Watermark P={P} name="Барбершоп «Фёдор»" city="Москва · с 2018" />
      </div>
    );
  }

  // ─────────────────────────── 3 · КОСМЕТОЛОГ — Кабинет Юлии ───────────────────────────
  export function SkinSite() {
    const P = Ps, narrow = useNarrow(), compact = useCompact();
    const Pair = ({ a, b, tag }: any) => (
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', gap: 3, aspectRatio: '3 / 2', overflow: 'hidden', border: `1px solid ${P.line}` }}>
          <div style={{ position: 'relative', flex: 1 }}><Img id={a.id} label="до" ph={a.ph} pos={a.pos} /><span style={{ position: 'absolute', left: 8, top: 8, fontFamily: MONO, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: '#fff', background: 'rgba(0,0,0,.5)', padding: '2px 7px' }}>до</span></div>
          <div style={{ position: 'relative', flex: 1 }}><Img id={b.id} label="после" ph={b.ph} pos={b.pos} /><span style={{ position: 'absolute', left: 8, top: 8, fontFamily: MONO, fontSize: 9.5, letterSpacing: '.1em', textTransform: 'uppercase', color: P.accent, background: '#fff', padding: '2px 7px' }}>после</span></div>
        </div>
        <div style={{ marginTop: 10, fontFamily: SANS, fontSize: 13.5, color: P.soft }}>{tag}</div>
      </div>
    );
    return (
      <div style={{ background: P.bg, color: P.ink }}>
        <SiteHead P={P} name="Кабинет Юлии" meta="Косметолог-эстетист · Казань" anchors={['Услуги', 'Работы', 'О себе', 'Запись']} cta="Записаться" />
        <Sec P={P} pad="clamp(36px,4.5vw,64px)">
          <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 16 }}>Косметолог · медицинское образование</div>
          <h1 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: compact ? 34 : 'clamp(40px,4.6vw,62px)', lineHeight: 1.06, letterSpacing: '-.005em', color: P.ink, maxWidth: '18ch' }}>Сначала смотрим кожу, <span style={{ fontStyle: 'italic', color: P.accent }}>потом выбираем уход</span></h1>
          <div style={{ display: 'flex', gap: 3, height: compact ? 200 : 340, marginTop: 'clamp(24px,3vw,40px)' }}>
            <div style={{ flex: 1, overflow: 'hidden' }}><Img id="photo-1570172619644-dfd03ed5d881" w={720} label="чистка" ph={['#D8C9BE', '#C9B6A8', '#4A3C32']} pos="center 30%" /></div>
            <div style={{ flex: 1, overflow: 'hidden' }}><Img id="photo-1616394584738-fc6e612e71b9" w={720} label="уход" ph={['#E7E7E5', '#D6D6D3', '#3A3E3C']} pos="center 30%" /></div>
          </div>
        </Sec>
        <Sec P={P} bg="#F7FAF9" pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="До и после" title="Реальные результаты" accentWord="без фотошопа" sub={'Фото с согласия клиентов, один и тот же свет и ракурс. Результат зависит от состояния кожи — на консультации скажу честно, чего ждать'} />
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 'clamp(20px,2.4vw,32px)' }}>
            <Pair a={{ id: 'photo-1512290923902-8a9f81dc236c', ph: ['#D8C9BE', '#C9B6A8', '#4A3C32'], pos: 'center 30%' }} b={{ id: 'photo-1570172619644-dfd03ed5d881', ph: ['#E7E7E5', '#D6D6D3', '#3A3E3C'], pos: 'center 30%' }} tag={'Комбинированная чистка · 1 процедура'} />
            <Pair a={{ id: 'photo-1598440947619-2c35fc9aa908', ph: ['#D8C9BE', '#C9B6A8', '#4A3C32'], pos: 'center 30%' }} b={{ id: 'photo-1616394584738-fc6e612e71b9', ph: ['#E7E7E5', '#D6D6D3', '#3A3E3C'], pos: 'center 30%' }} tag={'Курс пилингов · 4 процедуры'} />
          </div>
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Прайс" title="Цены" accentWord="и честная диагностика" />
          <PriceList P={P} groups={[
            { label: 'Чистки и уход', rows: [['Комбинированная чистка', '3 200 ₽', 'с уходом по типу кожи · 1,5 ч'], ['Ультразвуковая чистка', '2 400 ₽', 'поверхностно, без травмы'], ['Уходовая процедура', 'от 2 000 ₽', 'по состоянию кожи']] },
            { label: 'Пилинги и коррекция', rows: [['Пилинг по показаниям', 'от 2 400 ₽', 'подбираем после диагностики'], ['Курс пилингов (4)', '8 400 ₽', 'выгоднее на 1 800 ₽'], ['Уход от купероза', 'от 2 800 ₽', 'мягкие протоколы']] },
            { label: 'Диагностика', rows: [['Первичная диагностика', 'бесплатно', 'разбор кожи и план'], ['Ведение по плану', 'по договорённости', 'сопровождаю между визитами']] },
          ]} />
        </Sec>
        <Sec P={P} bg="#F7FAF9" pad="clamp(44px,5.5vw,80px)">
          <About P={P} kicker="О себе"
            title="Работаю по показаниям, а не по прайсу"
            text={['Медицинское образование и 7 лет в эстетической косметологии. Если процедура вам сейчас не нужна — так и скажу, курс из десяти чисток никому не продаю.', 'Одноразовые расходники при вас, аппараты сертифицированы, кабинет — не квартира, а лицензированное помещение.']}
            facts={[['7 лет', 'в косметологии'], ['мед.', 'образование'], ['4,9 ★', '2ГИС и Яндекс']]}
            photo={{ id: 'photo-1559599101-f09722fb4948', label: 'Юлия · кабинет', ph: ['#E7E7E5', '#D6D6D3', '#3A3E3C'], pos: 'center 25%' }} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Отзывы" title="Что говорят клиенты" />
          <Reviews P={P} items={[
            { n: 5, source: '2ГИС', long: true, text: '«Не впаривает лишнего. Пришла с настроем на курс из десяти чисток, а Юлия посмотрела и сказала: хватит трёх и домашний уход. Так и вышло — кожа спокойная впервые за годы»', who: 'Ольга В. · 1 неделю назад' },
            { n: 5, source: 'Яндекс', text: '«Стерильно, всё при тебе распечатывает. Видно, что медик»', who: 'Регина С. · 2 недели назад' },
            { n: 5, source: 'Яндекс', text: '«Купероз убрали за курс, лицо перестало гореть на морозе»', who: 'Алина Т. · месяц назад' },
          ]} cols={2} />
        </Sec>
        <Sec P={P} bg="#F7FAF9" pad="clamp(44px,5.5vw,80px)">
          <Contacts P={P} title="Записаться на диагностику"
            addr={'Казань, ул. Профсоюзная 12\nлицензированный кабинет, 3 этаж'}
            hours={'Вт–Сб 09:00–19:00\nПн, Вс — выходной'}
            phone={'WhatsApp и Telegram @yulia_skin'}
            cta="Записаться на диагностику" note={'Первичная диагностика — бесплатно'} />
        </Sec>
        <Watermark P={P} name="Кабинет Юлии" city="Казань · косметолог" />
      </div>
    );
  }

  // ─────────────────────────── 4 · БРОВИ — Brow Bar Соль (минимал, много воздуха) ───────────────────────────
  export function BrowSite() {
    const P = Pr, compact = useCompact();
    return (
      <div style={{ background: P.bg, color: P.ink }}>
        <SiteHead P={P} name="Brow Bar Соль" meta="Сочи · брови и ресницы" anchors={['Услуги', 'Работы', 'Запись']} cta="Записаться" />
        <Sec P={P} pad="clamp(64px,9vw,132px)">
          <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: P.soft, marginBottom: 26 }}>Brow Bar Соль · Сочи</div>
            <h1 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: compact ? 40 : 'clamp(48px,6vw,80px)', lineHeight: 1.04, letterSpacing: '-.01em', color: P.ink }}>Брови по вашей <span style={{ fontStyle: 'italic' }}>форме&nbsp;лица</span></h1>
            <p style={{ margin: '26px auto 0', fontFamily: SANS, fontSize: 16.5, lineHeight: 1.6, color: P.soft, maxWidth: '40ch' }}>Две услуги, ничего лишнего. Подбираем форму под черты лица, а не по трафарету</p>
          </div>
          <div style={{ height: compact ? 240 : 420, marginTop: 'clamp(40px,5vw,72px)', maxWidth: 960, marginInline: 'auto' }}>
            <Img id="photo-1616683693504-3ea7e9ad6fec" w={1000} label="брови крупно" ph={['#DED3C0', '#CFC1A8', '#3A3128']} pos="center 32%" />
          </div>
        </Sec>
        <Sec P={P} pad="clamp(56px,7vw,104px)">
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <SectionHead P={P} center kicker="Прайс" title="Две услуги" accentWord="и прозрачные цены" />
            <PriceList P={P} groups={[{ rows: [
              ['Коррекция + окрашивание', '1 400 ₽', 'форма, краска или хна · 40 мин'],
              ['Ламинирование бровей', '2 200 ₽', 'с уходом и окрашиванием · 1 ч'],
              ['Коррекция формы', '700 ₽', 'без окрашивания'],
              ['Снятие / переоформление', '500 ₽', 'после другого мастера'],
            ] }]} />
          </div>
        </Sec>
        <Sec P={P} bg="#E7DCCB" pad="clamp(56px,7vw,104px)">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <SectionHead P={P} center kicker="Работы" title="До и после" />
            <Gallery items={[
              { id: 'photo-1616683693504-3ea7e9ad6fec', label: 'форма', ph: ['#DED3C0', '#CFC1A8', '#3A3128'] },
              { id: 'photo-1583001931096-959e9a1a6223', label: 'ламинирование', ph: ['#DED3C0', '#CFC1A8', '#3A3128'] },
              { id: 'photo-1594744803329-e58b31de8bf5', label: 'окрашивание', ph: ['#DED3C0', '#CFC1A8', '#3A3128'] },
              { id: 'photo-1526045478516-99145907023c', label: 'до/после', ph: ['#DED3C0', '#CFC1A8', '#3A3128'] },
            ]} cols={2} />
          </div>
        </Sec>
        <Sec P={P} pad="clamp(56px,7vw,104px)">
          <div style={{ maxWidth: 620, margin: '0 auto', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <Stars n={5} size={15} gap="3px" />
            <blockquote style={{ margin: 0, fontFamily: P.serif, fontStyle: 'italic', fontSize: compact ? 24 : 30, lineHeight: 1.3, color: P.ink }}>«Форму подобрали идеально, лицо будто открылось. Хожу раз в месяц и не думаю»</blockquote>
            <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: '.04em', color: P.soft }}>Марина В. · 5,0 · Яндекс</span>
          </div>
        </Sec>
        <Sec P={P} bg="#E7DCCB" pad="clamp(56px,7vw,104px)">
          <div style={{ maxWidth: 900, margin: '0 auto' }}>
            <Contacts P={P} title="Записаться онлайн"
              addr={'Сочи, ул. Навагинская 9\nвторой этаж, вход с улицы'}
              hours={'Ежедневно 10:00–20:00'}
              phone={'Telegram @sol_brows'}
              cta="Записаться онлайн" note={'Одна услуга — один час только для вас'} />
          </div>
        </Sec>
        <Watermark P={P} name="Brow Bar Соль" city="Сочи · брови и ресницы" />
      </div>
    );
  }

  // ─────────────────────────── 5 · КОЛОРИСТ — Кира (прайс-меню как главный блок) ───────────────────────────
  export function ColoristSite() {
    const P = Pc, narrow = useNarrow(), compact = useCompact();
    const Menu = ({ items }: any) => (
      <div>
        {items.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 16, padding: '15px 0', borderBottom: i < items.length - 1 ? `1px solid ${P.line}` : 'none' }}>
            <span style={{ fontFamily: MONO, fontSize: 11.5, color: P.soft, flex: '0 0 auto', width: 24 }}>{String(i + 1).padStart(2, '0')}</span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontFamily: SANS, fontWeight: 600, fontSize: 16.5, color: P.ink }}>{r[0]}</div>
              <div style={{ fontFamily: SANS, fontSize: 13, color: P.soft, marginTop: 3 }}>{r[1]}</div>
            </div>
            <span style={{ fontFamily: MONO, fontSize: 14.5, color: P.ink, whiteSpace: 'nowrap' }}>{r[2]}</span>
          </div>
        ))}
      </div>
    );
    return (
      <div style={{ background: P.bg, color: P.ink }}>
        <SiteHead P={P} name="Колорист Кира" meta="Москва · сложное окрашивание" anchors={['Прайс', 'Работы', 'О себе', 'Запись']} cta="Записаться" />
        <Sec P={P} pad="clamp(40px,5vw,72px)">
          <div style={{ display: 'flex', flexDirection: narrow ? 'column' : 'row', gap: 'clamp(24px,3vw,48px)', alignItems: narrow ? 'stretch' : 'flex-end', marginBottom: 'clamp(28px,3.4vw,44px)' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 16 }}>Колорист · airtouch, балаяж, тон в тон</div>
              <h1 style={{ margin: 0, fontFamily: P.serif, fontWeight: 600, fontSize: compact ? 40 : 'clamp(48px,5.6vw,78px)', lineHeight: 1.0, letterSpacing: '-.01em', color: P.ink }}>Прайс <span style={{ fontStyle: 'italic', color: P.accent }}>без звёздочек</span></h1>
              <p style={{ margin: '20px 0 0', fontFamily: SANS, fontSize: 16, lineHeight: 1.55, color: P.soft, maxWidth: '42ch' }}>Цена финальная: тонирование, уход и домашняя схема уже внутри. На консультации скажу вилку до рубля</p>
            </div>
            <div style={{ width: narrow ? '100%' : 220, height: narrow ? 200 : 260, flex: '0 0 auto', overflow: 'hidden' }}>
              <Img id="photo-1580618672591-eb180b1a973f" w={480} label="цвет" ph={['#E7D9E2', '#D6C0CF', '#5A3A50']} pos="center 30%" />
            </div>
          </div>
          <div style={{ background: '#fff', border: `1px solid ${P.ink}`, padding: 'clamp(20px,3vw,36px)' }}>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 8, paddingBottom: 12, borderBottom: `1px solid ${P.line}` }}>Окрашивание</div>
            <Menu items={[
              ['Сложное окрашивание', 'airtouch, балаяж, шатуш · от 3 ч', 'от 6 500 ₽'],
              ['Окрашивание в один тон', 'корни или полностью', 'от 3 800 ₽'],
              ['Тонирование', 'освежить цвет · 1,5 ч', '3 200 ₽'],
              ['Осветление корней', 'отросшие 2–4 см', 'от 3 500 ₽'],
              ['Смывка / коррекция цвета', 'после неудачного окрашивания', 'от 2 800 ₽'],
            ]} />
          </div>
        </Sec>
        <Sec P={P} bg="#EFE2EA" pad="clamp(44px,5.5vw,80px)">
          <div style={{ display: narrow ? 'block' : 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(28px,3.4vw,52px)' }}>
            <div style={{ marginBottom: narrow ? 28 : 0 }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 8, paddingBottom: 12, borderBottom: `1px solid ${P.line}` }}>Уход и восстановление</div>
              <Menu items={[
                ['Ботокс для волос', 'после осветления · 1 ч', '4 500 ₽'],
                ['Кератиновое выпрямление', 'на 3–4 месяца', 'от 5 500 ₽'],
                ['Уход за цветом', 'домашняя схема в подарок', '1 500 ₽'],
              ]} />
            </div>
            <div>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: '.16em', textTransform: 'uppercase', color: P.accent, marginBottom: 8, paddingBottom: 12, borderBottom: `1px solid ${P.line}` }}>Стрижка и укладка</div>
              <Menu items={[
                ['Женская стрижка', 'с учётом формы окрашивания', '2 500 ₽'],
                ['Укладка', 'локоны или гладкость', '1 800 ₽'],
                ['Стрижка + укладка', 'к окрашиванию — со скидкой', '3 500 ₽'],
              ]} />
            </div>
          </div>
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Работы" title="Портфолио" accentWord="цвета" />
          <Gallery items={[
            { id: 'photo-1580618672591-eb180b1a973f', label: 'airtouch', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'], span: 2, ratio: '2 / 1', pos: 'center 30%' },
            { id: 'photo-1562322140-8baeececf3df', label: 'балаяж', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'] },
            { id: 'photo-1595475884562-073c30d45670', label: 'блонд', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'] },
            { id: 'photo-1519699047748-de8e457a634e', label: 'медный', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'] },
            { id: 'photo-1492106087820-71f1a00d2b11', label: 'тон в тон', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'] },
          ]} cols={3} />
        </Sec>
        <Sec P={P} bg="#EFE2EA" pad="clamp(44px,5.5vw,80px)">
          <About P={P} kicker="О себе" reverse
            title={'Осветляю бережно, цвет держу до тона'}
            text={['12 лет с цветом и постоянное обучение — работаю на безаммиачных и профессиональных линиях, слежу за качеством волос важнее эффектной картинки в моменте.', 'Перед окрашиванием всегда консультация: смотрю базу, историю окрашиваний и честно говорю, за сколько визитов придём к цели.']}
            facts={[['12 лет', 'в цвете'], ['1200+', 'окрашиваний'], ['4,9 ★', 'Яндекс']]}
            photo={{ id: 'photo-1595475884562-073c30d45670', label: 'Кира · за работой', ph: ['#E7D9E2', '#D6C0CF', '#5A3A50'], pos: 'center 25%' }} />
        </Sec>
        <Sec P={P} pad="clamp(44px,5.5vw,80px)">
          <SectionHead P={P} kicker="Отзывы" title="Что говорят клиенты" />
          <Reviews P={P} items={[
            { n: 5, source: 'Яндекс', text: '«Цена совпала до рубля с консультацией. Блонд без желтизны, волосы живые»', who: 'Настя Л. · 5 дней назад' },
            { n: 5, source: 'Яндекс', text: '«Перекрасила после неудачного салона. Кира вытянула цвет за два визита»', who: 'Вика М. · 2 недели назад' },
            { n: 5, source: '2ГИС', text: '«Airtouch держится четвёртый месяц, отрастает красиво. Хожу только к ней»', who: 'Лена Ж. · месяц назад' },
          ]} />
        </Sec>
        <Sec P={P} bg="#EFE2EA" pad="clamp(44px,5.5vw,80px)">
          <Contacts P={P} title="Записаться к колористу"
            addr={'Москва, Столешников пер. 8\nсалон «Лак», кресло 3'}
            hours={'Вт–Вс 10:00–21:00\nПн — выходной'}
            phone={'Telegram и Instagram @kira_color'}
            cta="Записаться к колористу" note={'Перед записью — бесплатная консультация по фото'} />
        </Sec>
        <Watermark P={P} name="Колорист Кира" city="Москва · окрашивание" />
      </div>
    );
  }


// ─────────────────────────────────────────────────────────────
// V5_SiteViewer — полноразмерный просмотр примера: takeover во всю ширину (ТЗ Примеры v2 §3).
// controlled: { data, onClose, onClaim(entry, niche) }. Рендерит data.FullComp ?? data.Comp.
// Хром «Фарфор и лак» (радиус 0, тени none); внутренность сайта — своя bespoke-палитра.
// Внутри НЕТ fetch/history/window.* побочек — историю/скролл-рестор/Метрику делает консьюмер.
// ─────────────────────────────────────────────────────────────
export interface V5_SiteViewerProps { data: ExampleEntry; onClose: () => void; onClaim?: (entry: string, niche?: string) => void; }
export function V5_SiteViewer({ data, onClose, onClaim }: V5_SiteViewerProps) {
  const backRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const compact = useCompact();
  const reduce = typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const [hov, setHov] = useState('');
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    document.body.classList.add('is-locked');
    if (backRef.current) backRef.current.focus();
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
  const Site: any = data.FullComp || data.Comp;
  const ctaStyle = (h: boolean): React.CSSProperties => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, height: 44, padding: '0 18px', background: h ? VT.accentHover : ACCENT, color: VT.onAccent, border: 'none', font: 'inherit', fontFamily: SANS, fontWeight: 600, fontSize: 15, whiteSpace: 'nowrap', cursor: 'pointer', transition: 'background .16s ease' });
  return (
    <div ref={panelRef} role="dialog" aria-modal="true" aria-label={`Пример сайта — ${data.niche}`} data-example-site={data.id} onKeyDown={trapTab}
      style={{ position: 'fixed', inset: 0, zIndex: 120, display: 'flex', flexDirection: 'column', background: BONE, animation: reduce ? undefined : 'v5-viewer-in .26s cubic-bezier(.2,0,0,1) both' }}>
      {/* шапка просмотра — sticky, всегда видна: назад · псевдо-домен · собрать такой же */}
      <div style={{ flex: '0 0 auto', background: BONE, borderBottom: `1px solid ${INK}` }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, height: compact ? 58 : 66, paddingInline: 'clamp(14px,3vw,28px)' }}>
          <button ref={backRef} type="button" onClick={onClose} data-example-back
            onMouseEnter={() => setHov('back')} onMouseLeave={() => setHov('')} onFocus={() => setHov('back')} onBlur={() => setHov('')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 9, height: 44, padding: '0 6px 0 0', background: 'transparent', border: 'none', font: 'inherit', fontFamily: SANS, fontWeight: 600, fontSize: compact ? 14 : 15, color: hov === 'back' ? ACCENT : INK, cursor: 'pointer', flex: '0 0 auto' }}>
            <span aria-hidden="true" style={{ fontSize: 18, transform: hov === 'back' ? 'translateX(-3px)' : 'none', transition: 'transform .16s ease' }}>←</span>{compact ? 'Примеры' : 'Все примеры'}
          </button>
          <span style={{ flex: 1, minWidth: 0, fontFamily: MONO, fontSize: compact ? 10.5 : 11.5, letterSpacing: '.04em', color: INK70, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}><span style={{ color: ACCENT }}>▸</span> {data.domain}.samosite.online</span>
          {!compact && (
            <button type="button" onClick={build} data-entry={'example-' + data.id} onMouseEnter={() => setHov('cta')} onMouseLeave={() => setHov('')} style={ctaStyle(hov === 'cta')}>
              Собрать такой же за 2 часа <span aria-hidden="true">→</span>
            </button>
          )}
          <button type="button" onClick={onClose} aria-label="Закрыть просмотр"
            onMouseEnter={() => setHov('x')} onMouseLeave={() => setHov('')}
            style={{ width: 44, height: 44, flex: '0 0 auto', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: hov === 'x' ? INK : 'transparent', border: `1px solid ${hov === 'x' ? INK : LINE2}`, color: hov === 'x' ? VT.onAccent : INK, fontSize: 20, lineHeight: 1, cursor: 'pointer', transition: 'background .16s, color .16s, border-color .16s' }}>×</button>
        </div>
      </div>
      {/* сам сайт — во всю ширину, скроллится; фон не уходит (overscroll contain) */}
      <div style={{ flex: '1 1 auto', overflowY: 'auto', overscrollBehavior: 'contain', WebkitOverflowScrolling: 'touch', background: '#fff' } as React.CSSProperties}>
        {Site ? <Site /> : null}
      </div>
      {/* mobile: CTA сборки в зоне большого пальца */}
      {compact && (
        <div style={{ flex: '0 0 auto', padding: '12px 16px calc(12px + env(safe-area-inset-bottom))', background: BONE, borderTop: `1px solid ${INK}` }}>
          <button type="button" onClick={build} data-entry={'example-' + data.id} style={{ ...ctaStyle(false), display: 'flex', width: '100%', height: 52, fontSize: 16 }}>
            Собрать такой же за 2 часа <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
