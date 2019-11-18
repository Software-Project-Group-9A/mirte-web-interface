Bootstrap: docker
From: arm32v7/ubuntu:bionic

%setup
    mkdir -p ${SINGULARITY_ROOTFS}/app
    mkdir -p ${SINGULARITY_ROOTFS}/app/thirdparty
    mkdir -p ${SINGULARITY_ROOTFS}/app/my_app

%files
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    /usr/bin/qemu-arm-static /usr/bin/
    app/* app/my_app

%post
    apt update
    apt upgrade -y

    # https://serverfault.com/questions/227190/how-do-i-ask-apt-get-to-skip-any-interactive-post-install-configuration-steps
    export DEBIAN_FRONTEND=noninteractive

    # install dependecies for own script
    apt install nodejs npm -y
    npm install express body-parser

%runscript
    exec /app/my_app/server.js

