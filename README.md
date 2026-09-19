# Base Prototype

社区家庭健康服务平台 V0.2 高保真原型的 GitHub Pages 演示仓库。

## Prototype source

原始 Open Design 导出为单文件 `index.html`。由于当前 GitHub 连接器对二进制/大文本传输有限制，仓库以无损 gzip + base64 文本分片保存原始导出：

`source/index.html.gz.b64.part.*`

原始导出 SHA-256：

`62b6efd29adb48d8cd6c73920d4258d3561629ac8ad74c6b4b0a6c13fa3b9438`

V0.2 产品修订以可复现补丁保存：

`patches/v0.2.patch.gz.b64`

Pages workflow 会先校验原始导出，再应用 V0.2 补丁，并校验最终页面 SHA-256：

`aa5623463ac4d8760b4ede157b1563fdb4e9748f94aee1fa82757e7ba27c7314`

任何一步不一致，发布都会直接失败。

## V0.2 focus

- 首页收敛为：社区广播 → 今日社区 → 积分 → 常用服务 → 今日健康 → 惠生活
- `AI 健康助手` 调整为 `社区助手`
- `我的广电服务` 调整为 `广电家庭服务`，并在首页前置入口
- 适老字号整体上调
- 关键活动 / 惠生活卡片加入真实生活视觉
- 保留：首页 / 社区 / 健康 / 惠生活 / 我的 五个一级 Tab

## Deployment

- Branch: `main`
- Workflow: `.github/workflows/pages.yml`
- Expected Pages URL: https://sanchuang-dev.github.io/base-prototype/
- Static export uses hash routing, so no SPA rewrite is required.
