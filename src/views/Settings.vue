<template>
  <div class="container">

    <h1 class="mb-5">Instellingen</h1>

    <div class="layoutbox rounded">
      <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
        Waardes
      </div>

      <div class="layoutbox-content">
        <div class="row">

          <div class="col-4">
            <div class="rounded background-green-light p-3">
              <h5>Apparaat</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
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
              </div>

            </div>
          </div>

          <div class="col-4">
            <div class="rounded background-green-light p-3">
              <h5>Lichtsensoren</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
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
              </div>
            </div>
          </div>

          <div class="col-4">
            <div class="rounded background-green-light p-3">
              <h5>Afstandsensoren</h5>
                
              <div class="rounded background-primary p-2 text-white mb-2">
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

            </div>
          </div>
          
        </div>
      </div>
    </div>


    <Network/>


    <div class="layoutbox rounded mt-5">
      <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
        Geavanceerde instellingen
      </div>

      <div class="layoutbox-content">

        <div class="row">

          <div class="col-6">
            <div class="rounded background-green-light p-3">
              <h5>verander wachtwoord</h5>
              <div class="input-group">
                <input v-model="password" type="text" class="form-control mr-3" placeholder="nieuw wachtwoord">
                <button @click="setPassword" type="button" class="btn btn-danger">verander</button>
              </div>
            </div>
          </div>

          <div class="col-6">
            <div class="rounded background-green-light p-3">
              <h5>upload stm32 stuurprogramma</h5>
              <div class="input-group w-50">
                <button @click="stm32" type="button" class="btn btn-danger">
                  <span v-if="!busy">upload</span>
                  <i v-else class="fa fa-spin fa-stroopwafel"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>

import ROSLIB from 'roslib'
import Network from '@/components/Network.vue'


export default {
  components: {
    Network
  },
  data: function () {
    return {
      busy: false,
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
        fetch(`http://${location.hostname}:3000/api/passwd`, {
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
        this.busy = true
        fetch(`http://${location.hostname}:3000/api/stm32`)
        .then(res => res.text())
        .then(data => {
          console.log(data)
          this.busy = false

          if(data.toLowerCase().includes("download done")){
            alert("Uploaden is successvol afgerond")
          } else {
            alert("Er is een fout opgetreden:\n\n" + data)
          }

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
