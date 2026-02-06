# Use the official Remotion image to ensure all rendering dependencies are present
# If we only needed the API, node:18-bullseye-slim would suffice, but using this 
# allows us to run renders on the server in the future.
FROM node:22-bullseye-slim

WORKDIR /app

# Install OpenSSL and dependencies for Remotion/Puppeteer
RUN apt-get update && apt-get install -y \
    openssl \
    libnss3 \
    libatk1.0-0 \
    libatk-bridge2.0-0 \
    libcups2 \
    libdrm2 \
    libxkbcommon0 \
    libxcomposite1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxrandr2 \
    libgbm1 \
    libasound2 \
    libpango-1.0-0 \
    libcairo2 \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Expose the API port
EXPOSE 3002

# Start the server (push schema first)
CMD ["sh", "-c", "npx prisma db push && npm run server"]
