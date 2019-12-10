  // Connecting to ROS

const ros_protocol = (location.protocol === 'https:') ? 'wss://' : 'ws://';
const ros_port = ':9090'; //location.port ? `:${location.port}` : '';
const ros_socketUrl = `${ros_protocol}${location.hostname}${ros_port}`;

function addDistanceBlocks(){
  return new Promise( resolve => {
  var distance_sensors = new ROSLIB.Param({
    ros : ros,
    name : '/zoef/distance'
  });


  distance_sensors.get(function(sensors) {
    var options = []
    for (sensor in sensors){
       options.push([sensor, sensor]);
    } 
    generateDistanceBlock(options);
    resolve();
  });

  });
}

function addIntensityBlocks(){
  return new Promise( resolve => {
  var intensity_sensors = new ROSLIB.Param({
    ros : ros,
    name : '/zoef/intensity'
  });

  intensity_sensors.get(function(sensors) {
    var options = []
    for (sensor in sensors){
       options.push([sensor, sensor]);
    }
    generateIntensityBlock(options);
    resolve();
  });
 });
}

function addPWMBlocks(){
  return new Promise( resolve => {
  var motors = new ROSLIB.Param({
    ros : ros,
    name : '/zoef/motor'
  });

  motors.get(function(motor_list) {
    var options = []
    for (motor in motor_list){
       options.push([motor, motor]);
    }
    generatePWMBlock(options);
    resolve();
  });
 });
}

async function initGUI(){
    const a = await addDistanceBlocks();
    const b = await addIntensityBlocks();
    const c = await addPWMBlocks();
    initBlockly();
    initXterm();
}

  var ros = new ROSLIB.Ros({
    url : ros_socketUrl
  });

  ros.on('connection', function() {
    console.log('Connected to websocket server.');
    initGUI()
  });


  ros.on('error', function(error) {
    console.log('Error connecting to websocket server: ', error);
  });

  ros.on('close', function() {
    console.log('Connection to websocket server closed.');
  });
