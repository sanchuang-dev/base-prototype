# 三创原型实验室 · Sanchuang Lab

用于商务提案、概念验证和交互体验的**多项目原型展厅**。一个仓库维护多份独立客户原型，通过同一套构建流程发布静态演示；不代表正式上线的业务系统。

## 立即访问

| 入口 | 地址 | 说明 |
| --- | --- | --- |
| **EdgeOne Makers · 当前试用入口** | [sanchuang-lab.edgeone.cool](https://sanchuang-lab.edgeone.cool/) | 腾讯云默认项目域名；可能受地区与预览有效期限制 |
| **GitHub Pages · 备用入口** | [sanchuang-dev.github.io/base-prototype](https://sanchuang-dev.github.io/base-prototype/) | 保留的公开演示站，已有线上 HTTP 冒烟验证 |

> **国内访问提示**：EdgeOne 默认项目域名在中国大陆网络可能要求限时预览链接，过期可能返回 401，不能视为国内长期稳定的客户地址。若无法打开，请使用 GitHub Pages 备用链接。两站的发布任务已成功，但 EdgeOne 默认网址尚未取得独立的公网访问验收结论。

## 原型项目

| 项目 | EdgeOne 演示 | GitHub Pages 备用 | 唯一业务源码分支 |
| --- | --- | --- | --- |
| **社区本地生活 / 家庭健康** | [进入原型](https://sanchuang-lab.edgeone.cool/local-life/) | [备用](https://sanchuang-dev.github.io/base-prototype/local-life/) | [`demo/local-life`](https://github.com/sanchuang-dev/base-prototype/tree/demo/local-life) |
| **岭南红艾文化礼赠** | [进入原型](https://sanchuang-lab.edgeone.cool/lingnan/) | [备用](https://sanchuang-dev.github.io/base-prototype/lingnan/) | [`feat/lingnan-red-mugwort-prototype`](https://github.com/sanchuang-dev/base-prototype/tree/feat/lingnan-red-mugwort-prototype) |


### AI 镜面系列 · 独立项目预览入口

以下项目各自维护源码和 GitHub Pages。展厅仅提供链接，**不复制源码或再次部署它们**；链接到的页面是演示，不等于已实现正式业务。

| 项目 | 独立工程仓库 | 打开预览 |
| --- | --- | --- |
| **见趣 · 闺蜜机**（H01 `dev` 工程试点） | [ai-mirror](https://github.com/sanchuang-dev/ai-mirror) | [打开预览](https://sanchuang-dev.github.io/ai-mirror/dev/) |
| **AI 美发魔镜** | [ai-hair-mirror](https://github.com/sanchuang-dev/ai-hair-mirror) | [打开预览](https://sanchuang-dev.github.io/ai-hair-mirror/) |
| **AI 试衣魔镜** | [ai-fitting-mirror](https://github.com/sanchuang-dev/ai-fitting-mirror) | [打开预览](https://sanchuang-dev.github.io/ai-fitting-mirror/) |
| **AI 美妆镜** | [ai-beauty-mirror](https://github.com/sanchuang-dev/ai-beauty-mirror) | [打开预览](https://sanchuang-dev.github.io/ai-beauty-mirror/) |

镜面入口的事实源是 [`demos.json`](demos.json) 中的 `builder: external-link` 记录；展厅卡片随构建自动生成。见趣 H01 竖屏适配仍按其独立仓库 PR 验收，展厅不会代替该流程。

### 客户方案邀请页

将邀请页直接发给客户：先显示有品牌仪式感的项目封面，再由客户点击「进入方案体验」。**邀请页不在公开展厅列出**。

| 项目 | EdgeOne 邀请页 | GitHub Pages 备用 |
| --- | --- | --- |
| 本地生活 | [查看方案封面](https://sanchuang-lab.edgeone.cool/proposal/local-life/) | [备用](https://sanchuang-dev.github.io/base-prototype/proposal/local-life/) |
| 岭南红艾 | [查看方案封面](https://sanchuang-lab.edgeone.cool/proposal/lingnan/) | [备用](https://sanchuang-dev.github.io/base-prototype/proposal/lingnan/) |

邀请页设置了 `noindex`，但**不是登录、鉴权或保密机制**。页面、原型和代码均公开；禁止上传真实客户敏感资料，也不要将其描述为经过安全隔离的私有站点。

## 仓库结构与发布

```text
main                     展厅入口、共享规则、发布工作流
├─ AGENTS.md              本仓库地方基本法
├─ demos.json             演示来源 / 路径 / 展示元信息（唯一登记）
├─ portal/                公开展厅与邀请页模板
├─ scripts/               原型组装与页面生成
└─ .github/workflows/     统一构建、双站发布、GitHub Pages HTTP 冒烟

demo/local-life          社区本地生活（独立长期分支）
feat/lingnan-red-mugwort-prototype
                         岭南红艾（既有长期分支例外）
```

- [地方基本法](AGENTS.md) 继承 [三创组织宪法](https://github.com/sanchuang-dev/.github/blob/main/AGENTS.md)；客户项目业务代码不得合并进 `main`。
- 统一工作流 [`pages.yml`](.github/workflows/pages.yml) 组装一份 `_site`，分别发布到 **GitHub Pages** 与 **EdgeOne Makers** 项目 `sanchuang-lab`。Token 存在 GitHub Actions Secret `EDGEONE_API_TOKEN`，不入库。
- `main` 提交或手动运行工作流会触发构建/发布；**仅修改客户原型分支不会自动发布到两个站点**，需在 `main` 手动重跑工作流。
- 新增原型：创建长期 `demo/<slug>` 分支，在 [`demos.json`](demos.json) 登记并接入构建；展厅卡片和通用邀请页由登记自动生成。
- [GitHub Actions 记录](https://github.com/sanchuang-dev/base-prototype/actions) 是发布和检查的事实来源；成功部署与客户所在地区可访问是两个不同的验收结论。

## 当前决定

- **`lab.3cgroup.cn` 恢复作为目标展厅入口**：已按维护者要求接入镜面系列外部预览卡片。域名能否在客户网络正常访问、证书是否可信，以实际 DNS/HTTPS 和 EdgeOne 部署烟测为准；本次不改 DNS 或云账号配置。
- EdgeOne 默认项目地址继续作为试用入口；GitHub Pages 保留作为备用。
- 旧岭南独立发布地址 [`lingnan-red-mugwort-pages`](https://sanchuang-dev.github.io/lingnan-red-mugwort-pages/) 暂时保留，避免历史分享链接失效。

所有页面仅供产品讨论和交互演示，示例服务、商品、价格及合作关系不构成真实交付承诺。
