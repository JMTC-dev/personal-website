/* Home-page doodle easter eggs. Each doodle plays a little reaction plus a
   custom effect on click. No dependencies. Skipped entirely for visitors who
   prefer reduced motion. */
(function () {
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var EQUATIONS = ["a² + b² = c²", "∑ 1/n² = π²/6", "∫ eˣ dx = eˣ", "φ = (1+√5)/2", "E = mc²"];
  var CODE = ["$ git push", "> ship it", "deploy ✓", "make build", "> commit"];
  var CIPHER = ["secured", "encrypted", "verified", "no leaks", "all clear"];
  var GLYPHS = "ABCDEF0123456789#%&$/<>*!?";
  var TYPES = ["cube", "sword", "math", "terminal", "trees", "duck", "shield", "barbell", "cabin", "cake"];

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }
  function rg() { return GLYPHS.charAt(Math.floor(Math.random() * GLYPHS.length)); }

  function typeOf(d) {
    for (var i = 0; i < TYPES.length; i++) {
      if (d.classList.contains("d-" + TYPES[i])) return TYPES[i];
    }
    return null;
  }

  /* Security: flicker random glyphs, then resolve the word left to right. */
  function decode(el) {
    var target = pick(CIPHER), resolved = 0;
    function render() {
      var s = "";
      for (var i = 0; i < target.length; i++) {
        s += (i < resolved || target.charAt(i) === " ") ? target.charAt(i) : rg();
      }
      el.textContent = s;
    }
    render();
    return setInterval(function () {
      resolved++;
      render();
      if (resolved >= target.length) { el.textContent = target; }
    }, 55);
  }

  function spawn(doodle, type) {
    var fx = document.createElement("span");
    if (type === "trees") {
      fx.className = "fx fx-leaves";
      fx.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i>";
    } else if (type === "math") {
      fx.className = "fx fx-eq"; fx.textContent = pick(EQUATIONS);
    } else if (type === "duck") {
      fx.className = "fx fx-quack";
      fx.innerHTML = 'quack!<svg class="q-wave" viewBox="0 0 12 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 5q3.4 3 0 6"/><path d="M6.5 3q4.4 5 0 10"/></svg>';
    } else if (type === "terminal") {
      fx.className = "fx fx-code"; fx.textContent = pick(CODE);
    } else if (type === "sword") {
      fx.className = "fx fx-shout"; fx.textContent = "FUS RO DAH!";
    } else if (type === "shield") {
      fx.className = "fx fx-cipher";
      doodle.appendChild(fx);
      doodle._fxDecode = decode(fx);
      return;
    } else if (type === "barbell") {
      fx.className = "fx fx-rep"; fx.textContent = "+1";
    } else if (type === "cabin") {
      fx.className = "fx fx-smoke";
      fx.innerHTML = "<i></i><i></i><i></i>";
    } else if (type === "cake") {
      fx.className = "fx fx-bake";
      fx.innerHTML = '<span class="star">★</span> Star Baker!';
    } else {
      return; // cube has no popup — it colour-solves on its own
    }
    doodle.appendChild(fx);
  }

  function clearFx(d) {
    if (d._fxTimer) { clearTimeout(d._fxTimer); d._fxTimer = null; }
    if (d._fxDecode) { clearInterval(d._fxDecode); d._fxDecode = null; }
    var old = d.querySelector(".fx");
    if (old) old.remove();
  }

  document.addEventListener("click", function (e) {
    var d = e.target.closest(".doodle");
    if (!d) return;
    var type = typeOf(d);

    clearFx(d);

    d.classList.remove("is-active");
    void d.offsetWidth;                 // restart the reaction animation
    d.classList.add("is-playing", "is-active");
    spawn(d, type);

    d._fxTimer = setTimeout(function () {
      d.classList.remove("is-playing", "is-active");
      if (d._fxDecode) { clearInterval(d._fxDecode); d._fxDecode = null; }
      var f = d.querySelector(".fx");
      if (f) f.remove();
      d._fxTimer = null;
    }, 1900);
  });
})();
