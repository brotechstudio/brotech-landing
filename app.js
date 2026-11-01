// שפה, מצב תצוגה, רינדור מוצרים ויצירת קשר. הנתונים ב-products.js.

// מייל ליצירת קשר. ריק = הסעיף והקישורים אליו מוסתרים.
const CONTACT_EMAIL = "";

const STRINGS = {
  he: {
    title: "BroTech — מוצרים שנבנים בקפידה",
    brandAria: "BroTech — דף הבית",
    navAria: "ניווט ראשי",
    skip: "דלג לרשימת המוצרים",
    navProducts: "מוצרים",
    navAbout: "אודות",
    navContact: "צור קשר",
    langToggle: "English",
    themeToLight: "מצב בהיר",
    themeToDark: "מצב כהה",
    heroTitle: "מוצרים שנבנים בקפידה.",
    heroLead: "אפליקציות שנבנות מהקצה לקצה, עם פשטות, נגישות ואיכות בראש. בלי פשרות על חוויית המשתמש.",
    productsEyebrow: "המוצרים",
    productsTitle: "כל מוצר, בלי הקדמות.",
    aboutEyebrow: "אודות",
    aboutTitle: "סטודיו קטן, עם יד על הדופק.",
    aboutP1: "BroTech Studio בונה אפליקציות לנייד, בעיקר לקהל הישראלי. כל מוצר נבנה מהקצה לקצה: מהאפיון, דרך העיצוב והקוד, ועד החנות.",
    aboutP2: "העיקרון המנחה: מה שלא ברור, לא מוצג כאילו הוא ברור. ומה שנבנה, צריך לעבוד טוב גם למשתמש שמגיע בפעם הראשונה.",
    contactTitle: "צור קשר",
    contactCta: "שלחו מייל",
    rights: "כל הזכויות שמורות.",
    live: "חי",
    inDevelopment: "בפיתוח",
    comingSoon: "בקרוב",
    visit: "לאתר המוצר",
    openAria: (name) => `פתח את ${name}`,
    videoAria: (name) => `סרטון תצוגה של ${name}`,
  },
  en: {
    title: "BroTech — Products built with care",
    brandAria: "BroTech — home",
    navAria: "Main navigation",
    skip: "Skip to products",
    navProducts: "Products",
    navAbout: "About",
    navContact: "Contact",
    langToggle: "עברית",
    themeToLight: "Light",
    themeToDark: "Dark",
    heroTitle: "Products, built with care.",
    heroLead: "Apps built end to end, with simplicity, accessibility and quality in mind. No compromises on the user experience.",
    productsEyebrow: "Products",
    productsTitle: "Each product, no fuss.",
    aboutEyebrow: "About",
    aboutTitle: "A small studio, close to the ground.",
    aboutP1: "BroTech Studio builds mobile apps, mainly for Israeli users. Every product is built end to end: from the spec, through design and code, to the store.",
    aboutP2: "Our guiding principle: what is not clear is not presented as if it were. And what we build has to work well for someone opening it for the first time.",
    contactTitle: "Contact",
    contactCta: "Send an email",
    rights: "All rights reserved.",
    live: "Live",
    inDevelopment: "In development",
    comingSoon: "Coming soon",
    visit: "Visit the product",
    openAria: (name) => `Open ${name}`,
    videoAria: (name) => `Preview video of ${name}`,
  },
};

const STATUS_KEY = {
  live: "live",
  "in-development": "inDevelopment",
  "coming-soon": "comingSoon",
};

const STATUS_CLASS = {
  live: "status-live",
  "in-development": "status-dev",
  "coming-soon": "status-soon",
};

const root = document.documentElement;
const features = document.getElementById("features");
const themeToggle = document.getElementById("theme-toggle");
const langToggle = document.getElementById("lang-toggle");

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

function renderMedia(product, t) {
  const wrap = el("div", "feature-media");
  const device = el("div", "device");
  device.style.setProperty("--accent", product.accent);
  const screen = el("div", "device-screen");
  device.append(screen);
  wrap.append(device);

  if (product.video) {
    // סרטון תצוגה: מוצג ללא קול, בלולאה, ומתחיל לנגן רק כשהוא בתוך המסך.
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
    return wrap;
  }

  // עד שיש סרטון: מסגרת מכשיר עם צבע המוצר ואות ראשונה.
  screen.setAttribute("aria-hidden", "true");
  screen.append(el("span", null, product.name.charAt(0)));
  return wrap;
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

function renderFeature(product, index, t, lang) {
  const item = el("li", index % 2 === 1 ? "feature reverse" : "feature");
  item.id = product.id;
  item.style.setProperty("--accent", product.accent);

  const body = el("div", "feature-body");
  const statusClass = STATUS_CLASS[product.status] || "status-soon";
  const statusLabel = t[STATUS_KEY[product.status] || "comingSoon"];
  body.append(el("span", `status ${statusClass}`, statusLabel));

  body.append(el("h3", "feature-name", product.name));
  if (product.nameHe && lang === "he") body.append(el("p", "feature-name-he", product.nameHe));

  body.append(el("p", "feature-tagline", product.tagline[lang]));

  const highlights = el("ul", "highlights");
  product.highlights[lang].forEach((h) => highlights.append(el("li", null, h)));
  body.append(highlights);

  const platforms = el("ul", "platforms");
  product.platforms.forEach((p) => platforms.append(el("li", "platform", p)));
  body.append(platforms);

  const actions = el("div", "feature-actions");
  if (product.url) {
    const link = el("a", "btn btn-primary", t.visit);
    link.href = product.url;
    link.rel = "noopener";
    link.setAttribute("aria-label", t.openAria(product.name));
    actions.append(link);
  } else {
    actions.append(el("span", "btn btn-disabled", t.comingSoon));
  }
  body.append(actions);

  item.append(renderMedia(product, t), body);
  return item;
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

// החלת שפה: טקסטים, כיוון, מצב כפתורים ורשימת המוצרים.
function applyLang(lang) {
  const t = STRINGS[lang];
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

  features.replaceChildren(...PRODUCTS.map((p, i) => renderFeature(p, i, t, lang)));
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
