function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
function getHeaderFooter(){

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

}

function setActive(){
		
	var url = window.location.pathname,

		pageName = url.substring(url.lastIndexOf('/') + 1),
		
		arr = $('header .navigation li a');
		
		for( var i=0,j=arr.length;i<j;i++){
		
			if( pageName == $(arr[i]).attr('href') ){
			
				$(arr[i]).addClass('active');
				
			}
		}
		
	
};

function init(){

	getHeaderFooter();
	setActive();

}

(function () {

	function loadFile(url, type, justIE, callback) {
	
		if ( type == 'script'){
			var script = document.createElement(type);
				script.type = 'text/javascript';
				
				//alert(script.readyState);
				
				if (script.readyState) { //IE
				
					document.createElement('header');
					document.createElement('nav');
					document.createElement('section');
					document.createElement('article');
					document.createElement('aside');
					document.createElement('footer');
					document.createElement('figure');
					document.createElement('figcaption');				
				
					script.onreadystatechange = function () {
					
						if (script.readyState == "loaded" || script.readyState == "complete") {
							script.onreadystatechange = null;
							
							
							callback();
						}		
					};
				} else { //Others 
					script.onload = function () {
						callback();
					};
				}
				
				if ( justIE ) {
					script.src = url;
					document.getElementsByTagName("head")[0].appendChild(script);
				} else if (!justIE){
					script.src = url;
					document.getElementsByTagName("head")[0].appendChild(script);
				}
			
		} else if ( type == 'stylesheet'){
		
			var link = document.createElement('link');
				link.type = 'text/css';
				link.rel = 'stylesheet';
				
			link.href = url;
			document.getElementsByTagName("head")[0].appendChild(link);
		
		}
	}

	loadFile( 'css/main.css', 'stylesheet');
	loadFile( 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', 'script', false, function(){init()} );
	


})();
