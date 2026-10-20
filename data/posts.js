// 文章元数据清单：新增文章时在数组末尾追加一条记录即可
// date 格式 YYYY-MM-DD，列表按日期倒序展示
window.POSTS = [
  {
    title: "WAF 行为分析设计：赋予防护系统跨请求的“记忆”",
    date: "2026-08-10",
    category: "WAF 安全",
    tags: ["行为分析", "客户端标识", "分布式爬虫"],
    summary: "离线行为分析层如何跨请求、跨时间窗口识别恶意流量：多维度客户端标识、跨实体关联聚类、蜜罐协同、行为模式与时间节律分析，以及 IP 封禁的决策边界。",
    url: "posts/waf/behavior-analysis.html"
  },
  {
    title: "WAF Bot 防护体系设计：构建分层协同的自动化流量防线",
    date: "2026-08-10",
    category: "WAF 安全",
    tags: ["Bot 防护", "风险评分", "TLS 指纹"],
    summary: "从单点插件到分层协同：统一访问策略路由、实时与行为双轨评分、递进式频率惩罚、合法爬虫 rDNS 认定与自动化工具指纹库，构建完整的 Bot 防护体系。",
    url: "posts/waf/bot-protection.html"
  },
  {
    title: "reth 源码阅读：net/ecies——ECIES 加密与 RLPx 握手",
    date: "2026-10-20",
    category: "Reth 源码阅读",
    tags: ["ECIES", "secp256k1", "RLPx", "ECDH"],
    summary: "以太坊 RLPx 传输层加密模块 net/ecies 源码解析：secp256k1 椭圆曲线数学基础、ECIESStream 基于 Framed 的异步流设计、RLPx Auth-Ack 握手的报文字节布局与密钥派生全过程。",
    url: "posts/reth/net-ecies.html"
  }
];
