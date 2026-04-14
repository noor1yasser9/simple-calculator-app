const state = {
  current:      "0",
  previous:     "",
  operator:     null,
  shouldReset:  false,
  lastOperand:  null,   // ← جديد: يحفظ المعامل الأيمن b لإعادة التشغيل
  lastOperator: null,   // ← جديد: يحفظ العملية الأخيرة لإعادة التشغيل
};