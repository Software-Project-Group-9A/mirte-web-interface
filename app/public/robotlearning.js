    
$( "#run" ).click(function( event ) {
    event.preventDefault();
    $.post( "/api/python", {source: editor.getValue() } ,  function( data ) {
         socket.send("python /tmp/test.py\n");
    });
});


$( "#stop" ).click(function( event ) {
    socket.send("\x03"); // CTRL-C
});
