<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
<script src="http://code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<script src="js/masonry.pkgd.min.js"></script>
<script src="js/pinvise.js"></script>
<script>
$(function() {

	var container = $('#container').masonry({
	  columnWidth: 28,
	  itemSelector: '.ablock'
	});
	var prevHtml = '';
	$('.ablock').on('click',function(e){
		e.preventDefault();
		var url = $(this).attr('href');
		var article = $(this).find('article');
		if( $(this).hasClass('active') ){
			//article.html();
			//$(this).append( prevHtml );
			//$(this).removeClass('active');	
		}else{
			prevHtml = article;
			console.log( url+' #story' );
			$( article ).load( url+' #story');
			$('body').ajaxComplete(function(){ FB.XFBML.parse(document.body) });
			$(this).addClass('active');			
		}
		container.masonry();
	});
	
	pinvise.LimitText($('.ablock article p'));
	
	pinvise.showWindowWidth(false);
		
});
</script>