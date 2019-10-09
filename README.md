### get the web interface to work with real hardware

1. flash the FirmataPlus software on your arduino ([link](https://github.com/MrYsLab/pymata-aio/wiki/Uploading-FirmataPlus-to-Arduino))
2. connect to the orange pi via your local network
3. install the singularity-container package and git
4. clone web_interface
   ```
   $ ./run_singularity init
   ```
5. in the web_interface folder:
    ```
    $ sudo singularity shell -w -B app:/app/my_app ubuntu 
    ```
   you are now in the singularity
6. make a catkin workspace in your home folder
7.  clone zoef_ros_package in the src folder of your catkin worspace
8.  build the ros project
    ```
    $ catkin_make
    ```
9.  You will need to have a couple of terminals open in this container (at least 2)
10. for each of the terminals you will need to source the ros environments
    ```
    $ . /opt/ros/melodic/setup.bash
    $ . ~/catkin_ws/devel/setup.bash
    ```
11. start roscore and the web services
    ```
    $ /app/myapp/start_server.sh
    ```
12. launch the ros project
    ```
    $ roslaunch zoef_ros_package hw_control.launch
    ```
13. connect to the web interface at the orange pi's ip at port 8080