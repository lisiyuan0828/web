# Dockerfile（放在项目根目录）
# ===== 构建阶段 =====
FROM node:18-alpine AS builder

WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 安装所有依赖（包括 devDependencies，构建需要）
RUN npm ci

# 复制源代码
COPY . .

# 根据构建参数设置环境变量（关键！）
ARG ENVIRONMENT=production
ENV VITE_ENVIRONMENT=$ENVIRONMENT

# 构建项目（Vite/Vue/React）
# 你的构建脚本（如 `vite build`）会读取 VITE_ENVIRONMENT 决定加载哪个配置文件
RUN npm run build

# ===== 运行阶段 =====
FROM nginx:alpine

# 复制构建产物
COPY --from=builder /app/dist /usr/share/nginx/html

# 暴露端口
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]