#!/usr/bin/env python3
"""Render the social-preview images for pilcrow.ink.

Two assets:

  docs/og.png       1200x630, the hero card for Open Graph consumers
                    (Facebook, LinkedIn, Slack, Discord, iMessage, etc).
                    Inline italic '¶ Pilcrow', italic tagline beneath,
                    sage band at the foot.

  docs/og-square.png  600x600, the thumbnail asset for Twitter / X's
                      `summary` (small) card. Just the gilt ¶ glyph
                      centered on cream paper; text comes from
                      twitter:title / twitter:description.

Both share the site's family: ET Book italic, cream paper, gilt accent,
sage band.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_ITALIC = ROOT / "docs/fonts/et-book-display-italic-old-style-figures.ttf"
FONT_ROMAN = ROOT / "docs/fonts/et-book-roman-old-style-figures.ttf"
OUT_LARGE = ROOT / "docs/og.png"
OUT_SQUARE = ROOT / "docs/og-square.png"

W, H = 1200, 630

# Palette (oklch -> sRGB; see scripts/build-og-card.py history)
BG = "#f7f5ef"        # cream paper          (oklch 0.97 0.008 95)
INK = "#1e1a13"       # body text            (oklch 0.22 0.015 80)
INK_2 = "#423c33"     # softer text          (oklch 0.36 0.018 80)
GILT_DEEP = "#79601b" # gilt accent          (oklch 0.50 0.090 88)
GILT = "#9f8331"      # lighter gilt         (oklch 0.62 0.105 90)
SAGE = "#697669"      # plaster band         (oklch 0.55 0.024 145)
RULE = "#c7c4ba"      # faint hairline       (oklch 0.82 0.014 95)


def font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size)


def center_x(draw: ImageDraw.ImageDraw, text: str, f: ImageFont.FreeTypeFont) -> tuple[int, tuple[int, int, int, int]]:
    bbox = draw.textbbox((0, 0), text, font=f)
    text_w = bbox[2] - bbox[0]
    x = (W - text_w) // 2 - bbox[0]
    return x, bbox


def draw_centered(draw: ImageDraw.ImageDraw, text: str, y: int, f: ImageFont.FreeTypeFont, fill: str) -> tuple[int, int, int, int]:
    x, _ = center_x(draw, text, f)
    draw.text((x, y), text, font=f, fill=fill)
    return draw.textbbox((x, y), text, font=f)


def render_large() -> None:
    """1200x630 hero card for Open Graph consumers."""
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    title_font = font(FONT_ITALIC, 128)
    tagline_font = font(FONT_ITALIC, 46)

    glyph = "¶"
    title = "Pilcrow"
    gap = 28  # gutter between ¶ and title (≈ 0.2em of the title size)

    glyph_w = draw.textlength(glyph, font=title_font)
    title_w = draw.textlength(title, font=title_font)
    total_w = glyph_w + gap + title_w
    x_start = (W - total_w) / 2

    baseline_y = 290
    draw.text((x_start, baseline_y), glyph, font=title_font, fill=GILT_DEEP, anchor="ls")
    draw.text((x_start + glyph_w + gap, baseline_y), title, font=title_font, fill=INK, anchor="ls")

    tagline_baseline = baseline_y + 110
    tagline = "Make your clanker your editor."
    tagline_w = draw.textlength(tagline, font=tagline_font)
    draw.text(((W - tagline_w) / 2, tagline_baseline), tagline, font=tagline_font, fill=INK_2, anchor="ls")

    band_h = 14
    draw.rectangle([(0, H - band_h), (W, H)], fill=SAGE)

    img.save(OUT_LARGE, "PNG", optimize=True)
    print(f"wrote {OUT_LARGE.relative_to(ROOT)}  ({OUT_LARGE.stat().st_size // 1024} KB)")


def render_square() -> None:
    """600x600 thumbnail asset for Twitter's `summary` small card.

    Just the ¶ glyph centered on cream paper. At the ~125px thumb size
    X renders, text would be illegible — the wordmark + tagline come
    from twitter:title / twitter:description in the meta tags.
    """
    S = 600
    img = Image.new("RGB", (S, S), BG)
    draw = ImageDraw.Draw(img)

    glyph_font = font(FONT_ITALIC, 380)
    draw.text((S / 2, S / 2 + 30), "¶", font=glyph_font, fill=GILT_DEEP, anchor="mm")

    band_h = 8
    draw.rectangle([(0, S - band_h), (S, S)], fill=SAGE)

    img.save(OUT_SQUARE, "PNG", optimize=True)
    print(f"wrote {OUT_SQUARE.relative_to(ROOT)}  ({OUT_SQUARE.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    render_large()
    render_square()
