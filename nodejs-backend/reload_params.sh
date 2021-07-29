#!/bin/bash

source /opt/ros/melodic/setup.bash
source /home/mirte/mirte_ws/devel/setup.bash
rosnode kill /mirte_telemetrix_mirte
rosparam delete /mirte
rosparam load /home/mirte/mirte_ws/src/mirte_ros_package/config/mirte_user_config.yaml mirte
rosrun mirte_ros_package ROS_telemetrix_api.py  __name:=mirte_telemetrix_mirte


