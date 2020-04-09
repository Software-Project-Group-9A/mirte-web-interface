#!/bin/bash

ZOEF_SRC_DIR=/usr/local/src/zoef

# Update
sudo apt update

# Remove ROS due to bug (https://github.com/ros/rosdistro/issues/19845)
#TODO: this should not be needed when we run this in en virtual env (https://pypi.org/project/nodeenv/)
sudo apt purge -y ros-*
sudo apt autoremove -y

# Install nodejs and dependecies
# TODO: install dependencies with nodejs as package
sudo apt install nodejs npm -y
cd /usr/local/lib
sudo npm install express express-ws node-pty

sudo apt install singularity-container -y
grep -qxF "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" /home/zoef/.bashrc || echo "export PYTHONPATH=$PYTHONPATH:$ZOEF_SRC_DIR/web_interface/python" >> /home/zoef/.bashrc
sudo ln -s $ZOEF_SRC_DIR/web_interface/python/linetrace.py /home/zoef/workdir
cd $ZOEF_SRC_DIR/web_interface
./run_singularity.sh build_dev

sudo apt install -y iptables-persistent
sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j REDIRECT --to-port 8081
sudo bash -c "iptables-save > /etc/iptables/rules.v4"

# Add systemd service
# NOTE: starting singularity image form systemd has some issues (https://github.com/sylabs/singularity/issues/1600)
sudo rm /lib/systemd/system/zoef_web_interface.service
sudo ln -s $ZOEF_SRC_DIR/web_interface/services/zoef_web_interface.service /lib/systemd/system/

sudo systemctl daemon-reload
sudo systemctl stop zoef_web_interface || /bin/true
sudo systemctl start zoef_web_interface
sudo systemctl enable zoef_web_interface

echo -e "\e[33mPlease, also reinstall zoef_ROS\e[0m"
