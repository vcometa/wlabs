<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="js/pinvise.js"></script>
<script>
$(function() {

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
		params.msg = '<iframe src="'+url+'"></iframe>';
		
		var modal = pinvise.Modal(params);
		
	});
	
	pinvise.LimitText($('.ablock article p'));
		
});
</script>