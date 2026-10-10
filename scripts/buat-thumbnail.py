"""Membuat thumbnail kartu (480x252 WebP) dari gambar OG di public/og/.

Jalankan setelah scripts/buat-gambar-sosial.cjs:  python3 scripts/buat-thumbnail.py
"""
from pathlib import Path
from PIL import Image

src = Path('public/og')
dst = Path('public/thumb')
dst.mkdir(exist_ok=True)
for png in sorted(src.glob('*.png')):
    with Image.open(png) as im:
        im.convert('RGB').resize((480, 252), Image.LANCZOS).save(dst / f'{png.stem}.webp', 'WEBP', quality=78, method=6)
print(f'{len(list(dst.glob("*.webp")))} thumbnail di {dst}/')
