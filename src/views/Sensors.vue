<template>
  <div>
    <div id="sensors">
		</div>
  </div>
</template>

<script>

import ROSLIB from 'roslib'

export default {
  data: function () {
    return {

    }
  },

  mounted(){

    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_port = ':9090'; //location.port ? `:${location.port}` : '';
    const ros_socketUrl = `${ros_protocol}${location.hostname}${ros_port}`;

      var ros = new ROSLIB.Ros({
        url : ros_socketUrl
      });

      var params = new ROSLIB.Param({
        ros : ros,
        name : '/zoef'
      });

      params.get(function(value) {

        distance_sensors = value["distance"]; 
        listeners = {};
        for (sensor in distance_sensors){
          document.getElementById("sensors").innerHTML = document.getElementById("sensors").innerHTML + sensor + " (" + distance_sensors[sensor]['frequency'] + "Hz)" + ": <div id=/zoef/" + sensor + "/><br/>";       
            listeners['/zoef/' + sensor] = new ROSLIB.Topic({
              ros : ros,
              name : '/zoef/' + sensor,
              messageType : 'sensor_msgs/Range'
            });

            listeners['/zoef/'+ sensor].subscribe(function(message) {
                document.getElementById(this.name + "/").innerHTML = message.range;
            });
        }

        intensity_sensors = value["intensity"];
        for (sensor in intensity_sensors){
          document.getElementById("sensors").innerHTML = document.getElementById("sensors").innerHTML + sensor + " (" + intensity_sensors[sensor]['frequency'] + "Hz)" + ": <div id=/zoef/" + sensor + "/><br/>";
            listeners['/zoef/' + sensor] = new ROSLIB.Topic({
              ros : ros,
              name : '/zoef/' + sensor,
              messageType : 'zoef_msgs/Intensity'
            });

            listeners['/zoef/'+ sensor].subscribe(function(message) {
                document.getElementById(this.name + "/").innerHTML = message.value;
            });
        } 


    
      });

  }
}
</script>