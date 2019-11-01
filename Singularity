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

    # https://serverfault.com/questions/227190/how-do-i-ask-apt-get-to-skip-any-interactive-post-install-configuration-steps
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
    apt install -y ros-melodic-ros-base build-essential python-catkin-tools
    echo "source /opt/ros/melodic/setup.bash" >> ~/.bashrc

    echo "installing zoef types"
    source /opt/ros/melodic/setup.bash
    mkdir -p zoef_ws/src
    cd zoef_ws/src
    git clone git clone https://gitlab.tudelft.nl/rcj_zoef/zoef_types.git
    cd ..
    catkin build
    echo "source ~/zoef_ws/devel/setup.bash" >> ~/.bashrc

%runscript
    exec /app/my_app/start_server.sh
