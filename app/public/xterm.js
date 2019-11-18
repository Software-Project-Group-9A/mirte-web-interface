// No idea what these are about. Just copied them from the demo code
Terminal.applyAddon(attach);
Terminal.applyAddon(fit);
Terminal.applyAddon(winptyCompat);

// The terminal
const term = new Terminal();

// No idea what this does
term.winptyCompatInit();

// This kinda makes sense
const container = document.getElementById('terminal');
term.open(container);

// Open the websocket connection to the backend
const protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
const port = ':3000'; //location.port ? `:${location.port}` : '';
const socketUrl = `${protocol}${location.hostname}${port}/shell`;
const socket = new WebSocket(socketUrl);

// Attach the socket to the terminal
socket.onopen = (ev) => {
    //term.attach(socket);
    socket.send("source /opt/ros/melodic/setup.bash && source /home/zoef/zoef_ws/devel/setup.bash && cd /tmp && clear\n");
};


socket.onmessage = (event) => {
  lines = event.data.split('\n')
  lines.forEach(function (line, index) {
    if (line.indexOf("out: ") == 0) {
       term.writeln(line.substring(5))
    }
    if (line.indexOf("line: ") == 0) {
       linenr = parseInt(line.substring(6)) - 1
       editor.clearGutter("linetracer");
       editor.setGutterMarker(linenr, "linetracer", makeMarker());
    }

  });
};


function makeMarker() {
  var marker = document.createElement("div");
  marker.style.color = "#822";
  marker.innerHTML = "●";
  return marker;
}


// Not going to worry about close/error for the websocket

