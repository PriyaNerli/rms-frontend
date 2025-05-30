# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Set environment variables for the build (can be overridden in Docker Compose)
#the URL has to be changed later
ARG REACT_APP_API_BASE_URL=http://localhost:8080/api/v1/auth
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm run build

# Step 2: Serve the build with Nginx
FROM nginx:alpine

# Copy build from previous step
COPY --from=build /app/build /usr/share/nginx/html

# Replace default nginx config if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
