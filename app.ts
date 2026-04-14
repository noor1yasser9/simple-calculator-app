// src/lib/calculatorStore.ts

// ─── Helper: تطبيق العملية الحسابية ──────────────────────
function applyOperator(
  prev: string,
  current: string,
  op: Operator,
): OperationResult {
  const a = parseFloat(prev);
  const b = parseFloat(current);

  if (isNaN(a) || isNaN(b)) {
    return { ok: false, errorType: 'invalid-input' };
  }

  let result: number;

  switch (op) {
    case '+': result = a + b; break;
    case '-': result = a - b; break;
    case '×': result = a * b; break;
    case '÷':
      if (b === 0) {
        return { ok: false, errorType: 'division-by-zero' };
      }
      result = a / b;
      break;
  }

  // نتيجة لانهائية (مثل MAX_VALUE × 2)
  if (!isFinite(result)) {
    return { ok: false, errorType: 'invalid-input' };
  }

  return { ok: true, value: String(result) };
}

// ─── تنسيق النتيجة للعرض ──────────────────────────────────
function formatResult(raw: string): string | null {
  const num = parseFloat(raw);
  if (isNaN(num)) return null;

  // إصلاح دقة الفاصلة العائمة: 0.1 + 0.2 → 0.3 ✓
  const fixed = parseFloat(num.toPrecision(10));
  const result = String(fixed);

  // تجاوز الحد الأقصى → ترميز علمي
  if (result.replace('-', '').replace('.', '').length > MAX_DIGITS) {
    return num.toExponential(6);
  }
  return result;
}

// ╔══════════════════════════════════════════════════════╗
// ║  calculate (=)  — الدالة المحورية للمهمة             ║
// ╚══════════════════════════════════════════════════════╝
calculate: () => {
  const {
    displayValue, previousValue, operator,
    waitingForOperand, hasError, justCalculated,
    lastOperator, lastOperand,
  } = get();

  // لا حساب في حالة الخطأ — يجب مسح الحالة أولاً
  if (hasError) return;

  // ── [A] تكرار آخر عملية عند ضغط = مجدداً ───────────
  // مثال: 5 + 3 = 8 → = → 8 + 3 = 11 → = → 11 + 3 = 14
  if (justCalculated && lastOperator !== null && lastOperand !== null) {
    const res = applyOperator(displayValue, lastOperand, lastOperator);
    if (!res.ok) {
      set(errorSnapshot(res.errorType));
      return;
    }
    const formatted = formatResult(res.value);
    if (formatted === null) {
      set(errorSnapshot('invalid-input'));
      return;
    }
    set({
      displayValue:      formatted,
      expression:        `${displayValue} ${lastOperator} ${lastOperand} =`,
      previousValue:     null,
      operator:          null,
      waitingForOperand: false,
      justCalculated:    true,
      hasError:          false,
      errorType:         null,
      // lastOperator و lastOperand تبقيان للضغطات التالية
    });
    return;
  }

  // ── [B] الحساب العادي (أول ضغطة =) ─────────────────
  // حراسات: لا حساب بدون معاملَين وعملية
  if (previousValue === null || operator === null) return;
  if (waitingForOperand) return;          // لم يُدخل المعامل الثاني بعد

  const res = applyOperator(previousValue, displayValue, operator);
  if (!res.ok) {
    set(errorSnapshot(res.errorType));
    return;
  }

  const formatted = formatResult(res.value);
  if (formatted === null) {
    set(errorSnapshot('invalid-input'));
    return;
  }

  set({
    displayValue:      formatted,                                   // النتيجة
    expression:        `${previousValue} ${operator} ${displayValue} =`, // "5 + 3 ="
    previousValue:     null,
    operator:          null,
    waitingForOperand: false,
    justCalculated:    true,               // يُضيء النتيجة بالأزرق
    hasError:          false,
    errorType:         null,
    lastOperator:      operator,           // يُحفَظ لتكرار = لاحقاً
    lastOperand:       displayValue,       // يُحفَظ لتكرار = لاحقاً
  });
},