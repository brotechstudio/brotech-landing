// שפה, מצב תצוגה, ורינדור המוצר. הנתונים ב-products.js.

// מייל ליצירת קשר. ריק = הסעיף והקישורים אליו מוסתרים.
const CONTACT_EMAIL = "";

const STRINGS = {
  he: {
    title: "TrackFit — BroTech",
    brandAria: "BroTech — דף הבית",
    navAria: "ניווט ראשי",
    skip: "דלג לתוכן",
    navProduct: "TrackFit",
    navAvailability: "זמינות",
    navAbout: "אודות",
    navContact: "צור קשר",
    langToggle: "English",
    themeToLight: "מצב בהיר",
    themeToDark: "מצב כהה",
    heroEyebrow: "מוצג על ידי BroTech",
    heroLead: "מעקב תזונה למוצרים ישראליים. רושמים ארוחה בטקסט חופשי בעברית.",
    ctaOpen: "פתיחה ב-Web",
    ctaSoon: "iOS ו-Android: בקרוב",
    featuresEyebrow: "תכונות",
    featuresTitle: "מה המערכת עושה.",
    availEyebrow: "זמינות",
    availTitle: "זמין ב.",
    statusLive: "פעיל",
    statusSoon: "בקרוב",
    open: "פתיחה",
    openAria: (name) => `פתיחת ${name}`,
    videoAria: (name) => `סרטון תצוגה של ${name}`,
    aboutEyebrow: "אודות",
    aboutTitle: "BroTech Studio.",
    aboutP1: "BroTech Studio בונה אפליקציות לנייד, בעיקר לקהל הישראלי. כל מוצר נבנה מהקצה לקצה: מהאפיון, דרך העיצוב והקוד, ועד החנות.",
    aboutP2: "העיקרון המנחה: מה שלא ברור, לא מוצג כאילו הוא ברור. ומה שנבנה, צריך לעבוד טוב גם למשתמש שמגיע בפעם הראשונה.",
    contactTitle: "צור קשר",
    contactCta: "שלחו מייל",
    rights: "כל הזכויות שמורות.",
  },
  en: {
    title: "TrackFit — BroTech",
    brandAria: "BroTech — home",
    navAria: "Main navigation",
    skip: "Skip to content",
    navProduct: "TrackFit",
    navAvailability: "Availability",
    navAbout: "About",
    navContact: "Contact",
    langToggle: "עברית",
    themeToLight: "Light",
    themeToDark: "Dark",
    heroEyebrow: "A BroTech product",
    heroLead: "Nutrition tracking for Israeli food products. Log a meal in free text, in Hebrew.",
    ctaOpen: "Open on the Web",
    ctaSoon: "iOS & Android: coming soon",
    featuresEyebrow: "Features",
    featuresTitle: "What it does.",
    availEyebrow: "Availability",
    availTitle: "Available on.",
    statusLive: "Live",
    statusSoon: "Coming soon",
    open: "Open",
    openAria: (name) => `Open ${name}`,
    videoAria: (name) => `Preview video of ${name}`,
    aboutEyebrow: "About",
    aboutTitle: "BroTech Studio.",
    aboutP1: "BroTech Studio builds mobile apps, mainly for Israeli users. Every product is built end to end: from the spec, through design and code, to the store.",
    aboutP2: "Our guiding principle: what is not clear is not presented as if it were. And what we build has to work well for someone opening it for the first time.",
    contactTitle: "Contact",
    contactCta: "Send an email",
    rights: "All rights reserved.",
  },
};

const root = document.documentElement;
const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");
const heroStage = document.getElementById("hero-stage");
const heroCta = document.getElementById("hero-cta");
const tiles = document.getElementById("tiles");
const availList = document.getElementById("avail-list");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function currentLang() {
  return root.lang === "en" ? "en" : "he";
}

function currentTheme() {
  return root.getAttribute("data-theme") === "light" ? "light" : "dark";
}

// מסגרת מכשיר. אם יש סרטון, הוא מנגן בתוכה: ללא קול, בלולאה, ורק כשהוא על המסך.
function renderDevice(product, t) {
  const device = el("div", "device");
  device.style.setProperty("--accent", product.accent);
  const screen = el("div", "device-screen");
  device.append(screen);

  if (product.video) {
    const video = el("video", "device-video");
    video.src = product.video;
    if (product.poster) video.poster = product.poster;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-label", t.videoAria(product.name));
    screen.append(video);
    observePlayback(video);
  } else {
    screen.setAttribute("aria-hidden", "true");
    screen.append(el("span", null, product.name.charAt(0)));
  }
  return device;
}

function observePlayback(video) {
  if (!("IntersectionObserver" in window)) return;
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.3 }
  );
  io.observe(video);
}

function renderTiles(product, lang) {
  return product.highlights[lang].map((text, i) => {
    const tile = el("li", "tile");
    tile.style.setProperty("--delay", `${i * 80}ms`);
    tile.append(el("span", "tile-index", String(i + 1).padStart(2, "0")), el("p", "tile-text", text));
    return tile;
  });
}

function renderAvailability(product, t) {
  return product.availability.map((item) => {
    const row = el("li", "avail-item");
    const info = el("div", "avail-info");
    info.append(el("h3", "avail-name", item.name));

    const isLive = item.status === "live" && item.url;
    const badge = el("span", `avail-status ${isLive ? "status-live" : "status-soon"}`, isLive ? t.statusLive : t.statusSoon);
    info.append(badge);
    row.append(info);

    if (isLive) {
      const link = el("a", "btn btn-primary btn-small", t.open);
      link.href = item.url;
      link.rel = "noopener";
      link.setAttribute("aria-label", `${t.openAria(product.name)} — ${item.name}`);
      row.append(link);
    } else {
      row.append(el("span", "btn btn-soon btn-small", t.statusSoon));
    }
    return row;
  });
}

function setupContact() {
  const contactLinks = document.querySelectorAll('a[href="#contact"]');
  if (!CONTACT_EMAIL) {
    contactLinks.forEach((a) => a.remove());
    return;
  }
  const section = document.getElementById("contact");
  const link = document.getElementById("contact-link");
  link.href = `mailto:${CONTACT_EMAIL}`;
  section.hidden = false;
}

// החלת שפה: טקסטים, כיוון, וכל מה שמרונדר מהמוצר.
function applyLang(lang) {
  const t = STRINGS[lang];
  const product = PRODUCT;
  root.lang = lang;
  root.dir = lang === "he" ? "rtl" : "ltr";
  document.title = t.title;

  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t[node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });
  document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
    const value = t[node.dataset.i18nAria];
    if (typeof value === "string") node.setAttribute("aria-label", value);
  });

  langToggle.textContent = t.langToggle;
  applyTheme(currentTheme());

  const liveTarget = product.availability.find((a) => a.status === "live" && a.url);
  if (liveTarget) heroCta.href = liveTarget.url;

  heroStage.replaceChildren(renderDevice(product, t));
  tiles.replaceChildren(...renderTiles(product, lang));
  availList.replaceChildren(...renderAvailability(product, t));
}

function applyTheme(theme) {
  const t = STRINGS[currentLang()];
  if (theme === "light") {
    root.setAttribute("data-theme", "light");
  } else {
    root.removeAttribute("data-theme");
  }
  themeToggle.textContent = theme === "light" ? t.themeToDark : t.themeToLight;
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "light" ? "#f5f5f8" : "#0f0f14");
}

function saveSetting(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "light" ? "dark" : "light";
  applyTheme(next);
  saveSetting("brotech-theme", next);
});

langToggle.addEventListener("click", () => {
  const next = currentLang() === "he" ? "en" : "he";
  applyLang(next);
  saveSetting("brotech-lang", next);
});

document.getElementById("year").textContent = new Date().getFullYear();
applyLang(currentLang());
setupContact();
