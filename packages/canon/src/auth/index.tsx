'use client';

// @samosite/canon/auth · S20_CustomerLogin — canon 0.4.0
// Per canon-0.4.0-customer-login-brief.md.
//
// Full-page login for the master (customer-site owner). Single logical step:
// `login` + `password`, where `login` = subdomain string (e.g. `studia-anna`).
// No TOTP, no magic-link, no signup — out of scope for 0.4.0.
//
// Sister screen to S10_AdminLogin (founder/operator, 2-factor). Shares tokens,
// BrandMark placement, inline error block. Distinguishing signals: sage
// «КАБИНЕТ МАСТЕРА» eyebrow chip, friendlier copy, bridge link to intake.
//
// Fully controlled when props supplied; zero-prop call falls back to local
// state for canvas / mock mode (same convention as S10).

import React, { useState, useEffect, useCallback } from 'react';
import { VT } from '../tokens';
import { BrandMark, Card, Btn, Spinner, IconArrow } from '../primitives';

// ─────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────

export type CustomerLoginErrorCode =
  | 'invalid_credentials'
  | 'rate_limited'
  | 'network_error'
  | 'unknown_error';

export interface CustomerLoginProps {
  /** Controlled login value (= subdomain string, e.g. "studia-anna"). */
  login?: string;
  /** Controlled password value. */
  password?: string;
  /** When true, primary CTA shows a spinner and inputs are disabled. */
  loading?: boolean;
  /** Error code from the auth endpoint, or null/undefined for no error. */
  error?: CustomerLoginErrorCode | null;
  /** Required when error === 'rate_limited'. Used to render the countdown. */
  retryAfterSeconds?: number | null;

  onLoginChange?: (v: string) => void;
  onPasswordChange?: (v: string) => void;
  onSubmit?: () => void;

  /** Bridge link "Ещё нет Самосайта? Сделать →". Consumer decides whether this
   *  routes to `/` or opens SubmitModal. When omitted, the link falls back to
   *  <a href="/"> for the canvas / zero-prop case. */
  onCreateSiteClick?: () => void;
}

// ─────────────────────────────────────────────────────────────
// Sub-bits — error strings + rate-limit countdown
// ─────────────────────────────────────────────────────────────

const CUSTOMER_ERROR_MSG: Record<CustomerLoginErrorCode, string | null> = {
  invalid_credentials: 'Не подходит логин или пароль. Проверьте сообщение, которое мы вам отправили.',
  rate_limited:        null, // rendered via CustomerRateLimitNotice w/ countdown
  network_error:       'Сеть не отвечает. Попробуйте ещё раз через минуту.',
  unknown_error:       'Что-то пошло не так. Попробуйте ещё раз через минуту.',
};

function CustomerRateLimitNotice({ retryAfterSeconds = 263 }: { retryAfterSeconds?: number }) {
  const [remaining, setRemaining] = useState(retryAfterSeconds);
  useEffect(() => {
    setRemaining(retryAfterSeconds);
    if (retryAfterSeconds <= 0) return;
    const id = setInterval(() => setRemaining(r => Math.max(0, r - 1)), 1000);
    return () => clearInterval(id);
  }, [retryAfterSeconds]);
  const totalMin = Math.ceil(remaining / 60);
  const mm = String(Math.floor(remaining / 60)).padStart(2, '0');
  const ss = String(remaining % 60).padStart(2, '0');
  return (
    <div role="alert" style={{
      padding: '10px 12px', background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
      fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
      lineHeight: 1.5,
    }}>
      <span aria-hidden="true" style={{ marginRight: 6 }}>⚠️</span>
      Слишком много попыток. Попробуйте через {totalMin}&nbsp;мин — осталось{' '}
      <span style={{ fontFamily: VT.font.mono, fontSize: 13 }}>{mm}:{ss}</span>.
    </div>
  );
}

function CustomerErrorNotice({ code }: { code: CustomerLoginErrorCode }) {
  const msg = CUSTOMER_ERROR_MSG[code] || CUSTOMER_ERROR_MSG.unknown_error;
  if (!msg) return null;
  return (
    <div role="alert" style={{
      padding: '10px 12px', background: VT.dangerSoft,
      border: `1px solid oklch(0.85 0.06 28)`, borderRadius: VT.r.md,
      fontSize: 13, color: 'oklch(0.4 0.15 28)', marginBottom: 14,
      lineHeight: 1.5,
    }}>
      <span aria-hidden="true" style={{ marginRight: 6 }}>⚠️</span>
      {msg}
    </div>
  );
}

interface CLTextFieldProps {
  id?: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  autoComplete?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  mono?: boolean;
  style?: React.CSSProperties;
}

function CLTextField({ id, type = 'text', value, onChange, placeholder,
                       ariaLabel, autoComplete, autoFocus, disabled, mono, style }: CLTextFieldProps) {
  return (
    <input
      id={id}
      type={type}
      value={value ?? ''}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      aria-label={ariaLabel}
      autoComplete={autoComplete}
      autoFocus={autoFocus}
      disabled={disabled}
      style={{
        width: '100%', boxSizing: 'border-box',
        padding: '11px 13px',
        background: disabled ? VT.bgSoft : VT.white,
        border: `1px solid ${VT.line}`,
        borderRadius: VT.r.md,
        fontSize: 14.5, color: VT.ink,
        fontFamily: mono ? VT.font.mono : VT.font.sans,
        outline: 'none',
        ...style,
      }} />
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN — S20_CustomerLogin
// ─────────────────────────────────────────────────────────────

export function S20_CustomerLogin(props: CustomerLoginProps) {
  // Uncontrolled fallback state — used only when controlled prop is undefined,
  // matching the same back-compat shape as S10_AdminLogin.
  const [uLogin, setULogin] = useState(props.login ?? '');
  const [uPass,  setUPass]  = useState(props.password ?? '');

  const login    = props.login    ?? uLogin;
  const password = props.password ?? uPass;
  const setLogin    = props.onLoginChange    ?? setULogin;
  const setPassword = props.onPasswordChange ?? setUPass;

  const { loading, error, retryAfterSeconds, onSubmit, onCreateSiteClick } = props;
  const isRateLimited = error === 'rate_limited';

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (loading || isRateLimited) return;
    if (onSubmit) onSubmit();
  }, [loading, isRateLimited, onSubmit]);

  return (
    <div style={{
      background: VT.bgSoft, minHeight: '100%', width: '100%',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontFamily: VT.font.sans, color: VT.ink,
      padding: '40px 24px', boxSizing: 'border-box',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginBottom: 18,
        }}>
          <a href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <BrandMark size={26} fontSize={20} />
          </a>
        </div>

        <Card style={{
          padding: 28,
          boxShadow: VT.shadow.card,
          borderTop: `2px solid ${VT.success}`,
        }}>
          <h1 style={{
            fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em',
            margin: '0 0 6px', lineHeight: 1.2,
          }}>
            Войдите в свой кабинет
          </h1>
          <p style={{
            fontSize: 13.5, color: VT.inkSoft, margin: '0 0 18px',
            lineHeight: 1.5,
          }}>
            Введите логин и пароль, которые мы прислали вам после создания Самосайта.
          </p>

          {isRateLimited
            ? <CustomerRateLimitNotice retryAfterSeconds={retryAfterSeconds ?? 263} />
            : (error && <CustomerErrorNotice code={error} />)
          }

          <form onSubmit={handleSubmit} noValidate>
            <label htmlFor="ss-customer-login" style={{
              display: 'block', fontSize: 12, color: VT.inkSoft,
              marginBottom: 4, fontWeight: 500,
            }}>Логин</label>
            <CLTextField
              id="ss-customer-login"
              type="text"
              value={login}
              onChange={setLogin}
              ariaLabel="Логин"
              autoComplete="username"
              placeholder="например, studia-anna"
              autoFocus
              disabled={loading || isRateLimited}
              mono
              style={{ marginBottom: 12 }} />

            <label htmlFor="ss-customer-password" style={{
              display: 'block', fontSize: 12, color: VT.inkSoft,
              marginBottom: 4, fontWeight: 500,
            }}>Пароль</label>
            <CLTextField
              id="ss-customer-password"
              type="password"
              value={password}
              onChange={setPassword}
              ariaLabel="Пароль"
              autoComplete="current-password"
              placeholder="Пароль из сообщения"
              disabled={loading || isRateLimited}
              mono />

            <div style={{ marginTop: 20 }}>
              <Btn
                type="submit"
                style={{ width: '100%' }}
                disabled={loading || isRateLimited || !login || !password}
                iconRight={loading ? <Spinner size={14} /> : <IconArrow />}>
                {loading ? 'Проверяем…' : 'Войти'}
              </Btn>
            </div>
          </form>
        </Card>

        <div style={{
          marginTop: 22, textAlign: 'center',
          fontSize: 13.5, color: VT.inkSoft,
        }}>
          Ещё нет Самосайта?{' '}
          {onCreateSiteClick ? (
            <button
              type="button"
              onClick={onCreateSiteClick}
              style={{
                border: 'none', background: 'transparent',
                color: VT.accent, fontWeight: 600, cursor: 'pointer',
                fontFamily: 'inherit', fontSize: 13.5, padding: 0,
              }}>
              Сделать&nbsp;<span aria-hidden="true">→</span>
            </button>
          ) : (
            <a href="/" style={{
              color: VT.accent, fontWeight: 600, textDecoration: 'none',
            }}>
              Сделать&nbsp;<span aria-hidden="true">→</span>
            </a>
          )}
        </div>

        <div style={{
          marginTop: 14, textAlign: 'center',
          fontSize: 11.5, color: VT.inkFaint, lineHeight: 1.5,
        }}>
          Доступ в кабинет выдаётся после создания Самосайта —
          мы пришлём логин и пароль по указанным контактам.
        </div>
      </div>
    </div>
  );
}

// TZ-aligned alias — primary export name is `CustomerLogin` per brief §2.
export const CustomerLogin = S20_CustomerLogin;
