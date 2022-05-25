<template>

      <div class="row p-4 h-100">
         <div class="col-6 p-2 h-100 offset-3" style="overflow: hidden;"> 
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">
                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                   HTML
                </div>
                
                <div class="h-40" style="min-height: 40%; overflow: auto;" >
                    <HTMLEditor/>
                </div>
             </div>
         </div> 
      </div>

</template>

<script>

import HTMLEditor from '@/components/HTMLEditor.vue'

export default {
  components: {
    HTMLEditor
  }
}
</script>
