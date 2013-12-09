/*

	uxToolSet build.0.1
	
	uxToolSet is Copyright © 2013-2018 Virgilio Cometa. It is freely distributable under the terms of an MIT-style license.

    Copyright (c) 2013-2018 Virgilio Cometa

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function ( $ ) {

	$.fn.uxToolSet = function(params) {
		
		/*
		* params: width, height, barColor, barHeight, tabWidth, tabHeight, leftColor, rightColor
		*/

		function rangeSlider( objectSelector, outputSelector ){

			var r = new Object();
				r.range = $(objectSelector);
				r.output = $(outputSelector);
				r.type = r.range.data('type');
				
				
			var html = '<button class="left-handle" data-type="min"></button><button class="right-handle" data-type="max"></button><div class="cover-left"></div><div class="cover-right"></div><div class="slider-bar"></div>';	
			
			if( r.type == 'single'){
			
				html = '<button class="right-handle" data-type="max"></button><div class="cover-right"></div><div class="slider-bar"></div>';
				
			}
			
			$(html).appendTo(r.range);		
			r.button = $( r.range.find('button') );
			r.sBar = $(r.range.find('.slider-bar'));
			r.coverLeft = $( r.range.find('.cover-left'));	
			r.coverRight = $( r.range.find('.cover-right'));
			r.target = null;
			r.dragging = false;
			r.rLim = r.sBar.outerWidth() - r.button.outerWidth();
			r.outerLim = r.sBar.outerWidth() + r.button.outerWidth();
			r.minVal = parseInt( r.range.data('min') );
			r.maxVal = parseInt( r.range.data('max') );
			r.sMinVal = parseInt( r.range.data('start-min') );
			r.sMaxVal = parseInt( r.range.data('start-max') );
			r.retMin = r.minVal;
			r.retMax = r.maxVal;
			r.lastPos = 0;
			r.interval = 0.01;
			
			var getPos = function( val ){
				
				val = (val/r.maxVal)*r.rLim;
			
				return (val + document.body.scrollLeft - document.body.clientLeft)-r.button.width();
			
			}
			
			
			
			if( r.sMinVal && r.sMaxVal){
			
				var lPos = getPos(r.sMinVal),
					rPos =  getPos(r.sMaxVal);
			
				$(r.button[0]).css('left', lPos );
				r.coverLeft.width( lPos );
				
				$(r.button[1]).css('left', rPos );
				r.coverRight.width( r.rLim - rPos );
				
				r.retMin = r.sMinVal;
				r.retMax = r.sMaxVal;
				
				r.output.val( r.sMinVal+' to '+ r.sMaxVal );
			
			} else if( !r.sMinVal && r.sMaxVal){
			
				var rPos =  getPos(r.sMaxVal);
				
				$(r.button[0]).css('left', rPos );
				r.coverRight.width( r.rLim - rPos );
				
				r.retMax = r.sMaxVal;
				
				r.output.val( r.minVal+' to '+ r.sMaxVal );
			
			} else {	
			
				r.output.val( r.minVal+' to '+ r.maxVal );	
			
			}
			
			r.button.on('mousedown touchstart', function(e){
			
				e.preventDefault();
				
				r.target = $( this );
				
				startX = (e.clientX != null)?e.clientX:event.touches[0].pageX;
						
				if( startX <= r.outerLim && startX >= 0){
				
					r.dragging = true;
				
				}
			
			});

			$(document).on('mousemove touchmove', function(e){
			
				var x = (e.clientX != null)?e.clientX:event.touches[0].pageX;
			
				if( r.dragging && x <= r.outerLim && x >= 0){
				
					e.preventDefault();
				
					var pos = ((x + document.body.scrollLeft - document.body.clientLeft)-r.button.width())<0?0:(x + document.body.scrollLeft - document.body.clientLeft)-r.button.width(),
					
						isMin = ( r.target.data('type') == 'min' )?true:false,
						
						offset = ( r.type == 'double')?( r.maxVal * r.interval ):0,
						
						lTemp = r.retMin+offset,
						
						rTemp = r.retMax-offset;
						
					if( (r.retMin+offset < r.retMax-offset) ||  ( isMin && r.lastPos > pos ) || ( !isMin && r.lastPos < pos ) ){
							
						if( pos <= r.rLim ){
							
							var retVal = Math.round(r.maxVal * (pos/r.rLim));
						
							r.target.css('left', pos );
								
							if ( isMin ){
							
								r.retMin = retVal;
								
								r.coverLeft.width( pos );
								
							} else {
							
								r.retMax = retVal;
								
								r.coverRight.width( r.rLim - pos );
							
							}
							
							r.lastPos = pos;
						
						} else if( pos > r.rLim ){				
							
							r.retMax = r.maxVal;
							
							r.target.css('left', r.rLim );
						
						}
						
						r.output.val( r.retMin+' to '+ r.retMax );				
				
					}
				
				}
			
			});

			$(document).on('mouseup touchend', function(){
			
				if( r.dragging ){
				 
					r.dragging = false;
				
				}
			
			});

		}

		function addCSS(strCSS) {
			var node = document.createElement('style');
			node.innerHTML = strCSS;
			document.head.appendChild(node);
		}
		
		function getParams(){
		
			var defaultParams = {'width':'300px', 'height':'30px', 'barColor':'#333', 'barHeight':'10px', 'tabWidth':'10px', 'tabHeight':'30px', 'leftColor':'red', 'rightColor':'blue'};
		
			if(params != null){
				
				for (var key in defaultParams) {
					
					if( params[key] != defaultParams[key] ){
					
						if( params[key] != null ){
						
							defaultParams[key] = params[key];
						}
					}
				}
			
				return defaultParams;
			
			}else{
			
				return defaultParams;
			
			}
		
		}

		function init(){
		
			params = getParams();			

			var rangeArr = $('.range-slider'),
				rangeCSS = "@media all{.range-slider{position:relative;width:"+params.width+";height:"+params.height+";overflow:hidden}.range-slider .slider-bar{position:absolute;top:10px;left:0;background:"+params.barColor+";width:100%;height:"+params.barHeight+"}.range-slider .cover-left,.range-slider .cover-right{position:relative;margin:10px auto;float:left;z-index:1;background:#ccc;width:10px;height:10px}.range-slider .cover-right{float:right}.range-slider button{position:absolute;top:0;z-index:9;width:"+params.tabWidth+";height:"+params.tabHeight+";border:0;padding:0;margin:0;cursor:pointer;outline:0}.range-slider .left-handle{left:0;background:"+params.leftColor+"}.range-slider .right-handle{right:0;background:"+params.rightColor+"}}@media all and (max-width:767px){.range-slider button{width:44px;height:44px}}";
				
			if( rangeArr.length > 0){
			
				addCSS(rangeCSS);
			
				for ( var i=0, j=rangeArr.length; i<j; i++ ) {
				
					var id = '#'+$(rangeArr[i]).attr('id'),
						outputID = '#'+$(rangeArr[i]).data('output');
						
					rangeSlider( id, outputID );
				
				}
			
			}

		}

		init();
		
		return this;

	};

}( jQuery ));