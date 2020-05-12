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
        shell_socket: WebSocket,
		  linenr_socket: WebSocket
    }),
    methods: {
		  waitForSocketConnection(){
			     this.linenr_socket = new WebSocket("ws://localhost:8001");

              this.linenr_socket.onerror = (event) => {
                  setTimeout(function () {
							console.log("waiting for conection");
							this.waitForSocketConnection();
					   }.bind(this), 10);
				  };

              this.linenr_socket.onopen = (event) => {
					   this.linenr_socket.send("c");
				  };

				  this.linenr_socket.onmessage = (event) => {
					 if (event.data != 0) {
					   this.$store.dispatch('setLinenumber', event.data);
					 } else {
                  this.$store.dispatch('setLinenumber', null);
                }
				  };
		  },
        sendCode() {
            fetch("http://localhost:3000/api/python", {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                    'CORS': 'Access-Control-Allow-Origin'
                },
                body: this.$store.getters.getCode,
            }).then(res => {
                this.shell_socket.send("python2 python/linetrace.py\n");
					 this.waitForSocketConnection();
            }).catch(err => {
                console.log("sending failed")
                console.log(err)
            })
        },
        stopCode() {
            this.linenr_socket.send("e");
            this.$store.dispatch('setLinenumber', null)
        },
        pauseCode() {
            this.linenr_socket.send("b");
        },
        stepCode() {
            this.linenr_socket.send("s");
        },
        continueCode() {
            this.linenr_socket.send("c");
        },
        clearCode() {
            // stop running program, clear terminal, remove step indicator
            this.linenr_socket.send("e");
            this.shell_socket.send("clear\n");
            this.$store.dispatch('setLinenumber', null)
        },
    },
    mounted()  {
       // Open the websocket connection to the backend
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        const port = ':3000';
        const shell_socketUrl = `${protocol}${location.hostname}${port}/shell`;
        const linetrace_socketUrl = `${protocol}${location.hostname}:8001`;
        this.shell_socket = new WebSocket(shell_socketUrl);

        // The terminal
        const term = new Terminal();
        const fitAddon = new FitAddon();
        term.loadAddon(new AttachAddon(this.shell_socket));
        term.loadAddon(fitAddon);
        term.open(this.$refs.terminal);
        fitAddon.fit();
 
        // Load env variables
        this.shell_socket.onopen = (ev) => {
            // TODO: could we do this on the server side?
            this.shell_socket.send("source /opt/ros/melodic/setup.bash && source /home/zoef/zoef_ws/devel/setup.bash && cd /home/zoef/workdir && export PYTHONPATH=$PYTHONPATH:/home/zoef/web_interface/python && clear\n");
        };

        // event bus for control functions
        EventBus.$on('control', (payload) => {
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
