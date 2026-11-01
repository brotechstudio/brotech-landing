// רינדור מוצרים, מצב תצוגה ויצירת קשר. הנתונים ב-products.js.

// מייל ליצירת קשר. ריק = הסעיף והקישורים אליו מוסתרים.
const CONTACT_EMAIL = "";

const STATUS = {
  live: { label: "חי", className: "status-live" },
  "in-development": { label: "בפיתוח", className: "status-dev" },
  "coming-soon": { label: "בקרוב", className: "status-soon" },
};

const features = document.getElementById("features");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderMedia(product) {
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
    video.setAttribute("aria-label", `סרטון תצוגה של ${product.name}`);
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

function renderFeature(product, index) {
  const item = el("li", index % 2 === 1 ? "feature reverse" : "feature");
  item.id = product.id;
  item.style.setProperty("--accent", product.accent);

  const body = el("div", "feature-body");
  const status = STATUS[product.status] || STATUS["coming-soon"];
  body.append(el("span", `status ${status.className}`, status.label));

  const title = el("h3", "feature-name", product.name);
  body.append(title);
  if (product.nameHe) body.append(el("p", "feature-name-he", product.nameHe));

  body.append(el("p", "feature-tagline", product.tagline));

  const highlights = el("ul", "highlights");
  product.highlights.forEach((h) => highlights.append(el("li", null, h)));
  body.append(highlights);

  const platforms = el("ul", "platforms");
  product.platforms.forEach((p) => platforms.append(el("li", "platform", p)));
  body.append(platforms);

  const actions = el("div", "feature-actions");
  if (product.url) {
    const link = el("a", "btn btn-primary", "לאתר המוצר");
    link.href = product.url;
    link.rel = "noopener";
    link.setAttribute("aria-label", `פתח את ${product.name}`);
    actions.append(link);
  } else {
    actions.append(el("span", "btn btn-disabled", "בקרוב"));
  }
  body.append(actions);

  item.append(renderMedia(product), body);
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

// מצב תצוגה: כהה כברירת מחדל. הבחירה נשמרת בדפדפן, אם הוא מאפשר.
const THEME_KEY = "brotech-theme";
const themeToggle = document.getElementById("theme-toggle");

function currentTheme() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function applyTheme(theme) {
  if (theme === "light") {
    document.documentElement.setAttribute("data-theme", "light");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  themeToggle.textContent = theme === "light" ? "מצב כהה" : "מצב בהיר";
  document.querySelector('meta[name="theme-color"]').setAttribute("content", theme === "light" ? "#f5f5f8" : "#0f0f14");
}

themeToggle.addEventListener("click", () => {
  const next = currentTheme() === "light" ? "dark" : "light";
  applyTheme(next);
  try {
    localStorage.setItem(THEME_KEY, next);
  } catch (e) {}
});

document.getElementById("year").textContent = new Date().getFullYear();
applyTheme(currentTheme());
features.replaceChildren(...PRODUCTS.map(renderFeature));
setupContact();
