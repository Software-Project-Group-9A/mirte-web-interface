<template>
  <div class="container">

    <h3>Device</h3>
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

    <h3 class="mt-5">verander wachtwoord</h3>
    <div class="input-group w-50">
      <input v-model="password" type="text" class="form-control mr-3" placeholder="new password">
      <button @click="setPassword" type="button" class="btn btn-danger">change</button>
    </div>

    <h3 class="mt-5">upload stm32 stuurprogramma</h3>
    <div class="input-group w-50">
      <button @click="stm32" type="button" class="btn btn-danger">upload</button>
    </div>

  </div>
</template>

<script>

import ROSLIB from 'roslib'

export default {
  data: function () {
    return {
      password: null,

      // placeholder data
      params: {
        motor: {
          left: {
            pins: [1,2,3],
          }
        },
        encoder: {
          left: {
            pins: [1,2,3],
          }
        },
        device: {
          left: {
            virtual: true,
            device: 'zoef'
          }
        }
      }
      //params: {}
    }
  },

  methods:{
    setPassword(){
      if (confirm('Weet je zeker dat je het wachtwoord wilt veranderen?')) {
        fetch("http://localhost:3000/api/passwd", {
          method: 'POST',
          headers: {
              'Content-Type': 'text/plain',
              'CORS': 'Access-Control-Allow-Origin'
          },
          body: this.password + "\n",
        })
        .then(res => res.json())
        .then(data => {
          console.log(data)
        });
      }
    },
    stm32(){
      if (confirm('Weet je zeker dat je de stm32 wilt updaten?')) {
        fetch("http://localhost:3000/api/stm32")
        .then(res => res.json())
        .then(data => {
          console.log(data)
        });
      }
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
