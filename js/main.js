$(function() {
	var params = {
		id:'modal',
		width: 800,
		height: 800,
		xOffset:0,
		yOffset:0,
		styles:[],
		classname:'article-modal',
		msg:'<iframe></iframe>',
		delay:0,	
		nodelay:true,
		center:true,
		showoverlay:true,
		addclose:true,
		hideonmouseout:false,
		donotpersistcontent:true
	};
	
	$('.ablock').on('click',function(e){
		var url = $(this).data('href');
		document.location.href = url;
	});
	$('.social-media a').on('click',function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		console.log(url);
		window.open(url, 'facebook');
		return false;
	});
	$('.search-toggle').on('click',function(e){
		
		$('.search-box').toggleClass('active');
		$(this).toggleClass('active');
	});
	
	$('.mobile-menu-toggle').on('click',function(e){
		e.stopImmediatePropagation();
		$('header').toggleClass('active');
	});
	pinvise.LimitText($('.ablock article p'));
	pinvise.showWindowWidth(false);
	pinvise.FixPositionAt($('header'), 0);
	
	
});