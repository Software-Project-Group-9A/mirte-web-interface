<template>
      <div class="layoutbox-content" style="height: 100% !important">


            <div class="rounded background-green-light h5 p-3 mb-2">
              Output 
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



           <div class="rounded background-green-light p-3 mb-2">
              <h5>Besturing</h5> 

               <div class="row mb-4">

                <div class="col-1 offset-6">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   title="forward"
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
                   title="turn left"
                   @click="control('left')"
                 >
                 <i class="fa fa-arrow-left"></i>
                </button>
                </div>

                <div class="col-2 offset-1">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   title="stop"
                   @click="control('stop')"
                 >
                 <i class="fa fa-times-circle"></i>
                </button>
                </div>

                <div class="col-1 mb-2">
                <button class="btn btn-outline-dark mr-2"
                   v-b-tooltip.hover
                   title="turn right"
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
                   title="backward"
                   @click="control('backward')"
                 >
                 <i class="fa fa-arrow-down"></i>
                 </button>
                 </div>
               </div>

  
              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Snelheid: {{ linear_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="linear_speed" type="range" min="0" max=".1" step="0.01"></b-form-input>
                     </div>
                  </div>
               </div>

               <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Draaisnelheid: {{ angular_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="angular_speed" type="range" min="0" max="1" step="0.01"></b-form-input>
                     </div>
                  </div>

              </div>  



           </div>


            <div class="rounded background-green-light p-3 mb-2">
              <h5>Motoren</h5> 
              

              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Links: {{ left_motor_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="left_motor_speed" @change="send_motor_speed('left')" type="range" min="-100" max="100"></b-form-input>
                     </div>
                  </div>
               </div>

               <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Rechts: {{ right_motor_speed }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="right_motor_speed" @change="send_motor_speed('right')" type="range" min="-100" max="100"></b-form-input>
                     </div>
                  </div>

              </div>  


           </div>         



            <div class="rounded background-green-light p-3 mb-2">
              <h5>Servos</h5>   

              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Links: {{ left_servo_angle }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="left_servo_angle" @change="send_servo_value('left')" type="range" min="0" max="180"></b-form-input>
                     </div>
                  </div>
               </div>

               <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-4">
                       Rechts: {{ right_servo_angle }}
                     </div>
                     <div class="col-8">
                         <b-form-input id="range-1" v-model="right_servo_angle" @change="send_servo_value('right')" type="range" min="0" max="180"></b-form-input>
                     </div>
                  </div>

              </div>


           </div>

            <div class="rounded background-green-light p-3 mb-2">
              <h5>Schermpjes</h5>   

              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-2">
                       Links
                     </div>
                     <div class="col-5">
                          <b-form-select v-model="left_oled_type" :options="oled_options"></b-form-select>
                     </div>
                     <div class="col-5">
                          <b-form-input v-model="left_oled_value" @change="set_oled('left')" placeholder=""></b-form-input>
                     </div>
                  </div>
               </div>




              <div class="rounded background-primary p-2 text-white mb-2">
                  <div class="row">
                     <div class="col-2">
                       Rechts
                     </div>
                     <div class="col-5">
                          <b-form-select v-model="right_oled_type" :options="oled_options"></b-form-select>
                     </div>
                     <div class="col-5">
                          <b-form-input v-model="right_oled_value" @change="set_oled('right')" placeholder=""></b-form-input>
                     </div>
                  </div>
               </div>



           </div>


      </div>

</template>

<script>
import ROSLIB from 'roslib'
import Xterm from '@/components/Xterm.vue'


export default {
  name: 'actuators',
  components: {
    Xterm
  },
  methods: {
        set_oled(type){
          switch(type) {
             case "left":
               var request = new ROSLIB.ServiceRequest({
                 type: this.left_oled_type,
                 value: this.left_oled_value
               });
               this.left_oled_srv.callService(request, function(result) {});

             case "right":
               var request = new ROSLIB.ServiceRequest({
                 type: this.right_oled_type,
                 value: this.right_oled_value
               });
               this.right_oled_srv.callService(request, function(result) {});
          }
        },
        send_motor_speed(type) {
          switch(type) {
             case "left":
               var request = new ROSLIB.ServiceRequest({
                 speed : parseInt(this.left_motor_speed),
               });
               this.left_motor_srv.callService(request, function(result) {});

             case "right":
               var request = new ROSLIB.ServiceRequest({
                 speed : parseInt(this.right_motor_speed),
               });
               this.right_motor_srv.callService(request, function(result) {});
          }
        },
        send_servo_value(type) {
          switch(type) {
             case "left": 
               var request = new ROSLIB.ServiceRequest({
                 angle : parseInt(this.left_servo_angle),
               });
               this.left_servo_srv.callService(request, function(result) {});

             case "right":
               var request = new ROSLIB.ServiceRequest({
                 angle : parseInt(this.right_servo_angle),
               });
               this.right_servo_srv.callService(request, function(result) {});
          }
        },
        control(command) {
            console.log(command);
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
                x : linear,
                y : 0.0,
                z : 0.0
              },
              angular : {
                x : 0.0,
                y : 0.0,
                z : angular
              }
            });
            this.cmd_vel.publish(twist);
        },
  },
  data() {
    return {
      oled_options: ["text", "image", "animation"],
      animation_options: ["eye"],
      image_options: ["zoef_logo"],
      left_oled_type: "",
      left_oled_value: "",
      left_oled_srv: {},
      right_oled_type: "",
      right_oled_value: "",
      right_oled_srv: {},
      cmd_vel: {},
      left_servo_srv: {},
      right_servo_srv: {},
      left_motor_srv: {},
      right_motor_srv: {},
      linear_speed: 0.5,
      angular_speed: 0.5,
      ros: {},
      left_servo_angle: 90,
      right_servo_angle: 90,
      left_motor_speed: 0,
      right_motor_speed: 0
    }
  },
  mounted(){
    const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
    const ros_socketUrl = `${ros_protocol}${location.hostname}:9090`;
      
    this.ros = new ROSLIB.Ros({
      url : ros_socketUrl
    });

    this.cmd_vel = new ROSLIB.Topic({
       ros : this.ros,
       name : '/mobile_base_controller/cmd_vel',
       messageType : 'geometry_msgs/Twist'
    });

    this.left_servo_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_left_servo_angle',
      serviceType : 'zoef_msgs/SetServoAngle'
    });

    this.right_servo_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_right_servo_angle',
      serviceType : 'zoef_msgs/SetServoAngle'
    });

    this.left_motor_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_left_speed',
      serviceType : 'zoef_msgs/SetMotorSpeed'
    });

    this.right_motor_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_right_speed',
      serviceType : 'zoef_msgs/SetMotorSpeed'
    });

    this.left_oled_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_left_image',
      serviceType : 'zoef_msgs/SetOLEDImage'
    });

    this.right_oled_srv = new ROSLIB.Service({
      ros : this.ros,
      name : '/zoef/set_right_image',
      serviceType : 'zoef_msgs/SetOLEDImage'
    });

 
  }


}
</script>
