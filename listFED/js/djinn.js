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
				listItems.push( '<li><a id="' + items.id + '" href="'+items.src+'" title="'+items.description+'" >' + items.title + '</a></li>' );
			});
			
		$(['<navigation><h2 id="menu-title" class="active">', data.navigation.title,'</h2><ul class="nav-list">',listItems.join(''),'</ul></navigation>'].join('')).appendTo(header).clone().appendTo(footer);
	
		onInitialLoad();
	
	});

}

function setActiveTab( index ){
		
	var arr = $('.lf header ul li a'),
	
		sameTab = false;
	
	for(var i=0, j=arr.length;i<j;i++){
	
		if( $(arr[i]).hasClass('active') ){
		
			if( i == index ){
			
				sameTab = true;
			
			}
		
		}
	
	}
	
	if( !sameTab ){
	
		$(arr).removeClass('active');
		
		$(arr[index]).addClass('active');
	
	}
	
	return sameTab;
	
};

function loadPageList(pageType){

	var arr = [
				[
					"TopNews",
					"http://feeds.reuters.com/reuters/topNews"
				],
				[
					"Business",
					"http://feeds.reuters.com/reuters/businessNews"
				],
				[
					"Entertainment",
					"http://feeds.reuters.com/reuters/entertainment"
				],
				[
					"Health",
					"http://feeds.reuters.com/reuters/healthNews"
				],
				[
					"Lifestyle",
					"http://feeds.reuters.com/reuters/lifestyle"
				],
				[
					"Money",
					"http://feeds.reuters.com/news/wealth"
				],
				[
					"People",
					"http://feeds.reuters.com/reuters/peopleNews"
				],
				[
					"Politics",
					"http://feeds.reuters.com/reuters/politicsNews"
				],
				[
					"Science",
					"http://feeds.reuters.com/reuters/scienceNews"
				],
				[
					"Sports",
					"http://feeds.reuters.com/reuters/sportsNews"
				],
				[
					"Technology",
					"http://feeds.reuters.com/reuters/technologyNews"
				],
				[
					"World",
					"http://feeds.reuters.com/reuters/worldNews"
				]
		
			];
		
		var count = arr.length/4;
		for( var i=0,j=arr.length; i<j; i++ ){
		
			//console.log(arr[i][0]);
		
			loadRSSFeed(arr[i][1], 10, 0, 'pre'+arr[i][0], 'column'+( i%count+1 ), true);
			
			loadRSSFeed(arr[i][1], 100, 0, 'full'+arr[i][0], 'col'+arr[i][0], true);
			
		}

}

function sortByType( listType ) {
	
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

function bindNavigation(colWidth){

	var nav = $('navigation ul li a'),
	
		mainBody = $('.lf .main-body');	
	
	nav.on('click', function(event){
	
		event.preventDefault();
		
		var index = $($(this).parent()).index(),
		
			tab = setActiveTab( index ),
			
			//colWidth = ( $(window).outerWidth() < 1200 )? $(window).outerWidth():$( mainBody.find('.column') ).width();
			
			colWidth = $( mainBody.find('.column') ).width();
		
		if( !tab ){
		
			console.log( colWidth );
		
			mainBody.css({'margin-left':'-'+( colWidth * index )+'px'});
		
		}		
	
	});

}

function bindSortDate(){

	var sortObjArr = $('.sorter'),
	
		sortList = function(selector, button){

			var mainList = $(selector),
				listParent = $(mainList.parent());

			$(button).on('click', function(){
			
				var type = $(this).data('sort');
				
				mainList.sort(function(a,b){			
						a = new Date( $(a).data('date') );
						b = new Date( $(b).data('date') );
						
						if( type == 'ascending' ){
				
							return a-b
				
						} else {
						
							return b-a
						
						}
						
					}).appendTo(listParent);
				
				
			});
		
		}
		
	for(var i=0, j=sortObjArr.length;i<j;i++){
	
		sortList($(sortObjArr[i]).data('target')+' li', $(sortObjArr[i]).find('button.sort'))
	
	}

}

function windowWidth( showLog ){

	var log = $('.logWindow'),
	
		resize = function(){
		
			var winW =  $(this).width();
			
			if( showLog ){
			
				log.show().text( 'Window Width: '+ winW +'px' );
			
			} else {
			
				log.hide();
			
			}
			if( winW < 1200 ){
			
				$('.lf .main-body .column').width( winW );
				
				$('.lf navigation').width(winW);
				
				$('.lf .viewport').width(winW);
			
			}
			
		
		}
		
	resize();
	
	$(window).on('resize', function(){
	
		resize();
		
	});

}

function loadRSSFeed(url, count, startIndex, listID, parentID, addSort){

	var parentNode = $('#'+parentID);
	
	if( parentNode.children().length <= 1 ){
			
		$.ajax({
			url: 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&output=json_xml&num='+(count + startIndex)+'&callback=?&q=' + encodeURIComponent(url),
			dataType: 'json',
			success: function(data) {
			  parseJSON(data, listID, parentID);
			}
		});
		
		var parseJSON = function(data){
		
			var entries = $($.parseXML(data.responseData.xmlString)).find('entry'),
				data = data.responseData.feed,
				listItems = [];
				
				//console.log(data);
			for (var i=startIndex, j=data.entries.length; i < j; i++) {
			
				listItems.push( '<li data-type="'+data.entries[i].categories[0]+'" data-date="'+data.entries[i].publishedDate+'"><a href="'+data.entries[i].link+'" title="'+data.entries[i].title+'" target="_blank">'+data.entries[i].title+'</a></li>' );
			}
			
			var html = '<article class="article-list" id="article'+listID+'"><h2>'+data.title.replace('Reuters: ','').replace('News','').replace('Top', 'Top Headlines')+'</h2>';
			
			if(	addSort	){
			
				html += '<div class="sorter" data-target="#list'+listID+'">sort by date<button class="sort asc" data-sort="ascending">a</button> | <button class="sort desc" data-sort="descending">d</button></div>';
			
			}
			
			html += '<ul id="list'+listID+'" class="news-list">'+listItems.join('')+'</ul></article>';
			
			$(html).appendTo(parentNode);
			
			if(	addSort	){
				bindSortDate();
			}
			
		}
	}
	
	return true;

}

function onInitialLoad(){

	setActiveTab(0);	
	loadPageList('all');
	bindNavigation(false);
	windowWidth(false);
	
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
