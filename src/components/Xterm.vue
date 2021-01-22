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
        linenr_socket: WebSocket,
        term: Terminal,
        prev_timestamp: -1000 
    }),
    activated: function(){
        this.term.focus();
    },
    methods: {
        waitForSocketConnection(){
              const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
              const linetrace_socketUrl = `${protocol}${location.hostname}:8001`;
              this.linenr_socket = new WebSocket(linetrace_socketUrl);

              this.linenr_socket.onerror = (event) => {
                  setTimeout(function () {
                     console.log("waiting for connection");
                     this.waitForSocketConnection();
                  }.bind(this), 10);
              };

              this.linenr_socket.onopen = (event) => {
                  this.linenr_socket.send("c");
                  this.$store.dispatch('setExecution', 'running');
              };

              this.linenr_socket.onmessage = (event) => {
                if (event.data != 0) {
                  // Update linenumber (max of 20Hz = 1000/50)
                  if (event.timeStamp - this.prev_timestamp > 50) {
                     this.$store.dispatch('setLinenumber', event.data);
                     this.prev_timestamp = event.timeStamp;
                  }
                } else {
                  this.$store.dispatch('setLinenumber', null);
                  this.$store.dispatch('setExecution', 'stopped');
                }
              };
        },
        playCode() {
            if (this.$store.getters.getExecution == "paused"){
               this.linenr_socket.send("c");
               this.$store.dispatch('setExecution', 'running');
            } else {
               // Not running, so upload code and start executing
               const pythonUrl = `http://${location.hostname}:3000/api/python`;

               fetch(pythonUrl, {
                   method: 'POST',
                   headers: {
                       'Content-Type': 'text/plain',
                       'CORS': 'Access-Control-Allow-Origin'
                   },
                   body: this.$store.getters.getCode,
               }).then(res => {
                   this.waitForSocketConnection();
               }).catch(err => {
                   console.log("sending failed")
                   console.log(err)
               })
               }
        },
        stopCode() {
            this.linenr_socket.send("e");
            this.$store.dispatch('setLinenumber', null)
            this.$store.dispatch('setExecution', 'stopped');
        },
        pauseCode() {
            this.linenr_socket.send("b");
            this.$store.dispatch('setExecution', 'paused');
        },
        stepCode() {
            this.linenr_socket.send("s");
        },
        clearOutput() {
            // stop running program, clear terminal, remove step indicator
            this.linenr_socket.send("e");
            this.$store.dispatch('setExecution', 'stopped');
            this.shell_socket.send("clear\n");
            this.$store.dispatch('setLinenumber', null)
        },
        setTerminal(terminal){
           if (terminal){
              this.shell_socket.send("stty echo && PS1='\\[\\e]0;\\u@\\h: \\w\\a\\]${debian_chroot:+($debian_chroot)}\\[\\033[01;32m\\]\\u@\\h\\[\\033[00m\\]:\\[\\033[01;34m\\]\\w\\[\\033[00m\\]\\$ ' && clear\n");
              this.term.setOption('disableStdin', false);
           } else {
              this.shell_socket.send("stty -echo && PS1='' && clear\n");
              this.shell_socket.send("clear\n");
              this.term.setOption('disableStdin', true);
           }
        },
        toggleTerminal() {
            this.setTerminal(this.term.getOption('disableStdin'));
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
        this.term = new Terminal();
        const fitAddon = new FitAddon();
        this.term.loadAddon(new AttachAddon(this.shell_socket));
        this.term.loadAddon(fitAddon);
        this.term.open(this.$refs.terminal);
        fitAddon.fit();
        this.term.setOption('disableStdin', true);
        
        // Load env variables
        this.shell_socket.onopen = (ev) => {
            this.setTerminal(false);
            this.shell_socket.send("cd /home/zoef/workdir/ && source /opt/ros/melodic/setup.bash && source /home/zoef/zoef_ws/devel/setup.bash && pkill -f zoef_robot.linetrace || /bin/true && python3 -m zoef_robot.linetrace & clear\n");
        };

        // Autoresize terminal on size change
        const observer = new ResizeObserver(entries => {
           fitAddon.fit();
        })
        observer.observe(this.$refs.terminal)

        // event bus for control functions
        EventBus.$on('control', (payload) => {
            switch(payload){
                case "play":
                    this.playCode()
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
                case "clear":
                    this.clearOutput()
                    break;
                case "terminal":
                    this.toggleTerminal()
                    break;
            }
        });
    }

}
</script>
