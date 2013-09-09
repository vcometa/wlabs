/**
 
* #.# WebLabs

* Author: Virgilio Cometa
 
* 
 
*/

var weblabs, $_, $w, _w;

(function ($) {

	$w = _w = $_ = weblabs = {
	
		params: {},
		
		browser:{
			
			this: $(window),
		
			userAgent: navigator.userAgent,
		
			type: navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i)==null?'desktop':'mobile',
			
			name: navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i)[1],
			
			version: navigator.userAgent.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i)[2],
			
			width: $(window).width(),
			
			height: $(window).height(),
			
			domain: window.location.hostname
		
		},
		
		get: function( key ){
			
			return this.params[key];
		
		},
		
		set: function( key, value ){
		
			this.params[key] = value;
		
			return 'success';
		
		},
		
		loadJson: function( url, callback ){
			
			$.ajax({        
				url: url,
				dataType: "json",
				success:function(data){
					callback(data);
				}

			});
		
		},
		
		getValues: function( data ){
		
			$.each( data, function( key, val ) {
			
				console.log( key+' :: '+val );
			
			});
		
		},
		
		keywordMatch: function( text ){
		
			var key = $_.get('keyword');
			
			
			text.replace('Vivamus', 'DORKererererere' );
			
			console.log( 'TEXT: '+ text );
		/* 
			if( key != null ){
			
				console.log( text );
			
				
			} */
		
			return text;
		},
		
		parseJson: function( data ){
		
			var parseArr = function( arr ){
			
				var t = [];
				$.each( arr, function(index, val){
				
					t.push( '<a href="#">',val,'</a>, ');
					
				});					
				return t.join('');
			}
		
			var html=[
						'<h1>', data.article.details.title, '</h1>',
						'<div class="author">', data.article.details.author.first, ' ', data.article.details.author.last, '</div>',
						'<div class="date">', data.article.details.date.month, ' ', data.article.details.date.day, ', ', data.article.details.date.year, '</div>',
						'<div class="text"><p>', data.article.text.replace(/&#182;/g,'</p><p>'), '</p></div>',
						'<div class="tags">', parseArr( data.article.tags ), '</div>'
				].join('');
		
			$('body').html( $_.keywordMatch( html ) );
		
		}
	}

}(jQuery));