# 静态资源分离部署方案

## 架构说明

本项目采用静态资源分离部署策略：
- **index.html** → Nginx 服务器
- **静态资源（JS/CSS/图片等）** → 腾讯云 COS + CDN

## 环境配置

### 测试环境
- CDN域名: `https://static-test.poplap.cn`
- COS桶: `test-web-1259441138`
- Nginx: 需手动部署 index.html

### 生产环境
- CDN域名: `https://static.poplap.cn`
- COS桶: `prod-web-1259441138`
- Nginx: 需手动部署 index.html

## 自动部署流程（GitHub Actions）

### 触发条件
- `develop` 分支 → 测试环境
- `main` 分支 → 生产环境

### 自动执行步骤
1. ✅ 构建项目（`npm run build:test` 或 `npm run build:prod`）
2. ✅ 上传静态资源到 COS（只上传 `assets` 目录）
3. ⚠️ **需手动**：从构建产物中获取 `index.html` 并部署到 Nginx

## 手动部署流程

### 1. 构建项目
```bash
# 测试环境
npm run build:test

# 生产环境
npm run build:prod
```

### 2. 上传静态资源到 COS
```bash
# 测试环境
npm run upload:test

# 生产环境
npm run upload:prod
```

### 3. 部署 index.html 到 Nginx

#### 方法一：手动复制
```bash
# index.html 位置
./dist/index.html

# 复制到 Nginx 目录（根据你的服务器配置调整路径）
scp dist/index.html user@your-server:/var/www/html/
```

#### 方法二：使用部署脚本（待创建）
```bash
npm run deploy:nginx
```

## CDN 配置要求

确保你的 CDN 域名已正确配置：

### 测试环境
- 域名: `static-test.poplap.cn`
- 源站: `test-web-1259441138.cos.{region}.myqcloud.com`
- 回源路径: `/web/`

### 生产环境
- 域名: `static.poplap.cn`
- 源站: `prod-web-1259441138.cos.{region}.myqcloud.com`
- 回源路径: `/web/`

## 构建产物说明

构建完成后，`dist` 目录结构：
```
dist/
├── index.html          # 需要部署到 Nginx
└── assets/             # 自动上传到 COS
    ├── js/
    │   └── index-[hash].js
    └── css/
        └── index-[hash].css
```

`index.html` 中的静态资源引用会自动指向 CDN：
```html
<!-- 测试环境 -->
<script src="https://static-test.poplap.cn/web/assets/js/index-xxx.js"></script>

<!-- 生产环境 -->
<script src="https://static.poplap.cn/web/assets/js/index-xxx.js"></script>
```

## 验证部署

### 1. 验证静态资源
访问 CDN 地址检查文件是否可访问：
```bash
# 测试环境
curl -I https://static-test.poplap.cn/web/assets/js/index-[hash].js

# 生产环境
curl -I https://static.poplap.cn/web/assets/js/index-[hash].js
```

### 2. 验证完整页面
通过 Nginx 访问 index.html，检查页面是否正常加载。

## 常见问题

### Q1: 静态资源 404
**原因**: CDN 配置不正确或 COS 上传失败
**解决**:
1. 检查 CDN 回源配置
2. 确认 COS 桶中 `web/assets/` 目录有文件
3. 检查 GitHub Actions 日志

### Q2: index.html 无法访问
**原因**: 未部署到 Nginx 或路径错误
**解决**:
1. 确认 `dist/index.html` 已复制到 Nginx 目录
2. 检查 Nginx 配置

### Q3: 跨域问题
**原因**: CDN 域名未配置 CORS
**解决**: 在 COS 或 CDN 配置中添加 CORS 规则

## 回滚策略

如果部署出现问题：
1. Nginx 保留上一版本的 index.html
2. COS 中的旧版本文件会因为文件名包含 hash 而保留
3. 快速回滚只需恢复 Nginx 的 index.html

## 性能优化建议

1. **启用 CDN 缓存**: 静态资源缓存 1 年（文件名已包含 hash）
2. **启用 Gzip**: Nginx 和 CDN 都启用 Gzip 压缩
3. **HTTP/2**: 确保 Nginx 和 CDN 支持 HTTP/2
4. **预加载**: 在 index.html 中添加关键资源的 preload
