<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="http://www.pinstacular.com/js/pinvise.js"></script>
<script>
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
	pinvise.LimitText($('.ablock article p'));
	pinvise.showWindowWidth(false);
	pinvise.FixPositionAt($('header'), $('.feature-box').outerHeight());
	
	
});
</script>