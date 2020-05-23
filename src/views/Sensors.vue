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

  </div>
</template>

<script>

import ROSLIB from 'roslib'

export default {
  data() {
    return {
      left_encoder: 0,
      right_encoder: 0
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

    left_encoder_sub.subscribe((message) => {
      this.left_encoder = message.value
    });

    right_encoder_sub.subscribe((message) => {
      this.right_encoder = message.value
    });

  }
}
</script>
