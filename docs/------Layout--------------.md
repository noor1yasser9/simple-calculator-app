# تصميم Layout الآلة الحاسبة

تم إنجاز المهمة بنجاح ✅. إليك ملخص ما تم بناؤه:

---

## 📐 تصميم Layout الآلة الحاسبة

تم إعادة هيكلة الكود من ملف واحد إلى **3 ملفات منفصلة** تتبع مبدأ Separation of Concerns:

### الهيكل النهائي
```
public/
├── index.html          (153 سطر)  ← HTML نقي + ARIA
├── css/calculator.css  (310 سطر)  ← التصميم البصري
└── js/calculator.js    (285 سطر)  ← المنطق البرمجي
```

---

### `index.html` — الهيكل
| العنصر | الدور |
|---|---|
| `<main class="calculator">` | الحاوية الرئيسية – **Flexbox** عمودي |
| `<section class="display">` | شاشة العرض – **Flexbox** column + space-between |
| `<div class="buttons">` | لوحة الأزرار – **CSS Grid** 4 أعمدة |

---

### `css/calculator.css` — التصميم
- **CSS Custom Properties (Design Tokens)** لكل الألوان والمسافات والظلال – تغيير السمة من مكان واحد
- **Grid Layout** للأزرار: `repeat(4, 1fr)` مع `grid-column: span 2` للصفر ومفتاح `=`
- **Flexbox** للحاوية والشاشة
- Classes-based states: `.is-active`, `.is-small`, `.is-error`
- **Responsive** للشاشات الصغيرة (< 400px)

---

### `js/calculator.js` — المنطق
- **State Object** مركزي موثّق بـ JSDoc
- كل عملية في **handler منفصل** (SOLID)
- **Event Delegation** على `.buttons` بدلاً من listener لكل زر
- **keyMap object** لدعم لوحة المفاتيح بشكل نظيف