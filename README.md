# Base Prototype

社区家庭健康服务平台高保真原型的 GitHub Pages 演示仓库。

当前产品契约：**V0.3**

## Product docs

- V0.3 产品结论：`docs/PRD-V0.3.md`

## Prototype source

原始 Open Design 导出为单文件 `index.html`。仓库以无损 gzip + base64 文本分片保存原始导出：

`source/index.html.gz.b64.part.*`

原始导出 SHA-256：

`62b6efd29adb48d8cd6c73920d4258d3561629ac8ad74c6b4b0a6c13fa3b9438`

V0.2 修订：

`patches/v0.2.patch.gz.b64`

V0.2 SHA-256：

`aa5623463ac4d8760b4ede157b1563fdb4e9748f94aee1fa82757e7ba27c7314`

V0.3 修订：

`patches/v0.3.patch.gz.b64`

V0.3 最终页面 SHA-256：

`65981351a165ea7cade72427059429d398057a6f90a7ea1feae40e4925a0bf99`

Pages workflow 会按 **原始导出 → V0.2 → V0.3** 顺序重建页面，并在每一步做哈希校验。任何一步不一致，发布都会直接失败。

## V0.3 focus

- 首页回归低心智结构：**Banner → 常用服务 → 社区消息 → 今日社区 → 积分 → 健康 → 惠生活**
- 广电服务在首页独立强露出
- **手机卡 / 宽带 / 电视 / 上门服务**直接可见，不使用行业黑话
- 固定金刚区：社区广播 / 健康服务 / 党群文化 / 社区活动
- 其它服务入口按街道项目资源配置，例如学习服务、办事指引、社区食堂、街坊消息
- 社区广播作为公共触达，小程序承接重听、文字、活动和服务
- 广播公共属性与商业内容保持边界
- 五个一级 Tab 保持：首页 / 社区 / 健康 / 惠生活 / 我的

## Deployment

- Branch: `main`
- Workflow: `.github/workflows/pages.yml`
- Pages: https://sanchuang-dev.github.io/base-prototype/
- Static export uses hash routing, so no SPA rewrite is required.
