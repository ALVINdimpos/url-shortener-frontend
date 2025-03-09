FROM node:lts-alpine

# Set working directory first
WORKDIR /usr/src/app

# Copy package files
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

# Install dependencies
RUN npm install --silent && mv node_modules ../

# Install serve
RUN npm install -g serve

# Copy app files and env file
COPY . .

# Set environment variables
ENV NODE_ENV=production

EXPOSE 8080

ARG VITE_LOCAL_API_URL
ARG VITE_APP_BASE_URL

ENV VITE_LOCAL_API_URL=$VITE_LOCAL_API_URL
ENV VITE_APP_BASE_URL=$VITE_APP_BASE_URL

# Set permissions
RUN chown -R node /usr/src/app
USER node

# Build the application
RUN npm run build

# Start using serve
CMD ["serve", "-s", "dist", "-l", "8080"]
