#!/bin/bash

ZOEF_SRC_DIR=/usr/local/src/zoef

# Update
sudo apt update

# Install nodeenv
sudo apt install python-pip
sudo pip install nodeenv websocket_server

# Install nodeenv
nodeenv $ZOEF_SRC_DIR/web_interface/node_env

# Install dependencies for avahi-ws (TODO: package.json and install via npm)
. $ZOEF_SRC_DIR/web_interface/node_env/bin/activate
cd $ZOEF_SRC_DIR/web_interface
npm install
npm run build
deactivate_node

# Set some links for python interface
grep -qxF "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" /home/zoef/.bashrc || echo "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" >> /home/zoef/.bashrc
sudo ln -s $ZOEF_SRC_DIR/web_interface/python/linetrace.py /home/zoef/workdir

# Foward for 80 to 8080
sudo apt install -y iptables-persistent
sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo bash -c "iptables-save > /etc/iptables/rules.v4"

# Add systemd service
sudo rm /lib/systemd/system/zoef_web_interface.service
sudo ln -s $ZOEF_SRC_DIR/web_interface/systemd/zoef_web_interface.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl stop zoef_web_interface || /bin/true
sudo systemctl start zoef_web_interface
sudo systemctl enable zoef_web_interface
