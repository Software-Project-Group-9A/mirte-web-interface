#!/bin/bash

echo 
if test -z $1  || test "$1" == "attach"
then
    echo "attach"	
    sudo singularity shell -w -B app:/app/my_app zoef_web_interface
fi 
if test "$1" == "build_dev"
then
    echo "init image"
    sudo singularity build --sandbox zoef_web_interface Singularity
fi
if test "$1" == "run_dev"
then
    echo "running dev build"
    singularity instance.stop zoef
    singularity instance.start zoef_web_interface zoef
    singularity run --nv instance://zoef
fi



if test "$1" == "build"
then
    echo "create image form Singularity file"
    sudo singularity build zoef_web_interface.ing Singularity
fi
if test "$1" == "run"
then
    echo "running image"
    singularity instance.stop zoef     
    singularity instance.start zoef_web_interface.img zoef
    singularity run --nv instance://zoef
fi



if test "$1" == "clean"
then
    sudo rm -rf zoef_web_interface zoef_web_interface.img
fi
