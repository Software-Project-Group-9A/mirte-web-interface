Bootstrap: docker
From: ubuntu:bionic

%setup
    mkdir -p ${SINGULARITY_ROOTFS}/app
    mkdir -p ${SINGULARITY_ROOTFS}/app/thirdparty
    mkdir -p ${SINGULARITY_ROOTFS}/app/my_app

%files
    app app/my_app

%post
    echo "Updating system"
    apt update
    apt upgrade

    echo "Install basics"
    apt install git -y

    # first install NPM due to bug (https://github.com/ros/rosdistro/issues/19845)
    echo "Installing NPM and dependancies"
    apt install nodejs npm -y

    # install dependecies for own script
    npm install express body-parser child-process

    # install web-shell
    npm install xterm@3.8.0
    git clone https://github.com/experimental-dustbin/web-shell.git /app/thirdparty/web-shell
    cd /app/thirdparty/web-shell
    npm i && ./node_modules/.bin/tsc ./app.ts

    echo "Installing ROS Melodic base"
    sh -c 'echo "deb http://packages.ros.org/ros/ubuntu bionic main" > /etc/apt/sources.list.d/ros-latest.list'
    apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
    apt update
    apt install -y ros-melodic-ros-base

    echo "Installing blockly"
    git clone https://github.com/google/blockly.git /app/thirdparty/blockly

    # Only as test
    apt install -y ros-melodic-turtlesim nano
