/*
 * footnote links cycles through the links from an html page,
 * and puts these at the foot of the printed page
 *
 */
var printFootnoteLinks = {

	/*
     * function runs on page load, collecting links and running sub-functions to check validity
	 *
	 * @param string containerID Id of the container within which to collect all links
	 * @param string targetID Id of the container to append complete link list to
	 *
	 * @return void
	 */
	init: function(containerID,targetID) {

		//check to see if variables passed to function are contained in the html document
		if (!document.getElementById(containerID) || !document.getElementById(targetID)) return false;

		//get container object
		var container = document.getElementById(containerID);

		//get all link tags from the container
		var linkArray = container.getElementsByTagName('a');

		//create an array to contain all unique links
		var uniqueLinkArray = [];

		//create an ordered list to display all unique links
		var ol = document.createElement('ol');


		//cycle through all links
		for (var i=0; i<linkArray.length; i++) {

			//test link validity
			var validlink = this.testLinkValidity(linkArray[i]);

			//if link is valid add to footer
			if (validlink) {
				this.addLink(linkArray[i], uniqueLinkArray, ol);
			}

			// while we're looping through links, check whether to make it open in a new window...
			if (linkArray[i].getAttribute("href") && linkArray[i].getAttribute("rel") === "external") {
				linkArray[i].target = "_blank";
			}
		}

		//finished cycle through links, so print them
		this.printLinks(ol, targetID);
	},


	/*
	 * function to test whether a link should be included in the page footer
	 *
	 * @param object currentLink The current link object
	 *
	 * @return boolean whether the current link is valid and should be added
	 */
	testLinkValidity: function(currentLink) {

		//if current element has a link url, and has not been told to be ignored
		if (currentLink.getAttribute('href') == false || currentLink.getAttribute('cite') == false || currentLink.className.indexOf("ignore") != -1 || currentLink.className.indexOf("no-print") != -1 ) {
			return false;
		}

		//if current element is the child of an element that has been requested as hidden - add classes per project as applicable
		if (currentLink.parentNode.className.indexOf('hideforprint') != -1) {
			return false;
		}

		//get the url of the link
		var thisLink = currentLink.getAttribute('href') ? currentLink.href : currentLink.cite;

		//get the current page location
		var currentURL = document.location.href;

		//check if the link is to the current page, if so do not display it
		if (thisLink.indexOf("#") != -1) {

			var thisLinkURL = thisLink.split('#');
			if (thisLinkURL[0] == currentURL) return false

		}
		//if link passes all of the above tests, it is valid
		return true;
	},


	/*
	 * function to take a new link and append it to the current list of links
	 *
	 * @param object currentLink the current link object
	 * @param array uniqueLinkArray an array of unique links
	 * @param object ol html element containing list of unique links
	 *
	 * @return void
 	 */
	addLink: function(currentLink, uniqueLinkArray, ol) {

			var thisLink = currentLink.href;

			if (currentLink.href.indexOf("mailto:") != -1) {
				thisLink = "Email: " + thisLink.substring(7);
			}

			//create inline span element to contain link ref number
			var note = document.createElement('span');
			note.className = "printonly";

			//check if current link has already been collected
			var linkExists = arrayFunctions.arrayContainsValue(uniqueLinkArray, thisLink);

			//if the link is already in the array
			if (linkExists === false){

					//create list element
					var li = document.createElement('li');

					//create text to go inside list element
					var li_txt = document.createTextNode(thisLink);

					//put text within list element
					li.appendChild(li_txt);

					//put list element within ordered list
					ol.appendChild(li);

					//put the latest link into the array
					uniqueLinkArray.push(thisLink);

					//create variable to contain the number relating to the link url
					var note_txt = document.createTextNode(uniqueLinkArray.length);

			// if the link is not already in the array
			} else {

					//create variable to contain the number relating to the link url
					var note_txt = document.createTextNode(linkExists+1);

			}

			//put the number of the current link / url within the span element
			note.appendChild(note_txt);
			currentLink.appendChild(note);
	},


	/*
	 * append final list of links to the target container
	 * @param object ol html element containing links list
	 * @param string targetID container id to append links list to
	 *
	 * @return void
	 */
	printLinks: function (ol, targetID) {

		var opendiv	= document.createElement('div');
		opendiv.className = 'printonly listlinks clearfix';

		//the target of where to append the printed links
		var target = document.getElementById(targetID);
		target.appendChild(opendiv);

		//create the h2 under which all links are placed
		var h1 = document.createElement('h1');
		var h1_txt = document.createTextNode('Links');
		h1.appendChild(h1_txt);

		opendiv.appendChild(h1);
		opendiv.appendChild(ol);
	}
}