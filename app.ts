// src/hooks/useCalculator.ts
const handleKeyDown = useCallback((e: KeyboardEvent) => {
  // ...
  switch (key) {
    case 'Enter':
    case '=':          // ⌨️ Enter أو = → تنفيذ الحساب
      e.preventDefault();
      calculate();
      break;
    // ...
  }
}, [inputDigit, inputDecimal, selectOperator, calculate, deleteLast, clear, applyPercent]);