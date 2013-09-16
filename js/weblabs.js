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
		
		sortResults: function(arr, asc, byDate, prop){
		
			var sArr;
			
			if( byDate ) {
			
				sArr = arr.sort( function(a,b) {
					
					if( asc ){
					
						return new Date(b.details.date).getTime() - new Date(a.details.date).getTime();
						
					}else{
					
						return new Date(a.details.date).getTime() - new Date(b.details.date).getTime();
					
					}
					
				});
			
			} else {
			
				sArr = arr.sort( function(a,b) {
				
					if( asc ){
					
						return b[prop].localeCompare(a[prop]);
					
					}else{
			
						return a[prop].localeCompare(b[prop]);
					
					}
				
				});
			
			}
			
			return sArr;
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
			
			var sArr = $_.sortResults( data.articles, true, false, 'id');
			
			$.each( sArr, function( i, o ) {
			
				articleList.push(
					['<li><article id="', o.id ,'">',
					'<h2><a href="?articleId=',o.id,'">', o.details.title, '</a></h2>',
					'<div class="author">', o.details.author.first, ' ', o.details.author.last, '</div>',
					'<div class="date">', o.details.date, '</div>',
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