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
		
		findKeywords: function( node ){
		
			var key = $_.get('keywords');
			
			if( key != null ){
			
				$(key).each( function(){
				
					var pattern = new RegExp("("+this+")", ["gi"]),
						rs = "<a class='keyword' href='#' title='You searched for: $1'>$1</a>";
						
					node.html(node.html().replace(pattern, rs));
					
				});
		
			}
		 
			return node;
		},
		
		getArticles: function( data ){
		
			var parseTags = function( arr ){
			
				var t = [];
				$.each( arr, function(index, val){
				
					t.push( '<a href="#">',val,'</a>, ');
					
				});					
				return t.join('');
			}
			
			var articles = [];
			
			$.each( data.list, function( i, o ) {
				
				articles.push(
					['<article>',
					'<h1>', o.article.details.title, '</h1>',
					'<div class="author">', o.article.details.author.first, ' ', o.article.details.author.last, '</div>',
					'<div class="date">', o.article.details.date.month, ' ', o.article.details.date.day, ', ', o.article.details.date.year, '</div>',
					'<div class="text"><p>', o.article.text.replace(/&#182;/g,'</p><p>'), '</p></div>',
					'<div class="tags">', parseTags( o.article.tags ), '</div>',
					'</article>'].join('')
				);
				
			});
			
			$('body').html( $( articles.join('') ) ); 

			$_.findKeywords( $('body') );
		
		}
	}

}(jQuery));