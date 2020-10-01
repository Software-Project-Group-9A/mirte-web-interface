<template>
  <div id="app">
      <Navbar />
      <div class="content">
         <keep-alive>
           <router-view />
         </keep-alive>
      </div>
      <b-modal v-model="loginModalShow" no-close-on-esc no-close-on-backdrop hide-header-close centered title="Login" :body-text-variant="textVariant" :header-text-variant="textVariant">
      <div class="mt-3">
         <form @submit.prevent="handleSubmit">
            <div class="form-group">
               <b-form-select v-on:change="getSelectedItem"
                  v-model="username"
                  :options="online">
               </b-form-select>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }"/>
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div v-if="error" class="alert alert-danger">{{error}}</div>
        </form>
      </div>
      <template v-slot:modal-footer>
         <div class="w-100">
            <b-button
               variant="primary"
               class="float-right"
               @click="checkLogin">
               Login
            </b-button>
         </div>
      </template>
   </b-modal>
   </div>
</template>

<script>

// @ is an alias to /src
import Navbar from '@/components/Navbar.vue'
import axios from "axios" 

export default {
   data () {
      return {
         username: '',
         password: '',
         submitted: false,
         error: '',
         online: [],
         textVariant: 'dark'
      }
   },
   components: {
      Navbar
   },
   methods: {
      getSelectedItem(item){
         if (window.location.href.indexOf(item.toLowerCase()) === -1){
            window.location = "http://"  + item.toLowerCase() + ".local";
         }
      }, 
      checkLogin() {
         this.submitted = true;
         const { username, password } = this;
         // stop here if form is invalid
         if (!(username && password)) {
               return;
         }
         axios.post("http://" + username + ".local/api/login", {username: username, password: password}, {crossDomain: true, withCredentials: true})    
         .then((response) => {  
	         if (response.data.message){
	            this.error = response.data.message;  
            } else {
                  this.$store.dispatch('setUser', response.data)
            }
         })
      }
   },
   mounted() {   //TODO: could this be beforeMount?
	   axios.get("/api/self")    
      .then((response) => {
		   this.$store.dispatch('setUser', response.data)
      })

      var vue_this = this // TODO: can we do this in another way?
 
      let websocket = new WebSocket('ws://' + window.location.hostname + ':4567');
      websocket.onmessage = function(event){
         var data = JSON.parse(event.data);
         var names = []
         if (data.length > 1){
            names.push({ value: null, text: 'Please select your Zoef' });
         }
         var selected = null
         for (var i in data){
            var hostname = ""
            if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(window.location.hostname)){
               hostname = data[i].referer.address;
               names.push({ value: hostname, text: hostname + ' (' + data[i].name + ')'});
            } else {
               hostname = data[i].name;
               names.push({ value: hostname, text: hostname});
            }

            
            if (window.location.href.indexOf(hostname.toLowerCase()) !== -1){
               selected = hostname;
            }            
         }
         vue_this.username = selected
         vue_this.online = names
      }
   },
   computed: {
      loginModalShow: function(){
         return this.$store.getters.getUser == "";
      }
   }
}
</script>

</script>

<style lang="scss">
$fa-font-path: "../node_modules/@fortawesome/fontawesome-free";

@import './assets/scss/main.scss';
@import '../node_modules/bootstrap/scss/bootstrap';
@import '../node_modules/bootstrap-vue/src/index.scss';
@import '../node_modules/@fortawesome/fontawesome-free/css/all.css';
</style>
