#!/bin/bash

echo 
if test -z $1 
then
    echo "attach"	
    singularity shell -w -B app:app/my_app ubuntu
fi 
if test "$1" == "build"
then
    echo "create image with Singularity file"
    sudo singularity build image.img Singularity
fi
if test "$1" == "run"
then
    echo "running as a user"
    singularity run image.img
fi
if test "$1" == "init"
then
    echo "init image"
    sudo singularity build --sandbox ubuntu Singularity
fi
if test "$1" == "clean"
then
    sudo rm -rf ubuntu image.img
fi
