# Use the official Node.js image as the base image
FROM node:22

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the Prisma schema file
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 5713

# Command to run the application
CMD ["node", "dist/main"]
