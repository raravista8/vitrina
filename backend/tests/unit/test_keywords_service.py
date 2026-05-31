"""Keyword parse / apply / minus-word generation (spec 03_keywords.md §3-§6)."""

from __future__ import annotations

import pytest

from app.core.keywords.service import (
    GROUP_KEYS,
    apply_keywords_to_html,
    generate_minus_words,
    parse_keywords_from_html,
    sanitize_groups,
    source_rev,
)
from app.core.publishing.elektrik import render_all, resolve_elektrik_dir

pytestmark = pytest.mark.unit


@pytest.fixture(scope="module")
def elektrik_html() -> str:
    out = render_all(
        base_dir=resolve_elektrik_dir(), base_url="https://elektrik-spb.samosite.online"
    )
    return out["index.html"][0]  # type: ignore[return-value]


def test_parse_reads_four_groups_from_real_site(elektrik_html: str) -> None:
    groups = parse_keywords_from_html(elektrik_html)
    assert set(groups) == set(GROUP_KEYS)
    # main from Title/H1 — the site leads with this phrase
    assert any("Электромонтаж под ключ в СПб" in p for p in groups["main"])
    # h2 from section headings
    assert any("Электромонтажные работы в СПб" in p for p in groups["h2"])
    # text from the <meta name="keywords"> target phrases
    assert any("электромонтаж под ключ" in p.lower() for p in groups["text"])
    assert len(groups["text"]) > 10
    # no blog pages yet
    assert groups["blog"] == []


def test_parse_empty_html_yields_empty_groups() -> None:
    groups = parse_keywords_from_html("<html><head></head><body></body></html>")
    assert groups == {"main": [], "h2": [], "text": [], "blog": []}


def test_apply_replaces_meta_keywords_only(elektrik_html: str) -> None:
    before_title = elektrik_html.split("<title>")[1].split("</title>")[0]
    groups = {
        "main": ["электрик спб"],
        "h2": ["замена проводки"],
        "text": ["вызов электрика"],
        "blog": [],
    }
    out = apply_keywords_to_html(elektrik_html, groups)
    meta = out.split('name="keywords" content="')[1].split('"')[0]
    for phrase in ("электрик спб", "замена проводки", "вызов электрика"):
        assert phrase in meta
    # exactly one keywords meta; visible Title untouched
    assert out.count('name="keywords"') == 1
    assert out.split("<title>")[1].split("</title>")[0] == before_title


def test_apply_inserts_meta_when_absent() -> None:
    html = "<html><head><title>X</title></head><body><h1>Hi</h1></body></html>"
    out = apply_keywords_to_html(html, {"main": ["слово"], "h2": [], "text": [], "blog": []})
    assert '<meta name="keywords" content="слово" />' in out
    assert out.lower().index("</head>") > out.index("слово")  # injected inside head


def test_sanitize_trims_dedups_caps_and_drops_unknown() -> None:
    out = sanitize_groups(
        {
            "main": ["  Электрик  ", "электрик", "ЭЛЕКТРИК"],  # dup (case/space) → 1
            "h2": "not-a-list",  # wrong type → []
            "text": ["x" * 200, "ок"],  # over-length dropped
            "blog": [],
            "evil": ["ignored"],  # unknown key dropped
        }
    )
    assert out["main"] == ["Электрик"]
    assert out["h2"] == []
    assert out["text"] == ["ок"]
    assert "evil" not in out


def test_source_rev_stable_and_sensitive() -> None:
    a = {"main": ["x"], "h2": [], "text": [], "blog": []}
    assert source_rev(a) == source_rev(dict(a))
    assert source_rev(a) != source_rev({"main": ["y"], "h2": [], "text": [], "blog": []})


def test_minus_words_per_niche() -> None:
    base = generate_minus_words(None)
    electrician = generate_minus_words("electrician")
    assert "вакансии" in base
    assert "работа" in base
    assert set(base).issubset(set(electrician))  # niche extends base
    assert "кабель купить" in electrician
    assert "удостоверение" in electrician
    assert "кабель купить" not in base
    assert len(electrician) == len(set(electrician))  # deduped
