/*
 * Node slide controller
 *
 * $ node app.js
 *
 */
var express     = require('express'),
    server      = express.createServer(),
    io          = require("socket.io").listen(server),
    port        = process.env.PORT || process.env['app_port'] || 7003;


// serve static files, routes, etc
server.use(express.query());
server.use(express.static(__dirname + '/public'));
server.use(express.favicon(__dirname + '/public/_includes/img/fav.ico'));
//server.use(connect.router(routes));
server.listen(port);

// listen for socket.io controller connection
io.sockets.on('connection', function (socket) {

  // log message on client and server
  log("slide controller connected");

  // detect calls to move back/forward a slide
  socket.on('move', function (data) {
    var dir = data.message;
    socket.broadcast.emit('shift', { dir: dir });
  });

  // detect notes
  socket.on('slide-notes', function (data) {
    socket.broadcast.emit('notes', data);
  });

  // log any server messages to the client and server console
  function log(message) {
    socket.send(message);
    console.log(message);
  }
});