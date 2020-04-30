<template>
    <div>
        <button class="btn btn-primary mr-2" @click="control('send')"     ref="run">Run</button>
        <button class="btn btn-primary mr-2" @click="control('pause')"    ref="pause">Pause</button>
        <button class="btn btn-primary mr-2" @click="control('step')"     ref="step">Step</button>
        <button class="btn btn-primary mr-2" @click="control('continue')" ref="continue">Continue</button>
		<button class="btn btn-primary mr-2" @click="control('stop')"     ref="stop">Stop</button>
        <button class="btn btn-primary mr-2" @click="control('clear')"    ref="clear">Clear</button>
    </div>
</template>

<script>
import EventBus from '../event-bus';

export default {
    data: () => ({
        socket: WebSocket
    }),
    methods: {
        control(command) {
            EventBus.$emit('control', command);
        },
    },

}
</script>