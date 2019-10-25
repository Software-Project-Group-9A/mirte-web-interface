Bootstrap: docker
From: arm32v7/ubuntu:bionic

%setup
    mkdir -p ${SINGULARITY_ROOTFS}/app
    mkdir -p ${SINGULARITY_ROOTFS}/app/thirdparty
    mkdir -p ${SINGULARITY_ROOTFS}/app/my_app

%files
    app/* app/my_app

%post
    echo "Updating system"
    apt update
    apt upgrade -y

    # tzdata bug
    export DEBIAN_FRONTEND=noninteractive

    echo "Install basics"
    apt install git python-pip -y

    echo "install pymata"
    python -m pip install pymata

    # first install NPM due to bug (https://github.com/ros/rosdistro/issues/19845)
    echo "Installing NPM and dependancies"
    apt install nodejs npm -y

    # install dependecies for own script
    npm install express body-parser child-process
    npm install node-pty express-ws

    echo "Installing ROS Melodic base"
    sh -c 'echo "deb http://packages.ros.org/ros/ubuntu bionic main" > /etc/apt/sources.list.d/ros-latest.list'
    apt-key adv --keyserver 'hkp://keyserver.ubuntu.com:80' --recv-key C1CF6E31E6BADE8868B172B4F42ED6FBAB17C654
    apt update
    apt install -y ros-melodic-ros-base
    echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc

%runscript
    exec /app/my_app/start_server.sh
