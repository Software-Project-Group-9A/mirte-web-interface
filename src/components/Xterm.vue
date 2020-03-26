<template>
    <div>
        <button class="btn btn-primary mr-2" ref="run">Run</button>
        <button class="btn btn-primary mr-2" ref="pause">Pause</button>
        <button class="btn btn-primary mr-2" ref="step">Step</button>
        <button class="btn btn-primary mr-2" ref="continue">Continue</button>
		<button class="btn btn-primary mr-2" ref="stop">Stop</button>
        <div id="terminal" ref="terminal" class="xterm"></div>
    </div>
</template>

<script>
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

export default {
    props: {
        code: String
    },
    mounted(){
       // Open the websocket connection to the backend
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        const port = ':3000';
        const socketUrl = `${protocol}${location.hostname}${port}/shell`;
        const socket = new WebSocket(socketUrl);

        // The terminal
        const term = new Terminal();
        term.loadAddon(new AttachAddon(socket));
        term.loadAddon(new FitAddon());
        term.open(this.$refs.terminal);

    }
}
</script>