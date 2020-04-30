<template>
    <div>
        <div id="terminal" ref="terminal" class="xterm"></div>
    </div>
</template>

<script>
import { Terminal } from 'xterm';
import { AttachAddon } from 'xterm-addon-attach';
import { FitAddon } from 'xterm-addon-fit';

import EventBus from '../event-bus';

export default {
    data: () => ({
        socket: WebSocket
    }),
    methods: {
        sendCode() {
            fetch("http://localhost:3000/api/python", {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'CORS': 'Access-Control-Allow-Origin'
                },
                body: this.$store.getters.getCode,
            }).then(res => {
                console.log("sent succesfully")
                this.socket.send("python2 python/linetrace.py\n")
            }).catch(err => {
                console.log("sending failed")
                console.log(err)
            })
        },
        stopCode() {
            this.socket.send("\x1c");
        },
        pauseCode() {
            this.socket.send("\x03");
        },
        stepCode() {
            this.socket.send("n\n");
        },
        continueCode() {
            this.socket.send("c\n");
        },
        clearCode() {
            this.$store.dispatch('setLinenumber', -1)
        },
    },
    mounted()  {
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

        // Load env variables
        this.socket.onopen = (ev) => {
            this.socket.send("source /opt/ros/melodic/setup.bash && source /home/zoef/zoef_ws/devel/setup.bash && cd /home/zoef/workdir && export PYTHONPATH=$PYTHONPATH:/home/zoef/web_interface/python && clear\n");
        };

        this.socket.onmessage = (event) => {
            let lines = event.data.split('\n')
            lines.forEach((line, index) => {
                if (line.indexOf("out: ") == 0) {
                    //term.writeln(line.substring(5))
                }
                if (line.indexOf("line: ") == 0) {
                    let linenr = parseInt(line.substring(6));
                    this.$store.dispatch('setLinenumber', linenr)
                }
            });
        };

        // event bus for control functions
        EventBus.$on('control', (payload) => {
            console.log('event')
            console.log(payload)
            switch(payload){
                case "send":
                    this.sendCode()
                    break;
                case "stop":
                    this.stopCode()
                    break;
                case "step":
                    this.stepCode()
                    break;
                case "pause":
                    this.pauseCode()
                    break;
                case "continue":
                    this.continueCode()
                    break;
                case "clear":
                    this.clearCode()
                    break;
            }
        });
        

    }
}
</script>