#!/bin/bash

echo 
if test -z $1 
then
    echo "run development"	
    sudo singularity shell -w -B app:/app/my_app ubuntu
fi 
if test "$1" == "build"
then
    echo "create image with Singularity file"
    sudo singularity build image.img Singularity
fi
if test "$1" == "run"
then
    echo "running as a user"
    singularity exec -B app:/app/my_app ubuntu /app/my_app/start_server.sh
fi
if test "$1" == "init"
then
    echo "init image"
    sudo singularity build --sandbox ubuntu Singularity
fi
if test "$1" == "clean"
then
    sudo rm -rf ubuntu
fi
