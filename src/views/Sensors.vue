<template>
  <div class="container">

    <h3 class="mt-5">Encoders</h3>
    <table>
      <tr>
        <td>
          left
        </td>
        <td>
          {{left_encoder}}
        </td>
      </tr>
      <tr>
        <td>
          right
        </td>
        <td>
          {{right_encoder}}
        </td>
      </tr>
    </table>
    
    <h3 class="mt-5">Lichtsensors</h3>
    <table>
      <tr>
        <td>
          left
        </td>
        <td>
          {{left_intensity}}
        </td>
      </tr>
      <tr>
        <td>
          right
        </td>
        <td>
          {{right_intensity}}
        </td>
      </tr>
    </table>
    
    <h3 class="mt-5">Afstand</h3>
    <table>
      <tr>
        <td>
          left
        </td>
        <td>
          {{left_distance}}
        </td>
      </tr>
      <tr>
        <td>
          right
        </td>
        <td>
          {{right_distance}}
        </td>
      </tr>
    </table>

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
      right_distance: 0
      left_intensity: 0,
      right_intensity: 0
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
      name : '/zoef/left_encoder',
      messageType : 'zoef_msgs/Encoder'
    });

    var right_encoder_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/right_encoder',
      messageType : 'zoef_msgs/Encoder'
    });
    
    var left_intensity_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/left_encoder',
      messageType : 'zoef_msgs/Intensity'
    });

    var right_intensity_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/right_encoder',
      messageType : 'zoef_msgs/Intensity'
    });
    
    var left_distance_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/left_distance',
      messageType : 'sensor_msgs/Range'
    });

    var right_distance_sub = new ROSLIB.Topic({
      ros : ros,
      name : '/zoef/right_distance',
      messageType : 'sensor_msgs/Range'
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
      this.left_distance = message.value
    });

    right_distance_sub.subscribe((message) => {
      this.right_distance = message.value
    });


  }
}
</script>
