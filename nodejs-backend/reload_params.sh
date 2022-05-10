#!/bin/bash

source /opt/ros/noetic/setup.bash
source /home/mirte/mirte_ws/devel/setup.bash
rosnode kill /mirte_telemetrix_mirte
rosparam delete /mirte
rosparam load /home/mirte/mirte_ws/src/mirte-ros-packages/mirte_telemetrix/config/mirte_user_config.yaml mirte
rosrun mirte_telemetrix ROS_telemetrix_api.py  __name:=mirte_telemetrix_mirte


