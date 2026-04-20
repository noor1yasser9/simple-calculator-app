function animateEquals() {
  equalsBtns.forEach((btn) => {
    btn.classList.remove("is-calculating");
    void btn.offsetWidth; // إعادة تشغيل الـ animation
    btn.classList.add("is-calculating");
  });
}