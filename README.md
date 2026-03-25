# AI求职智能体前端演示站点

这是AI求职智能体的商业化演示前端，展示简历解析、优化和生成三大核心功能。

## 功能特点

- **产品介绍**：清晰说明AI求职智能体的价值与功能
- **交互式演示**：
  - 简历解析：上传DOCX简历，查看结构化解析结果
  - 简历优化：展示优化前后对比，突出改进效果
  - 简历生成：填写基本信息，AI自动生成完整简历
- **案例展示**：实际优化案例（销售经理、渠道开发经理、产品经理）
- **API文档**：后端REST API接口说明

## 技术栈

- 纯HTML/CSS/JavaScript
- 响应式设计，支持移动端和桌面端
- 无框架依赖，轻量快速

## 文件结构

```
website/frontend/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 交互脚本
├── package.json        # 项目配置
├── vercel.json         # Vercel部署配置
├── netlify.toml        # Netlify部署配置
└── README.md           # 本文件
```

## 快速部署

### Vercel一键部署

[![部署到Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo)

或手动部署：
```bash
# 安装Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Netlify一键部署

[![部署到Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-repo)

或手动部署：
1. 登录Netlify控制台
2. 拖拽本文件夹到部署区域
3. 自动完成部署

### 本地预览

```bash
# 安装serve（如果未安装）
npm install -g serve

# 启动本地服务器
serve .
```

然后访问 http://localhost:3000

## 后端API集成

前端默认配置了与后端API的集成，后端API位于 `website/backend/` 目录。

API接口：
- `POST /api/parse` - 简历解析
- `POST /api/optimize` - 简历优化
- `POST /api/generate` - 简历生成

## 演示数据

页面加载时会自动加载以下演示数据：
- `outputs/demo/解析结果_销售经理.json` - 简历解析示例
- `outputs/demo/优化后_销售经理.md` - 优化前内容
- `outputs/demo/优化后_渠道开发经理.md` - 优化后内容
- `outputs/demo/生成示例_产品经理.md` - AI生成简历示例

## 浏览器兼容性

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 许可证

MIT