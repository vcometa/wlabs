/**
 
* #.# WebLabs

* Author: Virgilio Cometa
 
* 
 
*/

var weblabs;

(function ($) {

	weblabs = {
	
		params: {},
		
		get: function( key ){
			
			return this.params[key];
		
		},
		
		set: function( key, value ){
		
			this.params[key] = value;
		
			return 'success';
		
		}
	}

}(jQuery));