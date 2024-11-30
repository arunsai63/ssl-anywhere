# ssl-anywhere
this is a proxy server
need to redirect to a http server from https url? you can deploy this in a small server and url it to point to any url


# commands for amazon linux 2023

# run pm2 or node
# # pm2 ecosystem.config.js
node index.js &

# 1. Update system
sudo dnf update -y

# 2. Install nginx
sudo dnf install nginx -y

# 3. Start and enable nginx
sudo systemctl start nginx
sudo systemctl enable nginx


# 4. Install certbot and nginx plugin
sudo dnf install certbot python3-certbot-nginx -y
sudo dnf install nodejs npm -y

# 5. Verify nginx is running
sudo systemctl status nginx

# 6. update ngnix.conf & restart 

# update dns record
A record : ssl.customdomain.com : <ec2 public ip>

# To obtain SSL certificate
sudo certbot --nginx -d ssl.customdomain.com -v
