<template>
      <div class="row p-4 h-100">
         <div class="col-6 p-2 h-100 offset-3" style="overflow: hidden;"> 
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">
                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                  Status
                </div>
                <div id='connection_info' class="h-40" style="min-height: 40%; overflow: auto;" >
                  Connecting to Mirte...
                </div>
             </div>
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">
                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                  Expose Sensors
                </div>
                <div class="h-40" style="min-height: 40%; overflow: auto;" >
                  Hello There
                </div>
             </div>
         </div> 
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
      document.getElementById("connection_info").innerHTML = "Connected to webserver.";
    });
    ros.on('error', function(error) { 
      document.getElementById("connection_info").innerHTML = "Failed to connect to webserver."; 
    });
    ros.on('close', function() { 
      document.getElementById("connection_info").innerHTML = 'Connection to websocket server closed.';
    });

    /* replace by ws(s?)://mirte.local/ros/ws in future */
    ros.connect('ws://192.168.20.174:9090');

    // receive user config from parameter server
    const userConfig = new ROSLIB.Param({
      ros: ros,
      name: '/mirte',
    });

    userConfig.get((config) => {
      // read needed sensors from parameters
      const map = SENSORLIB.readSensorsFromConfig(config, ros);
    });

export default {}
</script>