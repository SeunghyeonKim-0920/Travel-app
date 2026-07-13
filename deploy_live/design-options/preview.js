(function () {
  var themes = ['atlas', 'postcard', 'departure'];
  var params = new URLSearchParams(window.location.search);
  var initial = params.get('theme');
  if (!themes.includes(initial)) initial = 'atlas';

  function applyTheme(theme, updateUrl) {
    if (!themes.includes(theme)) return;
    document.body.dataset.theme = theme;
    document.querySelectorAll('[data-concept]').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.concept === theme));
    });
    if (updateUrl) {
      var url = new URL(window.location.href);
      url.searchParams.set('theme', theme);
      history.replaceState(null, '', url);
    }
  }

  document.querySelectorAll('[data-concept]').forEach(function (button) {
    button.addEventListener('click', function () {
      applyTheme(button.dataset.concept, true);
    });
  });

  applyTheme(initial, false);
})();
