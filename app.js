// רינדור רשימת המוצרים. הנתונים ב-products.js.

// מייל ליצירת קשר. ריק = הסעיף והקישורים אליו מוסתרים.
const CONTACT_EMAIL = "";

const STATUS = {
  live: { label: "חי", className: "status-live" },
  "in-development": { label: "בפיתוח", className: "status-dev" },
  "coming-soon": { label: "בקרוב", className: "status-soon" },
};

const grid = document.getElementById("grid");

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function renderCard(product) {
  const li = el("li", "card");
  li.id = product.id;

  const titles = el("div", "card-titles");
  titles.append(el("h3", "card-name", product.name));
  if (product.nameHe) titles.append(el("span", "card-name-he", product.nameHe));

  const status = STATUS[product.status] || STATUS["coming-soon"];
  const top = el("div", "card-top");
  top.append(titles, el("span", `status ${status.className}`, status.label));

  const platforms = el("ul", "platforms");
  product.platforms.forEach((p) => platforms.append(el("li", "platform", p)));

  li.append(top, el("p", "card-desc", product.tagline), platforms);

  const actions = el("div", "card-actions");
  if (product.url) {
    const link = el("a", "btn btn-primary", "פתח");
    link.href = product.url;
    link.rel = "noopener";
    link.setAttribute("aria-label", `פתח את ${product.name}`);
    actions.append(link);
  } else {
    actions.append(el("span", "btn btn-disabled", "בקרוב"));
  }
  li.append(actions);

  return li;
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
grid.replaceChildren(...PRODUCTS.map(renderCard));
setupContact();
