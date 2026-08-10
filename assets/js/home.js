(function () {
  var posts = (window.POSTS || []).slice().sort(function (a, b) {
    return (b.date || '').localeCompare(a.date || '');
  });

  var tabsEl = document.getElementById('category-tabs');
  var listEl = document.getElementById('post-list');
  var searchEl = document.getElementById('search');

  var activeCategory = '全部';
  var keyword = '';

  var categories = ['全部'];
  posts.forEach(function (p) {
    if (p.category && categories.indexOf(p.category) === -1) {
      categories.push(p.category);
    }
  });

  function renderTabs() {
    tabsEl.innerHTML = categories.map(function (c) {
      var cls = c === activeCategory ? 'tab active' : 'tab';
      return '<button type="button" class="' + cls + '" data-category="' + c + '">' + c + '</button>';
    }).join('');
  }

  function match(p) {
    if (activeCategory !== '全部' && p.category !== activeCategory) return false;
    if (!keyword) return true;
    var haystack = (p.title + ' ' + (p.summary || '') + ' ' + (p.tags || []).join(' ')).toLowerCase();
    return haystack.indexOf(keyword.toLowerCase()) !== -1;
  }

  function renderList() {
    var filtered = posts.filter(match);
    if (!filtered.length) {
      listEl.innerHTML = '<p class="empty">没有匹配的文章</p>';
      return;
    }
    listEl.innerHTML = filtered.map(function (p) {
      var tags = (p.tags || []).map(function (t) {
        return '<span class="tag">' + t + '</span>';
      }).join('');
      return '<article class="card">'
        + '<a class="card-title" href="' + p.url + '">' + p.title + '</a>'
        + '<div class="card-meta"><time>' + p.date + '</time>'
        + '<span class="badge">' + p.category + '</span></div>'
        + '<p class="card-summary">' + (p.summary || '') + '</p>'
        + '<div class="card-tags">' + tags + '</div>'
        + '</article>';
    }).join('');
  }

  tabsEl.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-category]');
    if (!btn) return;
    activeCategory = btn.getAttribute('data-category');
    renderTabs();
    renderList();
  });

  searchEl.addEventListener('input', function () {
    keyword = searchEl.value.trim();
    renderList();
  });

  renderTabs();
  renderList();
})();
