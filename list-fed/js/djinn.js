/*.* by Virgilio Cometa 2013 */

function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
				results = regex.exec(location.search);
			return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		
function init(){

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
			
		onInitialLoad();
	
	});

}

function setActiveTab( index ){
		
	var arr = $('header .navigation li a');
	
	$(arr).removeClass('active');
	
	$(arr[index]).addClass('active');
	
};

function sortList( listType ) {
	
	var mainList = $('.main-list li');
	
	listType = ( listType == '')?'all':listType;
	
	for( var i=0, j=mainList.length; i<j; i++ ){
	
		var node = $(mainList[i]);
	
		if( listType != node.data('type') && listType != 'all' ){
		
			node.removeClass('show').addClass('hidden');
		
		}else{
		
			node.removeClass('hidden').addClass('show');
		
		}
	
	}

}

function bindNavigation(){

	var nav = $('.navigation li a');
	
	nav.on('click', function(event){
	
		event.preventDefault();
		
		sortList( $(this).attr('href').replace('?list=','') );
		
		setActiveTab( $($(this).parent()).index() );
	
	});
}

function bindSortDate(){

	var mainList = $('.main-list li');

	$('button.sort').on('click', function(){
	
		var type = $(this).data('sort');
		
		mainList.sort(function(a,b){			
				a = new Date( $(a).data('date') );
				b = new Date( $(b).data('date') );
				
				if( type == 'ascending' ){
		
					return a-b
		
				} else {
				
					return b-a
				
				}
				
			});
		
		$('.main-list li').remove();
		
		$('.main-list').append( mainList );
		
		/* mainList.sort(function(a,b){
		
			
		  a = new Date( $(a).data('date') );
		  b = new Date( $(b).data('date') );
		  return a<b?-1:a>b?1:0;
		}); */
		
		//}
		
	});

}

function windowWidth(){

	var log = $('.logWindow');
	
	$(window).on('load resize', function(){
	
		log.text( $(this).width()+'px' );
		
	});

}

function onInitialLoad(){

	setActiveTab(0);
	bindNavigation();
	sortList('all');	
	bindSortDate();
	
	windowWidth();
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
