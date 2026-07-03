/* Homepage: render tool cards grouped by category, with live search. */
(function () {
  var grid = document.getElementById("tool-grid-root");
  var search = document.getElementById("search");
  var tools = window.TOOLS || [];

  function matches(tool, q) {
    if (!q) return true;
    q = q.toLowerCase();
    var hay = [tool.name, tool.description, tool.category]
      .concat(tool.keywords || [])
      .join(" ")
      .toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function cardHTML(tool) {
    return (
      '<a class="tool-card" href="tools/' +
      encodeURIComponent(tool.slug) +
      '/">' +
      '<div class="icon">' +
      (tool.icon || "🔧") +
      "</div>" +
      "<h3>" +
      escapeHTML(tool.name) +
      "</h3>" +
      "<p>" +
      escapeHTML(tool.description || "") +
      "</p>" +
      "</a>"
    );
  }

  function escapeHTML(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  function render(q) {
    var visible = tools.filter(function (t) {
      return matches(t, q);
    });

    if (visible.length === 0) {
      grid.innerHTML = '<p class="empty-state">找不到符合的工具</p>';
      return;
    }

    // Group by category, preserving first-seen order.
    var order = [];
    var byCat = {};
    visible.forEach(function (t) {
      var cat = t.category || "其他";
      if (!byCat[cat]) {
        byCat[cat] = [];
        order.push(cat);
      }
      byCat[cat].push(t);
    });

    grid.innerHTML = order
      .map(function (cat) {
        return (
          '<section class="category">' +
          "<h2>" +
          escapeHTML(cat) +
          "</h2>" +
          '<div class="tool-grid">' +
          byCat[cat].map(cardHTML).join("") +
          "</div>" +
          "</section>"
        );
      })
      .join("");
  }

  render("");
  if (search) {
    search.addEventListener("input", function () {
      render(search.value.trim());
    });
  }
})();
