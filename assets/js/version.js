// 版本標記:部署時由 .github/workflows/deploy-pages.yml 把 __COMMIT_HASH__
// 換成當次 commit 的 short hash。本機直接開檔(未經部署)時維持佔位字,顯示為 dev。
(function () {
  var COMMIT = "__COMMIT_HASH__";
  var isReal = /^[0-9a-f]{6,40}$/i.test(COMMIT);
  var label = isReal ? COMMIT : "dev";

  var el = document.createElement(isReal ? "a" : "div");
  el.className = "build-version";
  el.textContent = "build " + label;
  el.title = "部署版本" + (isReal ? "(點擊看 commit)" : "(本機開發)");
  if (isReal) {
    el.href = "https://github.com/Nocold/Web-Tools/commit/" + COMMIT;
    el.target = "_blank";
    el.rel = "noopener";
  }
  el.style.cssText = [
    "position:fixed", "right:8px", "bottom:8px", "z-index:9999",
    "font:11px/1 var(--mono,ui-monospace,monospace)",
    "color:var(--text-muted,#888)",
    "background:var(--surface,#fff)",
    "border:1px solid var(--border,#ddd)",
    "border-radius:6px", "padding:4px 7px", "opacity:0.55",
    "text-decoration:none", "user-select:none"
  ].join(";");

  function add() { if (document.body) document.body.appendChild(el); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", add);
  else add();
})();
