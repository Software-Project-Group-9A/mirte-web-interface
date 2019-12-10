    
$( "#run" ).click(function( event ) {
    event.preventDefault();
    $.post( "/api/python", {source: editor.getValue() } ,  function( data ) {
         socket.send("./linetrace.py\n");
    });
});

// Can not send SIGINT since that is already handled ROS

$( "#pause" ).click(function( event ) {
    socket.send("\x03"); // SIGINT overruled in linetrace.py
});

$( "#step" ).click(function( event ) {
    socket.send("n\n"); // n (own implementation in linetrace.py
});

$( "#continue" ).click(function( event ) {
    socket.send("c\n"); // c (own implementation in linetrace.py
});

$( "#stop" ).click(function( event ) {
    socket.send("\x1c"); // SIGQUIT 
});
