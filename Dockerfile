# Use the official Node.js image as a base
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./


# npm install ke saath error a raha hain since some dependencies error to legacy pair use kiya hun
# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# Buid main issue a raha hain so dev use kar raha hain
# RUN npm run build  

# Expose the port that Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "dev"]

