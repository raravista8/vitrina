// @samosite/canon · admin-ops public types (0.2.0-alpha.1 — TYPES ONLY)
//
// ⚠️ Runtime components in @samosite/canon/admin-ops are still on the 0.1.x
// presentational API. Don't pass these props to the components yet — they
// will be silently ignored. The types are shipped early so consumer apps
// can write code against the stable contract while we finish 0.2.0.
//
// Mirrors CANON_ADMIN_INTERACTIVE_TZ §3.5-3.10. See CHANGELOG.md for the
// per-component shipping plan.

import type {
  ContactType, SourceType,
  ApplicationStatus, StatusPillStatus,
} from '../admin-core/types';

// ─────────────────────────────────────────────────────────────
// SitesList (ТЗ §3.5)
// ─────────────────────────────────────────────────────────────

export type SiteStatus =
  | 'draft' | 'generating' | 'pending_review' | 'published'
  | 'paused' | 'archived';

export interface SiteRow {
  id: string;
  user_id: string;
  subdomain: string;
  custom_domain: string | null;
  source_type: SourceType;
  source_url: string;
  status: SiteStatus;
  last_synced_at: string | null;
  published_at: string | null;
  created_at: string;
}

export interface SitesListData {
  total: number;
  items: SiteRow[];
  limit: number;
  offset: number;
}

export interface SitesListProps {
  data?: SitesListData;
  loading?: boolean;
  error?: string | null;

  statusFilter?: SiteStatus | 'all';
  onStatusFilterChange?: (status: SiteStatus | 'all') => void;

  onPageChange?: (offset: number, limit: number) => void;
  onRowClick?: (siteId: string) => void;
}

// ─────────────────────────────────────────────────────────────
// SiteDetail (ТЗ §3.6)
// ─────────────────────────────────────────────────────────────

export type SiteAction =
  | 'publish' | 'republish' | 'pause_sync' | 'resume_sync'
  | 'archive' | 'unarchive';

export interface SiteDetailData {
  site: SiteRow;
  leads_count: number;
}

export interface SiteDetailProps {
  data?: SiteDetailData;
  loading?: boolean;
  error?: string | null;

  previewUrl?: string;
  onAction?: (siteId: string, action: SiteAction) => void | Promise<void>;
  onBack?: () => void;
  actionLoading?: SiteAction | null;
}

// ─────────────────────────────────────────────────────────────
// Leads (ТЗ §3.7) — PII-sensitive
// ─────────────────────────────────────────────────────────────

export interface LeadRowMasked {
  id: string;
  site_id: string;
  status: 'new' | 'read' | 'archived';
  ip_prefix: string | null;
  created_at: string;
}

export interface LeadsListData {
  total: number;
  items: LeadRowMasked[];
  limit: number;
  offset: number;
}

export interface LeadRowDecrypted {
  id: string;
  site_id: string;
  name: string | null;
  phone: string | null;
  message: string | null;
  status: 'new' | 'read' | 'archived';
  created_at: string;
}

export interface LeadsProps {
  data?: LeadsListData;
  loading?: boolean;
  error?: string | null;

  siteFilter?: string | null;
  onSiteFilterChange?: (siteId: string | null) => void;
  onPageChange?: (offset: number, limit: number) => void;

  // Bulk decrypt modal
  selectedLeadIds?: string[];
  onSelectLead?: (leadId: string, selected: boolean) => void;
  onClearSelection?: () => void;
  onOpenDecryptModal?: () => void;

  decryptModalOpen?: boolean;
  decryptTotp?: string;
  onDecryptTotpChange?: (value: string) => void;
  onDecryptSubmit?: (leadIds: string[], totpCode: string) => void | Promise<void>;
  onDecryptCancel?: () => void;
  decryptedRows?: LeadRowDecrypted[] | null;
  decryptLoading?: boolean;
  decryptError?: string | null;
}

// ─────────────────────────────────────────────────────────────
// Waitlist (ТЗ §3.8)
// ─────────────────────────────────────────────────────────────

export interface WaitlistItem {
  source_name: string;
  votes: number;
  first_seen: string;
  last_seen: string;
  ready: boolean;
}

export interface WaitlistData {
  items: WaitlistItem[];
  threshold: number;
}

export interface WaitlistProps {
  data?: WaitlistData;
  loading?: boolean;
  error?: string | null;
  onMarkInDevelopment?: (sourceName: string) => void | Promise<void>;
}

// ─────────────────────────────────────────────────────────────
// FeedbackInbox (ТЗ §3.9)
// ─────────────────────────────────────────────────────────────

export type FeedbackType =
  | 'source_request' | 'feature_request' | 'bug' | 'general';

export interface FeedbackRow {
  id: string;
  type: FeedbackType;
  source_name: string | null;
  email_or_contact_masked: string | null;
  message: string;
  checkboxes: Record<string, boolean> | null;
  created_at: string;
}

export interface FeedbackInboxData {
  total: number;
  items: FeedbackRow[];
  limit: number;
  offset: number;
}

export interface FeedbackInboxProps {
  data?: FeedbackInboxData;
  loading?: boolean;
  error?: string | null;

  typeFilter?: FeedbackType | 'all';
  onTypeFilterChange?: (type: FeedbackType | 'all') => void;

  searchQuery?: string;
  onSearchChange?: (q: string) => void;

  onPageChange?: (offset: number, limit: number) => void;
  onRowClick?: (feedbackId: string) => void;
}

// ─────────────────────────────────────────────────────────────
// Settings (ТЗ §3.10)
// ─────────────────────────────────────────────────────────────

export interface SettingsData {
  environment: 'dev' | 'staging' | 'prod';
  log_level: 'DEBUG' | 'INFO' | 'WARNING' | 'ERROR';
  app_base_url: string;
  landing_base_url: string;
  sites_base_domain: string;
  feature_max_bot: boolean;
  feature_auto_sync: boolean;
  captcha_configured: boolean;
  tg_bot_configured: boolean;
  yandexgpt_configured: boolean;
  yookassa_configured: boolean;
  s3_configured: boolean;
  fernet_keys_configured: boolean;
}

export interface SettingsProps {
  data?: SettingsData;
  loading?: boolean;
  error?: string | null;
  onRefresh?: () => void;
}

// Re-export shared types so consumers can `import { ContactType } from '@samosite/canon/admin-ops'` too
export type { ContactType, SourceType, ApplicationStatus, StatusPillStatus };
