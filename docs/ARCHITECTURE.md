# 前端部署架构说明

## 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Actions CI/CD                      │
│                                                               │
│  1. 构建项目 (npm run build)                                 │
│     ├── 生成 index.html                                      │
│     └── 生成 assets/ (JS/CSS/图片等)                         │
│                                                               │
│  2. 并行部署：                                                │
│     ├─> 上传 assets/ 到 COS ────> CDN 加速                  │
│     └─> 打包 index.html 到 Docker 镜像 ───> TCR ───> K8s Pod│
└─────────────────────────────────────────────────────────────┘

                            │
                            ▼
                    
┌──────────────────┐    ┌──────────────────┐
│   K8s Pod        │    │   腾讯云 COS      │
│   ┌──────────┐   │    │   + CDN          │
│   │  Nginx   │   │    │                  │
│   │ index.html│  │    │   /web/assets/   │
│   └──────────┘   │    │   ├── js/        │
│                  │    │   ├── css/       │
└──────────────────┘    │   └── images/    │
                        └──────────────────┘
         │                       │
         └───────────────────────┘
                    │
                    ▼
            最终用户访问页面
```

## 部署流程详解

### 1. 代码推送触发
```bash
git push origin main      # 生产环境
git push origin develop   # 测试环境
```

### 2. GitHub Actions 自动执行

#### 阶段一：构建（Build Job）
```yaml
- 检出代码
- 安装 Node.js 22
- 安装依赖 (npm ci)
- 构建项目 (npm run build:prod 或 build:test)
- 上传构建产物 (dist/) 供后续 job 使用
```

#### 阶段二：并行部署

**Job A: 上传静态资源到 COS**
```yaml
- 下载构建产物
- 安装 COS SDK
- 上传 dist/assets/ 到对应的 COS 桶
  ├── 测试环境 → test-web-1259441138
  └── 生产环境 → prod-web-1259441138
```

**Job B: 构建 Docker 镜像**
```yaml
- 下载构建产物
- 登录腾讯云 TCR
- 构建 Docker 镜像（只包含 index.html）
- 推送镜像到 TCR
  镜像标签：
  ├── {branch}-{commit-hash}
  └── {namespace}-latest
```

### 3. 访问路径

#### index.html
```
用户请求 → K8s Ingress → Nginx Pod → 返回 index.html
```

#### 静态资源
```
index.html 引用 → CDN 域名 → COS 回源 → 返回 JS/CSS
```

## 环境配置

### 测试环境 (develop 分支)
- **Namespace**: `staging`
- **COS Bucket**: `test-web-1259441138`
- **CDN 域名**: `https://static-test.poplap.cn`
- **Docker 镜像**: `ccr.ccs.tencentyun.com/4web/frontend:develop-{hash}`

### 生产环境 (main 分支)
- **Namespace**: `prod`
- **COS Bucket**: `prod-web-1259441138`
- **CDN 域名**: `https://static.poplap.cn`
- **Docker 镜像**: `ccr.ccs.tencentyun.com/4web/frontend:main-{hash}`

## 关键配置文件

### 1. Vite 配置 (vite.config.js)
```javascript
base: env.VITE_PUBLIC_PATH || '/'
```
- 读取环境变量决定静态资源的引用路径
- 生产环境：`https://static.poplap.cn/web/`
- 测试环境：`https://static-test.poplap.cn/web/`

### 2. 环境变量文件
```bash
# .env.production
VITE_PUBLIC_PATH=https://static.poplap.cn/web/

# .env.test
VITE_PUBLIC_PATH=https://static-test.poplap.cn/web/
```

### 3. Dockerfile
```dockerfile
# 构建阶段：编译前端代码
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 运行阶段：只复制 index.html
FROM nginx:alpine
COPY --from=builder /app/dist/index.html /usr/share/nginx/html/
```

### 4. 上传脚本 (scripts/upload-cos.js)
- 只上传 `assets/**/*` 到 COS
- 使用 Glob 模式匹配文件
- 根据环境选择对应的 Bucket

## 优势分析

### 1. 性能优化
- ✅ 静态资源走 CDN，全球加速
- ✅ index.html 在 K8s 集群内，低延迟
- ✅ 资源文件名包含 Hash，永久缓存

### 2. 部署效率
- ✅ Docker 镜像只包含 1 个 HTML 文件，体积极小（<100KB）
- ✅ 静态资源不占用镜像仓库空间
- ✅ 并行部署，速度快

### 3. 扩展性
- ✅ K8s Pod 可以快速水平扩展
- ✅ CDN 自动处理高并发流量
- ✅ COS 无限存储空间

### 4. 成本优化
- ✅ 镜像小，拉取快，节省带宽
- ✅ COS + CDN 成本低于自建存储
- ✅ Nginx Pod 资源占用少

## 回滚策略

### 静态资源回滚
- COS 中的文件因为文件名包含 Hash，历史版本会保留
- 无需回滚，旧版本自动可用

### index.html 回滚
```bash
# K8s 回滚到上一个版本
kubectl rollout undo deployment/frontend -n {namespace}

# 或指定特定版本
kubectl rollout undo deployment/frontend -n {namespace} --to-revision=2
```

## 监控与日志

### GitHub Actions 日志
- 构建日志：查看构建是否成功
- COS 上传日志：查看文件上传情况
- Docker 构建日志：查看镜像构建过程

### COS 访问日志
- 通过腾讯云控制台查看 COS 访问统计
- 监控 CDN 命中率和流量

### K8s Pod 日志
```bash
# 查看 Nginx 访问日志
kubectl logs -f deployment/frontend -n {namespace}

# 查看 Pod 状态
kubectl get pods -n {namespace}
```

## 常见问题排查

### Q1: 静态资源 404
**检查项**：
1. CDN 配置是否正确
2. COS 桶中 `web/assets/` 是否有文件
3. index.html 中的引用路径是否正确

### Q2: Docker 镜像拉取失败
**检查项**：
1. TCR 登录凭证是否正确
2. 镜像标签是否存在
3. K8s ImagePullSecrets 是否配置

### Q3: 页面显示异常
**检查项**：
1. 查看浏览器 Console 是否有 JS 错误
2. 检查网络请求是否成功
3. 确认 CDN 缓存是否需要刷新

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build:prod

# 预览构建结果
npm run preview
```

## 手动部署

如果需要手动部署：

```bash
# 1. 构建项目
npm run build:prod

# 2. 上传静态资源到 COS
npm run upload:prod

# 3. 构建并推送 Docker 镜像
docker build -t ccr.ccs.tencentyun.com/4web/frontend:manual .
docker push ccr.ccs.tencentyun.com/4web/frontend:manual
```
