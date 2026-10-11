"""Generates the launcher PNGs (Android 7.x fallback), the Play Store icon and the feature graphic.

The adaptive icon itself (Android 8+) is vector: res/drawable/ic_launcher_foreground.xml.
Requires Pillow: python3 -m pip install pillow, then: python3 scripts/gerar-icones.py
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

RAIZ = Path(__file__).resolve().parent.parent
RES = RAIZ / "android/app/src/main/res"
PLAY = RAIZ / "docs/play"

LARANJA = "#D25719"
CREME = "#F3CCB8"
BRANCO = "#FFFFFF"

# Same bolt as ic_launcher_foreground.xml, on the 108-unit adaptive-icon grid.
RAIO = [(60, 22), (36, 60), (52, 60), (46, 86), (74, 46), (57, 46), (64, 22)]
SUPERSAMPLE = 4


def raio(tamanho: int, escala: float, centro: tuple[float, float]) -> list[tuple[float, float]]:
    """Bolt points scaled so the 108-grid maps to `tamanho * escala` pixels around `centro`."""
    fator = tamanho * escala / 108
    cx, cy = centro
    return [(cx + (x - 54) * fator, cy + (y - 54) * fator) for x, y in RAIO]


def icone(tamanho: int, redondo: bool, cantos: bool = True) -> Image.Image:
    s = tamanho * SUPERSAMPLE
    img = Image.new("RGBA", (s, s), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if redondo:
        d.ellipse((0, 0, s - 1, s - 1), fill=LARANJA)
    elif cantos:
        d.rounded_rectangle((0, 0, s - 1, s - 1), radius=s * 0.18, fill=LARANJA)
    else:
        d.rectangle((0, 0, s, s), fill=LARANJA)
    d.polygon(raio(s, 1.0, (s / 2, s / 2)), fill=BRANCO)
    return img.resize((tamanho, tamanho), Image.LANCZOS)


def launcher_pngs() -> None:
    for pasta, tamanho in {"mdpi": 48, "hdpi": 72, "xhdpi": 96, "xxhdpi": 144, "xxxhdpi": 192}.items():
        destino = RES / f"mipmap-{pasta}"
        icone(tamanho, redondo=False).save(destino / "ic_launcher.png")
        icone(tamanho, redondo=True).save(destino / "ic_launcher_round.png")


def play_icon() -> None:
    # Play applies its own mask: full square, no transparency.
    icone(512, redondo=False, cantos=False).convert("RGB").save(PLAY / "icone-512.png")


def feature_graphic() -> None:
    largura, altura = 1024, 500
    img = Image.new("RGB", (largura, altura), LARANJA)
    d = ImageDraw.Draw(img)
    d.ellipse((60, 90, 380, 410), fill=CREME)
    d.polygon(raio(320, 1.05, (220, 250)), fill=LARANJA)
    titulo = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial Bold.ttf", 72)
    texto = ImageFont.truetype("/System/Library/Fonts/Supplemental/Arial.ttf", 30)
    d.text((430, 160), "Solução Elétrica", font=titulo, fill=BRANCO)
    for i, linha in enumerate(
        ["Dimensionamento de cabos, disjuntores", "e eletrodutos segundo a NBR 5410", "Funciona sem internet"]
    ):
        d.text((432, 262 + i * 42), linha, font=texto, fill=BRANCO)
    img.save(PLAY / "feature-graphic-1024x500.png")


if __name__ == "__main__":
    launcher_pngs()
    play_icon()
    feature_graphic()
    print("ok")
