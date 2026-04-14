// قبل (خطأ UX)
const showAllClear = displayValue === '0' || hasError || waitingForOperand;
//                                                       ↑ يُظهر "AC" لكن "C" أفيد هنا

// بعد (صحيح)
const showAllClear = displayValue === '0' && !waitingForOperand && !hasError;
//                                           ↑ عند وجود عملية معلّقة → يُظهر "C"
//                                           لأن clearEntry تُلغيها وتُعيد القيمة السابقة