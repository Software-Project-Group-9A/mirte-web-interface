#!/bin/bash

source /opt/ros/melodic/setup.bash
source /home/zoef/zoef_ws/devel/setup.bash
rosnode kill /zoef_telemetrix_zoef
rosparam delete /zoef
rosparam load /home/zoef/zoef_ws/src/zoef_ros_package/config/zoef_user_config.yaml zoef
rosrun zoef_ros_package ROS_telemetrix_api.py  __name:=zoef_telemetrix_zoef


