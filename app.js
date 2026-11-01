// רינדור רשימת המוצרים, סינון וחיפוש. הנתונים ב-products.js.

// מייל ליצירת קשר. ריק = הסעיף מוסתר.
const CONTACT_EMAIL = "";

const GROUPS = {
  all: "הכל",
  mobile: "נייד",
  web: "אתרים",
  desktop: "דסקטופ וטלוויזיה",
  tools: "כלי פיתוח",
};

const STATUS = {
  live: { label: "חי", className: "status-live" },
  "in-development": { label: "בפיתוח", className: "status-dev" },
  "coming-soon": { label: "בקרוב", className: "status-soon" },
};

const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
const resultCount = document.getElementById("result-count");
const empty = document.getElementById("empty");

let activeGroup = "all";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function matches(product, query) {
  if (activeGroup !== "all" && product.group !== activeGroup) return false;
  if (!query) return true;
  const haystack = [product.name, product.nameHe, product.tagline, ...product.platforms]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return haystack.includes(query);
}

function renderCard(product) {
  const li = el("li", "card");
  li.style.setProperty("--accent", product.accent);
  li.id = product.id;

  const head = el("div", "card-head");
  head.append(el("span", "card-icon", product.name.charAt(0)));

  const titles = el("div", "card-titles");
  titles.append(el("h3", "card-name", product.name));
  if (product.nameHe) titles.append(el("span", "card-name-he", product.nameHe));
  head.append(titles);

  const status = STATUS[product.status] || STATUS["coming-soon"];
  head.append(el("span", `status ${status.className}`, status.label));

  const platforms = el("ul", "platforms");
  product.platforms.forEach((p) => platforms.append(el("li", "platform", p)));

  li.append(head, el("p", "card-desc", product.tagline), platforms);

  const actions = el("div", "card-actions");
  if (product.url) {
    const link = el("a", "btn btn-small btn-primary", "פתח");
    link.href = product.url;
    link.rel = "noopener";
    link.setAttribute("aria-label", `פתח את ${product.name}`);
    actions.append(link);
  } else {
    actions.append(el("span", "btn btn-small btn-disabled", "בקרוב"));
  }
  if (product.repo) {
    const repo = el("a", "btn btn-small btn-ghost", "GitHub");
    repo.href = product.repo;
    repo.rel = "noopener";
    repo.setAttribute("aria-label", `קוד של ${product.name} ב-GitHub`);
    actions.append(repo);
  }
  li.append(actions);

  return li;
}

function renderFilters() {
  Object.entries(GROUPS).forEach(([key, label]) => {
    const btn = el("button", "chip", label);
    btn.type = "button";
    btn.setAttribute("aria-pressed", String(key === activeGroup));
    btn.addEventListener("click", () => {
      activeGroup = key;
      filters.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
      btn.setAttribute("aria-pressed", "true");
      render();
    });
    filters.append(btn);
  });
}

function render() {
  const query = search.value.trim().toLowerCase();
  const visible = PRODUCTS.filter((p) => matches(p, query));

  grid.replaceChildren(...visible.map(renderCard));
  empty.hidden = visible.length > 0;
  resultCount.textContent = `${visible.length} מוצרים`;
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

document.getElementById("year").textContent = new Date().getFullYear();
search.addEventListener("input", render);
renderFilters();
render();
setupContact();
