# Use Node.js 20 as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port Next.js will run on
EXPOSE 3000

# Start the application in production mode
CMD ["npm", "run", "start"]