// src/lib/calculatorStore.ts

// ─── Helper: تنفيذ العملية الحسابية ──────────────────────
function applyOperator(
  prev: string,
  current: string,
  op: Operator,
): string | null {
  const a = parseFloat(prev);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) return null;

  switch (op) {
    case '+': return String(a + b);
    case '-': return String(a - b);
    case '×': return String(a * b);
    case '÷':
      if (b === 0) return null; // ❌ القسمة على صفر → error
      return String(a / b);
  }
}

/** تنسيق النتيجة: إصلاح أخطاء الفاصلة العائمة + ضبط الطول */
function formatResult(raw: string): string {
  const num = parseFloat(raw);
  if (isNaN(num)) return 'Error';

  // ✅ إصلاح 0.1 + 0.2 = 0.30000000004
  const fixed = parseFloat(num.toPrecision(10));
  const result = String(fixed);

  // ✅ الترميز العلمي للأرقام الضخمة
  if (result.replace('-', '').replace('.', '').length > MAX_DIGITS) {
    return num.toExponential(6);
  }
  return result;
}