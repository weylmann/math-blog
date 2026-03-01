---
title: 从零搭建 Hexo 博客并部署到 Vercel 全流程教程
date: 2026-03-02 01:45:00
category: tech
tags:
  - Hexo
  - Vercel
  - GitHub
  - 博客搭建
  - 教程
---

# 从零搭建 Hexo 博客并部署到 Vercel 全流程教程

> 本教程将详细介绍如何从零开始搭建一个支持 LaTeX 数学公式的 Hexo 博客，并部署到 Vercel 实现自动部署。

## 准备工作

### 1. 安装 Node.js

首先需要安装 Node.js 环境：

```bash
# 推荐使用 nvm 安装
# Windows: https://github.com/coreybutler/nvm-windows
# macOS/Linux: 
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

### 2. 安装 Git

```bash
# Windows: 下载 Git for Windows
# macOS: brew install git
# Ubuntu: sudo apt install git
```

### 3. 安装 Hexo

```bash
npm install -g hexo
```

---

## 第一部分：GitHub 配置

### 1. 创建 GitHub 账号

访问 [GitHub](https://github.com) 注册账号。

### 2. 生成 Personal Access Token (PAT)

1. 登录 GitHub → Settings → Developer settings → Personal access tokens
2. 点击 "Generate new token (classic)"
3. 设置 Token 名称（如 "Hexo Deploy"）
4. 勾选所需权限：
   - `repo` - 完整仓库操作
   - `workflow` - GitHub Actions
5. 点击 "Generate token"
6. **重要**：复制并保存好生成的 Token（只会显示一次！）

### 3. 安装 GitHub CLI

```bash
# Windows (使用 winget)
winget install GitHub.cli

# 验证安装
gh --version
```

### 4. 配置 GitHub CLI

```bash
# 设置 Token
gh auth login --with-token <YOUR_GITHUB_TOKEN>

# 或者交互式登录
gh auth login
```

---

## 第二部分：创建 GitHub 仓库

### 1. 创建新仓库

可以通过 GitHub 网页创建，或使用 CLI：

```bash
gh repo create my-hexo-blog --public --description "我的数学博客"
```

### 2. 克隆仓库到本地

```bash
git clone https://github.com/YOUR_USERNAME/my-hexo-blog.git
cd my-hexo-blog
```

---

## 第三部分：初始化 Hexo 博客

### 1. 初始化 Hexo

```bash
hexo init my-hexo-blog
cd my-hexo-blog
npm install
```

### 2. 安装必要插件

```bash
# Markdown 渲染增强（支持更多语法）
npm install hexo-renderer-markdown-it-plus --save

# KaTeX 数学公式支持
npm install markdown-it-katex --save
```

### 3. 配置主题（推荐 NexT）

```bash
npm install hexo-theme-next --save
```

### 4. 修改 Hexo 配置文件

编辑 `_config.yml`：

```yaml
# Site
title: 我的数学博客
subtitle: ''
description: 数学每日一题分享
keywords:
author: 你的名字
language: zh-CN
timezone: ''

# Extensions
theme: next

# Markdown Configuration
markdown:
  plugins:
    - markdown-it-katex
  katex:
    throwOnError: false
    errorColor: "#cc0000"
```

### 5. 配置 NexT 主题支持 LaTeX

编辑 `themes/next/_config.yml`：

```yaml
math:
  every_page: true

  katex:
    enable: true
    copy_tex: false
```

---

## 第四部分：Vercel 配置

### 1. 注册 Vercel 账号

访问 [Vercel](https://vercel.com) 注册账号，推荐使用 GitHub 账号登录。

### 2. 安装 Vercel CLI

```bash
npm install -g vercel
```

### 3. 登录 Vercel

```bash
vercel login
# 按提示完成登录
```

### 4. 部署到 Vercel

```bash
# 在 Hexo 项目目录下
cd my-hexo-blog

# 部署（首次）
vercel --prod

# 之后更新只需
vercel --prod --yes
```

### 5. 绑定自定义域名（可选）

```bash
# 添加域名
vercel domains add your-domain.com

# 或者在 Vercel Dashboard 中操作
```

---

## 第五部分：实现自动部署

### 工作原理

```
本地 Git Push → GitHub → Vercel 检测到更新 → 自动构建 → 自动部署
```

### 配置步骤

1. **确保 Vercel 项目连接了 GitHub 仓库**
   - 在 Vercel Dashboard 中导入 GitHub 仓库
   - Vercel 会自动检测为 Hexo 项目

2. **每次更新博客的流程**

```bash
# 1. 进入博客目录
cd my-hexo-blog

# 2. 写新文章
hexo new post "新文章标题"

# 3. 编辑文章（使用 Markdown）

# 4. 提交更改
git add .
git commit -m "发布新文章"

# 5. 推送到 GitHub
git push origin main
```

3. **Vercel 会自动**
   - 检测到 GitHub 更新
   - 自动运行 `hexo generate`
   - 自动部署到网站

---

## 第六部分：图片管理

### 方案一：使用本地图片

1. 将图片放入 `source/images/` 目录
2. 在文章中引用：

```markdown
![图片描述](/images/image-name.png)
```

### 方案二：使用图床

推荐使用图床服务（如 sm.ms、imgbox 等）上传图片，然后在文章中引用图片链接。

---

## 第七部分：LaTeX 数学公式

### 基本语法

**行内公式**：
```markdown
这是一个行内公式 $E = mc^2$
```

**行间公式**：
```markdown
$$
\int_0^1 f(x)dx = F(b) - F(a)
$$
```

### 示例

```markdown
# 一元二次方程

## 求根公式

$$x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

## 例题

解方程 $x^2 - 5x + 6 = 0$

**解：**
$$x = \frac{5 \pm \sqrt{25 - 24}}{2} = \frac{5 \pm 1}{2}$$

所以 $x_1 = 3$, $x_2 = 2$
```

---

## 常见问题

### Q1: Vercel 部署失败

检查：
1. `package.json` 是否存在
2. 依赖是否安装完整（运行 `npm install`）
3. 主题配置是否正确

### Q2: LaTeX 公式不显示

1. 确保已安装 `markdown-it-katex`
2. 检查 `themes/next/_config.yml` 中 math 配置
3. 清除缓存后重新部署：`hexo clean`

### Q3: 图片不显示

1. 检查图片路径是否正确
2. 确保图片在 `source/images/` 目录
3. 使用相对路径 `/images/xxx.png`

---

## 总结

通过本教程，你应该已经掌握了：

- ✅ 配置 GitHub 和生成 Personal Access Token
- ✅ 使用 GitHub CLI 管理仓库
- ✅ 初始化和配置 Hexo 博客
- ✅ 安装和配置 NexT 主题
- ✅ 启用 LaTeX 数学公式支持
- ✅ 部署到 Vercel
- ✅ 配置自定义域名
- ✅ 实现自动部署

---

*教程更新时间：2026-03-02*
