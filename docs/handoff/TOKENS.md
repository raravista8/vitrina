# Design Tokens — Самосайт

> Single source of truth: `canon/tokens.jsx`. Этот файл — человекочитаемая выжимка. Если значения расходятся — побеждает `tokens.jsx`.

---

## Цвета

### Surfaces
| Имя | Значение | Назначение |
|---|---|---|
| `bg` | `oklch(0.972 0.012 80)` | Cream — фон страницы |
| `bgSoft` | `oklch(0.945 0.014 75)` | Softer cream — chip/input background |
| `white` | `#ffffff` | Карточки |

### Ink (текст)
| Имя | Значение | Назначение |
|---|---|---|
| `ink` | `oklch(0.215 0.018 60)` | Warm near-black — H1, body |
| `inkSoft` | `oklch(0.42 0.020 60)` | Подзаголовки, body-on-card |
| `inkFaint` | `oklch(0.56 0.020 60)` | Microcopy, placeholder |
| `inkMuted` | `oklch(0.68 0.016 60)` | Disabled |

### Lines
| Имя | Значение | Назначение |
|---|---|---|
| `line` | `oklch(0.88 0.012 70)` | 1px дивайдеры, border карточек |
| `lineSoft` | `oklch(0.93 0.010 70)` | Слабые дивайдеры |

### Accent — terracotta (primary)
| Имя | Значение | Назначение |
|---|---|---|
| `accent` | `oklch(0.605 0.155 35)` | Primary action |
| `accentHover` | `oklch(0.54 0.16 35)` | Hover на primary |
| `accentSoft` | `oklch(0.92 0.045 40)` | Pale peach — chip bg / highlight |
| `accentInk` | `oklch(0.42 0.14 35)` | Текст на `accentSoft` |

### Semantic
| Имя | Значение | Назначение |
|---|---|---|
| `success` | `oklch(0.58 0.13 145)` | ✓ detection ok |
| `successSoft` | `oklch(0.93 0.05 145)` | Bg для success-badge |
| `info` | `oklch(0.62 0.10 240)` | Waitlist / info |
| `infoSoft` | `oklch(0.93 0.035 240)` | Bg для info-badge |
| `warn` | `oklch(0.66 0.14 70)` | ⚠️ unknown |
| `warnSoft` | `oklch(0.94 0.06 80)` | Bg для warn-badge |
| `danger` | `oklch(0.55 0.18 28)` | Errors |
| `dangerSoft` | `oklch(0.93 0.055 28)` | Bg для danger-badge |

---

## Типографика

| Family | Use | Weights |
|---|---|---|
| `Onest` | Sans — весь UI | 400, 500, 600, 700, 800 |
| `JetBrains Mono` | Mono — числа, URLs, code | 400, 500 |

Подключение (Google Fonts):
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Onest:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

### Типографская шкала (из канона, измеренные значения)
| Роль | size | line-height | weight | letter-spacing |
|---|---|---|---|---|
| H1 hero | 64–72px (desktop) / 38px (mobile) | 1.05–1.08 | 700 | -0.02em |
| H2 section | 42–48px | 1.1 | 700 | -0.02em |
| H3 card | 24–28px | 1.2 | 600 | -0.01em |
| Body | 15–17px | 1.5 | 400 | 0 |
| Microcopy | 12–13px | 1.4 | 500 | 0 |
| Eyebrow (mono caps) | 11–12px | 1 | 500 | 0.12em |

Точные размеры на каждом экране — смотри `canon/*.jsx` (`fontSize` props).

---

## Радиусы

| Имя | px | Назначение |
|---|---|---|
| `r.sm` | 6 | Eyebrow chip, checkbox |
| `r.md` | 10 | Input, small card |
| `r.lg` | 14 | Card |
| `r.xl` | 18 | Hero card, modal |
| `r.pill` | 999 | Кнопки, badges |

---

## Тени

```css
/* shadow.card — карточки */
box-shadow: 0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18);

/* shadow.pop — поповеры, dropdown */
box-shadow: 0 18px 40px -16px rgba(120,60,30,0.25);
```

Обе тёплые (terracotta-based RGB, не серый). НЕ заменять на `shadow-lg` из дефолтного Tailwind — оттенок уйдёт в холодный.

---

## Brand

```js
{
  name: 'Самосайт',          // кириллицей, везде
  domain: 'samosite.online',
  bot: '@SamositeIntakeBot', // в TG-канал-источник
  contactBot: '@SamositeBot' // личный бот юзера
}
```

### Логотип

Жирная кириллическая **«С»** (Onest 800) на терракотовой плашке с радиусом 27% от размера. CSS:

```css
.ss-logo {
  display: inline-flex; align-items: center; justify-content: center;
  width: var(--s, 26px); height: var(--s, 26px);
  border-radius: calc(var(--s, 26px) * 0.27);
  background: oklch(0.605 0.155 35);
  color: #fff;
  font-family: "Onest", system-ui, sans-serif;
  font-weight: 800;
  font-size: calc(var(--s, 26px) * 0.66);
  letter-spacing: -0.04em;
  line-height: 1;
  padding-bottom: calc(var(--s, 26px) * 0.04); /* optical centering */
}
```

Применить: `code/admin/AdminChrome.tsx`, `code/admin/Login.tsx`, `code/customer-site.html.j2` (footer watermark), favicon, og-image, email-шаблоны, TG-сообщения ботов.

---

## Tailwind config (рекомендация)

```js
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        cream: 'oklch(0.972 0.012 80)',
        'cream-soft': 'oklch(0.945 0.014 75)',
        ink: {
          DEFAULT: 'oklch(0.215 0.018 60)',
          soft: 'oklch(0.42 0.020 60)',
          faint: 'oklch(0.56 0.020 60)',
          muted: 'oklch(0.68 0.016 60)',
        },
        line: {
          DEFAULT: 'oklch(0.88 0.012 70)',
          soft: 'oklch(0.93 0.010 70)',
        },
        terracotta: {
          DEFAULT: 'oklch(0.605 0.155 35)',
          hover: 'oklch(0.54 0.16 35)',
          soft: 'oklch(0.92 0.045 40)',
          ink: 'oklch(0.42 0.14 35)',
        },
        success: { DEFAULT: 'oklch(0.58 0.13 145)', soft: 'oklch(0.93 0.05 145)' },
        info:    { DEFAULT: 'oklch(0.62 0.10 240)', soft: 'oklch(0.93 0.035 240)' },
        warn:    { DEFAULT: 'oklch(0.66 0.14 70)',  soft: 'oklch(0.94 0.06 80)' },
        danger:  { DEFAULT: 'oklch(0.55 0.18 28)',  soft: 'oklch(0.93 0.055 28)' },
      },
      borderRadius: { sm: '6px', md: '10px', lg: '14px', xl: '18px' },
      boxShadow: {
        card: '0 1px 0 rgba(0,0,0,0.02), 0 12px 32px -16px rgba(120,60,30,0.18)',
        pop:  '0 18px 40px -16px rgba(120,60,30,0.25)',
      },
      fontFamily: {
        sans: ['Onest', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
};
```
