# COS 部署配置指南

## 📦 COS 目录结构

你有两个独立的存储桶：

```
test-web-1259441138/        # 测试环境桶
└── web/
    ├── index.html
    └── assets/

prod-web-1259441138/        # 生产环境桶
└── web/
    ├── index.html
    └── assets/
```

## 🔑 需要的配置信息

### 1. 腾讯云 COS 信息
- **SecretId**: 腾讯云 API 密钥 ID
- **SecretKey**: 腾讯云 API 密钥 Key
- **Bucket (Test)**: `test-web-1259441138`
- **Bucket (Prod)**: `prod-web-1259441138`
- **Region**: COS 地域（如 `ap-guangzhou`、`ap-beijing`）

### 2. GitHub Secrets 配置

在 GitHub 仓库中添加以下 Secrets：
1. 进入仓库 Settings → Secrets and variables → Actions
2. 点击 "New repository secret"
3. 添加以下 5 个 secrets：

| Secret 名称 | 说明 | 示例值 |
|------------|------|--------|
| `COS_SECRET_ID` | 腾讯云 SecretId | `AKIDxxxxxxxxxxxxxxxx` |
| `COS_SECRET_KEY` | 腾讯云 SecretKey | `xxxxxxxxxxxxxxxx` |
| `COS_BUCKET_TEST` | 测试环境桶 | `test-web-1259441138` |
| `COS_BUCKET_PROD` | 生产环境桶 | `prod-web-1259441138` |
| `COS_REGION` | COS 地域 | `ap-guangzhou` |

### 3. 本地开发配置

1. 复制环境变量模板：
```bash
cp .env.local.example .env.local
```

2. 编辑 `.env.local` 填入真实值：
```env
COS_SECRET_ID=your_secret_id
COS_SECRET_KEY=your_secret_key
COS_BUCKET_TEST=test-web-1259441138
COS_BUCKET_PROD=prod-web-1259441138
COS_REGION=ap-guangzhou
```

## 🚀 使用方法

### 本地构建并上传

**测试环境：**
```bash
# 1. 构建测试环境
npm run build:test

# 2. 上传到 COS test 目录
npm run upload:test
```

**生产环境：**
```bash
# 1. 构建生产环境
npm run build:prod

# 2. 上传到 COS prod 目录
npm run upload:prod
```

### 自动部署（GitHub Actions）

已配置 GitHub Actions 自动部署：

- **推送到 `develop` 分支** → 自动构建并部署到测试桶（`test-web-1259441138`）
- **推送到 `main` 分支** → 自动构建并部署到生产桶（`prod-web-1259441138`）

## 🌐 访问地址

部署完成后的访问地址：

**测试环境：**
```
https://test-web-1259441138.cos.{region}.myqcloud.com/web/index.html
```

**生产环境：**
```
https://prod-web-1259441138.cos.{region}.myqcloud.com/web/index.html
```

**示例（假设 region 是 ap-guangzhou）：**
- 测试：`https://test-web-1259441138.cos.ap-guangzhou.myqcloud.com/web/index.html`
- 生产：`https://prod-web-1259441138.cos.ap-guangzhou.myqcloud.com/web/index.html`

### 自定义域名（推荐）

建议在腾讯云 COS 控制台为两个桶分别配置自定义域名：

- 测试环境：`https://test.your-domain.com/`
- 生产环境：`https://www.your-domain.com/` 或 `https://your-domain.com/`

## 📋 命令说明

| 命令 | 说明 |
|------|------|
| `npm run dev` | 本地开发服务器 |
| `npm run build:test` | 构建测试环境 |
| `npm run build:prod` | 构建生产环境 |
| `npm run upload:test` | 上传到测试环境 |
| `npm run upload:prod` | 上传到生产环境 |
| `npm run preview` | 预览构建结果 |

## 🔧 环境变量说明

### `.env.test` - 测试环境
```env
VITE_APP_ENV=test
VITE_APP_TITLE=SaaS Pro - Test
VITE_APP_BASE_URL=https://api-test.example.com
VITE_PUBLIC_PATH=/web/
```

### `.env.production` - 生产环境
```env
VITE_APP_ENV=production
VITE_APP_TITLE=SaaS Pro
VITE_APP_BASE_URL=https://api.example.com
VITE_PUBLIC_PATH=/web/
```

## 📝 注意事项

1. **缓存策略：**
   - HTML 文件：不缓存（`no-cache`）
   - 静态资源：缓存 1 年（`max-age=31536000`）

2. **并发上传：**
   - 默认并发数为 5，可在 `scripts/upload-cos.js` 中修改

3. **文件权限：**
   - 确保 COS 存储桶已配置公共读权限或适当的访问策略

4. **CDN 加速（可选）：**
   - 建议配置腾讯云 CDN 加速访问

## 🛠️ 故障排查

### 1. 上传失败
- 检查 COS 配置信息是否正确
- 确认 SecretId/SecretKey 有足够的权限
- 查看 COS 存储桶是否存在

### 2. 访问 404
- 检查 COS 存储桶是否设置了公共读权限
- 确认文件路径是否正确
- 查看 `base` 配置是否与实际路径匹配

### 3. 资源加载失败
- 检查 `VITE_PUBLIC_PATH` 是否配置正确
- 确认静态资源路径是否匹配

## 📚 相关文档

- [腾讯云 COS 文档](https://cloud.tencent.com/document/product/436)
- [COS Node.js SDK](https://cloud.tencent.com/document/product/436/8629)
- [Vite 环境变量](https://vitejs.dev/guide/env-and-mode.html)
