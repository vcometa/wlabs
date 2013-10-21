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
		
	$.ajaxSetup({beforeSend: function(xhr){
	  if (xhr.overrideMimeType)
	  {
		xhr.overrideMimeType("application/json");
	  }
	}
	});
		
	$.getJSON( "js/navigation.json", function( data ) {
	
		 var listItems = [];
			$.each( data.navigation.items, function( i, items ) {
				listItems.push( '<li id="' + items.id + '"><a href="'+items.src+'" title="'+items.description+'" >' + items.title + '</a></li>' );
			});
			
		header.append('<h2 id="menu-title">'+ data.navigation.title +'</h2>');
			
		$( "<ul/>", {
			"class": "navigation",
			html: listItems.join( "" )
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

	var nav = $('.navigation li a'),
		headerMenu = $('header h2');
	
	nav.on('click', function(event){
	
		event.preventDefault();
		
		sortList( $(this).attr('href').replace('?list=','') );
		
		setActiveTab( $($(this).parent()).index() );
	
	});
	
	headerMenu.on('click', function(){
	
		var pos = 0,
		
			nav = $('.navigation');
	
		if( nav.position().left == 0 ){
		
			pos = -(nav.outerWidth());
		
		}
	
		nav.css({'left':pos+'px'});
		
		if( $(this).hasClass('active') ){
		
			$(this).removeClass('active');
		
		} else {
		
			$(this).addClass('active');
		
		}
		
	});
	
	$('html').on('click', function(e) {
	
		if( $(e.target).attr('id') != 'menu-title' && !$( $(e.target).parent().parent() ).hasClass('navigation') ){
	
			$('.navigation').css({'left': -( $('.navigation').outerWidth() )+'px'});
			
			headerMenu.removeClass('active');
		
		}
		
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

	var log = $('.logWindow'),
	
		resize = function(){
		
			var w =  $(this).width();
			
			if( w > 768 ){
			
				var w1 = w>1024?1024:w,
					offset = 28,
					w2 = Math.round(((w1 - ($('aside.right-rail').outerWidth() + offset ))/w1)*100)+'%';
	
				log.text( w +'px' );
				
				$('.page .main-article').width(w2);
			} else {
			
				$('.page .main-article').removeAttr('style');
			
			}
		
		}
	resize();
	$(window).on('resize', function(){
	
		resize();
		
	});


}

function onInitialLoad(){

	setActiveTab(0);
	bindNavigation();
	sortList('all');	
	bindSortDate();
	//windowWidth();
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
