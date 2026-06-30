/* Home-page doodle easter eggs. Each doodle plays a little reaction plus a
   custom effect on click. No dependencies. Skipped entirely for visitors who
   prefer reduced motion. */
(function () {
  var reduce = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  var EQUATIONS = ["a² + b² = c²", "∑ 1/n² = π²/6", "∫ eˣ dx = eˣ", "φ = (1+√5)/2", "E = mc²"];
  var CODE = ["> ship it", "$ git push", "console.log('hi')", "> deploy ✓", "while (true) build()"];
  var TYPES = ["cube", "sword", "math", "terminal", "trees", "duck"];

  function pick(a) { return a[Math.floor(Math.random() * a.length)]; }

  function typeOf(d) {
    for (var i = 0; i < TYPES.length; i++) {
      if (d.classList.contains("d-" + TYPES[i])) return TYPES[i];
    }
    return null;
  }

  function spawn(doodle, type) {
    var fx = document.createElement("span");
    if (type === "trees") {
      fx.className = "fx fx-leaves";
      fx.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i>";
    } else if (type === "math") {
      fx.className = "fx fx-eq"; fx.textContent = pick(EQUATIONS);
    } else if (type === "duck") {
      fx.className = "fx fx-quack"; fx.textContent = "quack!";
    } else if (type === "terminal") {
      fx.className = "fx fx-code"; fx.textContent = pick(CODE);
    } else if (type === "sword") {
      fx.className = "fx fx-shout"; fx.textContent = "FUS RO DAH!";
    } else {
      return; // cube has no popup — it colour-solves on its own
    }
    doodle.appendChild(fx);
  }

  document.addEventListener("click", function (e) {
    var d = e.target.closest(".doodle");
    if (!d) return;
    var type = typeOf(d);

    if (d._fxTimer) clearTimeout(d._fxTimer);
    var old = d.querySelector(".fx");
    if (old) old.remove();

    d.classList.remove("is-active");
    void d.offsetWidth;                 // restart the reaction animation
    d.classList.add("is-playing", "is-active");
    spawn(d, type);

    d._fxTimer = setTimeout(function () {
      d.classList.remove("is-playing", "is-active");
      var f = d.querySelector(".fx");
      if (f) f.remove();
    }, 1700);
  });
})();
