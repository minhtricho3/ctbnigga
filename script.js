"use strict";
function init(CFG) {
  const $ = (s, r = document) => r.querySelector(s);

  /* ---------- ICONS ---------- */
  const st = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8V6.5c0-.7.2-1 1.1-1H17V2h-2.6C11.300 2 10 3.700 10 6.200V8H7.500v3.500H10V22h4V11.500h2.800L17.300 8z"/></svg>`,
    discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5.500 5.500c1.800-.9 3.600-1.400 4.500-1.500l.4.900c1.100-.2 2.100-.2 3.200 0l.4-.9c.9.100 2.700.6 4.500 1.500 1.900 2.900 2.800 6 2.500 9.500-1.500 1.100-3 1.800-4.300 2.200l-1-1.600c.6-.2 1.100-.5 1.600-.8l-.4-.3c-2.700 1.200-5.700 1.200-8.400 0l-.4.300c.5.300 1 .6 1.600.8l-1 1.600c-1.300-.4-2.800-1.100-4.300-2.200-.3-3.500.6-6.600 2.500-9.500z"/><circle cx="9.200" cy="12" r="1.500" fill="#10162a"/><circle cx="14.800" cy="12" r="1.500" fill="#10162a"/></svg>`,
    zalo: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C6.500 3 2.500 6.600 2.500 11.200c0 2.600 1.300 4.800 3.400 6.300L5 21l3.800-1.900c.9.200 1.800.3 2.700.3 5.500 0 9.500-3.600 9.500-8.200S17.500 3 12 3z"/><path d="M8.500 8.800h7l-5.500 6.400h5.500" fill="none" stroke="#10162a" stroke-width="1.800" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    link: `<svg viewBox="0 0 24 24" ${st}><path d="M10 14a4 4 0 0 0 5.700 0l3-3a4 4 0 0 0-5.700-5.700l-1 1M14 10a4 4 0 0 0-5.700 0l-3 3a4 4 0 0 0 5.700 5.700l1-1"/></svg>`,
    copy: `<svg viewBox="0 0 24 24" ${st}><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>`,
    check: `<svg viewBox="0 0 24 24" ${st} stroke-width="3"><path d="M5 12l5 5 9-10"/></svg>`,
    arrow: `<svg viewBox="0 0 24 24" ${st}><path d="M5 12h14M13 6l6 6-6 6"/></svg>`,
    heart: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.500-4.600-9.500-9.200C1.100 8.500 3 5 6.500 5c2 0 3.500 1.100 5.500 3.200C14 6.100 15.500 5 17.500 5 21 5 22.900 8.500 21.500 11.800 19.500 16.400 12 21 12 21z"/></svg>`,
    eye: `<svg viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" d="M1.500 12S5.500 5 12 5s10.500 7 10.500 7-4 7-10.500 7S1.500 12 1.500 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/></svg>`,
    music: `<svg viewBox="0 0 24 24" ${st}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3" fill="currentColor"/><circle cx="18" cy="16" r="3" fill="currentColor"/></svg>`,
    prev: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 5h2.500v14H6zM20 5v14L9 12z"/></svg>`,
    next: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.500 5H18v14h-2.500zM4 5v14l11-7z"/></svg>`,
    play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>`,
    pause: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 4h4v16H6zM14 4h4v16h-4z"/></svg>`,
    shuffle: `<svg viewBox="0 0 24 24" ${st}><path d="M16 3h5v5M4 20 21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>`,
    repeat: `<svg viewBox="0 0 24 24" ${st}><path d="M17 2l4 4-4 4M3 11V9a3 3 0 0 1 3-3h15M7 22l-4-4 4-4M21 13v2a3 3 0 0 1-3 3H3"/></svg>`,
    volume: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.500 8.500a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
    chevron: `<svg viewBox="0 0 24 24" ${st}><path d="M6 9l6 6 6-6"/></svg>`
  };
  const setIcon = (el, name) => { el.innerHTML = ICONS[name] || ICONS.link; };
  document.querySelectorAll("[data-icon]").forEach(el => setIcon(el, el.dataset.icon));

  /* ---------- STORAGE (an toàn khi bị chặn) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };

  /* ---------- TOAST ---------- */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  /* ---------- TÊN / AVATAR / BACKGROUND ---------- */
  document.title = CFG.name || document.title;
  $("#name").textContent = CFG.name || "";

  const avatar = $("#avatar");
  avatar.onerror = () => {
    avatar.onerror = null;
    avatar.src = "data:image/svg+xml," + encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" shape-rendering="crispEdges"><rect width="16" height="16" fill="#141a30"/><rect x="3" y="2" width="10" height="12" fill="#f0be96"/><rect x="3" y="2" width="10" height="4" fill="#18181e"/><rect x="4" y="8" width="3" height="1" fill="#fff"/><rect x="9" y="8" width="3" height="1" fill="#fff"/></svg>');
  };
  avatar.src = CFG.avatar || "assets/avatar.png";

  (function setupBackground() {
    const bg = $("#bg"), src = CFG.background;
    if (!src) return;
    if (/\.(mp4|webm|ogv)(\?.*)?$/i.test(src)) {
      const v = document.createElement("video");
      v.className = "bg-media";
      Object.assign(v, { src, autoplay: true, muted: true, loop: true, playsInline: true });
      v.setAttribute("muted", ""); v.setAttribute("playsinline", "");
      v.onerror = () => v.remove();
      bg.prepend(v);
      v.play().catch(() => {});
    } else {
      const probe = new Image();
      probe.onload = () => {
        const d = document.createElement("div");
        d.className = "bg-media";
        d.style.backgroundImage = `url("${src}")`;
        bg.prepend(d);
      };
      probe.src = src;
    }
  })();

  /* ---------- TYPEWRITER ---------- */
  (function typewriter() {
    const lines = Array.isArray(CFG.bio) ? CFG.bio : [String(CFG.bio || "")];
    const el = $("#typed");
    let li = 0, ci = 0, del = false;
    (function tick() {
      const text = lines[li];
      ci += del ? -1 : 1;
      el.textContent = text.slice(0, ci);
      let wait = del ? 35 : 75;
      if (!del && ci === text.length) { del = true; wait = 1500; if (lines.length === 1) return; }
      else if (del && ci === 0) { del = false; li = (li + 1) % lines.length; wait = 350; }
      setTimeout(tick, wait);
    })();
  })();

  /* ---------- BURST (hạt pixel khi bấm) ---------- */
  const PAL = ["#55ff8a", "#3ee0ff", "#ff6bd6", "#ffe45c"];
  function burst(x, y, n = 10, spread = 60) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement("i");
      s.className = "burst";
      s.style.left = x + "px"; s.style.top = y + "px";
      s.style.background = PAL[i % PAL.length];
      const size = 4 + Math.random() * 6;
      s.style.width = s.style.height = size + "px";
      document.body.appendChild(s);
      const a = Math.random() * Math.PI * 2, d = spread * (0.4 + Math.random() * 0.8);
      s.animate([
        { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        { transform: `translate(calc(-50% + ${Math.cos(a) * d}px), calc(-50% + ${Math.sin(a) * d + 24}px)) scale(0)`, opacity: 0 }
      ], { duration: 550 + Math.random() * 350, easing: "cubic-bezier(.2,.8,.4,1)" }).onfinish = () => s.remove();
    }
  }
  document.addEventListener("pointerdown", e => burst(e.clientX, e.clientY, 7, 44));

  /* ---------- LIKE / VIEW (lưu qua /api/stats -> JSONBin) ---------- */
  const likesEl = $("#likes"), viewsEl = $("#views"), likeBtn = $("#likeBtn");
  const API = "/api/stats";

  let liked = store.get("liked", false);
  let counts = store.get("counts", { likes: 0, views: 0 });
  const today = new Date().toISOString().slice(0, 10);
  const needView = store.get("lastView", "") !== today; // mỗi trình duyệt tính 1 lượt xem / ngày

  function show(el, to, animate) {
    const from = +el.textContent || 0;
    if (!animate || from === to) { el.textContent = to; return; }
    const t0 = performance.now(), dur = 700;
    (function f(t) {
      const p = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(from + (to - from) * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(f);
    })(t0);
  }
  function render(animate) {
    show(likesEl, counts.likes, animate);
    show(viewsEl, counts.views, animate);
    likeBtn.classList.toggle("on", liked);
  }
  const save = () => store.set("counts", counts);

  async function api(action) {
    const r = await fetch(API, action
      ? { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) }
      : { cache: "no-store" });
    if (!r.ok) throw new Error("API " + r.status);
    const d = await r.json();
    return { likes: +d.likes || 0, views: +d.views || 0 };
  }
  // xếp hàng để các lần đọc-ghi không chạy chồng nhau
  let queue = Promise.resolve();
  const enqueue = fn => (queue = queue.then(fn, fn));

  render(false);
  enqueue(async () => {
    counts = await api(needView ? "view" : null);
    if (needView) store.set("lastView", today);
    save(); render(true);
  }).catch(e => console.warn(e));

  likeBtn.addEventListener("click", () => {
    const prevLiked = liked, prevCounts = { ...counts };
    liked = !liked;
    counts.likes = Math.max(0, counts.likes + (liked ? 1 : -1));
    store.set("liked", liked); save(); render(false);
    likesEl.textContent = counts.likes;
    if (liked) {
      const r = likeBtn.getBoundingClientRect();
      burst(r.left + 22, r.top + r.height / 2, 18, 70);
    }
    enqueue(async () => {
      counts = await api(liked ? "like" : "unlike");
      save(); render(false);
    }).catch(e => {
      console.warn(e);
      liked = prevLiked; counts = prevCounts;
      store.set("liked", liked); save(); render(false);
      toast("Không lưu được lượt tim, thử lại sau");
    });
  });

  /* ---------- LINKS ---------- */
  async function copyText(t) {
    try { await navigator.clipboard.writeText(t); return true; }
    catch {
      const ta = document.createElement("textarea");
      ta.value = t; ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch {}
      ta.remove(); return ok;
    }
  }
  const linksEl = $("#links");
  (CFG.links || []).forEach(item => {
    const isCopy = item.type === "copy";
    const el = document.createElement(isCopy ? "button" : "a");
    el.className = "link";
    if (isCopy) el.type = "button";
    else { el.href = item.url || "#"; el.target = "_blank"; el.rel = "noopener noreferrer"; }

    const ico = document.createElement("span"); ico.className = "l-ico"; setIcon(ico, item.id);
    const name = document.createElement("span"); name.className = "l-name"; name.textContent = item.label;
    el.append(ico, name);

    if (isCopy) {
      const val = document.createElement("span"); val.className = "l-val"; val.textContent = item.value;
      const act = document.createElement("span"); act.className = "l-act"; setIcon(act, "copy");
      el.append(val, act);
      el.addEventListener("click", async () => {
        const ok = await copyText(item.value);
        toast(ok ? `Đã copy ${item.label}: ${item.value}` : "Không copy được, hãy copy thủ công");
        if (!ok) return;
        el.classList.add("copied"); setIcon(act, "check");
        setTimeout(() => { el.classList.remove("copied"); setIcon(act, "copy"); }, 1600);
      });
    } else {
      const act = document.createElement("span"); act.className = "l-act arrow"; setIcon(act, "arrow");
      el.append(act);
    }
    linksEl.appendChild(el);
  });

  /* ---------- CARD TILT (chỉ máy có chuột) ---------- */
  const card = $("#card");
  if (matchMedia("(hover:hover) and (pointer:fine)").matches) {
    addEventListener("pointermove", e => {
      const x = (e.clientX / innerWidth - 0.5), y = (e.clientY / innerHeight - 0.5);
      card.style.setProperty("--ry", (x * 8).toFixed(2) + "deg");
      card.style.setProperty("--rx", (-y * 8).toFixed(2) + "deg");
    });
    document.addEventListener("pointerleave", () => {
      card.style.setProperty("--rx", "0deg"); card.style.setProperty("--ry", "0deg");
    });
  }

  /* ---------- HẠT PIXEL BAY (canvas) ---------- */
  (function particles() {
    const c = $("#fx"), ctx = c.getContext("2d");
    let W, H, dpr, parts = [];
    const cs = getComputedStyle(document.documentElement);
    const cols = ["--accent", "--accent-2", "--accent-3"].map(v => cs.getPropertyValue(v).trim() || "#55ff8a");
    function reset() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = c.width = innerWidth * dpr; H = c.height = innerHeight * dpr;
      const n = innerWidth < 700 ? 26 : 46;
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        s: (3 + Math.floor(Math.random() * 4)) * dpr,
        vy: (0.15 + Math.random() * 0.5) * dpr,
        ph: Math.random() * 6.28, col: cols[Math.floor(Math.random() * cols.length)]
      }));
    }
    addEventListener("resize", reset); reset();
    let raf;
    function frame(t) {
      ctx.clearRect(0, 0, W, H);
      for (const p of parts) {
        p.y -= p.vy; p.x += Math.sin(t / 1200 + p.ph) * 0.35 * dpr;
        if (p.y < -p.s) { p.y = H + p.s; p.x = Math.random() * W; }
        ctx.globalAlpha = 0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t / 700 + p.ph));
        ctx.fillStyle = p.col;
        ctx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.s);
      }
      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(frame);
    });
  })();

  /* ---------- MUSIC PLAYER ---------- */
  (function player() {
    const list = CFG.playlist || [];
    const P = $("#player");
    const els = {
      title: $("#pTitle"), artist: $("#pArtist"), mini: $("#pMini"),
      cur: $("#pCur"), dur: $("#pDur"), seek: $("#pSeek"), vol: $("#pVol"),
      play: $("#pPlay"), prev: $("#pPrev"), next: $("#pNext"),
      shuffle: $("#pShuffle"), repeat: $("#pRepeat"), toggle: $("#pToggle")
    };
    if (!list.length) { P.style.display = "none"; return; }

    const audio = new Audio();
    audio.preload = "metadata";
    let idx = 0, shuffle = false, repeatOne = false, dragging = false, started = false, warned = false;

    const fmt = s => (!isFinite(s) || s < 0) ? "0:00" : Math.floor(s / 60) + ":" + String(Math.floor(s % 60)).padStart(2, "0");
    const fill = (input) => input.style.setProperty("--p", (input.value / input.max * 100) + "%");

    /* thu gọn / mở rộng */
    const closed = store.get("playerClosed", false);
    P.classList.toggle("closed", closed);
    els.toggle.setAttribute("aria-expanded", String(!closed));
    els.toggle.addEventListener("click", () => {
      const c = P.classList.toggle("closed");
      els.toggle.setAttribute("aria-expanded", String(!c));
      store.set("playerClosed", c);
    });

    function load(i, autoplay) {
      idx = (i + list.length) % list.length;
      const t = list[idx];
      audio.src = encodeURI(t.src);
      els.title.textContent = t.title || "Không tên";
      els.artist.textContent = t.artist || "";
      els.mini.textContent = t.title || "";
      els.seek.value = 0; fill(els.seek);
      els.cur.textContent = "0:00"; els.dur.textContent = "0:00";
      warned = false;
      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({ title: t.title || "", artist: t.artist || "" });
      }
      if (autoplay) play();
    }
    function play() { return audio.play().catch(() => false); }
    function pick(dir) {
      if (shuffle && list.length > 1) {
        let n; do { n = Math.floor(Math.random() * list.length); } while (n === idx);
        return n;
      }
      return idx + dir;
    }
    const next = () => load(pick(1), true);
    const prev = () => {
      if (audio.currentTime > 3) { audio.currentTime = 0; return; }
      load(pick(-1), true);
    };

    els.play.addEventListener("click", () => audio.paused ? play() : audio.pause());
    els.next.addEventListener("click", next);
    els.prev.addEventListener("click", prev);
    els.shuffle.addEventListener("click", () => { shuffle = !shuffle; els.shuffle.classList.toggle("on", shuffle); toast(shuffle ? "Ngẫu nhiên: bật" : "Ngẫu nhiên: tắt"); });
    els.repeat.addEventListener("click", () => { repeatOne = !repeatOne; audio.loop = repeatOne; els.repeat.classList.toggle("on", repeatOne); toast(repeatOne ? "Lặp lại một bài: bật" : "Lặp lại một bài: tắt"); });

    audio.addEventListener("play", () => { P.classList.add("playing"); setIcon(els.play, "pause"); });
    audio.addEventListener("pause", () => { P.classList.remove("playing"); setIcon(els.play, "play"); });
    audio.addEventListener("ended", () => { if (list.length === 1) { audio.currentTime = 0; play(); } else next(); });
    audio.addEventListener("loadedmetadata", () => { els.dur.textContent = fmt(audio.duration); });
    audio.addEventListener("timeupdate", () => {
      if (dragging || !isFinite(audio.duration)) return;
      els.seek.value = audio.currentTime / audio.duration * 1000; fill(els.seek);
      els.cur.textContent = fmt(audio.currentTime);
    });
    audio.addEventListener("error", () => {
      if (warned) return; warned = true;
      toast("Không tìm thấy file nhạc: " + list[idx].src);
    });

    els.seek.addEventListener("input", () => {
      dragging = true; fill(els.seek);
      if (isFinite(audio.duration)) els.cur.textContent = fmt(els.seek.value / 1000 * audio.duration);
    });
    els.seek.addEventListener("change", () => {
      if (isFinite(audio.duration)) audio.currentTime = els.seek.value / 1000 * audio.duration;
      dragging = false;
    });

    const v0 = store.get("volume", typeof CFG.volume === "number" ? CFG.volume : 0.6);
    audio.volume = Math.min(1, Math.max(0, v0));
    els.vol.value = Math.round(audio.volume * 100); fill(els.vol);
    els.vol.addEventListener("input", () => {
      audio.volume = els.vol.value / 100; fill(els.vol); store.set("volume", audio.volume);
    });

    if ("mediaSession" in navigator) {
      const ms = navigator.mediaSession;
      ms.setActionHandler("play", play);
      ms.setActionHandler("pause", () => audio.pause());
      ms.setActionHandler("previoustrack", prev);
      ms.setActionHandler("nexttrack", next);
    }

    load(0, false);

    /* tự phát ở lần chạm / bấm đầu tiên (trình duyệt chặn autoplay) */
    const evs = ["pointerup", "pointerdown", "touchend", "keydown", "click"];
    function firstGesture(e) {
      if (started) return;
      if (e.target && e.target.closest && e.target.closest("#player")) { detach(); started = true; return; }
      audio.play().then(() => { started = true; detach(); }).catch(() => {});
    }
    function detach() { evs.forEach(n => removeEventListener(n, firstGesture, true)); }
    evs.forEach(n => addEventListener(n, firstGesture, true));
  })();
}

fetch("data.json", { cache: "no-cache" })
  .then(r => { if (!r.ok) throw new Error("data.json " + r.status); return r.json(); })
  .then(init)
  .catch(err => {
    console.error(err);
    document.body.insertAdjacentHTML("beforeend",
      '<p style="position:fixed;inset:auto 16px 16px;padding:14px;border-radius:12px;background:#300;color:#fff;font:14px monospace;z-index:99">Không đọc được data.json. Nếu mở file trực tiếp (file://), hãy chạy bằng server (vd: npx serve) hoặc deploy lên Vercel.</p>');
  });
