# Base Prototype

社区家庭健康服务平台 Open Design 原型的 GitHub Pages 演示仓库。

## Prototype source

原始 Open Design 导出为单文件 `index.html`。由于当前 GitHub 连接器对二进制/大文本传输有限制，仓库使用无损的 gzip + base64 文本分片保存：

`source/index.html.gz.b64.part.*`

Pages workflow 会在发布时自动重建 `index.html`，并校验原始文件 SHA-256：

`62b6efd29adb48d8cd6c73920d4258d3561629ac8ad74c6b4b0a6c13fa3b9438`

校验不通过时发布会直接失败，避免部署损坏的原型。

## Deployment

- Branch: `main`
- Workflow: `.github/workflows/pages.yml`
- Expected Pages URL: https://sanchuang-dev.github.io/base-prototype/
- Static export uses hash routing, so no SPA rewrite is required.
