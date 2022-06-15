<template>
      <div class="layoutbox-content" style="height: 100% !important">



      <div v-if="programming">

            <div class="rounded background-green-light h5 p-3 mb-2">
              {{ $t('actuators.output') }}              
                <div class="float-right">

<!--

        <button class="btn-sm btn-outline-dark mx-2" 
            v-b-tooltip.hover 
            title="clear output" 
            @click="control('clear')"
        >
            <i class="fas fa-sync"></i>
        </button>

        <button class="btn btn-outline-dark mr-2" 
            v-b-tooltip.hover 
            title="toggle output/terminal" 
            @click="control('terminal')"
        >
            <i class="fa fa-terminal"></i>
        </button>

-->

                </div>
              

              <Xterm/>
           </div>    
      </div>


           <div class="rounded background-green-light p-3 mb-2">
              <h5>{{ $t('actuators.control') }}</h5> 

               <div class="row mb-4">

                <div class="col-1 offset-6">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   :title="$t('actuators.move_forward')"
                   @click="control('forward')"
                 >
                 <i class="fa fa-arrow-up"></i>
                 </button>
                 </div>
               </div>

               <div class="row mb-4">
                <div class="col-1 offset-4">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   :title="$t('actuators.move_left')"
                   @click="control('left')"
                 >
                 <i class="fa fa-arrow-left"></i>
                </button>
                </div>

                <div class="col-2 offset-1">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   :title="$t('actuators.move_stop')"
                   @click="control('stop')"
                 >
                 <i class="fa fa-times-circle"></i>
                </button>
                </div>

                <div class="col-1 mb-2">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   :title="$t('actuators.move_right')"
                   @click="control('right')"
                 >
                 <i class="fa fa-arrow-right"></i>
                </button>
                </div>


               </div>


               <div class="row mb-4">

                <div class="col-1 offset-6">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   :title="$t('actuators.move_backward')"
                   @click="control('backward')"
                 >
                 <i class="fa fa-arrow-down"></i>
                 </button>
                 </div>
               </div>

  
              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       {{ $t('actuators.speed') }}: {{ linear_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="linear_speed" type="range" min="0" max=".1" step="0.01"></b-form-input>
                     </div>
                  </div>
               </div>

               <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       {{ $t('actuators.angular_speed') }}: {{ angular_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="angular_speed" type="range" min="0" max="1" step="0.01"></b-form-input>
                     </div>
                  </div>

              </div>  

           </div>



      <div v-for="actuator in getActuators()"  class="rounded background-green-light p-3 mb-2">
              <h5>{{ $t('peripherals.' + peripherals[actuator].text) }}</h5>

                  <div v-for="instance in getInstancesOfActuator(actuator)" class="rounded background-primary p-2 text-white mb-2">
                     <div v-if="actuator === 'servo'">
                          <div>
                            {{instance}}: {{ actuator_values[actuator][instance] }}
                          </div>
                          <div>
                              <b-form-input id="range-1" v-model="actuator_values[actuator][instance]" @change="sendData(actuator, instance)" type="range" min="0" max="180"></b-form-input>
                          </div>
                     </div>

                     <div v-if="actuator === 'oled'">
                       <div class="row">
                         <div class="col-2">
                           {{instance}}
                         </div>
                         <div class="col-5">
                             <b-form-select v-model="actuator_values[actuator][instance].type" :options="oled_options"></b-form-select>
                         </div>
                         <div class="col-5">
                             <b-form-input v-model="actuator_values[actuator][instance].value" @change="set_oled(actuator, instance)" placeholder=""></b-form-input>
                         </div>
                       </div>
                     </div>

                     <div v-if="actuator === 'motor_l9110s'">
                          <div>
                            {{instance}}: {{ actuator_values[actuator][instance] }}
                          </div>
                          <div>
                              <b-form-input id="range-1" v-model="actuator_values[actuator][instance]" @change="sendData(actuator, instance)" type="range" min="-100" max="100"></b-form-input>
                          </div>
                     </div>

                     <div v-if="actuator === 'motor_l298n'">
                          <div>
                            {{instance}}: {{ actuator_values[actuator][instance] }}
                          </div>
                          <div>
                              <b-form-input id="range-1" v-model="actuator_values[actuator][instance]" @change="sendData(actuator, instance)" type="range" min="-100" max="100"></b-form-input>
                          </div>
                     </div>


                  </div>
           </div>


      </div>

</template>

<script>
import ROSLIB from 'roslib'
import Xterm from '@/components/Xterm.vue'
import properties_ph from "../assets/json/properties_ph.json"
import Vue from 'vue'


export default {
  name: 'actuators',
  components: {
    Xterm
  },
  methods: {
        getActuators() {
          const AP = new Array()
          for (let p of this.$store.getters.getPConfig) {
            if (p.rel_path.split("\\")[0] === "Actuators" && !AP.includes(p.type)) {
              AP.push(p.type)
            }
          }
          return AP
        },
        getInstancesOfActuator(type){
           var PConfig = this.$store.getters.getPConfig;
           var filtered = PConfig.filter(T => T.type === type).map(T => T.name);
           return filtered;
        },
        sendData(actuator, instance){
           var data = {};
           data[this.peripherals[actuator].service_value] = parseInt(this.actuator_values[actuator][instance]);
           var request = new ROSLIB.ServiceRequest(data);
           this.actuator_services[actuator][instance].callService(request, function(result) {});
        },
        set_oled(actuator, instance){
           var request = new ROSLIB.ServiceRequest({
              type: this.actuator_values[actuator][instance].type,
              value: this.actuator_values[actuator][instance].value
           });
           this.actuator_services[actuator][instance].callService(request, function(result) {});
        },
        control(command) {
            var linear = 0.0;
            var angular = 0.0;
            switch(command) {
              case "forward":
                linear = this.linear_speed;
                break;
              case "backward":
                linear = -this.linear_speed;
                break;
              case "left":
                angular = this.angular_speed;
                break;
              case "right":
                angular = -this.angular_speed;
                break;
              case "stop":
              default:
                // nothing, using defaults 0 and 0
            }


            var twist = new ROSLIB.Message({
              linear : {
                x : parseFloat(linear),
                y : 0.0,
                z : 0.0
              },
              angular : {
                x : 0.0,
                y : 0.0,
                z : parseFloat(angular)
              }
            });

            this.cmd_vel.publish(twist);
        },
  },
  data() {
    return {
      programming: true,
      peripherals: properties_ph,
      actuator_values: {},
      actuator_services: {},
      oled_options: ["text", "image", "animation"],
      cmd_vel: {},
      linear_speed: 0.5,
      angular_speed: 0.5,
      ros: {},
    }
  },
  beforeMount(){
     // Instansiate all actuators in this.actuator_values

     const actuators = this.getActuators();
     for (var actuator in actuators){
        Vue.set(this.actuator_values, actuators[actuator], {});
        const instances = this.getInstancesOfActuator(actuators[actuator]);
        for (var instance in instances){
           if (actuators[actuator] == "oled"){
              Vue.set(this.actuator_values[actuators[actuator]], instances[instance], {});
              Vue.set(this.actuator_values[actuators[actuator]][instances[instance]], 'type', '');
              Vue.set(this.actuator_values[actuators[actuator]][instances[instance]], 'value', '');
           } else {
              Vue.set(this.actuator_values[actuators[actuator]], instances[instance], 0);
           }
        }
     }
  },
  mounted(){
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}/ws/ros`;
      
    this.ros = new ROSLIB.Ros({
      url : ros_socketUrl
    });

    this.cmd_vel = new ROSLIB.Topic({
       ros : this.ros,
       name : '/mobile_base_controller/cmd_vel',
       messageType : 'geometry_msgs/Twist'
    });


    var actuators = this.getActuators();
    for (let actuator in actuators){
       Vue.set(this.actuator_services, actuators[actuator], {});
       var instances = this.getInstancesOfActuator(actuators[actuator]);
       for (let instance in instances){
          Vue.set(this.actuator_services[actuators[actuator]], instances[instance], {});
          this.actuator_services[actuators[actuator]][instances[instance]] = new ROSLIB.Service({
              ros : this.ros,
              name : '/mirte/set_' + instances[instance] + '_' + this.peripherals[actuators[actuator]].service_name,
              serviceType : this.peripherals[actuators[actuator]].service_type
          });
       }
    }
  }


}
</script>
