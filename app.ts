// src/components/calculator/Calculator.tsx — Row 5: Bottom
[
  { label: '0',  variant: 'digit',  wide: true, action: () => calc.inputDigit('0') },
  { label: '.',  variant: 'digit',              action: calc.inputDecimal },
  { label: '=',  variant: 'equals',             action: calc.calculate }, // ✅ الزر المطلوب
],