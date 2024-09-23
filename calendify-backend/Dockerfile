# Use the latest stable version of Node
FROM node:lts

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN npm run build

# Expose the port the app runs on
EXPOSE 4200

RUN apt-get update && apt-get install -y dnsutils netcat-openbsd

# Command to check the RDS DNS resolution and run the application
CMD /bin/sh -c "\
  echo 'Checking DNS resolution for DB_HOST: ${DB_HOST}...'; \
  nslookup ${DB_HOST}; \
  echo 'Checking connectivity to RDS on ${DB_HOST}:${DB_PORT}...'; \
  nc -zv ${DB_HOST} ${DB_PORT}; \
  echo 'Environment Variables:'; \
  env | grep DB_; \
  echo 'Starting the application...'; \
  npm start"
