<template>
    <div>
        <button :disabled="isPlayDisabled" class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="play" 
            @click="control('play')"
        >
            <i class="fas fa-play"></i>
        </button>

        <button :disabled="isPauseDisabled" class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="pause" 
            @click="control('pause')"
        >
            <i class="fa fa-pause"></i>
        </button>

        <button :disabled="isStepDisabled" class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="step" 
            @click="control('step')"
        >
            <i class="fa fa-step-forward"></i>
        </button>

		<button :disabled="isStopDisabled" class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="stop" 
            @click="control('stop')"
        >
            <i class="fa fa-stop"></i>
        </button>

        <button class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="clear output" 
            @click="control('clear')"
        >
            <i class="fas fa-redo"></i>
        </button>

        <button class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="toggle output/terminal" 
            @click="control('terminal')"
        >
            <i class="fa fa-terminal"></i>
        </button>

        <span class="nav-spacer"></span>

        <button href="#" class="btn btn-outline-light mx-2" 
            v-b-tooltip.hover 
            title="download" 
            @click="download"
        >
            <i class="fa fa-download"></i>
        </button>

        <button class="btn btn-outline-light mr-2" 
            v-b-tooltip.hover 
            title="upload" 
            @click="openFileWindow"
        >
            <i class="fa fa-upload"></i>
            <input ref="file_input" @change="upload" type="file" name="name" style="display: none;" />
        </button>

    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {

    methods: {
        control(command) {
            EventBus.$emit('control', command);
        },

        openFileWindow(){
            this.$refs.file_input.click()
        },

        upload(){
            var fr=new FileReader(); 

            fr.onload = () => { 
                console.log(fr.result)
                this.$store.dispatch('setBlockly', fr.result)
            } 

            if(this.$refs.file_input.files.length > 0){
                fr.readAsText(this.$refs.file_input.files[0]); 
            }
            
        },

        download(){
            var text = localStorage.getItem("blockly");
            var filename = "zoef.xml";
            
            var element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);

        },


    },
    computed: {
     	 isPlayDisabled: function(){
          return this.$store.getters.getExecution == "running";
       },
     	 isPauseDisabled: function(){
          return this.$store.getters.getExecution != "running";
       },
     	 isStepDisabled: function(){
          return this.$store.getters.getExecution == "stopped";
       },
     	 isStopDisabled: function(){
          return this.$store.getters.getExecution == "stopped";
       }
    }

}
</script>
