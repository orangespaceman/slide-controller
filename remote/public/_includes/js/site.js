/*
 * S5 Controller
 */
(function(doc, $) {

  var $notes, $slideCount, $totalSlides;

  // init on dom load
  $.domReady(function(){
    detectClicks();
    $notes = $(".notes");
    $currentSlide = $(".current-slide");
    $totalSlides = $(".total-slides");
  });

  // set up websockets
  var socket = io.connect();

  // connection established
  socket.on('open', function (data) {
    log("remote", data);
  });

  // message received
  socket.on('message', function (data) {
    log("remote", data);
  });

  // update notes
  socket.on('notes', function (data){
    $notes.html(data.notes);
    $currentSlide.html(data.currentSlide);
    $totalSlides.html(data.totalSlides);
    log("updated notes", data);
  });

  // connection closed
  socket.on('close', function (data) {
    log("remote", data);
  });


  // detect previous/next clicks
  function detectClicks() {
    var $prev = $("a.prev"),
        $next = $("a.next");

    $prev.on('click', function(e){
      this.blur();
      e.preventDefault();
      send("prev");
    });

    $next.on('click', function(e){
      this.blur();
      e.preventDefault();
      send("next");
    });
  }


  // send (and log) a message
  function send(message) {
    socket.emit("move", {message:message});
    log("local", message);
  }


  // log recieved messages
  function log(source, message) {
    console.log(source, " message received: ", message);
  }


  /*
   * iOS viewport fix
   * https://raw.github.com/gist/901295/bf9a44b636a522e608bba11a91b8298acd081f50/ios-viewport-scaling-bug-fix.js
   * By @mathias, @cheeaun and @jdalton
   */
  (function(){
    var addEvent = 'addEventListener',
        type = 'gesturestart',
        qsa = 'querySelectorAll',
        scales = [1, 1],
        meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];

    function fix() {
      meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
      doc.removeEventListener(type, fix, true);
    }

    if ((meta = meta[meta.length - 1]) && addEvent in doc) {
      fix();
      scales = [0.25, 1.6];
      doc[addEvent](type, fix, true);
    }
  })();

}(document, $));


// hide address bar
window.addEventListener('load', function(e) {
  setTimeout(function() { window.scrollTo(0, 1); }, 1);
}, false);