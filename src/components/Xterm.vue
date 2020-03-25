<template>
    <div>
        <button class="btn btn-primary mr-2" ref="run">Run</button>
        <button class="btn btn-primary mr-2" ref="pause">Pause</button>
        <button class="btn btn-primary mr-2" ref="step">Step</button>
        <button class="btn btn-primary mr-2" ref="continue">Continue</button>
		<button class="btn btn-primary mr-2" ref="stop">Stop</button>
        <div id="terminal" class="xterm"></div>
    </div>
</template>

<script>
import { Terminal } from 'xterm';

export default {
    props: {
        code: String
    },
    mounted(){
       // Open the websocket connection to the backend
        const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
        const port = ':3000'; //location.port ? `:${location.port}` : '';
        const socketUrl = `${protocol}${location.hostname}${port}/shell`;
        const socket = new WebSocket(socketUrl);

        // Attach the socket to the terminal
        socket.onopen = (ev) => {
            //term.attach(socket);
            socket.send("source /opt/ros/melodic/setup.bash && source /home/zoef/zoef_ws/devel/setup.bash && cd /home/zoef/workdir && export PYTHONPATH=$PYTHONPATH:/home/zoef/web_interface/python && clear\n");
        };

        // The terminal
        const term = new Terminal();

        // This kinda makes sense
        const container = document.getElementById('terminal');
        term.open(container);


        socket.onmessage = (event) => {
            let lines = event.data.split('\n')
            lines.forEach(function (line, index) {
                if (line.indexOf("out: ") == 0) {
                    term.writeln(line.substring(5))
                }
                if (line.indexOf("line: ") == 0) {
                    linenr = parseInt(line.substring(6));
                    editor.clearGutter("linetracer");
                    editor.setGutterMarker(linenr-1, "linetracer", makeMarker());
                    blockMap = getBlockToLineMap();
                    workspace.highlightBlock(blockMap[linenr]);
                }
                if (line.indexOf("@zoef:") > 0){
                    // Clear gutter and highligth when process stopped
                    editor.clearGutter("linetracer");
                    workspace.highlightBlock("");
                }
            });
        };


        function makeMarker() {
            var marker = document.createElement("div");
            marker.style.color = "#822";
            marker.innerHTML = "●";
            return marker;
        }
        

        this.$refs.run.addEventListener('click', () => {
            console.log('run button clicked')

            fetch('/api/python', {
                method: 'POST',
                body: this.code
            }).then((res) => {
                console.log("message received")
                socket.send("echo joe\n");
            }).catch((err) => {
                console.log("couldn't connect to server")
            })

        })

    }
}
</script>