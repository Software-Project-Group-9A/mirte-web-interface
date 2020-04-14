if (window.location.hostname == "zoef.local" ){

   let websocket = new WebSocket("ws://zoef.local:4567");
   websocket.onmessage = function(event){
     console.log(event.data);
     data = JSON.parse(event.data);
     if (data.length == 1){
        window.location.href = "http://" + data[0].host;
     } else {
        // NOTE: this is just a rough version. This should not be done this way.
        // We should use a better way as soon as the layout is there.
        document.documentElement.innerHTML = 'Multiple Zoefs found on this network. Please select yours:<br/><br/>';
        for (zoef_service_idx in data){
           document.documentElement.innerHTML += "<a href='http://" + data[zoef_service_idx].host + "/'>" + data[zoef_service_idx].name + "</a><br/>";
        }
     }
   }

}

