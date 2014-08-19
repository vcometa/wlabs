/**

pinvise v.01

author: virgilio cometa

This work is licensed under a Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International License

date: 2014

**/

$.support.transition = (function(){
    var thisBody = document.body || document.documentElement,
        thisStyle = thisBody.style,
        support = thisStyle.transition !== undefined || thisStyle.WebkitTransition !== undefined || thisStyle.MozTransition !== undefined || thisStyle.MsTransition !== undefined || thisStyle.OTransition !== undefined;
    return support;
})();

var pinvise = {};

(function( $ ) {

	pinvise = {

	DeviceCheck : function(){
	
		var userAgents = [ 'mozilla', 'msie', 'webkit', 'iphone', 'ipad', 'ipod', 'android', 'blackberry' ],	
			returnAgent = '',			
			isMobile = false,			
			i, j;
			
		for ( i = 0, j = userAgents.length; i < j; i++ ) {			
		  if ( navigator.userAgent.toLowerCase().indexOf( userAgents[i] ) > -1 ) {			  
			  returnAgent = userAgents[i];			  
		  }		  
		}
		
		if( returnAgent == 'iphone' || returnAgent == 'ipad' || returnAgent == 'ipod' || returnAgent == 'android' || returnAgent == 'blackberry' ){		
			isMobile = true;		
		}
		
		return {		
			userAgent: returnAgent,			
			version: navigator.appVersion,			
			isMobile: isMobile
		};
	}, //DeviceCheck ends
	
	SetToLocal: function(storeName, value, stringify) {
	
		if(stringify){
		
			localStorage.setItem(storeName, JSON.stringify(jsonString));
		
		}else{
				
			localStorage.setItem( storeName, value);
		
		}
		
	},//SetToLocal ends

	GetFromLocal: function(storeName, parseToJSON){
	
		if(parseToJSON){		
		
			return JSON.parse(localStorage.getItem(storeName));
			
		}else{

			return localStorage.getItem(storeName);
		 
		}

	}, //GetFromLocal ends
	
	SetToSession: function(storeName, value, stringify){
		
		if(stringify){

			sessionStorage[storeName] = JSON.stringify(value);		
			
		}else{
		
			sessionStorage[storeName] = value;
		
		}

	}, //SetToSession ends

	GetFromSession: function(storeName, parseToJSON){
	
		var value = null;

		if( sessionStorage[storeName] ){
		
			if(parseToJSON){

				value = JSON.parse(sessionStorage[storeName]);
			
			}else{
			
				value = sessionStorage[storeName];
			
			}
		 
		} 
		 
		return value;

	}, //GetFromSession ends

	GetJSONLength: function(c){
	
		var len = 0;
		for(key in c){
			len++;
		}
		return len;
		
	},//GetJSONLength ends

	FormatTitleCase: function(str){
	
		var s = str.replace(/_/g, " ");
		return s.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
		
	}, //FormatTitleCase ends

	FormatCurrency: function(n, currency, decimal) {

		return currency + n.toFixed(decimal).replace(/./g, function(c, i, a) {
			return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "," + c : c;
		});
		
	}, //FormatCurrency ends

	

	

	SetCookie: function(c_name, value, exdays) {
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + exdays);
		var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
		document.cookie = c_name + "=" + c_value;
	},

	GetCookie: function(c_name) {
		var i, x, y, ARRcookies = document.cookie.split(";");
		for (i = 0; i < ARRcookies.length; i++) {
			x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
			y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
			x = x.replace(/^\s+|\s+$/g, "");
			if (x == c_name) {
				return unescape(y);
			}
		}
		return null;
	},

	DeleteCookie: function(c_name) {
		document.cookie = encodeURIComponent(c_name) + "=deleted; expires=" + new Date(0).toUTCString();
	},

	GetWindowDimension: function(){

		var win = $(window);

		return {
		
			width: win.width(),
			height: win.height()
			
		}

	},
	
	CheckExpiration: function(timestamp, durationInWeeks){
		var now = Date.now(),
			maxDuration = (7*durationInWeeks)*24*60*60*1000;
			
		if( now-timestamp > maxDuration ){
			return true;
		}else{
			return false;
		}
		
	},

	UnFixPosition: function( node ){

		var node = $(node);
		
		node.removeClass('fixed');
				
		$(window).off('scroll');

	},

	FixPositionAt: function( node, offsetTop ){
		
		var node = $(node);	

		$(window).on('scroll', function(e){
		
			var winY = $(this).scrollTop();
			
			if ( offsetTop < winY) {
			
				node.addClass('fixed');
			
			} else {
			
				node.removeClass('fixed');
			
			}
			
		});

	},

	LimitText: function(nodeArr){

		var nodeArr = $(nodeArr),
		
			processStr = function( node, str, lim ){
			
				if( str.length > lim ){
				
					var temp = str.substr(0, lim-3)+'...';
					node.text( temp );
				}
			
			}
		
		for( var i=0,j=nodeArr.length;i<j;i++ ){
		
			var node = $(nodeArr[i]),
				
				charLim = parseInt(node.data('char-limit'));
			
			processStr( node, node.text(), charLim );
		
		}

	},

	GetMaxHeight: function( arr ) {

		var arr = $(arr), maxHeight = 0, i;

		arr.each( function() {
		
			var h = $(this).outerHeight();
			
			i = $(this).index();
				
			maxHeight = maxHeight > h ? maxHeight : h;
			
		});
			
		return maxHeight;

	},

	GetMaxLength: function( arr ) {

		var arr = $(arr), maxLen = 0;

		arr.each( function() {
		
			var len = $(this).text().length;
		
			maxLen = maxLen > len ? maxLen : len;
			
		});
		
		return maxLen;

	},

	GetCurrentYear: function(){

		var d=new Date();
		
		return d.getFullYear();

	},

	linkedScrolls: function(dir){

		var linkScroll = $('.linkScroll');
			scrollDriver =  $('.scrollDriver');

		if( dir == 'top'){

			scrollDriver.scroll(function(){
			
				linkScroll.scrollTop($(this).scrollTop()); 
				
			});
			
			$(window).on('load resize', function(e){
			
				linkScroll.scrollTop(0);
			
			});
		
		} else if( dir == 'left'){
		
			scrollDriver.scroll(function(){
				linkScroll.scrollLeft($(this).scrollLeft());
			});
			
			$(window).on('resize', function(e){
			
				linkScroll.scrollLeft(0);
			
			});
		
		
		}

	},

	showWindowWidth: function(show){

		if(show){

			$(document.body).prepend('<div id="sizeindicator" class="sizeindicator"></div>');

			$(window).on('load resize', function(e){
			
				$('#sizeindicator').text($(this).width())
			
			});
		
		}

	},
	
	/*
		NOTE: Modal sample usage
		
		var params = {
			id:'modal',
			width: 350,
			height: 160,
			xOffset:0,
			yOffset:0,
			styles:[],
			classname:'location-modal',
			msg:'<label for="postalcode">Please enter your postal code <br/> for local pricing and incentives</label><div class="input-holder"><input type="text" name="postalcode" value="Postal code" /><button class="dbl-slanted-btn">FIND</button></div><div class="form-error">Please enter a valid postal code</div>',
			delay:0,		NOTE: delay specifies the amount of time for the modal to wait before closing itself
			nodelay:true,   NOTE: nodelay set to false to auto-close the modal after the specified delay
			center:true,
			showoverlay:true,
			addclose:true,
			hideonmouseout:false
		}
		
		modal = Modal(params);
					
	*/
	Modal: function(params){

		if( typeof params != 'undefined'){
		
			var e, posX, posY, styles, modal=[], 
				closebtn ='<button title="Close this" class="modal-close"></button>',
				overlay ='<div class="modal-overlay active" style="height:'+$('body .content').outerHeight()+'"></div>',
				
			positionModal = function(){
				if(!params.center || typeof params.event == 'undefined'){
					e = params.event;
					posX = ( ( (e.clientX != null)?e.clientX:e.touches[0].pageX ) - (params.width/2) )+params.xOffset;
					posY = ( ( (e.clientY != null)?e.clientY:e.touches[0].pageY ) + (params.height/2) )+params.yOffset;
					//styles = 'width:'+params.width+'px; height:'+params.height+'px;top:'+posY+'px;left:'+posX+'px;'+params.styles.join(';');
				} else {
					var win = $(window);
					posX =  (win.width() - params.width)/2;
					posY = (win.height() - params.height)/2;
					//styles = 'width:'+params.width+'px; height:'+params.height+'px;top:'+posY+'px;left:'+posX+'px;'+params.styles.join(';');
				}
				
			}
			positionModal();
			styles = 'width:'+params.width+'px; height:'+params.height+'px;top:'+posY+'px;left:'+posX+'px;'+params.styles.join(';');
			modal = ['<div id="',params.id,'" class="',params.classname,'" style="',styles,'"><div class="modal-content">'];
			
			if(params.addclose){
				modal.push(closebtn);
			}
			modal.push(params.msg);
			modal.push('</div></div>');
			if(params.showoverlay){
				modal.push(overlay);
			}
			
			var newModal = $('#'+params.id),
				newOverlay = $('.modal-overlay'),
				closeModal = function(){
					newModal.removeClass('active');
					newOverlay.removeClass('active');
					if(params.donotpersistcontent){
						newModal.remove();
						newOverlay.remove();
					}
				},
				bindModal = function(){
					var closebtn = $(newModal.find('.modal-close'));					
					closebtn.on('click',function(e){
						closeModal();
					});
				}
				
			if(params.hideonmouseout){
				var node = newModal;
				if( typeof params.eventsrc != 'undefined'){
					node = $(params.eventsrc);
				}
				node.on('mouseout',function(e){
					closeModal();
				});
			}
			
			if(params.hideonscroll){			
				$(document).on('scroll touchmove',function(e){
					closeModal();
				});			
			}
			
			if( newModal.length <= 0){
				$(document.body).prepend(modal.join(''));
				newModal = $('#'+params.id),
				newOverlay = $('.modal-overlay');
				
				if(params.addclose){
					bindModal();
				}
				if( !params.nodelay ){
				
					setTimeout(function(){ closeModal(); }, params.delay);			
				}
				
			} else{
				if(!params.center || typeof params.event == 'undefined'){
					positionModal();
					newModal.css({'top':posY,'left':posX});
				}
				
				if(params.showoverlay){
					//newOverlay.addClass('active');
				}
			}
			return {
				modal:newModal,
				overlay:newOverlay
			};
		}

	},
	
	
	ToggleInputValue: function(node){

		var input = $(node);
		var default_value = input.val();

		input.focus(function() {
		   if(input.val() == default_value) input.val("");
		}).blur(function(){
			if(input.val().length == 0) input.val(default_value);
		});
	},

	ShowAllDD: function(target){
		if( typeof target != undefined){
			var node = $(target),
				showAll = node.data('show-all'),
				showAlt = node.data('show-all-alt'),
				boolShow = false,
				selector = node.data('dd-selector'),
				sel = null;
				
			if(typeof showAll != undefined){
				var showAllBtn = $('<button class="show-all"><span class="plus"></span>'+showAll+'</button>');
				node.append(showAllBtn);
				
				var showState = function(node){
					$(node).html('<span class="plus"></span>'+showAll);
					boolShow = false;
					sel = $(selector +'.active');
				}
				
				var hideState = function(node){
					$(node).html('<span class="minus"></span>'+showAlt);
					boolShow = true;
					sel = selector+':not(.active)';
				}
				
				showAllBtn.on('click',function(e){
					
					if(boolShow){
						showState( $(this) );
					}else{
						hideState( $(this) );
					}
					
					$( sel ).trigger('click');
					
				});
				
				$(selector).on('click',function(e){
					
					var activeCnt = $(selector +'.active').length;
				
					if( $(this).hasClass('active') ){
						
						hideState( $('.show-all') );				
					}
					
					if( !$(this).hasClass('active') && activeCnt <= 0 ){
						showState( $('.show-all') );
					}
				});
			}
		}
	},

	Tabs: function(){

		var tab = {
				me:$('.tab-control'),
				handle: $('.tab-control .tab-handle'),
				content: $('.tab-control .tab-content')
			};
			
		tab.handle.on('click', function(e){
			var target = $(this).data('target-tab');
			tab.content.removeClass('active');
			$(tab.me.find('.'+target)).addClass('active');
			tab.handle.removeClass('active');
			$(this).addClass('active');
		});

	},


	PostalCodeValidation: function(postalcode){
		
		var regex = new RegExp(/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i);

		if (regex.test(postalcode)){
			return true;
		} else {
			return false;
		}
	},

	RebindDropdown: function(callback){
		var callback = callback;
		$('.drv .as-dropdown ul li').off('click');
		$('.drv .as-dropdown').each( function(){

			var dd = $(this),
				ddBtn = $(dd.find('button')),
				ddBtnSpan = $(ddBtn.find('span')),
				ddBtnTxt = $(ddBtn.find('.dd-text')),
				ddUL = $(dd.find('ul')),
				ddULLI = $(dd.find('ul li'));
						
			ddULLI.on('click',function(event){
				event.stopImmediatePropagation();
				var val = $(this).data('value'),
					ul = $(this).parent();
					dropd = ul.parent();
				dd.data('value', val);
				ddBtnTxt.text(val);
				ul.slideUp();			
				ddBtn.addClass('selected');
				setTimeout(function(){checkDDValues();},800);
				//listItemUpdate($(this), event, callback);
			
				if(typeof unhaggleJSON != 'undefined'){
					unhaggleJSON[ul.data('type')] = {
						'value':val,
						'target':dropd.data('target'),
						'limit':dropd.data('limit'),
						'search-field':dropd.data('search-field'),
						'sort':dropd.data('sort'),
						'default-selection':dropd.data('default-selection')
					}
				}	
				if(typeof callback != 'undefined'){
					callback(unhaggleJSON, event, ul.data('type'));
				}
			});
			
		
		});
	},

	ScrollTo: function(scrollTo){
		
		//$('window').animate({ scrollTop: scrollTo+'px' });
				$(window).scrollTop(scrollTo);
		
	},

	Dropdown: function(callback){
		var callback = callback;
		
		$('.drv .as-dropdown').each( function(){
			
			var ddAll = $(this),
				ddAllBtn = $(ddAll.find('button')),
				ddAllBtnSpan = $(ddAll.find('button span')),
				ddAllBtnTxt = $(ddAll.find('button .dd-text')),
				ddAllUL = $(ddAll.find('ul')),
				ddAllULLI = $(ddAll.find('ul li'));
				
			var hideDD = function(){
				ddAllUL.hide();
				ddAllBtn.removeClass('active');
			}
				
			var pushData = function(dropd, val, node, callback, event){
				var keyvalue = [],
					type = $(node).data('type');
				keyvalue.push(type);
				keyvalue.push(dropd);
				keyvalue.push(val);
				
				if(typeof callback != 'undefined'){
					callback(keyvalue, event, type);				
				}
				
			}

			var listItemUpdate = function(node, event, callback){
				var item = $(node),				
					val = item.data('value'),
					btn = $(item.parent().siblings('button')),
					list = $(item.parent()),
					dropd = $(item.parent().parent());
											
				if( val != ''){
					btn.addClass('selected');
				}else{
					btn.removeClass('selected');
				}			
				dropd.attr('data-value', val);
				dropd.removeClass('to-front');
				list.removeClass('active');
				btn.removeClass('active');				
				pushData(dropd, val, $(item.parent()), callback, event);
			};	
			
			var setValue = function(){
				var val = ddAll.data('value');
				if(val != ''){
					$(ddAllBtn.find('.dd-text')).text(val);
					$( ddAllUL.find('li[data-value="'+String(val).replace(/"/g,'')+'"]') ).addClass('selected');
					ddAllBtn.addClass('selected');
					pushData(ddAll, val, ddAllUL, callback);
				}
			}
			
			setValue();
			var t;
			var btnClick = function(node){
				var btn = $(node),
					ddList = $( btn.siblings('ul')),
					ddItem = $( ddList.children() );
					dd = $(btn.parent()),
					id = dd.attr('id');
					
				clearTimeout(t);	
				/*$('.drv .as-dropdown ul.active').hide().removeClass('active');
				$('.drv .as-dropdown').removeClass('to-front');
				$('.drv .as-dropdown button').removeClass('active');*/
				$('.drv div:not(#'+id+').as-dropdown ul.active').hide().removeClass('active');
				$('.drv div:not(#'+id+').as-dropdown').removeClass('to-front');
				$('.drv div:not(#'+id+').as-dropdown button').removeClass('active');
				
				t = setTimeout(function(){			
						if(ddList.hasClass('active')){
							ddList.removeClass('active').hide();
							dd.removeClass('to-front');
							btn.removeClass('active');
						}else{
							ddList.addClass('active').slideDown('fast');
							dd.addClass('to-front');
							btn.addClass('active');
						}
					},0);
				
			}
			ddAllBtn.on('click', function(event){
				//event.stopImmediatePropagation();*/
				btnClick($(this));
			});
			
			ddAllBtnSpan.on('click', function(event){
				event.stopImmediatePropagation();
				$($(this).parent()).trigger('click');
				//btnClick($(this));
			});
			
			ddAllBtnTxt.on('click', function(event){
				event.stopImmediatePropagation();
				$($(this).parent()).trigger('click');
				//$($(this).siblings('button')).trigger('click');
			});
			
			ddAllULLI.on('click',function(event){
				/*var scrollTo = $($(this).parent().parent()).offset().top;			
				ScrollTo(scrollTo);*/
				listItemUpdate($(this), event, callback);
				
			});
			
			$(document).on('click',function(event){
				if( !$($(event.target).parent()).hasClass('as-dropdown') ){
					hideDD();
				}
			});
			
		});//each ends
		
	},

	GeoCoder: function(callback){
		var err='', geocoder = new google.maps.Geocoder(), locJSON={};
		
		if (navigator.geolocation) {
			
			navigator.geolocation.getCurrentPosition(function(position){
				
				var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				geocoder.geocode({'latLng': latlng}, function(results, status) {
				  if (status == google.maps.GeocoderStatus.OK) {
					var loc = results[0];
					locJSON = {
								location:{
									latitude:position.coords.latitude,
									longitude:position.coords.longitude,
									city: loc.address_components[4].long_name,
									province: loc.address_components[6].short_name,
									postalcodeprefix: loc.address_components[8].short_name
								}
							};
					callback(locJSON);
				  } else {
					err = "Geocoder failed due to: " + status;
					callback(err);
				  }
				});
				
			});
				
		} else {
			err = "Geolocation is not supported by this browser.";
			callback(err);
		}
	},
	
	FinalEventCall: (function () {
		var timers = {};
		return function (callback, ms, uniqueId) {
			if (!uniqueId) {
			  uniqueId = "finalEventTimer";
			}
			if (timers[uniqueId]) {
			  clearTimeout (timers[uniqueId]);
			}
			timers[uniqueId] = setTimeout(callback, ms);
		};
	})(),
	
	Layout: function(options){

		var item = $(options.itemSelector),
			container = $(options.containerSelector),
			colCount = function(){			
				var w = pinvise.GetWindowDimension().width;						
				if( w > 970 ){
					return options.columnCount[0];
				}else if( w > 480 && w <= 970){
					return options.columnCount[1];
				}else{
					return options.columnCount[2];
				}
			},
			count = colCount(),			
			itemW = (container.width()/count)+( (options.itemBorderWidth*2)-(options.itemGutterWidth)),		
			z = 0,
			setGrid = function(){
						
				rowCount = count-1;
				item.css({'width':itemW});
				for( var i=0, j=item.length;i<j;i++){
					var t = i-count,
						o = $(item[i]),
						p = $(item[t]),
						x = y = 0;						
					if( i>rowCount ){
					
						rowCount+=count;				
						x = 0;
						z = 0;
					}
					x = (itemW*z)+( (options.itemBorderWidth*z)+(options.itemGutterWidth*z));
					z++;			
					if(t>=0){
						//y = o.offset().top+p.offset().top+p.innerHeight()-45;
						y = p.offset().top+p.outerHeight(true);						
						
					}else{
						y = 0;
					}
									
					o.css({'left':x,'top':y});
				}
			},
			resetX = function(){
				z = 0;
				count = colCount();
				item.css({'left':0,'top':0});
				itemW = (container.width()/count)+( (options.itemBorderWidth*2)-(options.itemGutterWidth));
				setGrid();
			};
		
		$(window).on('load resize',function(e){
			if( e.type == 'resize'){
				pinvise.FinalEventCall(resetX, 100, 'resizeTimer');
			}else{
				setGrid();
			}
		});	
		
		
		
	}
	

}

// End of closure.
})( jQuery );






$(function() {
	
	if( $('div[data-getuserloc=true]').length > 0){
		var cookie = GetCookie('userlocation'),
			callback = function(json){
				$('div[data-getuserloc=true]').text( JSON.stringify(json) );
				SetCookie('userlocation', JSON.stringify(json), 30);
				cookie = GetCookie('userlocation');
				console.log( cookie );
			}
		if( cookie == null ){
			GeoCoder(callback);
		}
		
	}
	
	if( $('div[data-layout=true]').length > 0){
	
		pinvise.Layout($('div[data-layout=true]').data('layout-options'));
	}
	
});