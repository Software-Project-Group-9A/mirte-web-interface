  // Connecting to ROS

const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
const ros_port = ':9090'; //location.port ? `:${location.port}` : '';
const ros_socketUrl = `${ros_protocol}${location.hostname}${ros_port}`;

function test(){
    ros.getParams(function(params) {
       console.log(params);
    });

  var distance_sensors = new ROSLIB.Param({
    ros : ros,
    name : '/zoef/distance'
  });


  distance_sensors.get(function(sensors) {
    console.log(JSON.stringify(sensors));
    var options = []
    for (sensor in sensors){
       options.push([sensor, sensor]);
    } 
    generateDistanceBlock(options);
    initBlockly();
    initXterm();
  });

}




  var ros = new ROSLIB.Ros({
    url : ros_socketUrl
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
    test();
  });


  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
