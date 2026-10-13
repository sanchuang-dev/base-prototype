# Base Prototype｜三创客户演示原型库

本仓库是三创的**多客户概念原型与交互演示中心**。主页为公开原型入口合集，不再由某个客户项目独占。

**演示入口**：[三创客户演示中心](https://sanchuang-dev.github.io/base-prototype/)

| 项目 | 唯一业务源码分支 | 独立访问路径 |
| --- | --- | --- |
| 社区本地生活 / 家庭健康 | [`demo/local-life`](https://github.com/sanchuang-dev/base-prototype/tree/demo/local-life) | [`/local-life/`](https://sanchuang-dev.github.io/base-prototype/local-life/) |
| 岭南红艾文化礼赠 | [`feat/lingnan-red-mugwort-prototype`](https://github.com/sanchuang-dev/base-prototype/tree/feat/lingnan-red-mugwort-prototype) | [`/lingnan/`](https://sanchuang-dev.github.io/base-prototype/lingnan/) |

## 客户定向邀请页

客户沟通时，可以直接分享 `/proposal/<project-slug>/` 链接：访问者先看到项目专属方案封面，再点击“进入方案体验”打开对应原型。

- 邀请页由 `scripts/render_invitations.py` 从 `demos.json` 自动生成，设计模板位于 `portal/invitation.html`；新增已登记项目时无需再复制一份 HTML。
- 邀请页**不出现在公开展厅首页**，并带有 `noindex` 元信息；不采用账号、密码、验证码或额外服务。
- **这只是商务展示入口，不是访问控制。** 页面、对应演示与仓库仍然公开，不能用于保密客户资料或敏感提案。
- 当前未设置真实客户名称或合作身份，避免将尚未确认的客户关系写进公共页面。以后要个性化客户信息需另行取得确认。

## EdgeOne Makers 临时试用地址

- EdgeOne Makers 已通过 GitHub Actions 成功部署到 [`https://sanchuang-lab.edgeone.cool/`](https://sanchuang-lab.edgeone.cool/)；该域名为平台默认项目域名，**不是稳定的中国大陆客户访问承诺**。
- 项目名称：`sanchuang-lab`；唯一源码及构建工作流仍为本仓库 `main/.github/workflows/pages.yml`，同一份构建产物同时发布 GitHub Pages 和 EdgeOne。
- 本次不做 `lab.3cgroup.cn` 自定义域名绑定，不办理腾讯云实名认证，DNS 保持不变。需要以后再议，不要自动恢复这条任务。
- **注意**：[EdgeOne Makers 官方域名规则](https://pages.edgeone.ai/document/domain-overview) 说明，中国大陆网络访问系统项目域名必须使用有效期约 3 小时的预览链接，超时可能返回 HTTP 401；默认域名不可当作面向中国大陆客户长期可用的固定网址。外部访客需要先做真人访问验证。
- [GitHub Pages 原站](https://sanchuang-dev.github.io/base-prototype/) 永久保留作为已经验证过的备用演示入口；邀请页仍可访问 `/proposal/local-life/` 和 `/proposal/lingnan/` 相对路径。
- 发生 HTTP 401、域名不可解析或地区限制时，不做绕过平台限制的尝试，也不声称镜像运行正常，直接提供 GitHub Pages 链接。

## 协作与发布

- [地方基本法 `main/AGENTS.md`](./AGENTS.md)，上位规则为 [三创组织宪法](https://github.com/sanchuang-dev/.github/blob/main/AGENTS.md)。
- [`demos.json`](./demos.json) 是唯一的公开演示目录及来源登记；`portal/index.html` 是首页展示模板。
- `main/.github/workflows/pages.yml` 将多个独立业务分支的内容组合成**一个** Pages 部署产物。仓库主分支不接受跨项目业务代码。
- 新客户优先创建 `demo/<project-slug>` 分支，再登记演示入口。保持演示性质，不接生产后端或真实客户资料。
- 旧岭南独立发布地址 https://sanchuang-dev.github.io/lingnan-red-mugwort-pages/ 暂时保留以兼容既有链接。
- 原本从 `/base-prototype/#/...` 打开的本地生活深链接，会在入口页重定向至 `/base-prototype/local-life/#/...`。

原社区项目的 PRD、压缩源文件、历史修订和发布存档已迁至 `demo/local-life` 分支。静态原型中的内容与交互仅用于演示，不代表实际订单、服务或合作关系。
