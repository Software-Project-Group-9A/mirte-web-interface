var express = require("express");
var pty = require('node-pty-prebuilt-multiarch');
var app = express();
var expressWs = require('express-ws')(app);  // TODO: decide on which websocket lib we use (probably express)
var cors = require('cors')
const bodyParser = require('body-parser');
var bonjour = require('bonjour')();
const WebSocket = require('ws');  // TODO: decide on which websocket lib we use (probably express)
const wss = new WebSocket.Server({port: 4567 });
const cookieSession = require('cookie-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
var flash=require("connect-flash");
const { createProxyMiddleware } = require('http-proxy-middleware');
fs = require('fs')

// TODO: Currently the local-ip package is not working
function getLocalIP(){
  var  address,os = require('os'),ifaces = os.networkInterfaces();
  for (var dev in ifaces) {
    var iface = ifaces[dev].filter(function(details) {
      return details.family === 'IPv4' && details.internal === false;
    });
    if(iface.length > 0) address = iface[0].address;
  }
  return address;
}

var mirte_name = fs.readFileSync('/etc/hostname', 'utf8').trim();
var mirte_password = fs.readFileSync('/home/mirte/.wifi_pwd', 'utf8').trim();

app.use(bodyParser.json())
app.use(cookieSession({
  name: 'mysession',
  keys: ['vueauthrandomkey'],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());


// Serve Vue, both in production and development
// Check if port 4000 is running, and if so, proxy to it.
// If not, serve the stais files in dist.
var net = require('net');
var server = net.createServer();



server.once('error', function(err) {
  if (err.code === 'EADDRINUSE') {
    // port is currently in use, so serve dev
    app.use('/', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true}));
  }
});

server.once('listening', function() {
  // port is not in use, so close server and 
  server.close();
  app.use(express.static('../vue-frontend/dist'))
});


server.listen(4000);

// Setup passportJS
//
//
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated() || getLocalIP() == "192.168.42.1" || getLocalIP() == "192.168.43.1" || getLocalIP() == "192.168.44.1") {
    return next()
  } else {
    res.redirect('/#/Login');
  }
}

let users = [
  {
    id: 1,
    username: mirte_name,
    password: mirte_password
  }
]

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
})

passport.use('local-login',
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.username === username && user.password === password
      })


      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect password'})
      }
    }
  )
)

// When only one mirte in the network, forward mirte.local to mirte_xxxxxx.local.
app.disable('etag'); // Disable 304 to make sure it will not alway redirect
app.get('/',function(req,res,next){
    if (req.headers.host == "mirte.local" && browser.services.length == 1){
       res.redirect('http://' + browser.services[0].host.toLowerCase() + "/")
    } else {
       next()
    }
})

// Serve blockly media
app.use('/blockly-media', express.static('node_modules/blockly/media'))

app.get('/api/self', (req, res) => {
  if (req.user){
    return res.json(req.user.username);
  } else if (getLocalIP() == "192.168.42.1" || getLocalIP() == "192.168.43.1" || getLocalIP() == "192.168.44.1"){
    return res.json(mirte_name);
  } else {
    return res.send("")
  }
})

app.post("/api/login", (req, res, next) => {
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send(info);
    }
    req.login(user, err => {
      res.json(req.user.username);
    });
  })(req, res, next);
});

app.get("/api/logout", function(req, res) {
  req.logout();
  return res.send();
});

// Instantiate shell and set up data handlers
expressWs.app.ws('/shell', (ws, req) => {
    // Spawn the shell
    var shell = pty.spawn('/bin/bash', [], {
        name: 'xterm-color',
        cwd: process.env.PWD,
        env: process.env
    });

    // For all shell data send it to the websocket
    shell.on('data', (data) => {
        if (ws.readyState == 1){
          ws.send(data);
        }
    });

    // For all websocket data send it to the shell
    ws.on('message', (msg) => {
        shell.write(msg);
    });
});



const exec = require('child_process').exec;
function upload_telemetrix (res, mcu) {
   return new Promise((resolve, reject) => {
     exec('/usr/local/src/mirte/mirte-install-scripts/run_arduino.sh upload_' + mcu + ' Telemetrix4Arduino', (error, stdout, stderr) => {
       if (error) {
         reject(stderr);
       } else {
         resolve(stderr)
       }
     });
   });
}


// upload telemetrix to mcu
app.post('/api/upload_telemetrix', async function (req, res) {
  var mcu = JSON.parse(req.body).mcu;
  const ret = await upload_telemetrix(res, mcu);
  if(ret.toLowerCase().includes("error")){
     res.end('download error');
  } else {
     res.end('download done');
  }
})


// shutdown
app.get('/api/shutdown', (req, res) => {
  res.end("done");   // TODO: sutdown could fail?
  const exec = require('child_process').execSync;
  const stdout = exec('sudo shutdown now');
})

// catch python files from the web interface and save them
app.post('/api/python', (req, res) => {
    var source = req.body

    const fs = require('fs');
    fs.writeFile("/home/mirte/workdir/mirte.py", source, (err) => {
        if(err) {
            console.log(err);
            res.end("something went wrong writing the file");
        }
        res.end("the file was saved");
    });
});


// catch robot settings (ROS params) from the web interface and save them
app.post('/api/settings', (req, res) => {
    var source = req.body

    const fs = require('fs');
    fs.writeFile("/home/mirte/mirte_ws/src/mirte-ros-packages/mirte_telemetrix/config/mirte_user_config.yaml", source, (err) => {
        if(err) {
            console.log(err);
            res.end("something went wrong writing the file");
        }
        const exec = require('child_process').execFile;
        const stdout = exec("/usr/local/src/mirte/mirte-web-interface/nodejs-backend/reload_params.sh");
        res.end("done");
    });
});


// catch robot settings (ROS params) from the web interface and save them
app.get('/api/settings', (req, res) => {
    res.download("/home/mirte/mirte_ws/src/mirte-ros-packages/mirte_telemetrix/config/mirte_user_settings.yaml");
/*
    const fs = require('fs');
    fs.readFile("/home/mirte/mirte_ws/src/mirte_ros_package/config/mirte_user_settings.yaml", function read(err, data) {
        if(err) {
            console.log(err);
            res.end("something went wrong reading the file");
        }
        res.end(data);
    });*/
});




// recceive command to  change the password
app.post('/api/passwd', (req, res) => {
  var pass = req.body

  const fs = require('fs');
  fs.writeFile("/home/mirte/.wifi_pwd", pass, (err) => {
      if(err) {
          console.log(err);
          res.end("something went wrong changing the password");
      }
      res.end("the password was changed");
  });
});




// Start the application
app.listen(3000 , () => console.log("services have started"));


// send new list of mirtes to websocket
function update(){
  console.log(browser.services);
  wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(browser.services));
      }
  });
}

// browse for all mirte services and update on up and down
browser = bonjour.find({ type: 'mirte' }, function (service) {
  update();
})
browser.on('down', update);

// send list of mirtes on new connection
wss.on('connection', function connection(ws) {
  ws.send(JSON.stringify(browser.services));
});





