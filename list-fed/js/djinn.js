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
			
		header.append('<h2 id="menu-title" class="active">'+ data.navigation.title +'</h2>');
			
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

function bindNavigation(goOnBlur){

	var nav = $('.navigation li a'),
		headerMenu = $('header h2');
	
	nav.on('click', function(event){
	
		event.preventDefault();
		
		sortList( $(this).attr('href').replace('?list=','') );
		
		setActiveTab( $($(this).parent()).index() );
	
	});
	
	headerMenu.on('click', function(){
	
		var pos = 0,
		
			pWidth = '79%',
			
			fWidth = '98.75%',
			
			mLeft = '0px',
			
			nav = $('.navigation'),
			
			navW = nav.outerWidth();
	
		if( nav.position().left == 0 ){
		
			pos = -(navW);
			
			pWidth = '100%';
			
			mLeft = '0px';
		
		} else {
		
			pWidth = ($(window).width() - navW )+'px';
			
			fWidth = ($(window).width() - (navW + 21 ))+'px';
			
			mLeft = navW+'px';
		
		}
				
		$('.page .main-body').css({'width':pWidth,'margin-left':mLeft});
		
		$('.page footer').css({'width':fWidth,'margin-left':mLeft})
	
		nav.css({'left':pos+'px'});
		
		if( $(this).hasClass('active') ){
		
			$(this).removeClass('active');
		
		} else {
		
			$(this).addClass('active');
		
		}
		
	});
	
	if( goOnBlur ){
	
		$('html').on('click', function(e) {
		
			if( $(e.target).attr('id') != 'menu-title' && !$( $(e.target).parent().parent() ).hasClass('navigation') ){
		
				$('.navigation').css({'left': -( $('.navigation').outerWidth() )+'px'});
				
				headerMenu.removeClass('active');
				
				$('.page .main-body').css({'width':'100%','margin-left':'0'});
				
				$('.page footer').css({'width':'98.75%','margin-left':'0'});
				
				
			
			}
			
		});
	}
}

function bindSortDate(){

	var sortObjArr = $('.sorter'),
	
		sortList = function(selector, button){

			var mainList = $(selector),
				listParent = $(mainList.parent());

			$(button).on('click', function(){
			
				console.log(selector);
			
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
				
				mainList.remove();
				
				listParent.append( mainList );
				
				
			});
		
		}
		
	for(var i=0, j=sortObjArr.length;i<j;i++){
	
		sortList($(sortObjArr[i]).data('target')+' li', $(sortObjArr[i]).find('button.sort'))
	
	}

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

function loadRSSFeed(){

	var count = 20,
			startIndex = 0,
			url = 'http://feeds.reuters.com/reuters/topNews';
			
	$.ajax({
		url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num='+(count + startIndex)+'&callback=?&q=' + encodeURIComponent(url),
		dataType: 'json',
		success: function(data) {
		  parseJSON(data);
		}
	});
	
	var parseJSON = function(data){
	
		var entries = $($.parseXML(data.responseData.xmlString)).find('entry'),
			data = data.responseData.feed,
			listItems = [];
			
		for (var i=startIndex, j=data.entries.length; i < j; i++) {
		
			//console.log(data.entries[i]);
		
			listItems.push( '<li data-type="'+data.entries[i].categories[0]+'" data-date="'+data.entries[i].publishedDate+'"><a href="'+data.entries[i].link+'" title="'+data.entries[i].title+'" target="_blank">'+data.entries[i].title+'</a></li>' );
		}
		
		$( "<ul/>", {
			"class": "news-list",
			html: listItems.join( "" )
			}).appendTo($('#column2'));
		
		
	
	}

}

function onInitialLoad(){

	setActiveTab(0);
	bindNavigation(false);
	sortList('all');	
	bindSortDate();
	loadRSSFeed();
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
