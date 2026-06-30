/* Run highlight.js on any <pre><code> blocks once the library has loaded.
   Self-hosted, no external requests. Loaded only on pages that have code. */
(function () {
  if (window.hljs && typeof window.hljs.highlightAll === "function") {
    window.hljs.highlightAll();
  }
})();
