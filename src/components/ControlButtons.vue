<template>
    <div>
        <button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="play" 
            @click="control('send')"
        >
            <i class="fa fa-play"></i>
        </button>

        <button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="pause" 
            @click="control('pause')"
        >
            <i class="fa fa-pause"></i>
        </button>

        <button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="step" 
            @click="control('step')"
        >
            <i class="fa fa-step-forward"></i>
        </button>

        <button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="continue" 
            @click="control('continue')"
        >
            <i class="fa fa-arrow-right"></i>
        </button>

		<button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="stop" 
            @click="control('stop')"
        >
            <i class="fa fa-stop"></i>
        </button>

        <button class="btn btn-primary mr-2" 
            v-b-tooltip.hover 
            title="clear" 
            @click="control('clear')"
        >
            <i class="fa fa-repeat"></i>
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
    },

}
</script>