// המוצר המוצג בדף. ראו SPEC.md סעיף 3.3.
//
// שדות:
//   tagline / highlights — טקסט בשתי שפות: { he, en }.
//   availability         — איפה המוצר זמין: { name, status, url }.
//                          status: "live" | "coming-soon". url רק כשהוא חי.
//   video                — נתיב לסרטון תצוגה (mp4/webm) בעתיד. null = מסגרת מכשיר.
//   poster               — תמונת פתיחה לסרטון. אופציונלי.
const PRODUCT = {
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
  availability: [
    { name: "Web", status: "live", url: "https://trackfit.rahum.co.il" },
    { name: "iOS", status: "coming-soon", url: null },
    { name: "Android", status: "coming-soon", url: null },
  ],
  video: null,
  poster: null,
  accent: "#f94d4d",
};
