#!/bin/bash

trap 'echo $BGPIDS; kill $BGPIDS; kill $BGPIDS2; exit' SIGINT

ln -s /app/my_app/robot.py /tmp
#export PYTHONPATH="${PYTHONPATH}:/my_scripts/robot_script"

#start shell_ide listener
nodejs /app/my_app/web-shell.js &
BGPIDS=$!

#start own ui server
/app/my_app/server.js &
BGPIDS2=$!
