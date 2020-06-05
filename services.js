
var express = require("express");
var pty = require('node-pty');
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

var zoef_name = fs.readFileSync('/etc/hostname', 'utf8').trim();
var zoef_password = fs.readFileSync('/etc/wifi_pwd', 'utf8').trim();

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
  app.use(express.static('dist'))
});

server.listen(4000);

// Setup passportJS
//
//
const authMiddleware = (req, res, next) => {
  if (req.isAuthenticated() || getLocalIP() == "192.168.42.1") {
    return next()
  } else {
    res.redirect('/#/Login');
  }
}

let users = [
  {
    id: 1,
    username: zoef_name,
    password: zoef_password
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

app.get('/api/self', (req, res) => {
  if (req.user){
    return res.json(req.user.username);
  } else if (getLocalIP() == "192.168.42.1"){
    return res.json(zoef_name);
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

// upload stm32 build
app.get('/api/stm32', (req, res) => {
  const exec = require('child_process').execSync;
  const stdout = exec('sudo /usr/local/src/zoef/zoef_arduino/run.sh upload_stm32');
  res.end(stdout);
})


// catch python files from the web interface and save them
app.post('/api/python', (req, res) => {
    var source = req.body

    const fs = require('fs');
    fs.writeFile("/home/zoef/workdir/zoef.py", source, (err) => {
        if(err) {
            console.log(err);
            res.end("something went wrong writing the file");
        }
        res.end("the file was saved");
    });
});

// recceive command to  change the password
app.post('/api/passwd', (req, res) => {
  var pass = req.body

  const fs = require('fs');
  fs.writeFile("/etc/wifi_pwd", pass, (err) => {
      if(err) {
          console.log(err);
          res.end("something went wrong changing the password");
      }
      res.end("the password was changed");
  });
});




// Start the application
app.listen(3000 , () => console.log("services have started"));


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





