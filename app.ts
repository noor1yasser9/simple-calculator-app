// ─── تنفيذ الحساب (=) ─────────────────────────────────
calculate: () => {
  const {
    displayValue, previousValue, operator,
    waitingForOperand, hasError, justCalculated,
    lastOperator, lastOperand,
  } = get();

  if (hasError) return; // ⛔ لا حساب في حالة خطأ

  // ─── 1️⃣ تكرار آخر عملية: 5 + 3 = 8  →  = → 11  →  = → 14
  if (justCalculated && lastOperator !== null && lastOperand !== null) {
    const result = applyOperator(displayValue, lastOperand, lastOperator);

    if (result === null) {
      set({ hasError: true, displayValue: 'Error', expression: '',
            previousValue: null, operator: null, waitingForOperand: false,
            justCalculated: false, lastOperator: null, lastOperand: null });
      return;
    }

    const formatted = formatResult(result);
    set({
      displayValue: formatted,
      expression: `${displayValue} ${lastOperator} ${lastOperand} =`,
      previousValue: null, operator: null,
      waitingForOperand: false, justCalculated: true, hasError: false,
      // ✅ lastOperator و lastOperand تبقيان للضغطات التالية
    });
    return;
  }

  // ─── 2️⃣ حساب عادي (أول ضغطة =)
  if (previousValue === null || operator === null) return;
  if (waitingForOperand) return; // ⛔ لم يُدخَل المعامل الثاني بعد

  const result = applyOperator(previousValue, displayValue, operator);

  if (result === null) {
    // ❌ خطأ: القسمة على صفر
    set({ hasError: true, displayValue: 'Error', expression: '',
          previousValue: null, operator: null, waitingForOperand: false,
          justCalculated: false, lastOperator: null, lastOperand: null });
    return;
  }

  const formatted = formatResult(result);

  set({
    displayValue: formatted,
    expression: `${previousValue} ${operator} ${displayValue} =`, // ✅ "5 + 3 ="
    previousValue: null, operator: null,
    waitingForOperand: false, justCalculated: true, hasError: false,
    lastOperator: operator,   // ✅ حفظ للتكرار
    lastOperand: displayValue, // ✅ حفظ للتكرار
  });
},