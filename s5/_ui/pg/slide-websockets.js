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

    // enter the password to activate bonus mode
    var
      kkeys = [],
      password = "71,79"; //this spells guns

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
        currentSlide: snum+1,
        totalSlides : smax,
        notes       : getNote()
      });
    });

    // move received
    socket.on('shift', function (data) {

      console.log("shift", data);

      note = getNote(data.dir);

      // trigger 'left' keypress for s5
      if (data.dir === "prev") {
        keys({which:37});
        socket.emit("slide-notes",{
          currentSlide: snum+1,
          totalSlides : smax,
          notes       : note
        });
      }

      // trigger 'right' keypress for s5
      if (data.dir === "next") {
        keys({which:39});
        socket.emit("slide-notes",{
          currentSlide: snum+1,
          totalSlides : smax,
          notes       : note
        });
      }
    });
  }


  function getNote(dir) {
    var notesEl, notes, slideNo;

    if (dir === "next") {
      slideNo = snum + 1;
    } else if (dir === "prev") {
      slideNo = snum - 1;
    } else {
      slideNo = snum;
    }

    notesEl = document.querySelectorAll('.slide')[slideNo].querySelector('.notes');
    if (notesEl) {
      notes = notesEl.innerHTML;
    } else {
      notes = "[no notes]";
    }

    return notes;
  }
})();