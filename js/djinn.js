var activeIndex = 0;

function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}

$(function() {
		
		var header = $('header'),
			footer = $('footer'),
			navHtml = [
							'<ul class="navigation">',
							'<li><a href="page1.html">page1</a></li>',
							'<li><a href="page2.html">page2</a></li>',
							'<li><a href="page3.html">page3</a></li>',
							'<li><a href="page4.html">page4</a></li>',
							'<li><a href="page5.html">page5</a></li>',
							'</ul>'
						].join('');
						
		$(navHtml).appendTo(header).clone().appendTo(footer);
		
		var setActive = function(){
		
			var url = window.location.pathname,
		
				pageName = url.substring(url.lastIndexOf('/') + 1),
				
				arr = $('header .navigation li a');
				
				for( var i=0,j=arr.length;i<j;i++){
				
					if( pageName == $(arr[i]).attr('href') ){
					
						$(arr[i]).addClass('active');
						
					}
				}
				
			
		};
		
		setActive();
		
});