<template>
  <div class="container">

    <h1 class="mb-5">Hardware Instellingen</h1>

    <div class="row">
      <div class="col-6">
        <div class="layoutbox rounded">

          <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
            Board
          </div>

          <div class="row">
            <div class="col-6">
              <b-form-radio v-model="board" name="board" value="Breadboard">Breadboard</b-form-radio>
            </div>
            <div class="col-6">
              <b-form-radio v-model="board" name="board" value="Zoef" disabled>Zoef PCB</b-form-radio>
            </div>
            <!--            <div class="col-4">-->
            <!--              <b-form-radio v-model="board" name="board" value="LEGO" disabled>LEGO</b-form-radio>-->
            <!--            </div>-->
          </div>

        </div>
      </div>

      <div class="col-6">
        <div class="layoutbox rounded">

          <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
            Microcontroller
            <button @click="stm32" type="button" class="btn btn-danger float-right">
              <span v-if="!busy">upload</span>
              <i v-else class="fa fa-spin fa-stroopwafel"></i>
            </button>
          </div>


          <div class="row">
            <div class="col-6">
              <b-form-radio v-model="mcu" value="stm32" data-label="STM32">
                STM32
              </b-form-radio>
            </div>
            <div class="col-6">
              <b-form-radio v-model="mcu" value="arduino-nano" data-label="Nano">
                Arduino Nano
              </b-form-radio>
            </div>
          </div>

        </div>
      </div>

    </div>


    <div class="row">
      <div class="col-6">
        <div class="layoutbox rounded mt-5">
          <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
            Bedrading
            <button @click="saveConfiguration" type="button" class="btn btn-danger float-right">
              <span v-if="!busy">save</span>
              <i v-else class="fa fa-spin fa-stroopwafel"></i>
            </button>
          </div>


          <div>
            <b-table striped hover :fields="fields" :items="items">

              <template #head(type)="data">
                <div>
                  <b-dropdown id="dropdown-1" text="add" class="m-md-2">
                    <b-dropdown-item v-for="i in Object.keys(peripherals)" ref="i" @click="add_item(i)">{{
                        peripherals[i].name
                      }}
                    </b-dropdown-item>
                  </b-dropdown>
                </div>
              </template>

              <template #cell(type)="data">
                <button @click="delete_item(data.index)" type="button" class="btn float-left">
                  <span class="fa fa-trash"> </span>
                </button>
                {{ data.item.type }}
              </template>

              <template #cell(name)="data">
                <b-form-input v-model="data.item.name" placeholder="variable name"></b-form-input>
              </template>

              <template #cell(pins)="data">

                <b-form-select v-for="p in Object.keys(peripherals[data.item.type].pins)" v-model="data.item[p]"
                               :options="getValidPinBinds(data.item.type, p)">
                  <template #first>
                    <b-form-select-option :value="null" disabled>{{ p }}</b-form-select-option>
                  </template>
                </b-form-select>

              </template>

            </b-table>

          </div>

        </div>
      </div>

      <div class="col-6">
        <div class="layoutbox rounded mt-5 h-100">
          <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
            Informatie types
          </div>

        </div>
      </div>
    </div>


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

        </div>

      </div>
    </div>

  </div>
</template>

<script>

import ROSLIB from 'roslib'
import YAML from 'js-yaml'
import properties_ph
  from "../assets/json/properties_ph.json"
import properties_mc
  from "../assets/json/properties_mc.json"

export default {

  data: function () {
    return {
      peripherals: properties_ph,
      microcontrollers: properties_mc,
      board: 'Breadboard',
      mcu: "arduino-nano",
      fields: [
        {key: 'type', label: 'type'},
        {key: 'name', label: 'Naam'},
        {key: 'pins', label: 'Pins'}
      ],
      items: [],
      busy: false,
      password: null
    }
  },

  methods: {
    setPassword() {
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
            })
      }
    },
    add_item(type) {
      const binds = {...this.peripherals[type].pins}
      Object.keys(binds).forEach(function (key) {
        binds[key] = null
      })
      this.items.push(Object.assign({
            type: type,
            name: ''
          },
          binds
      ))
    },
    delete_item(index) {
      this.items.splice(index, 1)
    },
    getValidPinBinds(type, pin) {
      let pinMap = Object.entries({...this.microcontrollers[this.mcu].pin_map})
      if (this.peripherals[type].pins[pin] === "analogue") {
        pinMap = pinMap.filter(([_, value]) => value >= this.microcontrollers[this.mcu].analog_offset)
      }
      const options = []
      for (let p of pinMap) options.push({value: p[1], text: p[0]})
      return options
    },
    saveConfiguration() {
      const yaml = {
        name: 'Zoef',
        type: this.board,
        mcu: {
          type: this.mcu,
          max_pwm_value: this.microcontrollers[this.mcu].max_pwm_value,
          analog_offset: this.microcontrollers[this.mcu].analog_offset
        },
        peripherals: {}
      }
      for (const item of this.items) {
        yaml.peripherals[item.name] = {
          super: this.peripherals[item.type].rel_path.split("\\")[0],
          abstract: this.peripherals[item.type].rel_path.split("\\")[1],
          type: item.type,
          pinBinds: []
        }
        for (let key in this.peripherals[item.type].pins) {
          yaml["peripherals"][item.name].pinBinds.push({[key]: item[key]})
        }
      }
      const henk = YAML.load(JSON.stringify(yaml))
      console.log(YAML.dump(henk))
    },
    stm32() {
      if (confirm('Weet je zeker dat je de stm32 wilt updaten?')) {
        this.busy = true
        fetch(`http://${location.hostname}:3000/api/stm32`)
            .then(res => res.text())
            .then(data => {
              console.log(data)
              this.busy = false

              if (data.toLowerCase().includes("download done")) {
                alert("Uploaden is succesvol afgerond")
              } else {
                alert("Er is een fout opgetreden:\n\n" + data)
              }

            })
      }
    }
  },

  mounted() {
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://'
    const ros_socketUrl = `${ros_protocol}${location.hostname}:9090`

    var ros = new ROSLIB.Ros({
      url: ros_socketUrl
    })

    var params = new ROSLIB.Param({
      ros: ros,
      name: '/zoef'
    })

    params.get((res) => {
      this.params = res
    })

    this.items.pop()

  }
}
</script>
