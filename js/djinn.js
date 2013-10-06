$(function() {
		
		var header = $('header'),
			footer = $('footer'),
			headerHtml = [
							'<ul>',
							'<li><a href="page1.html">page1</a></li>',
							'<li><a href="page2.html">page2</a></li>',
							'<li><a href="page3.html">page3</a></li>',
							'<li><a href="page4.html">page4</a></li>',
							'<li><a href="page5.html">page5</a></li>',
							'</ul>'
						].join(''),
						
			footerHtml = [
							'<ul>',
							'<li><a href="page1.html">page1</a></li>',
							'<li><a href="page2.html">page2</a></li>',
							'<li><a href="page3.html">page3</a></li>',
							'<li><a href="page4.html">page4</a></li>',
							'<li><a href="page5.html">page5</a></li>',
							'</ul>'
						].join('');
						
		header.prepend(headerHtml);
		footer.prepend(footerHtml);
		
});