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

	//console.log(pageType);
	
	switch (pageType){
	
		case 'news':
		
			loadRSSFeed('http://feeds.reuters.com/reuters/topNews', 50, 0,'TopNews', 'column5', true);
			break;
		
		case 'business':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/businessNews', 50, 0,'Business', 'column5', true);
			break;
			
		case 'entertainment':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/entertainment', 50, 0,'Entertainment', 'column5', true);
			break;
		
		case 'health':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/healthNews', 50, 0,'Health', 'column5', true);
			break;
			
		case 'lifestyle':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/lifestyle', 50, 0,'Lifestyle', 'column5', true);
			break;
			
		case 'money':
	
			loadRSSFeed('http://feeds.reuters.com/news/wealth', 50, 0,'Money', 'column5', true);
			break;
			
		case 'people':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/peopleNews', 50, 0,'People', 'column5', true);
			break;
			
		case 'politics':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/politicsNews', 50, 0,'Politics', 'column5', true);
			break;
			
		case 'science':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/scienceNews', 50, 0,'Science', 'column5', true);
			break;
			
		case 'sports':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/sportsNews', 50, 0,'Sports', 'column5', true);
			break;
			
		case 'technology':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/technologyNews', 50, 0,'Technology', 'column5', true);
			break;
			
		case 'world':
	
			loadRSSFeed('http://feeds.reuters.com/reuters/worldNews', 50, 0,'World', 'column5', true);
			break;

		default:
		
			var arr = [
					[
						"homeTopNews",
						"http://feeds.reuters.com/reuters/topNews"
					],
					[
						"homeBusiness",
						"http://feeds.reuters.com/reuters/businessNews"
					],
					[
						"homeEntertainment",
						"http://feeds.reuters.com/reuters/entertainment"
					],
					[
						"homeHealth",
						"http://feeds.reuters.com/reuters/healthNews"
					],
					[
						"homeLifestyle",
						"http://feeds.reuters.com/reuters/lifestyle"
					],
					[
						"homeMoney",
						"http://feeds.reuters.com/news/wealth"
					],
					[
						"homePeople",
						"http://feeds.reuters.com/reuters/peopleNews"
					],
					[
						"homePolitics",
						"http://feeds.reuters.com/reuters/politicsNews"
					],
					[
						"homeScience",
						"http://feeds.reuters.com/reuters/scienceNews"
					],
					[
						"homeSports",
						"http://feeds.reuters.com/reuters/sportsNews"
					],
					[
						"homeTechnology",
						"http://feeds.reuters.com/reuters/technologyNews"
					],
					[
						"homeWorld",
						"http://feeds.reuters.com/reuters/worldNews"
					]
			
				];
			
			var count = arr.length/4;
			for( var i=0,j=arr.length; i<j; i++ ){
			
				loadRSSFeed(arr[i][1], 10, 0,arr[i][0], 'column'+( i%count+1 ), true);
				
			}

			break;
	
	}
	if( pageType == 'all'){
		$('.full').empty();
		$('.quarter').show();
		$('.full').hide();
	
	} else {
	
		$('.quarter').hide();
		$('footer').hide();
		$($('.full article')[0]).remove();
		$('.full').show();
		setTimeout(function(){$('footer').show()}, 600);
	
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

function bindNavigation(goOnBlur){

	var nav = $('.navigation li a'),
		headerMenu = $('header h2');
	
	nav.on('click', function(event){
	
		event.preventDefault();
		
		var tab = setActiveTab( $($(this).parent()).index() );
		
		if( !tab){
		
			loadPageList( $(this).attr('href').replace('?page=','') );
		
		}		
	
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
				
		$('.lf .main-body').css({'width':pWidth,'margin-left':mLeft});
		
		$('.lf footer').css({'width':fWidth,'margin-left':mLeft})
	
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
				
				$('.lf .main-body').css({'width':'100%','margin-left':'0'});
				
				$('.lf footer').css({'width':'98.75%','margin-left':'0'});				
			
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

function windowWidth(){

	var log = $('.logWindow'),
	
		resize = function(){
		
			var w =  $(this).width();
			
			if( w > 768 ){
			
				var w1 = w>1024?1024:w,
					offset = 28,
					w2 = Math.round(((w1 - ($('aside.right-rail').outerWidth() + offset ))/w1)*100)+'%';
	
				log.text( w +'px' );
				
				$('.lf .main-article').width(w2);
			} else {
			
				$('.lf .main-article').removeAttr('style');
			
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
			
			/*$( '<ul />', {
				"class": "news-list",
				html: listItems.join( "" )
				}).appendTo(parentNode).attr('id', listID);*/
			
			if(	addSort	){
				bindSortDate();
			}
			
		}
	}
	
	return true;

}

function onInitialLoad(){

	setActiveTab(0);
	//bindNavigation(false);
	loadPageList('all');	
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
