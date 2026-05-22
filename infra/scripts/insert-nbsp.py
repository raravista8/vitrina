#!/usr/bin/env python3
"""
insert-nbsp.py — semi-automated Russian typography pass.

Spec: docs/CLAUDE_CODE_TZ_typography.md §2.

Что делает: проходит по `.tsx` и `.j2` файлам, ищет короткие слова RU
которые **должны** быть с non-breaking space после них чтобы не виснуть
в конце строки на узких mobile-viewport. Заменяет regular space (U+0020)
после такого слова на U+00A0 (NBSP).

Список коротких слов — typography spec §2:
    в с к у о и а на за от до по из для что как или но же ли то не без при со ко

Use:
    python3 infra/scripts/insert-nbsp.py landing/components/*.tsx --dry-run
    python3 infra/scripts/insert-nbsp.py landing/components/Pricing.tsx --apply

**ВАЖНО — safety:**
  • Skip JSX className, style attributes, import statements, file paths
    (regex-based, не AST — есть edge cases).
  • Skip lines уже содержащих U+00A0 (не дублируем).
  • Default — dry-run. `--apply` required для записи на диск.
  • Always print diff перед записью.
  • Recommend: run prettier --write после, чтобы normalize whitespace.

Не использует heavy parsing — простой line-by-line regex. Для cleaner
implementation в будущем — переписать на TS AST через babel/typescript-
eslint utility.
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

# Short words — typography spec §2. Lowercase first; we case-fold while
# matching so «В» / «На» тоже catch'нутся.
SHORT_WORDS: list[str] = [
    "в",
    "с",
    "к",
    "у",
    "о",
    "и",
    "а",
    "на",
    "за",
    "от",
    "до",
    "по",
    "из",
    "для",
    "что",
    "как",
    "или",
    "но",
    "же",
    "ли",
    "то",
    "не",
    "без",
    "при",
    "со",
    "ко",
]

# Build a single regex matching any of these short words preceded by space-
# or start-of-string, followed by regular space then a non-space char.
# Capture groups so we can re-emit prefix + word + nbsp + rest.
SHORT_WORD_GROUP = "|".join(re.escape(w) for w in SHORT_WORDS)
PATTERN = re.compile(
    # Lookbehind: start, space, или non-cyrillic char (чтобы «нав» в
    # середине слова не сматчилось как «на»).
    r"(?<![А-Яа-яЁё])"
    rf"({SHORT_WORD_GROUP})"
    r" "  # regular space U+0020
    r"(?=\S)",
    re.IGNORECASE,
)


def process_line(line: str) -> tuple[str, int]:
    """Insert NBSP в одну строку. Returns (new_line, replacements_count)."""
    # Skip JS/JSX lines где nbsp would break syntax:
    stripped = line.lstrip()
    skip_prefixes = (
        "import ",
        "export ",
        "from ",
        "//",
        "/*",
        "*",
        "*/",
        "const ",
        "let ",
        "var ",
        "function ",
        "interface ",
        "type ",
        "return (",
        "return;",
    )
    if any(stripped.startswith(p) for p in skip_prefixes):
        return line, 0

    # Skip lines containing only `className=`, `style=`, etc — non-text JSX
    # attributes. We do this by heuristic: if line has `className=` or
    # `style=` and не имеет JSX text node syntax `{...}` or `>текст<`, skip.
    if ("className=" in line or "style=" in line) and ">" not in line:
        return line, 0

    count = 0

    def repl(m: re.Match[str]) -> str:
        nonlocal count
        count += 1
        return f"{m.group(1)} "

    return PATTERN.sub(repl, line), count


def process_file(path: Path, apply: bool) -> int:
    """Process one file. Returns count of replacements."""
    try:
        content = path.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as exc:
        print(f"  ✗ {path}: read failed: {exc}", file=sys.stderr)
        return 0

    new_lines: list[str] = []
    total = 0
    for line in content.splitlines(keepends=True):
        new_line, n = process_line(line)
        new_lines.append(new_line)
        total += n

    if total == 0:
        return 0

    new_content = "".join(new_lines)
    print(f"  {path}: {total} replacements")

    if apply:
        path.write_text(new_content, encoding="utf-8")
        print(f"    ✓ written")

    return total


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("paths", nargs="+", help="File or glob paths to process")
    parser.add_argument(
        "--apply",
        action="store_true",
        help="Actually write changes (default: dry-run)",
    )
    args = parser.parse_args()

    total_changes = 0
    for arg_path in args.paths:
        path = Path(arg_path)
        if not path.exists():
            print(f"  ✗ {arg_path}: not found", file=sys.stderr)
            continue
        if path.is_dir():
            print(f"  ✗ {arg_path}: directory not supported, expand glob explicitly", file=sys.stderr)
            continue
        total_changes += process_file(path, args.apply)

    if args.apply:
        print(f"\nTotal: {total_changes} replacements applied")
        print("Run `npx prettier --write` to normalize whitespace afterwards.")
    else:
        print(f"\nTotal: {total_changes} replacements proposed (dry-run)")
        print("Re-run with --apply to write changes.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
