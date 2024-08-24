FROM node:20.17.0-slim AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

# build the application
COPY . .
RUN npx tsc

# Stage 2: Run the application
FROM node:20.17.0-slim

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package.json package-lock.json ./
RUN npm install --only=production

EXPOSE 3000

# Set the command to run the application
CMD ["node", "dist/index.js"]