// Slide websockets
// petegoodman.com

/*
 * Init on load
 */
(function(){

  // only start the sockets once...
  var socketOn = false;


  // add load event
  if (window.addEventListener) {
    window.addEventListener("load", init, false);
  }


  /*
   * init web sockets
   */
  function init() {

    // enter the password to activate web sockets
    var
      kkeys = [],
      password = "71,79"; //this spells go

    if (window.addEventListener) {
      window.addEventListener('keydown', function(e){
        kkeys.push( e.keyCode );
        if ( kkeys.toString().indexOf( password ) >= 0 ) {
          console.log("starting controller");
          startController();
          kkeys = [];
        }
      });
    }
  }



  function startController() {

    var socket, note;

    // only start sockets once
    if (!!socketOn) {
      return;
    }
    socketOn = true;

    console.log("web sockets activated");

    // set up websockets
    socket = io.connect(websocketUrl);

    // connection established
    socket.on('connect', function () {
      console.log("socket connected");
      socket.emit("slide-notes",{
        currentSlide: curSlide+1,
        totalSlides : slideEls.length,
        notes       : getNote()
      });
    });

    // move received
    socket.on('shift', function (data) {

      console.log("shift", data);

      note = getNote(data.dir);

      // trigger 'left' keypress for s5
      if (data.dir === "prev") {
        prevSlide();
        socket.emit("slide-notes",{
          currentSlide: curSlide+1,
          totalSlides : slideEls.length,
          notes       : note
        });
      }

      // trigger 'right' keypress for s5
      if (data.dir === "next") {
        nextSlide();
        socket.emit("slide-notes",{
          currentSlide: curSlide+1,
          totalSlides : slideEls.length,
          notes       : note
        });
      }
    });
  }


  function getNote(dir) {
    var notesEl, notes, slideNo;

    if (dir === "next") {
      slideNo = curSlide + 1;
    } else if (dir === "prev") {
      slideNo = curSlide - 1;
    } else {
      slideNo = curSlide;
    }

    notesEl = document.querySelectorAll('article')[slideNo].querySelector('.notes');
    if (notesEl) {
      notes = notesEl.innerHTML;
    } else {
      notes = "[no notes]";
    }

    return notes;
  }
})();