<template>
      <div class="row p-4 h-100">
         <div class="center-div w-100" style="overflow: hidden;"> 
              <div id='connection_info' class="rounded text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                Status
              </div>
             <div class="layoutbox rounded" style="height: 90%; overflow: hidden; display: flex; flex-flow: column; ">
                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                  User Interface
                </div>
                <div id='dynamic_ui' class="h-40" style=" overflow: auto; position: relative;" >
                </div>
             </div>
         </div>
         <!-- Hidden canvas and video object to allow the sensors page to publish camera data -->
         <canvas width="640" height="400" id="canvas" hidden="true"></canvas>
         <video crossorigin="anonymous" autoplay id="camera" hidden="true"></video>
      </div>

</template>

<script>
// import roslib and sensorlib
import ROSLIB from 'roslib'
import '@/assets/sensorlib/RosSensorLib.min.js';

global.ROSLIB = ROSLIB;
    // connect to Mirte
    const ros = new ROSLIB.Ros();

    // show connection status in status div
    ros.on('connection', function() {
      document.getElementById("connection_info").innerHTML = "Connected to webserver";
    });
    ros.on('error', function(error) { 
      document.getElementById("connection_info").innerHTML = "Failed to connect to webserver"; 
    });
    ros.on('close', function() { 
      document.getElementById("connection_info").innerHTML = "Connection to websocket server closed";
    });

    // connect to rosbridge websocket
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}:9090`;
    ros.connect(ros_socketUrl);

    // receive user config from parameter server
    const userConfig = new ROSLIB.Param({
      ros: ros,
      name: '/mirte',
    });

    userConfig.get((config) => {
      // read needed sensors from parameters
      try{
        const map = SENSORLIB.readSensorsFromConfig(config, ros, document.getElementById('dynamic_ui'));
      } catch (error) {
        document.getElementById("connection_info").innerHTML = error.name + ": " + error.message;
      }
    });

export default {}
</script>