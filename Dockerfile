# Use the official Node.js image as the base image
FROM node:20.9.0

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port that your Hapi.js app will run on
EXPOSE 5000

# Start the application
CMD ["node", "app.js"]
