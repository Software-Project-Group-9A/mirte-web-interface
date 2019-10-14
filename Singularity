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
    apt install git python-pip nodejs npm -y

    echo "install pymata"
    python -m pip install pymata

    # install dependecies for own script
    npm install express body-parser child-process
    npm install node-pty express-ws

    echo "Installing blockly"
    git clone https://github.com/google/blockly.git /app/thirdparty/blockly

%runscript
    exec /app/my_app/start_server.sh
