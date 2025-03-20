# Stage 1: Build stage with development dependencies
FROM node:18-alpine AS builder

# Update system packages for security
RUN apk --no-cache --update upgrade

WORKDIR /app

# Copy package management files
COPY package*.json ./

# Install all dependencies (including devDependencies) with security flags
RUN npm ci --ignore-scripts

# Copy the rest of the application files
COPY . .

# Stage 2: Production stage with only necessary components
FROM node:18-alpine

# Update system packages for security
RUN apk --no-cache --update upgrade

WORKDIR /app

# Create non-root user and set permissions
RUN addgroup -S appgroup && \
    adduser -S appuser -G appgroup && \
    chown -R appuser:appgroup /app
USER appuser

# Copy package management files from builder
COPY --from=builder --chown=appuser:appgroup /app/package*.json ./

# Install PRODUCTION dependencies only with security flags
RUN npm ci --production --ignore-scripts && npm cache clean --force

# Copy application code from builder stage
COPY --from=builder --chown=appuser:appgroup /app/ ./

# Expose port and set health check
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD curl -f http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "server.js"]