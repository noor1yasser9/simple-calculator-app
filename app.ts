// إضافة variant جديد كان مستخدماً في Calculator.tsx لكن غير معرَّف
export type CalcButtonVariant =
  | 'digit' | 'operator' | 'action' | 'equals' | 'active'
  | 'error-clear'; // ← أُضيف: زر أحمر يظهر عند الخطأ

'error-clear': 'bg-semantic-danger/20 text-semantic-danger ...'