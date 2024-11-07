# Use a Node.js base image
FROM node:14

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install Puppeteer and its dependencies
RUN npm install puppeteer

# Copy the rest of your application code
COPY . .

# Command to run your app
CMD ["node", "validate_test.cjs"]  # Replace with your entry point
