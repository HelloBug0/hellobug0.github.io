# hellobug0.github.io

个人博客：WAF 安全设计 + Reth 源码阅读笔记。纯静态站点，无构建步骤，GitHub Pages 直接托管。

## 目录结构

```
index.html            首页（读取 data/posts.js 渲染文章列表、分类 tab、搜索）
data/posts.js         文章元数据清单（新增文章时在数组末尾追加一条记录）
posts/<分类>/<文章>.html  文章页面，每个分类一个子目录
  posts/waf/          WAF 安全
  posts/reth/         Reth 源码阅读（net-ecies.html 等，命名：crate 路径用连字符拼接）
assets/               首页样式与脚本
```

## 新增一篇文章

1. 复制一篇现有文章 HTML 作为模板（保持顶栏、左侧目录、内嵌样式一致；返回首页用 `../../index.html`）；
2. 保存到对应分类目录下，如 `posts/reth/net-discv5.html`；
3. 在 `data/posts.js` 的 `window.POSTS` 数组末尾追加元数据（title / date / category / tags / summary / url）。

首页分类 tab、日期倒序排列均由 `assets/js/home.js` 自动处理，无需改动。
