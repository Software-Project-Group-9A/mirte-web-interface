<template>


       <div class="row p-4 h-100">
         <div class="col-3 p-2 h-100 offset-3" style="overflow: hidden;"> 
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">

                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                   {{ $t('main.sensors') }}
                </div>
                  
           
                <div class="h-100" style="overflow-y: auto;">
                   <Sensors/>
                </div>
              

             </div>
         </div> 

         <div class="col-3 p-2 h-100" style="overflow: hidden;"> 
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">

                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                   {{ $t('main.actuators') }}
                </div>
                  
           
                <div class="h-100" style="overflow-y: auto;">
                   <Actuators/>
                </div>
              

             </div>
         </div> 

      </div>
    </div> 



</template>

<script>

import Sensors from '@/components/Sensors.vue'
import Actuators from '@/components/Actuators.vue'

export default {
  components: {
    Sensors,
    Actuators,
  }
}
</script>
