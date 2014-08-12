<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/pinvise.js"></script>
<script>
$(function() {

	$('#container').masonry({
	  columnWidth: 28,
	  itemSelector: '.ablock'
	});

	var params = {
			id:'modal',
			width: 800,
			height: 600,
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
		e.preventDefault();
		var url = $(this).attr('href');
		console.log(url);
		params.event = e;		
		params.msg = '<div id="article-holder"></div>';		
		var modal = pinvise.Modal(params);
		$( "#article-holder" ).load( url);
		$('body').ajaxComplete(function(){ FB.XFBML.parse(document.body) });
		
	});
	
	pinvise.LimitText($('.ablock article p'));
	
	pinvise.showWindowWidth(false);
		
});
</script>