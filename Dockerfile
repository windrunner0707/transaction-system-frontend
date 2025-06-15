# 构建阶段
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install && npm run build

# 运行阶段
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf