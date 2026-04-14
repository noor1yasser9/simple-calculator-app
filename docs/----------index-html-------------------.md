# إنشاء ملف index.html وهيكل الكالكيوليتر

الملف `index.html` موجود بالفعل وهو مكتمل تماماً! إليك ملخصاً شاملاً للبنية:

---

## ✅ هيكل `public/index.html`

```
public/
├── index.html          ← الملف الرئيسي (مكتمل)
├── css/
│   └── calculator.css  ← التصميم والـ tokens
└── js/
    └── calculator.js   ← المنطق والـ state
```

---

## 📐 بنية HTML

| القسم | العنصر | الوصف |
|-------|--------|-------|
| **الشاشة** | `.display` | Flexbox column يعرض التعبير والنتيجة |
| `#expression` | `.display__expression` | يعرض التعبير الحسابي (مثلاً `12 ×`) |
| `#result` | `.display__result` | يعرض القيمة الحالية أو النتيجة |
| **لوحة الأزرار** | `.buttons` | CSS Grid بـ 4 أعمدة |

## 🔘 أزرار Grid (5 صفوف)

```
┌──────┬──────┬──────┬──────┐
│  C   │  ⌫   │  %   │  ÷   │  ← utility
├──────┼──────┼──────┼──────┤
│  7   │  8   │  9   │  ×   │
├──────┼──────┼──────┼──────┤
│  4   │  5   │  6   │  −   │
├──────┼──────┼──────┼──────┤
│  1   │  2   │  3   │  +   │
├──────┴──────┼──────┼──────┤
│     0 (×2)  │  .   │  =   │  ← 0 و = يمتدان عمودين
└─────────────┴──────┴──────┘
```

## 🔗 الربط مع JS/CSS

- **`data-action`** → يستخدمه `calculator.js` للـ event delegation: `number`, `operator`, `equals`, `clear`, `delete`, `decimal`, `percent`
- **`data-value`** → قيمة الزر (`0-9`, `+`, `-`, `*`, `/`)
- **CSS classes** → `btn--number`, `btn--operator`, `btn--equals`, `btn--clear`, `btn--delete`, `btn--zero`
- **Accessibility** → `aria-label`, `aria-live="polite"`, `role="application"`