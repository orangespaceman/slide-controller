# slide-controller

Node.js-based remote control for a HTML slideshows - S5 or Google slides

## Installation

Check the project out from GitHub

In the 'remote' directory, run npm install

## Running slide-controller

    $ node remote/app.js

This runs the remote app on port 7003, e.g. **http://localhost:7003**

### Remote

This can be run from a live server - the websocket control can be cross-domain

### Slideshow

Once the slide controller is set up, you can run your slideshows from a standard apache server.

Examples of an s5 slideshow and a google slideshow are provided.

Within these slideshows, set the ```websocketUrl``` parameter to point to your slide-controller URL.

To begin controlling the slideshow via the remote, type 'go' in the slideshow window. (If you open the browser console you'll see that it has been triggered.)

