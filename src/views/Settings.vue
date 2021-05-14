<template>
  <div class="container">

    <h1 class="mb-5">Hardware Instellingen</h1>
    
      <div class="row">
        <div class="col-4">
        <div class="layoutbox rounded">
        <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
          Board
        </div>

         <div class="row">


           <div class="col-6">  
               <b-form-radio v-model="board" name="board" value="Zoef" selected>Zoef PCB</b-form-radio>
           </div>
           <div class="col-6">
               <b-form-radio v-model="board" name="board" value="Breadboard">Breadboard</b-form-radio>
           </div>
<!--
           <div class="col-4">
               <b-form-radio v-model="board" name="board" value="LEGO" disabled>LEGO</b-form-radio>
           </div>
-->


         </div>

        </div>
        </div>

        <div class="col-4">
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
               <b-form-radio v-model="mcu" name="mcu" value="STM32">STM32</b-form-radio>
           </div>
           <div class="col-6">
               <b-form-radio v-model="mcu" name="mcu" value="Nano" :disabled='this.board=="Zoef"'>Arduino Nano</b-form-radio>
           </div>
         </div>

        </div>
        </div> 

        <div class="col-4">
        <div class="layoutbox rounded">
        <div class="text-white p-2 h3 layoutbox-title w-100 background-primary">
          Motorcontroller
        </div>


         <div class="row">


           <div class="col-6">  
               <b-form-radio v-model="motorcontroller" name="motorcontroller" value="L9110S">L9110S</b-form-radio>
           </div>
           <div class="col-6">
               <b-form-radio v-model="motorcontroller" name="motorcontroller" value="L298N" :disabled='this.board=="Zoef"'>L298N</b-form-radio>
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
                <button @click="createPeripheral('FOOBAR')" type="button" class="btn btn-danger float-right">
                  <span v-if="!busy">test</span>
                  <i v-else class="fa fa-spin fa-stroopwafel"></i>
                </button>
        </div>


  <div>
    <b-table striped hover :fields="fields" :items="items">

      <template #head(type)="data">
        <div>
          <b-dropdown id="dropdown-1" text="add" class="m-md-2">
            <b-dropdown-item v-for="i in peripherals" ref="i.a" @click="addHardware(i.a)">{{ i.a }}</b-dropdown-item>
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

      <template #cell(pin)="data">
         <b-form-select v-model="data.item.pin" :options="pin_options.pcb[data.item.type]"></b-form-select>
      </template>

      <template #cell(freq)="data">
          <b-form-input v-model="data.item.freq"></b-form-input>
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

export default {
  data: function () {
    return {
      board: 'Zoef',
      mcu: 'STM32',
      motorcontroller: 'L9110S',
      fields: [
         { key: 'type', label: 'type', tdClass:'vw-100' },
         { key: 'name', label: 'Naam', tdClass:'vw-100'},
         { key: 'pin', label: 'Pin', tdClass:'vw-100'},
       //  { key: 'freq', label: 'Hz', tdClass:'vw-100'}
      ],
      peripherals: [
        { a: 'motor' },
        { a: 'encoder' },
        { a: 'IR' },
        { a: 'distance' },
        { a: 'OLED' },
        { a: 'servo' },
        { a: 'keypad' }
      ],
      items: [{ type: 'motor', name: '', pin: '', freq: '10' }],
      busy: false,
      password: null,
      pin_options: {
         pcb: {
           motor: ['MA', 'MB'],
           encoder: ['ENCA', 'ENCB'],
           IR: ['IR1', 'IR2'],
           distance: ['SRF1', 'SRF2'],
           OLED: ['I2C1', 'I2C2'],
           servo: ['servo1', 'servo2'],
           keypad: ['keypad']
         }
      }
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
    addHardware(type){
       this.items.push({ type: type, name: '', pin: '', freq: '' })
    },
    saveConfiguration(){
       var restructured = {devices: [{name: this.board, type: this.board, mcu: this.mcu }]}
       for (var j in this.items){
          var i = Object.assign({}, this.items[j]);
          var type = i['type'];
          delete i['type'];
          if (type == 'motor'){
             i['type'] = this.motorcontroller
          }
          if (!restructured.hasOwnProperty(type)){
             restructured[type] = [];
          }
          restructured[type].push(i);
       }
       var henk = YAML.load(JSON.stringify(restructured));
       console.log(YAML.dump(henk));
       //var test = JSON.stringify(henk, null, 2)

    },
    delete_item(index){
       console.log(JSON.stringify(this.items));
       this.items.splice(index, 1);
       console.log(JSON.stringify(this.items));
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
 
    this.items.pop();

  }
}
</script>
