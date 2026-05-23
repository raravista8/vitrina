// @samosite/canon · admin-core public types (0.2.0-alpha.1)
// Mirrors CANON_ADMIN_INTERACTIVE_TZ §3.1-3.4 + §3.11-3.12.
// Runtime components live in ./index.tsx — these are pure types for consumer apps.

import type * as React from 'react';

// ─────────────────────────────────────────────────────────────
// Shared
// ─────────────────────────────────────────────────────────────

export type ContactType = 'telegram' | 'phone' | 'email' | 'max';

export type SourceType =
  | 'yandex_maps' | 'telegram' | 'twogis' | 'avito' | 'website'
  | 'vk' | 'instagram' | 'whatsapp' | 'youtube' | 'photos' | 'unknown';

export type ApplicationStatus = 'pending' | 'approved' | 'rejected';

/**
 * Status pill accepts the union of application / site / lead statuses.
 * Aliases live for canvas back-compat (`new`, `parsing`, `generated`,
 * `published`, `rework`) — these map onto the same visual buckets.
 */
export type StatusPillStatus =
  | ApplicationStatus
  // applications (legacy / pipeline)
  | 'new' | 'parsing' | 'generated' | 'published' | 'rework'
  // sites
  | 'draft' | 'generating' | 'pending_review' | 'paused' | 'archived'
  // leads
  | 'read';

export interface StatusPillProps {
  status: StatusPillStatus;
  size?: 'sm' | 'md';
}

export interface StatTileProps {
  label: string;
  value: number | string;
  delta?: number | string;
  deltaSign?: '+' | '-' | null;
  sub?: string;
  onClick?: () => void;
  loading?: boolean;
}

// Shared design surfaces (NEW in 0.2)
export interface SkeletonBlockProps {
  width?: number | string;
  height?: number | string;
  radius?: number;
  style?: React.CSSProperties;
}

export interface EmptyStateProps {
  title: string;
  hint?: string;
}

export interface ErrorBlockProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export interface RateLimitCountdownProps {
  retryAfterSeconds: number;
}

// ─────────────────────────────────────────────────────────────
// AdminLogin (ТЗ §3.1)
// ─────────────────────────────────────────────────────────────

export type AdminLoginStep = 1 | 2;
export type AdminLoginMode = 'totp' | 'backup';
export type AdminLoginError =
  | null
  | 'invalid_credentials'
  | 'invalid_challenge'
  | 'invalid_code'
  | 'rate_limited'
  | 'network_error'
  | 'unknown_error';

export interface AdminLoginProps {
  step?: AdminLoginStep;
  onStepChange?: (step: AdminLoginStep) => void;

  // Step 1 fields
  username?: string;
  password?: string;
  onUsernameChange?: (value: string) => void;
  onPasswordChange?: (value: string) => void;
  onSubmitCredentials?: (username: string, password: string) => void | Promise<void>;

  // Step 2 fields
  mode?: AdminLoginMode;
  onModeChange?: (mode: AdminLoginMode) => void;
  totp?: string;
  backupCode?: string;
  onTotpChange?: (value: string) => void;
  onBackupCodeChange?: (value: string) => void;
  onSubmitCode?: (kind: AdminLoginMode, code: string) => void | Promise<void>;

  // Status
  loading?: boolean;
  error?: AdminLoginError;
  rateLimited?: boolean;
  rateLimitedRetryAfterSeconds?: number | null;
}

// ─────────────────────────────────────────────────────────────
// AdminDashboard (ТЗ §3.2)
// ─────────────────────────────────────────────────────────────

export type AdminDashboardSection =
  | 'dashboard' | 'apps' | 'sites' | 'leads'
  | 'waitlist' | 'feedback' | 'settings';

export interface AdminDashboardData {
  counters: {
    apps_total: number;
    apps_pending: number;
    sites_published: number;
    leads_total: number;
    feedback_total: number;
  };
  applications_series_14d: Array<{
    day: string;   // ISO date "2026-05-23"
    count: number;
  }>;
}

export interface AdminDashboardProps {
  data?: AdminDashboardData;
  loading?: boolean;
  error?: string | null;
  onNavigate?: (section: AdminDashboardSection) => void;
  onRefresh?: () => void;
  /**
   * @internal Used by canvas-mode to render WITHOUT the AdminChrome wrapper.
   * Pass `false` only if you're rendering inside your own `<AdminChrome>`.
   * Default = `true` (chrome included).
   */
  _embed?: boolean;
}

// ─────────────────────────────────────────────────────────────
// AppsList (ТЗ §3.3)
// ─────────────────────────────────────────────────────────────

export interface ApplicationRow {
  id: string;
  source_type: SourceType;
  source_url: string | null;
  contact_type: ContactType;
  contact_value_masked: string;
  status: ApplicationStatus | StatusPillStatus;  // accepts API enum + legacy pipeline values
  rejection_reason: string | null;
  is_manual_review: boolean;
  user_id: string | null;
  created_at: string;
}

export interface AppsListData {
  total: number;
  items: ApplicationRow[];
  limit: number;
  offset: number;
}

export interface AppsListProps {
  data?: AppsListData;
  loading?: boolean;
  error?: string | null;

  statusFilter?: ApplicationStatus | 'all';
  onStatusFilterChange?: (status: ApplicationStatus | 'all') => void;

  onPageChange?: (offset: number, limit: number) => void;
  onRowClick?: (appId: string) => void;

  /** @internal — see AdminDashboardProps._embed */
  _embed?: boolean;
}

// ─────────────────────────────────────────────────────────────
// AppDetail (ТЗ §3.4)
// ─────────────────────────────────────────────────────────────

export interface UserRow {
  id: string;
  contact_type: ContactType;
  contact_value_masked: string;
  plan: 'trial' | 'pro' | 'free';
  plan_until: string | null;
}

export interface ConsentRow {
  id: string;
  policy_version: number;
  created_at: string;
}

export interface AppDetailData {
  application: ApplicationRow;
  user: UserRow | null;
  consent: ConsentRow | null;
}

export interface AppDetailProps {
  data?: AppDetailData;
  loading?: boolean;
  error?: string | null;

  onApprove?: (appId: string) => void | Promise<void>;
  onReject?: (appId: string, reason?: string) => void | Promise<void>;
  onBack?: () => void;

  actionLoading?: boolean;
  actionError?: string | null;

  /** @internal — see AdminDashboardProps._embed */
  _embed?: boolean;
}

// ─────────────────────────────────────────────────────────────
// AdminChrome (ТЗ §3.11)
// ─────────────────────────────────────────────────────────────

export type AdminChromeSection = AdminDashboardSection;

export interface AdminUser {
  username: string;
  initials: string;
}

export interface AdminChromeProps {
  active: AdminChromeSection | 'dash';  // 'dash' kept for canvas back-compat → maps to 'dashboard'
  user?: AdminUser;
  onNavigate?: (section: AdminChromeSection) => void;
  onLogout?: () => void | Promise<void>;
  badgeCounts?: Partial<Record<AdminChromeSection, number>>;
  children: React.ReactNode;
}
