#!/bin/bash

ZOEF_SRC_DIR=/usr/local/src/zoef

# Update
sudo apt update

# Install nodeenv
sudo apt install -y python-pip python-setuptools python-wheel
sudo -H pip install nodeenv websocket_server

# Install nodeenv (TODO: find out why node-pty and node-sass will not compile correctly on higher versions)
nodeenv --node=8.17.0 $ZOEF_SRC_DIR/web_interface/node_env

# Install web interface
. $ZOEF_SRC_DIR/web_interface/node_env/bin/activate
cd $ZOEF_SRC_DIR/web_interface
npm install
npm run build
deactivate_node

# Set some links for python interface
grep -qxF "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" /home/zoef/.bashrc || echo "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" >> /home/zoef/.bashrc
sudo ln -s $ZOEF_SRC_DIR/web_interface/python/linetrace.py /home/zoef/workdir

# Foward for 80 to 3000
echo iptables-persistent iptables-persistent/autosave_v4 boolean true | sudo debconf-set-selections
echo iptables-persistent iptables-persistent/autosave_v6 boolean true | sudo debconf-set-selections
sudo apt install -y iptables-persistent
#sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 3000
#sudo bash -c "iptables-save > /etc/iptables/rules.v4"

# TODO: iptables(-save) do now work from chroot, so saving it manually
sudo echo "*filter" > /etc/iptables/rules.v4
sudo echo ":INPUT ACCEPT [1042:276951]" >> /etc/iptables/rules.v4
sudo echo ":FORWARD ACCEPT [0:0]" >> /etc/iptables/rules.v4
sudo echo ":OUTPUT ACCEPT [1039:277247]" >> /etc/iptables/rules.v4
sudo echo "COMMIT" >> /etc/iptables/rules.v4
sudo echo "*nat" >> /etc/iptables/rules.v4
sudo echo ":PREROUTING ACCEPT [1:169]" >> /etc/iptables/rules.v4
sudo echo ":INPUT ACCEPT [1:169]" >> /etc/iptables/rules.v4
sudo echo ":OUTPUT ACCEPT [3:905]" >> /etc/iptables/rules.v4
sudo echo ":POSTROUTING ACCEPT [3:905]" >> /etc/iptables/rules.v4
sudo echo "-A PREROUTING -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 3000" >> /etc/iptables/rules.v4
sudo echo "COMMIT" >> /etc/iptables/rules.v4

# Add systemd service
sudo rm /lib/systemd/system/zoef_web_interface.service
sudo ln -s $ZOEF_SRC_DIR/web_interface/systemd/zoef_web_interface.service /lib/systemd/system/
sudo systemctl daemon-reload
sudo systemctl stop zoef_web_interface || /bin/true
sudo systemctl start zoef_web_interface
sudo systemctl enable zoef_web_interface
