var http = require('http');
var express = require("express");
var RED = require("node-red");

// Create an Express app
var app = express();

// Add a simple route for static content served from 'public'
app.use("/",express.static("public"));

// Create a server
var server = http.createServer(app);

// Create the settings object - see default settings.js file for other options
var settings = {
    httpAdminRoot:"/",
    httpNodeRoot: "/api",
    adminAuth: {
      type: "credentials",
      users: [
          {
              username: "admin",
              password: "$2a$08$04FYg46T3QhkEwkLE/wRIucIJ7efuCIpjNq8WZK/P2e6g/hosGklu",
              permissions: "*"
          }
      ]
    },
    logging: "debug",
    functionGlobalContext: { }    // enables global context
};

// Initialise the runtime with a server and settings
RED.init(server,settings);

// Serve the editor UI from /red
app.use(settings.httpAdminRoot,RED.httpAdmin);

// Serve the http nodes UI from /api
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8080);

// Start the runtime
RED.start();
