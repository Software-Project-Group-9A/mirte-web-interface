<template>
  <div class="container">

    <h3 class="mt-5">Device</h3>
    <table>
      <tr v-for="[k, v] of Object.entries(params.device)" v-bind:key="k">
        <td>
          {{k}}
        </td>
        <td>
          {{v}}
        </td>
      </tr>
    </table>

    <h3 class="mt-5">Motors</h3>
    <table>
      <tr v-for="[k, v] of Object.entries(params.motor)" v-bind:key="k">
        <td>
          {{k}}
        </td>
        <td>
          {{v}}
        </td>
      </tr>
    </table>

    <h3 class="mt-5">Encoders</h3>
    <table>
      <tr v-for="[k, v] of Object.entries(params.encoder)" v-bind:key="k">
        <td>
          {{k}}
        </td>
        <td>
          {{v}}
        </td>
      </tr>
    </table>

  </div>
</template>

<script>

import ROSLIB from 'roslib'

export default {
  data: function () {
    return {
      params: {}
    }
  },

  mounted(){
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}:9090`;
      
    var ros = new ROSLIB.Ros({
      url : ros_socketUrl
    });
      
    var params = new ROSLIB.Param({
      ros : ros,
      name : '/zoef'
    });
      
    params.get((res) => {
      this.params = res
    });

  }
}
</script>
