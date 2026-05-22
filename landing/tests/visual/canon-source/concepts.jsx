if (!window.__concepts_loaded) { window.__concepts_loaded = true; (function concMain(){

// Merged concepts A / B / C — single file to avoid Babel external-fetch flakiness

// Concept A — "Тёплая бумага" / warm paper
// Palette: cream bg, warm near-black foreground, terracotta accent.
// Tinkoff/Avito-trustworthy feel, regional master vibe.

const A = {
  bg:        'oklch(0.972 0.012 80)',   // cream
  bgSoft:    'oklch(0.945 0.014 75)',   // softer cream for cards
  ink:       'oklch(0.215 0.018 60)',   // warm near-black
  inkSoft:   'oklch(0.42 0.020 60)',
  inkFaint:  'oklch(0.55 0.020 60)',
  line:      'oklch(0.88 0.012 70)',
  accent:    'oklch(0.605 0.155 35)',   // terracotta
  accentSoft:'oklch(0.92 0.045 40)',    // pale peach
  white:     '#ffffff',
};

function ConceptA_Inner({ mobile = false }) {
  const padX = mobile ? 20 : 80;
  const h1Size = mobile ? 44 : 92;
  const h1Lh   = mobile ? 1.04 : 1.0;
  const subSize = mobile ? 17 : 20;
  const eyebrowSize = mobile ? 11 : 12;

  return (
    <div style={{
      width: '100%', minHeight: '100%', background: A.bg, color: A.ink,
      fontFamily: 'Onest, system-ui, sans-serif',
      paddingLeft: padX, paddingRight: padX,
      paddingTop: mobile ? 18 : 28, paddingBottom: mobile ? 28 : 48,
      position: 'relative', overflow: 'hidden',
      letterSpacing: '-0.01em',
    }}>
      {/* Soft abstract gradient blob — décor only, no master photo */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: mobile ? -120 : -180, top: mobile ? -100 : -160,
        width: mobile ? 380 : 720, height: mobile ? 380 : 720,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 30%, ${A.accentSoft} 0%, transparent 65%)`,
        opacity: 0.85, pointerEvents: 'none',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute',
        left: mobile ? -100 : -120, bottom: mobile ? 100 : 60,
        width: mobile ? 280 : 480, height: mobile ? 280 : 480,
        borderRadius: '50%',
        background: `radial-gradient(circle, oklch(0.94 0.020 90) 0%, transparent 70%)`,
        opacity: 0.7, pointerEvents: 'none',
      }} />

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: mobile ? 18 : 20, letterSpacing: '-0.02em' }}>
          <span style={{
            width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: 7,
            background: A.accent, display: 'inline-block',
            boxShadow: 'inset 0 0 0 4px ' + A.bg,
          }} />
          Самосайт
        </div>
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: A.inkSoft }}>
            <a style={{ color: 'inherit' }}>Как это работает</a>
            <a style={{ color: 'inherit' }}>Тарифы</a>
            <a style={{ color: 'inherit' }}>Помощь</a>
            <a style={{
              color: A.ink, fontWeight: 600,
              padding: '8px 18px', border: `1px solid ${A.line}`,
              borderRadius: 999, background: A.white,
            }}>Войти</a>
          </div>
        )}
        {mobile && (
          <a style={{
            color: A.ink, fontWeight: 600, fontSize: 14,
            padding: '6px 14px', border: `1px solid ${A.line}`,
            borderRadius: 999, background: A.white,
          }}>Войти</a>
        )}
      </div>

      {/* Hero body */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: mobile ? '100%' : 1100,
        margin: mobile ? '32px 0 0' : '64px auto 0',
        textAlign: mobile ? 'left' : 'center',
      }}>
        {/* Category eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: eyebrowSize, letterSpacing: '0.12em',
          color: A.accent, fontWeight: 500,
          padding: '6px 12px',
          background: A.accentSoft,
          borderRadius: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: A.accent }} />
          САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ
        </div>

        {/* H1 */}
        <h1 style={{
          fontSize: h1Size, lineHeight: h1Lh, fontWeight: 700,
          letterSpacing: '-0.035em',
          margin: mobile ? '20px 0 0' : '28px 0 0',
          textWrap: 'balance',
        }}>
          Сайт, который{mobile ? ' ' : <br />}
          <span style={{
            position: 'relative', display: 'inline-block',
            color: A.accent,
            padding: '0 4px',
          }}>
            сам себя ведёт
            <span aria-hidden="true" style={{
              position: 'absolute', left: 4, right: 4, bottom: mobile ? 4 : 10,
              height: mobile ? 8 : 14, background: A.accentSoft, opacity: 0.65,
              zIndex: -1, borderRadius: 3,
            }} />
          </span>{mobile ? ' и приносит вам заявки.' : <><br />и приносит вам заявки.</>}
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: subSize, lineHeight: 1.45, color: A.inkSoft,
          margin: mobile ? '18px 0 0' : '28px auto 0',
          maxWidth: mobile ? '100%' : 720,
          textWrap: 'pretty',
        }}>
          Покажите ссылку на ваше дело — соцсеть, карты или визитку. ИИ соберёт сайт за пару минут и сам будет держать его актуальным. Вам ничего не нужно делать.
        </p>

        {/* Input + CTA */}
        <div style={{
          marginTop: mobile ? 24 : 36,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 8,
          maxWidth: mobile ? '100%' : 680,
          marginLeft: mobile ? 0 : 'auto', marginRight: mobile ? 0 : 'auto',
          background: A.white,
          padding: mobile ? 10 : 8,
          borderRadius: mobile ? 14 : 999,
          border: `1px solid ${A.line}`,
          boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)',
          alignItems: mobile ? 'stretch' : 'center',
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '12px 14px' : '0 18px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={A.inkFaint} strokeWidth="1.8" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
            </svg>
            <span style={{ color: A.inkFaint, fontSize: mobile ? 16 : 17 }}>
              ссылка на соцсеть, Яндекс.Карты или сайт
            </span>
          </div>
          <button style={{
            background: A.accent, color: A.white,
            fontFamily: 'inherit', fontWeight: 600,
            fontSize: mobile ? 16 : 16,
            padding: mobile ? '14px 20px' : '14px 26px',
            borderRadius: mobile ? 10 : 999,
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            whiteSpace: 'nowrap',
          }}>
            Собрать мою витрину
            <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </button>
        </div>

        {/* Microcopy */}
        <div style={{
          marginTop: 14, fontSize: 13, color: A.inkFaint,
          display: 'flex', alignItems: 'center', gap: 6,
          justifyContent: mobile ? 'flex-start' : 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          Первый месяц бесплатно — без карты при регистрации.
        </div>

        {/* Fallback links */}
        <div style={{
          marginTop: mobile ? 22 : 28,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 24,
          justifyContent: mobile ? 'flex-start' : 'center',
          fontSize: mobile ? 14 : 14,
        }}>
          <a style={{
            color: A.ink, textDecoration: 'underline',
            textDecorationColor: A.line, textDecorationThickness: 1,
            textUnderlineOffset: 4, display: 'inline-flex', gap: 8,
          }}>
            📷 Загрузить фото работ, визитки или буклета
          </a>
          <a style={{
            color: A.ink, textDecoration: 'underline',
            textDecorationColor: A.line, textDecorationThickness: 1,
            textUnderlineOffset: 4, display: 'inline-flex', gap: 8,
          }}>
            📨 Закрытый TG-канал — загрузить экспорт
          </a>
        </div>
      </div>

      {/* 4 bullets — stack of advantages */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginTop: mobile ? 36 : 72,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
        gap: mobile ? 14 : 20,
        maxWidth: mobile ? '100%' : 1280,
        marginLeft: mobile ? 0 : 'auto', marginRight: mobile ? 0 : 'auto',
      }}>
        {[
          ['🔄', 'Сам обновляется', 'раз в неделю забирает новые фото и отзывы из источника'],
          ['📨', 'Сам ловит заявки', 'форма, кнопка записи и уведомления в Telegram из коробки'],
          ['🔎', 'Сам находится в поиске', 'подбирает ключевые слова и отправляет сайт в Яндекс и Google. Клиенты находят вас сами.'],
          ['🎁', 'Первый месяц бесплатно', 'попробуйте на своём деле, не продлевайте если не зайдёт'],
        ].map(([emoji, title, body]) => (
          <div key={title} style={{
            background: A.white,
            border: `1px solid ${A.line}`,
            borderRadius: 14,
            padding: mobile ? 16 : 18,
          }}>
            <div style={{ fontSize: 22, marginBottom: 8 }}>{emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: A.inkSoft }}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// NOTE: ConceptA superseded by landing-samosite.jsx (Самосайт rebrand).
// The legacy ConceptA_Inner above is kept as historical reference only.
// Live ConceptA_Desktop / ConceptA_Mobile are exported from landing-samosite.jsx.


// Concept B — "Графит" / editorial dark
// Deep charcoal bg + cream ink + butter yellow accent.
// Confident, premium editorial. Asymmetric desktop, stacked mobile.

const B = {
  bg:       'oklch(0.165 0.008 250)',   // deep cool charcoal
  bgSoft:   'oklch(0.215 0.010 250)',   // card
  bgLine:   'oklch(0.275 0.010 250)',
  ink:      'oklch(0.965 0.008 80)',    // cream
  inkSoft:  'oklch(0.78 0.012 80)',
  inkFaint: 'oklch(0.58 0.014 80)',
  accent:   'oklch(0.86 0.135 95)',     // butter yellow
  accentDeep:'oklch(0.65 0.16 70)',
};

function ConceptB_Inner({ mobile = false }) {
  const padX = mobile ? 20 : 64;
  const h1Size = mobile ? 46 : 104;
  const eyebrowSize = mobile ? 11 : 12;

  return (
    <div style={{
      width: '100%', minHeight: '100%', background: B.bg, color: B.ink,
      fontFamily: 'Onest, system-ui, sans-serif',
      paddingLeft: padX, paddingRight: padX,
      paddingTop: mobile ? 18 : 28, paddingBottom: mobile ? 28 : 36,
      position: 'relative', overflow: 'hidden',
      letterSpacing: '-0.012em',
    }}>
      {/* faint top grain */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: `radial-gradient(circle at 80% 0%, oklch(0.32 0.04 95) 0%, transparent 35%), radial-gradient(circle at 0% 100%, oklch(0.22 0.02 280) 0%, transparent 40%)`,
        opacity: 0.6,
      }} />

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: mobile ? 18 : 20, letterSpacing: '-0.02em' }}>
          <span style={{
            width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: 7,
            background: B.accent, display: 'inline-block',
          }} />
          Самосайт
        </div>
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: B.inkSoft }}>
            <a style={{ color: 'inherit' }}>Как это работает</a>
            <a style={{ color: 'inherit' }}>Тарифы</a>
            <a style={{ color: 'inherit' }}>Помощь</a>
            <a style={{
              color: B.ink, fontWeight: 600,
              padding: '8px 18px', border: `1px solid ${B.bgLine}`,
              borderRadius: 999, background: 'transparent',
            }}>Войти</a>
          </div>
        )}
        {mobile && (
          <a style={{
            color: B.ink, fontWeight: 600, fontSize: 14,
            padding: '6px 14px', border: `1px solid ${B.bgLine}`,
            borderRadius: 999,
          }}>Войти</a>
        )}
      </div>

      {/* Hero grid */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginTop: mobile ? 28 : 56,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1.15fr 0.85fr',
        gap: mobile ? 28 : 56,
        alignItems: 'start',
      }}>
        {/* LEFT — type column */}
        <div>
          {/* eyebrow */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: eyebrowSize, letterSpacing: '0.14em',
            color: B.accent, fontWeight: 500,
          }}>
            <span style={{ width: 18, height: 1, background: B.accent }} />
            САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ
          </div>

          {/* H1 */}
          <h1 style={{
            fontSize: h1Size, lineHeight: mobile ? 1.02 : 0.98, fontWeight: 700,
            letterSpacing: '-0.04em',
            margin: mobile ? '20px 0 0' : '28px 0 0',
            textWrap: 'balance',
          }}>
            Сайт, который<br />
            <span style={{
              position: 'relative', display: 'inline-block',
              color: B.accent, fontStyle: 'normal',
            }}>
              сам себя ведёт
              <span aria-hidden="true" style={{
                position: 'absolute', left: 0, right: 0, bottom: mobile ? -2 : -4,
                height: mobile ? 4 : 8, background: B.accent, opacity: 0.45,
                borderRadius: 2,
              }} />
            </span><br />
            и приносит вам заявки.
          </h1>

          {/* Sub */}
          <p style={{
            fontSize: mobile ? 17 : 20, lineHeight: 1.45, color: B.inkSoft,
            margin: mobile ? '20px 0 0' : '32px 0 0',
            maxWidth: 560,
            textWrap: 'pretty',
          }}>
            Покажите ссылку на ваше дело — соцсеть, карты или визитку. ИИ соберёт сайт за пару минут и сам будет держать его актуальным. Вам ничего не нужно делать.
          </p>

          {/* Input + CTA */}
          <div style={{
            marginTop: mobile ? 24 : 36,
            display: 'flex', flexDirection: mobile ? 'column' : 'row',
            gap: mobile ? 10 : 8,
            background: B.bgSoft,
            padding: mobile ? 10 : 8,
            borderRadius: mobile ? 14 : 14,
            border: `1px solid ${B.bgLine}`,
            alignItems: mobile ? 'stretch' : 'center',
            maxWidth: 620,
          }}>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '12px 14px' : '6px 16px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={B.inkFaint} strokeWidth="1.8" strokeLinecap="round">
                <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
                <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
              </svg>
              <span style={{ color: B.inkFaint, fontSize: mobile ? 16 : 17 }}>
                ссылка на соцсеть, Яндекс.Карты или сайт
              </span>
            </div>
            <button style={{
              background: B.accent, color: 'oklch(0.18 0.02 95)',
              fontFamily: 'inherit', fontWeight: 600,
              fontSize: 16,
              padding: mobile ? '14px 20px' : '14px 22px',
              borderRadius: 10,
              border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              whiteSpace: 'nowrap',
            }}>
              Собрать мою витрину
              <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
            </button>
          </div>

          {/* Microcopy */}
          <div style={{
            marginTop: 14, fontSize: 13, color: B.inkFaint,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="9"/>
            </svg>
            Первый месяц бесплатно — без карты при регистрации.
          </div>

          {/* Fallback links */}
          <div style={{
            marginTop: mobile ? 20 : 24,
            display: 'flex', flexDirection: mobile ? 'column' : 'row',
            gap: mobile ? 10 : 20,
            fontSize: 14,
          }}>
            <a style={{
              color: B.ink, textDecoration: 'underline',
              textDecorationColor: B.bgLine, textDecorationThickness: 1,
              textUnderlineOffset: 4, display: 'inline-flex', gap: 8,
            }}>
              📷 Загрузить фото работ, визитки или буклета
            </a>
            <a style={{
              color: B.ink, textDecoration: 'underline',
              textDecorationColor: B.bgLine, textDecorationThickness: 1,
              textUnderlineOffset: 4, display: 'inline-flex', gap: 8,
            }}>
              📨 Закрытый TG-канал — загрузить экспорт
            </a>
          </div>
        </div>

        {/* RIGHT — abstract product preview placeholder (no stock photo of master) */}
        {!mobile && <PreviewCard />}
      </div>

      {/* 4 bullets — bottom row */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginTop: mobile ? 36 : 64,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
        gap: mobile ? 0 : 0,
        borderTop: `1px solid ${B.bgLine}`,
      }}>
        {[
          ['🔄', 'Сам обновляется', 'раз в неделю забирает новые фото и отзывы из источника'],
          ['📨', 'Сам ловит заявки', 'форма, кнопка записи и уведомления в Telegram из коробки'],
          ['🔎', 'Сам находится в поиске', 'подбирает ключевые слова и отправляет сайт в Яндекс и Google.'],
          ['🎁', 'Первый месяц бесплатно', 'попробуйте на своём деле, не продлевайте если не зайдёт'],
        ].map(([emoji, title, body], i) => (
          <div key={title} style={{
            padding: mobile ? '18px 0' : '24px 22px 0 22px',
            borderRight: !mobile && i < 3 ? `1px solid ${B.bgLine}` : 'none',
            borderBottom: mobile && i < 3 ? `1px solid ${B.bgLine}` : 'none',
            paddingBottom: mobile ? 18 : 0,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <span style={{ fontSize: 18 }}>{emoji}</span>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{title}</span>
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: B.inkSoft }}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewCard() {
  // Abstract placeholder for "this is what your generated Vitrina site looks like"
  // No stock photos — monospace explainers + abstract gradient
  return (
    <div style={{ position: 'relative' }}>
      {/* browser chrome */}
      <div style={{
        background: B.bgSoft,
        border: `1px solid ${B.bgLine}`,
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
        transform: 'rotate(-1.2deg)',
      }}>
        {/* chrome bar */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '10px 14px',
          background: B.bg, borderBottom: `1px solid ${B.bgLine}`,
        }}>
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: B.bgLine }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: B.bgLine }} />
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: B.bgLine }} />
          <span style={{ marginLeft: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: B.inkFaint }}>
            studia-anna.samosite.online
          </span>
        </div>
        {/* faux content */}
        <div style={{ padding: 22, background: 'oklch(0.97 0.012 80)', color: 'oklch(0.22 0.015 60)', minHeight: 360 }}>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'oklch(0.6 0.15 35)' }}>
            СТУДИЯ МАНИКЮРА · ПЕТРОЗАВОДСК
          </div>
          <div style={{ fontWeight: 700, fontSize: 24, letterSpacing: '-0.025em', marginTop: 6, lineHeight: 1.1 }}>
            Студия Анны<br/>Маникюр и педикюр
          </div>
          {/* gallery grid placeholder — striped */}
          <div style={{
            marginTop: 14, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
          }}>
            {[0,1,2,3,4,5].map(i => (
              <div key={i} style={{
                aspectRatio: '1 / 1', borderRadius: 6,
                background: `repeating-linear-gradient(${135 + i*20}deg, oklch(0.92 0.045 ${35 + i*8}) 0 6px, oklch(0.96 0.020 ${60 + i*4}) 6px 12px)`,
              }} />
            ))}
          </div>
          <div style={{ marginTop: 12, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'oklch(0.55 0.02 60)' }}>
            [ галерея работ из источника ]
          </div>
        </div>
      </div>

      {/* floating lead-notification card — proves "сам ловит заявки" */}
      <div style={{
        position: 'absolute', right: -16, bottom: -22,
        background: B.bg, color: B.ink,
        border: `1px solid ${B.bgLine}`,
        borderRadius: 12, padding: 14,
        width: 270,
        boxShadow: '0 20px 40px -10px rgba(0,0,0,0.6)',
        transform: 'rotate(2deg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: B.inkFaint, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: B.accent }} />
          НОВАЯ ЗАЯВКА · TG
        </div>
        <div style={{ marginTop: 8, fontWeight: 600, fontSize: 14 }}>
          Анна П***, +7***1234
        </div>
        <div style={{ marginTop: 4, fontSize: 12.5, color: B.inkSoft, lineHeight: 1.4 }}>
          «Хочу записаться на маникюр в субботу днём, если есть окно»
        </div>
      </div>
    </div>
  );
}

function ConceptB_Desktop() { return <ConceptB_Inner mobile={false} />; }
function ConceptB_Mobile()  { return <ConceptB_Inner mobile={true} />; }

Object.assign(window, { ConceptB_Desktop, ConceptB_Mobile });


// Concept C — "Свежая зелень" / friendly mass-market
// Off-white bg + warm green accent (Avito-trust feel).
// Friendliest of the three; preview shows the live source-detection badge
// from COPY §5 inline under the input to prove "we already read your stuff".

const C = {
  bg:        'oklch(0.985 0.005 100)',  // near-white warm
  bgSoft:    'oklch(0.96 0.008 100)',
  ink:       'oklch(0.205 0.012 80)',
  inkSoft:   'oklch(0.42 0.015 80)',
  inkFaint:  'oklch(0.56 0.015 80)',
  line:      'oklch(0.90 0.008 90)',
  accent:    'oklch(0.585 0.155 145)',  // fresh green
  accentSoft:'oklch(0.93 0.060 145)',
  accentDeep:'oklch(0.42 0.12 145)',
  warn:      'oklch(0.72 0.13 75)',     // amber for "скоро будет"
  warnSoft:  'oklch(0.95 0.05 85)',
  white:     '#ffffff',
};

function ConceptC_Inner({ mobile = false }) {
  const padX = mobile ? 20 : 72;
  const h1Size = mobile ? 42 : 88;
  const eyebrowSize = mobile ? 11 : 12;

  return (
    <div style={{
      width: '100%', minHeight: '100%', background: C.bg, color: C.ink,
      fontFamily: 'Onest, system-ui, sans-serif',
      paddingLeft: padX, paddingRight: padX,
      paddingTop: mobile ? 18 : 28, paddingBottom: mobile ? 28 : 40,
      position: 'relative', overflow: 'hidden',
      letterSpacing: '-0.01em',
    }}>
      {/* soft green blob */}
      <div aria-hidden="true" style={{
        position: 'absolute',
        right: mobile ? -140 : -200, top: mobile ? -120 : -200,
        width: mobile ? 400 : 760, height: mobile ? 400 : 760,
        borderRadius: '50%',
        background: `radial-gradient(circle at 30% 40%, ${C.accentSoft} 0%, transparent 65%)`,
        opacity: 0.85, pointerEvents: 'none',
      }} />

      {/* Nav */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'relative', zIndex: 2,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: mobile ? 18 : 20, letterSpacing: '-0.02em' }}>
          <span style={{
            width: mobile ? 22 : 26, height: mobile ? 22 : 26, borderRadius: 7,
            background: C.accent, display: 'inline-block',
          }} />
          Самосайт
        </div>
        {!mobile && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, fontSize: 14, color: C.inkSoft }}>
            <a style={{ color: 'inherit' }}>Как это работает</a>
            <a style={{ color: 'inherit' }}>Тарифы</a>
            <a style={{ color: 'inherit' }}>Помощь</a>
            <a style={{
              color: C.white, fontWeight: 600,
              padding: '8px 18px',
              borderRadius: 999, background: C.accent,
            }}>Войти</a>
          </div>
        )}
        {mobile && (
          <a style={{
            color: C.white, fontWeight: 600, fontSize: 14,
            padding: '6px 14px', borderRadius: 999, background: C.accent,
          }}>Войти</a>
        )}
      </div>

      {/* Hero body */}
      <div style={{
        position: 'relative', zIndex: 1,
        maxWidth: mobile ? '100%' : 1180,
        margin: mobile ? '32px 0 0' : '54px auto 0',
        textAlign: mobile ? 'left' : 'center',
      }}>
        {/* Eyebrow as chip */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: eyebrowSize, letterSpacing: '0.12em',
          color: C.accentDeep, fontWeight: 500,
          padding: '6px 12px',
          background: C.accentSoft,
          borderRadius: 999,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: C.accent }} />
          САЙТ ДЛЯ ЗАЯВОК — ИЗ ТОГО, ЧТО У ВАС УЖЕ ЕСТЬ
        </div>

        {/* H1 */}
        <h1 style={{
          fontSize: h1Size, lineHeight: mobile ? 1.04 : 1.02, fontWeight: 700,
          letterSpacing: '-0.035em',
          margin: mobile ? '20px 0 0' : '28px 0 0',
          textWrap: 'balance',
        }}>
          Сайт, который{mobile ? ' ' : <br />}
          <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
            сам себя ведёт
            {/* wavy underline */}
            <svg
              aria-hidden="true"
              viewBox="0 0 300 12"
              preserveAspectRatio="none"
              style={{
                position: 'absolute', left: 0, right: 0, bottom: mobile ? -6 : -10,
                width: '100%', height: mobile ? 8 : 14,
              }}
            >
              <path
                d="M2 8 Q 25 0 50 8 T 100 8 T 150 8 T 200 8 T 250 8 T 298 8"
                fill="none" stroke={C.accent} strokeWidth="3" strokeLinecap="round"
              />
            </svg>
          </span>
          {mobile ? ' и приносит вам заявки.' : <><br />и приносит вам заявки.</>}
        </h1>

        {/* Sub */}
        <p style={{
          fontSize: mobile ? 17 : 20, lineHeight: 1.45, color: C.inkSoft,
          margin: mobile ? '20px 0 0' : '32px auto 0',
          maxWidth: mobile ? '100%' : 720,
          textWrap: 'pretty',
        }}>
          Покажите ссылку на ваше дело — соцсеть, карты или визитку. ИИ соберёт сайт за пару минут и сам будет держать его актуальным. Вам ничего не нужно делать.
        </p>

        {/* Input + CTA — green tinted */}
        <div style={{
          marginTop: mobile ? 24 : 36,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 8,
          maxWidth: mobile ? '100%' : 700,
          marginLeft: mobile ? 0 : 'auto', marginRight: mobile ? 0 : 'auto',
          background: C.white,
          padding: mobile ? 10 : 8,
          borderRadius: mobile ? 14 : 16,
          border: `1.5px solid ${C.line}`,
          boxShadow: '0 1px 0 rgba(0,0,0,0.02), 0 16px 36px -16px rgba(30,100,60,0.16)',
          alignItems: mobile ? 'stretch' : 'center',
        }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, padding: mobile ? '12px 14px' : '4px 16px' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.inkFaint} strokeWidth="1.8" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7.07 0l3-3a5 5 0 0 0-7.07-7.07L11 5"/>
              <path d="M14 11a5 5 0 0 0-7.07 0l-3 3a5 5 0 0 0 7.07 7.07L13 19"/>
            </svg>
            <span style={{ color: C.inkFaint, fontSize: mobile ? 16 : 17 }}>
              ссылка на соцсеть, Яндекс.Карты или сайт
            </span>
          </div>
          <button style={{
            background: C.accent, color: C.white,
            fontFamily: 'inherit', fontWeight: 600,
            fontSize: 16,
            padding: mobile ? '14px 20px' : '14px 24px',
            borderRadius: mobile ? 10 : 12,
            border: 'none', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            whiteSpace: 'nowrap',
          }}>
            Собрать мою витрину
            <span style={{ fontSize: 18, lineHeight: 1 }}>→</span>
          </button>
        </div>

        {/* Live preview teaser — previews state from screen #2 */}
        <div style={{
          marginTop: 12,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: 8, alignItems: mobile ? 'flex-start' : 'center',
          justifyContent: mobile ? 'flex-start' : 'center',
          fontSize: 13.5,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '6px 12px', borderRadius: 999,
            background: C.accentSoft, color: C.accentDeep, fontWeight: 500,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12l4 4 10-10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Telegram — нашли 47 постов и 12 фото
          </span>
          <span style={{ color: C.inkFaint, fontSize: 12.5 }}>
            предпросмотр обновляется как только вставите ссылку
          </span>
        </div>

        {/* Microcopy */}
        <div style={{
          marginTop: 14, fontSize: 13, color: C.inkFaint,
          display: 'flex', alignItems: 'center', gap: 6,
          justifyContent: mobile ? 'flex-start' : 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          Первый месяц бесплатно — без карты при регистрации.
        </div>

        {/* Fallback links — pill chips */}
        <div style={{
          marginTop: mobile ? 22 : 28,
          display: 'flex', flexDirection: mobile ? 'column' : 'row',
          gap: mobile ? 10 : 12,
          justifyContent: mobile ? 'flex-start' : 'center',
          flexWrap: 'wrap',
        }}>
          <a style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: C.ink, fontSize: 14, fontWeight: 500,
            padding: '10px 16px', borderRadius: 999,
            background: C.bgSoft, border: `1px solid ${C.line}`,
          }}>
            📷 Загрузить фото работ, визитки или буклета
          </a>
          <a style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: C.ink, fontSize: 14, fontWeight: 500,
            padding: '10px 16px', borderRadius: 999,
            background: C.bgSoft, border: `1px solid ${C.line}`,
          }}>
            📨 Закрытый TG-канал — загрузить экспорт
          </a>
        </div>
      </div>

      {/* 4 bullets — pill cards row */}
      <div style={{
        position: 'relative', zIndex: 1,
        marginTop: mobile ? 36 : 64,
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : 'repeat(4, 1fr)',
        gap: 14,
        maxWidth: mobile ? '100%' : 1280,
        marginLeft: mobile ? 0 : 'auto', marginRight: mobile ? 0 : 'auto',
      }}>
        {[
          ['🔄', 'Сам обновляется', 'раз в неделю забирает новые фото и отзывы из источника'],
          ['📨', 'Сам ловит заявки', 'форма, кнопка записи и уведомления в Telegram из коробки'],
          ['🔎', 'Сам находится в поиске', 'подбирает ключевые слова и отправляет сайт в Яндекс и Google. Клиенты находят вас сами.'],
          ['🎁', 'Первый месяц бесплатно', 'попробуйте на своём деле, не продлевайте если не зайдёт'],
        ].map(([emoji, title, body]) => (
          <div key={title} style={{
            background: C.white,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            padding: mobile ? 16 : 18,
            display: 'flex', flexDirection: 'column', gap: 6,
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: C.accentSoft,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, marginBottom: 4,
            }}>{emoji}</div>
            <div style={{ fontWeight: 600, fontSize: 15 }}>{title}</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.5, color: C.inkSoft }}>{body}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConceptC_Desktop() { return <ConceptC_Inner mobile={false} />; }
function ConceptC_Mobile()  { return <ConceptC_Inner mobile={true} />; }

Object.assign(window, { ConceptC_Desktop, ConceptC_Mobile });


})(); } // end __concepts_loaded guard
