// רשימת המוצרים של BroTech. ראו SPEC.md סעיף 3.3.
//
// שדות:
//   highlights — נקודות קצרות על המוצר, מתוך ה-README שלו.
//   url        — כתובת המוצר. null = מוצג "בקרוב".
//   video      — נתיב לסרטון תצוגה (mp4/webm) בעתיד. null = מוצג מסגרת מכשיר.
//   poster     — תמונת פתיחה לסרטון. אופציונלי.
const PRODUCTS = [
  {
    id: "trackfit",
    name: "TrackFit",
    tagline: "מעקב תזונה למוצרים ישראליים. רושמים ארוחה בטקסט חופשי בעברית, והמערכת מתאימה אותה למוצרים במאגר.",
    highlights: [
      "רישום ארוחות בטקסט חופשי בעברית, כולל קיצורים של מסעדות",
      "מאגר של מעל 18,000 מוצרים ישראליים",
      "מעקב יומי אחר קלוריות ומאקרו",
      "יעדי תזונה אישיים",
    ],
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
    tagline: "מעקב טהרת המשפחה עם לוח עברי ולועזי, בתצוגה כפולה לאישה ולבעל.",
    highlights: [
      "לוח עברי ולועזי, זה לצד זה",
      "תצוגה כפולה: אישה ובעל",
      "סנכרון אופציונלי ליומן Google",
    ],
    platforms: ["iOS", "Android"],
    status: "in-development",
    url: null,
    video: null,
    poster: null,
    accent: "#66d6c5",
  },
];
