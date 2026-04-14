// src/hooks/useCalculator.ts  (السطر 91-96)

// تنفيذ الحساب عبر لوحة المفاتيح
case 'Enter':
case '=':
  e.preventDefault();
  calculate();   // ← نفس الدالة المُربوطة بزر =
  break;