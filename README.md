### get the web interface to work with real hardware

1. Flash the FirmataPlus software on your arduino ([link](https://github.com/MrYsLab/pymata-aio/wiki/Uploading-FirmataPlus-to-Arduino))
2. Follow the instructions in the README of sd_card repository


### develop for web interface on real robot

1. ssh into the OrangePi
2. change into the directory of the web interface
   ```
    $ cd web_interafce
    ```
3. stop the systemd service of the currently running web_interface
   ```
    $ sudo service zoef_web_interface stop
    ```
4. start the singulairy image
    ```
    $ sudo singularity shell -w -B app:/app/my_app zoef_web_interface
    ```
5. and start the accompanying services
    ```
    $ /app/myapp/start_server.sh
    ```
6. connect to the web interface at the orange pi's ip at port 80

### develop for web interface on your own machine

1. install the singularity-container package and git
2. git clone this repository 
3. build the image as a folder
   ```
   $ ./run_singularity build_dev
   ```
4. in the web_interface folder:
    ```
    $ sudo singularity shell -w -B app:/app/my_app zoef_web_interface
    ```
   you are now in the singularity image
5. start the web services
    ```
    $ /app/myapp/start_server.sh
    ```
6. connect to the web interface at the orange pi's ip at port 80