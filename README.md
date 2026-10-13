# Base Prototype｜三创客户演示原型库

本仓库统一存放**多客户、高保真、可交互的商务演示原型**。不同项目分别使用长期分支，避免把客户业务代码混在一起。

- 仓库工作规约：[`AGENTS.md`](./AGENTS.md)（受 [三创组织宪法](https://github.com/sanchuang-dev/.github/blob/main/AGENTS.md) 约束）
- 公开演示站点：https://sanchuang-dev.github.io/base-prototype/
- 发布控制：`main` 上的 `.github/workflows/pages.yml`
- 新增客户原型：优先 `demo/<project-slug>` 长期分支；发布入口由 `main` 统一登记和构建

## 当前原型

| 演示项目 | 源码分支 | 公开演示 |
| --- | --- | --- |
| 社区本地生活 / 家庭健康 | `main`（历史原型） | [社区演示主页](https://sanchuang-dev.github.io/base-prototype/) |
| 岭南红艾文化礼赠 | `feat/lingnan-red-mugwort-prototype`（历史命名例外） | [统一演示 /lingnan/](https://sanchuang-dev.github.io/base-prototype/lingnan/) |

> 岭南原型已经从独立业务分支组装到本仓库统一 Pages，部署后 HTTP 冒烟校验通过。旧地址 https://sanchuang-dev.github.io/lingnan-red-mugwort-pages/ 暂保留兼容，尚未下线；后续客户原型在 [`demos.json`](./demos.json) 登记。

## 历史社区演示

此仓库最初只保存「社区家庭健康服务平台」原型，目前社区产品契约为 [V0.3](docs/PRD-V0.3.md)。演示覆盖社区消息、广播、活动、广电业务、积分、健康服务与惠生活。

社区原型使用静态 HTML。既有重建资料保留在 `source/`、`patches/`、`release/`；**实际构建步骤及校验哈希以 `.github/workflows/pages.yml` 为准**，不手动改动生成物冒充已发布内容。

所有项目仍属于演示，界面中出现的业务与数字不代表已实际对接。正式业务仓库需另行遵守组织的正常交付与生产发布规范。
