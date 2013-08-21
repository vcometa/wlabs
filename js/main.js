/**
 
* #.# WebLabs

* Author: Virgilio Cometa
 
* 
 
*/

var weblabs, _w;

(function ($) {

	_w = weblabs = {
	
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