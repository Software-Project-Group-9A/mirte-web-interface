#!/usr/bin/nodejs

var bonjour = require('bonjour')();
const WebSocket = require('ws');
const wss = new WebSocket.Server({port: 4567 });

// send new list of zoefs to websocket
function update(){
   console.log(browser.services);
   wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(browser.services));
      }
   });
}

// browse for all zoef services and update on up and down
browser = bonjour.find({ type: 'zoef' }, function (service) {
   update();
})
browser.on('down', update);

// send list of zoefs on new connection
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(browser.services));
});

