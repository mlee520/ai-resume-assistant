#!/bin/bash

echo "🚀 AI求职智能体前端部署脚本"
echo "================================"

# 检查必要文件
if [ ! -f "index.html" ]; then
    echo "❌ 错误: index.html 不存在"
    exit 1
fi

if [ ! -f "style.css" ]; then
    echo "❌ 错误: style.css 不存在"
    exit 1
fi

if [ ! -f "script.js" ]; then
    echo "❌ 错误: script.js 不存在"
    exit 1
fi

echo "✅ 所有必要文件检查通过"

# 创建部署目录
DEPLOY_DIR="../../outputs/website"
mkdir -p $DEPLOY_DIR

# 复制文件
echo "📁 复制文件到部署目录..."
cp -r . $DEPLOY_DIR/

# 显示部署信息
echo ""
echo "🎉 部署完成！"
echo ""
echo "部署文件位于: $DEPLOY_DIR"
echo ""
echo "快速部署选项:"
echo "1. Vercel: 访问 https://vercel.com/new/clone"
echo "2. Netlify: 访问 https://app.netlify.com/start"
echo ""
echo "本地预览:"
echo "  cd $DEPLOY_DIR && python3 -m http.server 8000"
echo "  然后访问 http://localhost:8000"
echo ""