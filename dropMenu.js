/** dropMenu.js

author: virgilio cometa

**/

(function ( $ ) {

	$.dropMenu = function(params) {
	
		var dropMenu = {};
			dropMenu.params = params;
			
		var header = $(dropMenu.params.header),			
			menu = $(dropMenu.params.menu),
			sub = $(dropMenu.params.submenu)
			menuTimer = null,
			delay = dropMenu.params.delay;
			
		function init(){
		
			var toggleMenu = function(obj, show){
				var subMenu = $($(obj).siblings());
				if( subMenu.length > 0 ){
					if( show ){	
						sub.hide();
						subMenu.show().addClass('on');						
					}else{
						sub.removeClass('on').show();
					}	
				} else {
					sub.removeClass('on').show();
				}				
			}		
			menu.on('mouseenter', function(e){	
				clearTimeout(menuTimer);
				toggleMenu( this, true);				
			});
			menu.on('mouseleave', function(){
				var target = this;
				menuTimer = setTimeout(function(){toggleMenu( target, false)}, delay);			
			});
			sub.on('mouseenter', function(){
				clearTimeout(menuTimer);			
			});
			sub.on('mouseleave', function(){
				var target = $($(this).siblings());
				menuTimer = setTimeout(function(){toggleMenu( target, false)}, delay);			
			});
		
		}
		
		init();
		
	};
	
}( jQuery ));

(function ( $ ) {

	var dropMenuParams = 
	{
		header: 'header .header-nav',
		menu: 'header .header-nav > ul > li.menu > a',
		submenu: 'header .header-nav > ul > li.menu > .submenu',
		delay: 500
	};

	$.dropMenu(dropMenuParams);
	
}( jQuery ));