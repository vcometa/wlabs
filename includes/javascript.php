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
		//e.preventDefault();
		var url = $(this).data('href');
		//console.log(url);
		/*params.event = e;	
		params.msg = '<div id="article-holder"></div>';	
		var modal = pinvise.Modal(params);
		$( "#article-holder" ).load( url, function(e){			
			modal.modal.addClass('active');
			setTimeout(function(){modal.overlay.addClass('active');},1000);
			FB.XFBML.parse(document.body)
		});*/
		document.location.href = url;
		//$('body').ajaxComplete(function(){  });
	});
	
	$(window).on('load scroll', function(){
		setTimeout(function(){$('.slideIn_hdr').addClass('hidden')},1200);
	});
	
	pinvise.LimitText($('.ablock article p'));
	pinvise.showWindowWidth(false);
	
	
});
</script>