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
		
		sortResults = function(arr, prop, asc) {
		
			arr = arr.sort(function(a, b) {
				if (asc) return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
				else return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
			});
			
			return arr;
		}
		
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
		
		getVideos: function( data ){
		
			$.each( data.videos, function( i, o ) {
			
				console.log( o.title );
			
			});
		
		},
		
		getImages: function( data ){
		
			$.each( data.images, function( i, o ) {
			
				console.log( o.title );
			
			});
		
		},
		
		getArticleList: function( data ){
		
			var parseTags = function( arr ){
			
				var t = [];
				$.each( arr, function(index, val){
				
					t.push( '<a href="#">',val,'</a>, ');
					
				});					
				return t.join('');
			}
			
			var articleList = ['<ul class="articleList">'];
			
			$.each( data.articles, function( i, o ) {
			
				articleList.push(
					['<li><article id="', o.id ,'">',
					'<h2><a href="?articleId=',o.id,'">', o.details.title, '</a></h2>',
					'<div class="author">', o.details.author.first, ' ', o.details.author.last, '</div>',
					'<div class="date">', o.details.date.month, ' ', o.details.date.day, ', ', o.details.date.year, '</div>',
					'<div class="description"><p>', o.description.replace(/&#182;/g,'</p><p>'), '</p></div>',
					'<div class="tags">', parseTags( o.tags ), '</div>',
					'</article></li>'].join('')
				);
				
			});
			
			$('body').html( $( articleList.join('') ) ); 

			//$_.findKeywords( $('article .description') );
		
		}
	}

}(jQuery));