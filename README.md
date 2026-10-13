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

## 国内客户入口：lab.3cgroup.cn（待绑定）

**目标域名已经选定，但尚未声称完成 DNS 或 EdgeOne 部署。** 保留现有 GitHub Pages 公开链接作为备用入口。

采用腾讯 EdgeOne Makers 的单项目静态托管，项目名固定为 `sanchuang-lab`。项目应在控制台选中国大陆可用区或含中国大陆的全球可用区（须确认 `3cgroup.cn` 备案在平台可用），**不要通过 GitHub 导入仓库重复构建**。

只需一次初始化：

1. 登录 [EdgeOne Makers](https://pages.edgeone.ai/)，创建名为 `sanchuang-lab` 的静态项目，选择适合已备案域名的加速区域。
2. 在 Makers 控制台创建 API Token，并在本仓库 Settings → Secrets and variables → Actions 中设置 `EDGEONE_API_TOKEN`（只存 GitHub Secret，绝不提交源码）。
3. 在 Makers 项目「域名管理」添加 `lab.3cgroup.cn`，按平台生成的验证记录与 **CNAME 目标** 配置 DNS，确认 HTTPS 证书和生产环境绑定。**不要自行猜测或预填 CNAME 值。**
4. 重新运行 `main` 的「Publish Sanchuang demo directory to GitHub Pages」工作流即可把同一份静态产物发布至 EdgeOne。

工作流只有在 Token 存在时才尝试 EdgeOne 部署；没有 Token 会明确记录未配置，不影响原 GitHub Pages 的构建、部署或回归检查。EdgeOne 与 GitHub Pages 使用的是同一份 `_site` 产物，根入口及 `/local-life/`、`/lingnan/`、`/proposal/...` 路径一致。

接入完成前不要把 `https://lab.3cgroup.cn/` 当作线上已可用链接。部署成功和域名 HTTP 可访问需要分别验证。

## 协作与发布

- [地方基本法 `main/AGENTS.md`](./AGENTS.md)，上位规则为 [三创组织宪法](https://github.com/sanchuang-dev/.github/blob/main/AGENTS.md)。
- [`demos.json`](./demos.json) 是唯一的公开演示目录及来源登记；`portal/index.html` 是首页展示模板。
- `main/.github/workflows/pages.yml` 将多个独立业务分支的内容组合成**一个** Pages 部署产物。仓库主分支不接受跨项目业务代码。
- 新客户优先创建 `demo/<project-slug>` 分支，再登记演示入口。保持演示性质，不接生产后端或真实客户资料。
- 旧岭南独立发布地址 https://sanchuang-dev.github.io/lingnan-red-mugwort-pages/ 暂时保留以兼容既有链接。
- 原本从 `/base-prototype/#/...` 打开的本地生活深链接，会在入口页重定向至 `/base-prototype/local-life/#/...`。

原社区项目的 PRD、压缩源文件、历史修订和发布存档已迁至 `demo/local-life` 分支。静态原型中的内容与交互仅用于演示，不代表实际订单、服务或合作关系。
