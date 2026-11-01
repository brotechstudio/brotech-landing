// רשימת המוצרים של BroTech. ראו SPEC.md סעיף 3.3.
//
// שדות:
//   tagline / highlights — טקסט בשתי שפות: { he, en }.
//   nameHe               — שם בעברית, מוצג רק במצב עברית.
//   url                  — כתובת המוצר. null = מוצג "בקרוב".
//   video                — נתיב לסרטון תצוגה (mp4/webm) בעתיד. null = מסגרת מכשיר.
//   poster               — תמונת פתיחה לסרטון. אופציונלי.
const PRODUCTS = [
  {
    id: "trackfit",
    name: "TrackFit",
    tagline: {
      he: "מעקב תזונה למוצרים ישראליים. רושמים ארוחה בטקסט חופשי בעברית, והמערכת מתאימה אותה למוצרים במאגר.",
      en: "Nutrition tracking for Israeli food products. Log a meal in free text, and it is matched to the product catalog.",
    },
    highlights: {
      he: [
        "רישום ארוחות בטקסט חופשי בעברית, כולל קיצורים של מסעדות",
        "מאגר של מעל 18,000 מוצרים ישראליים",
        "מעקב יומי אחר קלוריות ומאקרו",
        "יעדי תזונה אישיים",
      ],
      en: [
        "Free-text meal logging in Hebrew, including restaurant shorthand",
        "Catalog of over 18,000 Israeli food products",
        "Daily calorie and macro tracking",
        "Personal nutrition goals",
      ],
    },
    platforms: ["Web", "iOS", "Android"],
    status: "live",
    url: "https://trackfit.rahum.co.il",
    video: null,
    poster: null,
    accent: "#f94d4d",
  },
  {
    id: "mikveh",
    name: "Mikveh",
    nameHe: "מקווה",
    tagline: {
      he: "מעקב טהרת המשפחה עם לוח עברי ולועזי, בתצוגה כפולה לאישה ולבעל.",
      en: "A family purity tracker with a Hebrew and Gregorian calendar, in a dual view for wife and husband.",
    },
    highlights: {
      he: [
        "לוח עברי ולועזי, זה לצד זה",
        "תצוגה כפולה: אישה ובעל",
        "סנכרון אופציונלי ליומן Google",
      ],
      en: [
        "Hebrew and Gregorian calendar, side by side",
        "Dual view: wife and husband",
        "Optional Google Calendar sync",
      ],
    },
    platforms: ["iOS", "Android"],
    status: "in-development",
    url: null,
    video: null,
    poster: null,
    accent: "#66d6c5",
  },
];
