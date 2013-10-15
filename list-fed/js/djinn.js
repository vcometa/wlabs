/*.* by Virgilio Cometa 2013 */

function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
function getHeaderFooter( callback ){

	var header = $('header'),
		footer = $('footer');
		
	$.getJSON( "js/navigation.json", function( data ) {
	
		 var items = [];
			$.each( data.navigation, function( i, navigation ) {
				items.push( '<li id="' + navigation.id + '"><a href="'+navigation.src+'" title="'+navigation.description+'" >' + navigation.title + '</a></li>' );
			});
			
		$( "<ul/>", {
			"class": "navigation",
			html: items.join( "" )
			}).appendTo(header).clone().appendTo(footer);
			
		callback();
	
	});

}

function setActiveTab(){
		
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

	//alert('test');

	getHeaderFooter(setActiveTab);	

}

function loadFile(url, type, justIE, callback) {
	
	if ( type == 'script'){
		var script = document.createElement(type);
			script.type = 'text/javascript';
			
			if (script.readyState) { //IE
			
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

(function () {
	
	loadFile( 'css/main.css', 'stylesheet');	
	loadFile( 'https://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js', 'script', false, function(){init()} );

})();
