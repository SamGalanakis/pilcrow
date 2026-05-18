#!/usr/bin/env python3
"""Render the social-card OG image for pilcrow.ink.

1200x630 PNG. Cream paper, gilt pilcrow glyph, italic title, italic
tagline, sage band at the foot. Same family as the site cover.

Output: docs/og.png
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
FONT_ITALIC = ROOT / "docs/fonts/et-book-display-italic-old-style-figures.ttf"
FONT_ROMAN = ROOT / "docs/fonts/et-book-roman-old-style-figures.ttf"
OUT = ROOT / "docs/og.png"

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


def main() -> None:
    img = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(img)

    # Match the site cover: ¶ inline with the wordmark on the same baseline,
    # both italic, ¶ in gilt and the title in ink. Centered as a group.
    title_font = font(FONT_ITALIC, 168)
    tagline_font = font(FONT_ITALIC, 60)

    glyph = "¶"
    title = "Pilcrow"
    gap = 36  # gutter between ¶ and title (≈ 0.2em of the title size)

    glyph_w = draw.textlength(glyph, font=title_font)
    title_w = draw.textlength(title, font=title_font)
    total_w = glyph_w + gap + title_w
    x_start = (W - total_w) / 2

    # Anchor 'ls' = left edge, baseline — gives us clean baseline alignment
    # between the two strings without juggling ascent metrics manually.
    baseline_y = 330
    draw.text((x_start, baseline_y), glyph, font=title_font, fill=GILT_DEEP, anchor="ls")
    draw.text((x_start + glyph_w + gap, baseline_y), title, font=title_font, fill=INK, anchor="ls")

    # Tagline below, with enough gutter that the ¶'s italic descender does
    # not crash into the cap-line of the tagline.
    tagline_baseline = baseline_y + 130
    tagline = "Make your clanker your editor."
    tagline_w = draw.textlength(tagline, font=tagline_font)
    draw.text(((W - tagline_w) / 2, tagline_baseline), tagline, font=tagline_font, fill=INK_2, anchor="ls")

    # Sage foot band — narrow, just enough to ground the composition.
    band_h = 14
    draw.rectangle([(0, H - band_h), (W, H)], fill=SAGE)

    img.save(OUT, "PNG", optimize=True)
    print(f"wrote {OUT.relative_to(ROOT)}  ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
