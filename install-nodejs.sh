#!/bin/bash
# Install Node.js 18 LTS on EC2 (Amazon Linux/Ubuntu)

# For Amazon Linux 2
curl -fsSL https://rpm.nodesource.com/setup_18.x | sudo bash -
sudo yum install -y nodejs

# OR for Ubuntu
# curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
# sudo apt-get install -y nodejs

# Verify installation
node --version
npm --version