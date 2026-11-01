# BroTech — דף נחיתה

דף סטטי שמציג את המוצרים של [BroTech Studio](https://github.com/brotechstudio).

- **אפיון מלא:** [SPEC.md](SPEC.md)
- **רשימת המוצרים:** [products.js](products.js)

## הרצה מקומית

אין build ואין תלויות. פותחים את `index.html` בדפדפן, או מריצים שרת סטטי:

```bash
python3 -m http.server 8000
```

ואז http://localhost:8000

## הוספת מוצר

מוסיפים אובייקט למערך `PRODUCTS` ב-`products.js`:

```js
{
  id: "my-app",
  name: "My App",
  tagline: "תיאור קצר בעברית.",
  platforms: ["iOS", "Android"],
  status: "in-development", // live | in-development | coming-soon
  url: null,                // כתובת כשתהיה
}
```

## פריסה

GitHub Pages מהענף `main`, משורש המאגר. ראו [SPEC.md](SPEC.md) סעיף 6, כולל הגדרת הדומיין `brotech.io`.
