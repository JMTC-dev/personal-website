/* Dark-mode toggle — no dependencies.
   Loaded synchronously in <head> so the saved theme is applied before paint
   (no flash). With JS disabled, the site falls back to the visitor's system
   preference via CSS. */
(function () {
  var root = document.documentElement;
  var KEY = "theme";
  var animTimer;

  var saved = null;
  try { saved = localStorage.getItem(KEY); } catch (e) {}
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  }

  function current() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr;
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  /* Event delegation: works no matter where/when the button is parsed. */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-theme-toggle]");
    if (!btn) return;
    var next = current() === "dark" ? "light" : "dark";
    root.classList.add("theme-anim");
    root.setAttribute("data-theme", next);
    try { localStorage.setItem(KEY, next); } catch (e) {}
    btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    window.clearTimeout(animTimer);
    animTimer = window.setTimeout(function () { root.classList.remove("theme-anim"); }, 350);
  });

})();
