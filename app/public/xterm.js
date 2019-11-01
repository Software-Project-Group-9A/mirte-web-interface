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
    term.attach(socket);
    socket.send("source /opt/ros/melodic/setup.bash && source /app/zoef_ws/devel/setup.bash && export ROS_IP=127.0.0.1 && clear\n");
};

// Not going to worry about close/error for the websocket

