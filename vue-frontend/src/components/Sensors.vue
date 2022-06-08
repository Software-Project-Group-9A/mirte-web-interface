<template>
  
     <div class="layoutbox-content">
        <div v-for="sensor in getSensors()"  class="rounded background-green-light p-3 mb-2">

              <h5>{{ $t('peripherals.' + peripherals[sensor].text) }}</h5>
              <div class="row">
 
                <div class="col-4">
                  <img class="center-div w-75" :src="getSensorImage(sensor)">
                </div>

                <div class="col-8">

                  <div v-for="instance in getInstancesOfSensor(sensor)" class="rounded background-primary p-2 text-white mb-2">
                     {{instance}}: {{ sensor_values[sensor][instance] }}
                  </div>
                </div>
              </div>
        </div>
    </div>

</template>

<script>
import properties_ph from "../assets/json/properties_ph.json"
import MenuButtons from '@/components/MenuButtons.vue'
import ROSLIB from 'roslib'
import Vue from 'vue'

export default {
  name: 'sensors',
  components: {
    MenuButtons
  },
  data() {
    return {
      peripherals: properties_ph,
      sensor_values: {},
    }
  },
  methods: {
    //separates peripheral items into sensors and actuators
    getSensors() {
      const AP = new Array()
      for (let p of this.$store.getters.getPConfig) {
        if (p.rel_path.split("\\")[0] === "Sensors" && !AP.includes(p.type)) {
          AP.push(p.type)
        }
      }
      return AP
    },
    getInstancesOfSensor(type){
      var PConfig = this.$store.getters.getPConfig;
      var filtered = PConfig.filter(T => T.type === type).map(T => T.name);
      return filtered;
    },
    getSensorImage(type){
      var images = require.context('../assets/images/', false, /\.jpg$/)
      return images('./' + type + ".jpg")
    }
  },
  beforeMount(){
     // Instansiate all sensors in this.sensor_values

     const sensors = this.getSensors();
     for (var sensor in sensors){
        Vue.set(this.sensor_values, sensors[sensor], {});
        const instances = this.getInstancesOfSensor(sensors[sensor]);
        for (var instance in instances){
           Vue.set(this.sensor_values[sensors[sensor]], instances[instance], -1);
        }
     }
  },
  mounted(){

    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}/ws/ros`;
      
    const ros = new ROSLIB.Ros({
      url : ros_socketUrl
    });

    var sensors = this.getSensors();
    for (let sensor in sensors){
       let instances = this.getInstancesOfSensor(sensors[sensor]);
       for (let instance in instances){
          let topic = new ROSLIB.Topic({
             ros : ros,
             name : '/mirte/' + sensors[sensor] + '/' + instances[instance],
             messageType : this.peripherals[sensors[sensor]].message_type
          });
          topic.subscribe((message) => {
             this.sensor_values[sensors[sensor]][instances[instance]] = message[this.peripherals[sensors[sensor]].message_value];
          });
       }
    }
  }


}
</script>
