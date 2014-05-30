//This is only for test - 
//Displaying Window Width 
jQuery(document).ready(function(){
		jQuery('body').prepend('<div id="windowWidth"></div>');
	})
	jQuery(window).resize(function() {
		jQuery('#windowWidth').html(jQuery(window).width());
	});