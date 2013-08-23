/**
 
* #.# WebLabs

* Author: Virgilio Cometa
 
* 
 
*/

var weblabs, $_, $w, _w;

(function ($) {

	$w = _w = $_ = weblabs = {
	
		params: {},
		
		userAgent:{
		
			value: navigator.userAgent,
		
			type: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)==null?'desktop':'mobile',
			
			browser: navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i)[1],
			
			version: navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i)[2]
		
		},
		
		get: function( key ){
			
			return this.params[key];
		
		},
		
		set: function( key, value ){
		
			this.params[key] = value;
		
			return 'success';
		
		}
	}

}(jQuery));