/**
 * Hero preview client (T1.4b).
 *
 * Calls POST /api/preview with a 3-second AbortController timeout (the
 * server has its own 3-s budget — we add a slightly larger client-side
 * one so we always see the server's structured 503 fallback rather than
 * timing out independently).
 *
 * Returns the count payload on success or ``null`` on any failure —
 * caller falls back to the static badge.
 */

export interface PreviewCounts {
  posts: number | null;
  photos: number | null;
  reviews: number | null;
}

export interface PreviewData {
  sourceType: "telegram" | "ymaps";
  name: string | null;
  counts: PreviewCounts;
}

const CLIENT_TIMEOUT_MS = 3500;

export async function fetchPreview(
  sourceType: "telegram" | "ymaps",
  sourceUrl: string,
  signal?: AbortSignal,
): Promise<PreviewData | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CLIENT_TIMEOUT_MS);
  // Forward the external signal so callers (Hero useEffect) can cancel
  // in-flight requests when the input value changes.
  if (signal) {
    if (signal.aborted) controller.abort();
    else signal.addEventListener("abort", () => controller.abort(), { once: true });
  }

  try {
    const response = await fetch("/api/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source_url: sourceUrl,
        source_type: sourceType,
      }),
      signal: controller.signal,
    });
    if (response.status !== 200) return null;

    const json = (await response.json()) as {
      ok?: boolean;
      data?: {
        source_type?: "telegram" | "ymaps";
        name?: string | null;
        counts?: { posts?: number | null; photos?: number | null; reviews?: number | null };
      };
    };
    if (!json.ok || !json.data) return null;

    return {
      sourceType: json.data.source_type ?? sourceType,
      name: json.data.name ?? null,
      counts: {
        posts: json.data.counts?.posts ?? null,
        photos: json.data.counts?.photos ?? null,
        reviews: json.data.counts?.reviews ?? null,
      },
    };
  } catch {
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Render the right-hand side of the badge text ("нашли 47 постов и 12 фото").
 * Returns ``null`` when no count is meaningful; caller renders the static
 * label only in that case.
 */
export function formatCounts(counts: PreviewCounts): string | null {
  const parts: string[] = [];
  if (counts.posts && counts.posts > 0) {
    parts.push(`${counts.posts} ${pluraliseRu(counts.posts, ["пост", "поста", "постов"])}`);
  }
  if (counts.photos && counts.photos > 0) {
    parts.push(`${counts.photos} ${pluraliseRu(counts.photos, ["фото", "фото", "фото"])}`);
  }
  if (counts.reviews && counts.reviews > 0) {
    parts.push(`${counts.reviews} ${pluraliseRu(counts.reviews, ["отзыв", "отзыва", "отзывов"])}`);
  }
  return parts.length > 0 ? `нашли ${parts.join(" и ")}` : null;
}

function pluraliseRu(n: number, forms: readonly [string, string, string]): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return forms[1];
  return forms[2];
}
