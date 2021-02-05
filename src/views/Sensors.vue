<template>
  <div class="container">

    <h1 class="mb-5">Sensoren</h1>

    <div class="layoutbox rounded">
      <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
        Waardes
      </div>

      <div class="layoutbox-content">
        <div class="row">

          <div class="col-3">
            <div class="rounded background-green-light p-3">
              <h5>Rotatiesensoren</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
                Links: {{left_encoder}}
              </div>

              <div class="rounded background-primary p-2 text-white">
                Rechts: {{right_encoder}}
              </div>
            </div>

            <img class="center-div w-75" src="@/assets/images/rotary_encoder.jpg">
          </div>

          <div class="col-3">
            <div class="rounded background-green-light p-3">
              <h5>Lichtsensor</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
                Links: {{left_intensity}}
              </div>

              <div class="rounded background-primary p-2 text-white">
                Rechts: {{right_intensity}}
              </div>
            </div>

            <img class="center-div w-75" src="@/assets/images/ir_sensor.webp">
          </div>

          <div class="col-3">
            <div class="rounded background-green-light p-3">
              <h5>Afstandsensor</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
                Links: {{left_distance}}
              </div>

              <div class="rounded background-primary p-2 text-white">
                Rechts: {{right_distance}}
              </div>
            </div>

            <img class="center-div w-75" src="@/assets/images/us_sensor.jpg">
          </div>
          
          <div class="col-3">
            <div class="rounded background-green-light p-3">
              <h5>Knoppen</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
                Knoppen: {{keypad}}
              </div>
            </div>

            <img class="center-div w-75" src="@/assets/images/keypad.jpg">
          </div>


        </div>
      </div>
    </div>

  </div>
</template>

<script>

import ROSLIB from 'roslib'

export default {
  data() {
    return {
      left_encoder: 0,
      right_encoder: 0,
      left_distance: 0,
      right_distance: 0,
      left_intensity: 0,
      right_intensity: 0,
      keypad: 0,
    }
  },

  mounted(){
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}:9090`;
      
    var ros = new ROSLIB.Ros({
      url : ros_socketUrl
    });
      
    var left_encoder_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/encoder/left',
      messageType : 'zoef_msgs/Encoder'
    });

    var right_encoder_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/encoder/right',
      messageType : 'zoef_msgs/Encoder'
    });
    
    var left_intensity_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/intensity/left',
      messageType : 'zoef_msgs/Intensity'
    });

    var right_intensity_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/intensity/right',
      messageType : 'zoef_msgs/Intensity'
    });
    
    var left_distance_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/distance/left',
      messageType : 'sensor_msgs/Range'
    });

    var right_distance_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/distance/right',
      messageType : 'sensor_msgs/Range'
    });

    var keypad_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/keypad/keypad',
      messageType : 'zoef_msgs/Keypad'
    });

    left_encoder_sub.subscribe((message) => {
      this.left_encoder = message.value
    });

    right_encoder_sub.subscribe((message) => {
      this.right_encoder = message.value
    });
    
    left_intensity_sub.subscribe((message) => {
      this.left_intensity = message.value
    });

    right_intensity_sub.subscribe((message) => {
      this.right_intensity = message.value
    });

    left_distance_sub.subscribe((message) => {
      this.left_distance = message.range
    });

    right_distance_sub.subscribe((message) => {
      this.right_distance = message.range
    });

    keypad_sub.subscribe((message) => {
      this.keypad = message.key
    });


  }
}
</script>
