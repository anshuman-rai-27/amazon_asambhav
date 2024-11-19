# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm run build --production

# Copy the rest of the application code
COPY . .

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"]

