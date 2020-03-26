<template>
    <div>
        <button class="btn btn-primary mr-2" @click="sendCode" ref="run">Run</button>
        <button class="btn btn-primary mr-2" ref="pause">Pause</button>
        <button class="btn btn-primary mr-2" ref="step">Step</button>
        <button class="btn btn-primary mr-2" ref="continue">Continue</button>
		<button class="btn btn-primary mr-2" @click="stopCode" ref="stop">Stop</button>
        <div id="terminal" ref="terminal" class="xterm"></div>
    </div>
</template>

<script>
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

export default {
    data: () => ({
        socket: WebSocket
    }),
    props: {
        code: String,
    },
    methods: {
        updateCurrentLine (line) {
            this.$emit('currentLine', line)
        },
        sendCode() {
            fetch("http://localhost:3000/api/python", {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'CORS': 'Access-Control-Allow-Origin'
                },
                body: this.code,
            }).then(res => {
                console.log("sent succesfully")
                this.socket.send("python python/zoef.py\n")
            }).catch(err => {
                console.log("sending failed")
                console.log(err)
            })
        },
        stopCode() {
            this.socket.send("c\n");
        }
    },
    mounted(){
       // Open the websocket connection to the backend
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        const port = ':3000';
        const socketUrl = `${protocol}${location.hostname}${port}/shell`;
        const pythonUrl = `${location.protocol}${location.hostname}${port}/api/python`;
        this.socket = new WebSocket(socketUrl);

        // The terminal
        const term = new Terminal();
        term.loadAddon(new AttachAddon(this.socket));
        term.loadAddon(new FitAddon());
        term.open(this.$refs.terminal);

    }
}
</script>