# Use official Node.js 18 LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /backend

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --production

# Copy source code
COPY src ./src
COPY .env ./

# Expose port
EXPOSE 5001

# Command to run the app
CMD ["node", "src/server.js"]