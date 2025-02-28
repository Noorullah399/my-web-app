# Use the official Nginx image as the base image
FROM nginx:alpine

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy website files to Nginx's default directory
COPY . /usr/share/nginx/html

# Expose port 80 to access the website
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
