    
$( "#run" ).click(function( event ) {
  event.preventDefault();

    $.post( "/api/python", {source: editor.getValue() } ,  function( data ) {
        console.log("file senr");
         socket.send("python /tmp/test.py\n");
    });


});
