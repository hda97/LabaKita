// Efek gerak yang mengikuti kursor. Hanya aktif di perangkat dengan mouse/trackpad
// dan dimatikan bila pengguna memilih "kurangi gerakan" di sistemnya.
const root = document.documentElement;
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

// 1. Muncul perlahan saat digulir
const reveals = document.querySelectorAll('[data-reveal]');
if (!reduce && 'IntersectionObserver' in window) {
  root.classList.add('motion');
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const el = en.target;
        const siblings = [...el.parentElement.children].filter((c) => c.hasAttribute('data-reveal'));
        el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 5) * 60}ms`;
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
}

if (!reduce && finePointer) {
  // 2. Cahaya lembut dan cincin yang mengikuti kursor
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.append(glow, ring);

  let tx = innerWidth / 2;
  let ty = innerHeight / 3;
  let gx = tx;
  let gy = ty;
  let rx = tx;
  let ry = ty;
  let running = false;
  const depthEls = [...document.querySelectorAll('[data-depth]')];

  const frame = () => {
    gx += (tx - gx) * 0.08;
    gy += (ty - gy) * 0.08;
    rx += (tx - rx) * 0.22;
    ry += (ty - ry) * 0.22;
    glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    if (Math.abs(tx - gx) + Math.abs(ty - gy) > 0.3) requestAnimationFrame(frame);
    else running = false;
  };

  addEventListener(
    'pointermove',
    (e) => {
      tx = e.clientX;
      ty = e.clientY;
      root.classList.add('cursor-on');
      const hot = e.target.closest?.('a, button, input, select, label, textarea, summary');
      ring.classList.toggle('is-hot', !!hot);

      // 3. Paralaks: elemen bergeser berlawanan arah kursor
      const nx = tx / innerWidth - 0.5;
      const ny = ty / innerHeight - 0.5;
      for (const el of depthEls) {
        const d = Number(el.dataset.depth);
        el.style.transform = `translate3d(${nx * d}px, ${ny * d}px, 0)`;
      }

      // 4. Sorotan di dalam kartu
      const card = e.target.closest?.('.card, .ha-card, .hb-panel');
      if (card) {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - r.left}px`);
        card.style.setProperty('--my', `${e.clientY - r.top}px`);
      }

      if (!running) {
        running = true;
        requestAnimationFrame(frame);
      }
    },
    { passive: true },
  );
  document.addEventListener('pointerleave', () => root.classList.remove('cursor-on'));
  addEventListener('pointerdown', () => ring.classList.add('is-down'));
  addEventListener('pointerup', () => ring.classList.remove('is-down'));
}
