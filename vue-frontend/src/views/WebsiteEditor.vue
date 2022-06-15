<template>

      <div class="row p-4 h-100">
         <div class="col-6 p-2 h-100 offset-3" style="overflow: hidden;"> 
             <div class="layoutbox rounded h-100" style="overflow: hidden; display: flex; flex-flow: column;">
                <div class="text-white p-2 h3 m-0 layoutbox-title w-100 background-primary">
                  HTML
                  <div style="float: right">
                     <button class="btn btn-outline-light mr-2" 
                        v-b-tooltip.hover 
                        :title="$t('website_editor.save')" 
                        @click="saveFile"
                     >
                     <i class="fa fa-save"></i>
                     </button>
                  </div>
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
   },
   methods: {
      saveFile: function() {
         const htmlUrl = `${location.protocol}//${location.hostname}/api/html`;

         fetch(htmlUrl, {
               method: 'POST',
               headers: {
                  'Content-Type': 'text/plain',
                  'CORS': 'Access-Control-Allow-Origin'
               },
               body: this.$store.getters.getHTML,
         }).then(res => {
               this.waitForSocketConnection();
         }).catch(err => {
               console.error("sending failed");
               console.error(err);
         })
      }
   }
}
</script>
