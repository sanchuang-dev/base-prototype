# Base Prototype｜三创客户演示原型库

本仓库是三创的**多客户概念原型与交互演示中心**。主页为公开原型入口合集，不再由某个客户项目独占。

**演示入口**：[三创客户演示中心](https://sanchuang-dev.github.io/base-prototype/)

| 项目 | 唯一业务源码分支 | 独立访问路径 |
| --- | --- | --- |
| 社区本地生活 / 家庭健康 | [`demo/local-life`](https://github.com/sanchuang-dev/base-prototype/tree/demo/local-life) | [`/local-life/`](https://sanchuang-dev.github.io/base-prototype/local-life/) |
| 岭南红艾文化礼赠 | [`feat/lingnan-red-mugwort-prototype`](https://github.com/sanchuang-dev/base-prototype/tree/feat/lingnan-red-mugwort-prototype) | [`/lingnan/`](https://sanchuang-dev.github.io/base-prototype/lingnan/) |

## 协作与发布

- [地方基本法 `main/AGENTS.md`](./AGENTS.md)，上位规则为 [三创组织宪法](https://github.com/sanchuang-dev/.github/blob/main/AGENTS.md)。
- [`demos.json`](./demos.json) 是唯一的公开演示目录及来源登记；`portal/index.html` 是首页展示模板。
- `main/.github/workflows/pages.yml` 将多个独立业务分支的内容组合成**一个** Pages 部署产物。仓库主分支不接受跨项目业务代码。
- 新客户优先创建 `demo/<project-slug>` 分支，再登记演示入口。保持演示性质，不接生产后端或真实客户资料。
- 旧岭南独立发布地址 https://sanchuang-dev.github.io/lingnan-red-mugwort-pages/ 暂时保留以兼容既有链接。
- 原本从 `/base-prototype/#/...` 打开的本地生活深链接，会在入口页重定向至 `/base-prototype/local-life/#/...`。

原社区项目的 PRD、压缩源文件、历史修订和发布存档已迁至 `demo/local-life` 分支。静态原型中的内容与交互仅用于演示，不代表实际订单、服务或合作关系。
