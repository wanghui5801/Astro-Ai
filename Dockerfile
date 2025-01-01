# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV DEPLOY_TARGET=node
ENV DOCKER_ENV=true
RUN npm run build

# Runtime stage
FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package.json .

# Create entrypoint script
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'set -e' >> /docker-entrypoint.sh && \
    # Create runtime environment file
    echo 'env | grep "^PUBLIC_" > .env' >> /docker-entrypoint.sh && \
    # Generate client-side env config
    echo 'cat > ./dist/client/env-config.js << EOF' >> /docker-entrypoint.sh && \
    echo 'window._env_ = {' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_OPENAI_API_KEY: "${PUBLIC_OPENAI_API_KEY}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_ANTHROPIC_API_KEY: "${PUBLIC_ANTHROPIC_API_KEY}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_GOOGLE_API_KEY: "${PUBLIC_GOOGLE_API_KEY}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_DEEPSEEK_API_KEY: "${PUBLIC_DEEPSEEK_API_KEY}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_DEFAULT_MODEL: "${PUBLIC_DEFAULT_MODEL}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_SHOW_SETTINGS: "${PUBLIC_SHOW_SETTINGS}",' >> /docker-entrypoint.sh && \
    echo '  PUBLIC_ACCESS_PASSWORD: "${PUBLIC_ACCESS_PASSWORD}"' >> /docker-entrypoint.sh && \
    echo '};' >> /docker-entrypoint.sh && \
    echo 'EOF' >> /docker-entrypoint.sh && \
    # Start the application with environment variables
    echo 'exec node ./dist/server/entry.mjs' >> /docker-entrypoint.sh

RUN chmod +x /docker-entrypoint.sh

EXPOSE 4321

CMD ["/docker-entrypoint.sh"]
