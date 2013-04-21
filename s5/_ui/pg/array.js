/*
 *	extra array functions 
 */

var arrayFunctions = { 

	/**
	 * Check whether a value is in an array
	 *
	 * @param array to check for value in
	 * @param value to check for
	 * 
	 * @return the array key (integer) where the value occurs, or false if not
	 */
			arrayContainsValue: function(arrayName, value) {
				for(x=0; x<arrayName.length; x++)
					if(arrayName[x]==value) return x;
					return false;
			},
				
	
	/**
	 *  Create an array of unique values, by removing any duplicates
	 *
	 * @param an un-unique array
	 * 
	 * @return unique array
	 */
			createUniqueArray: function(originalArray) {
				
				//create an array for all unique values
				var uniqueArray = new Array();

				//cycle through original array
				for(i=0; i<originalArray.length; i++){
				
					//call function to check if current value in the original array is already in the unique array
					if((this.arrayContainsValue(uniqueArray, originalArray[i]))=== false){
						
						//if it is unique, add it to the array
						uniqueArray.push(originalArray[i]);
					}
				}

				//return the unique array
				return uniqueArray;
			}

}