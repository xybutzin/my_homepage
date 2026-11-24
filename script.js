// Simple tab switching. The active tab is kept in the URL hash (e.g. #research)
// so tabs can be bookmarked and the back button works.
(function () {
  var tabs = Array.prototype.slice.call(document.querySelectorAll('[role="tab"]'));
  var panels = Array.prototype.slice.call(document.querySelectorAll('[role="tabpanel"]'));

  function show(id, updateHash) {
    if (!document.getElementById(id) || panels.every(function (p) { return p.id !== id; })) {
      id = 'home';
    }
    tabs.forEach(function (t) {
      t.setAttribute('aria-selected', String(t.getAttribute('aria-controls') === id));
    });
    panels.forEach(function (p) { p.hidden = p.id !== id; });
    if (updateHash) history.pushState(null, '', '#' + id);
  }

  tabs.forEach(function (t, i) {
    t.addEventListener('click', function () {
      show(t.getAttribute('aria-controls'), true);
    });
    // Arrow-key navigation between tabs
    t.addEventListener('keydown', function (e) {
      var next;
      if (e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
      else if (e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (next) {
        next.focus();
        next.click();
      }
    });
  });

  window.addEventListener('popstate', function () {
    show(location.hash.slice(1), false);
  });

  show(location.hash.slice(1), false);
})();
