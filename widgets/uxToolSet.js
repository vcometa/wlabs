/*

	uxToolSet build.0.1
	
	uxToolSet is Copyright © 2013-2018 Virgilio Cometa. It is freely distributable under the terms of an MIT-style license.

    Copyright (c) 2013-2018 Virgilio Cometa

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function ( $ ) {

	$.fn.uxToolSet = function() {

		function addCSS(strCSS) {
			var node = document.createElement('style');
			node.innerHTML = strCSS;
			document.head.appendChild(node);
		}
		
		function getParams(defaultParams, params){
			
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
		
		/** Range Slider begins **/

		function setRangeSlider(){
		
			var defaultParams = {'width':'300px', 'height':'30px', 'barHeight':'10px', 'tabWidth':'10px', 'tabHeight':'30px', 'leftHandle':'red', 'rightHandle':'blue', 'barColor':'#333','barBackground':'#ccc', 'callback':function(){alert('here')} },
			
			rangeSlider = function( objectSelector, outputSelector ){

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
						
						uxRangeParams.callback();
					
					}
				
				});

			};
			
			if (typeof uxSliderRangeParams === 'undefined') {
			
				uxRangeParams = getParams(defaultParams, {});
			
			} else {
		
				uxRangeParams = getParams(defaultParams, uxSliderRangeParams);
				
			}

			var rangeArr = $('.ux-range-slider');
			
			if( rangeArr.length > 0){
			
				var	rangeCSS = "@media all{.ux-range-slider{position:relative;width:"+uxRangeParams.width+";height:"+uxRangeParams.height+";overflow:hidden}.ux-range-slider .slider-bar{position:absolute;top:10px;left:0;background:"+uxRangeParams.barColor+";width:100%;height:"+uxRangeParams.barHeight+"}.ux-range-slider .cover-left,.ux-range-slider .cover-right{position:relative;margin:10px auto;float:left;z-index:1;background:"+uxRangeParams.barBackground+";width:10px;height:10px}.ux-range-slider .cover-right{float:right}.ux-range-slider button{position:absolute;top:0;z-index:9;width:"+uxRangeParams.tabWidth+";height:"+uxRangeParams.tabHeight+";border:0;padding:0;margin:0;cursor:pointer;outline:0}.ux-range-slider .left-handle{left:0;background:"+uxRangeParams.leftHandle+"}.ux-range-slider .right-handle{right:0;background:"+uxRangeParams.rightHandle+"}}@media all and (max-width:767px){.ux-range-slider button{width:44px;height:44px}}";
					
				if( rangeArr.length > 0){
				
					addCSS(rangeCSS);
				
					for ( var i=0, j=rangeArr.length; i<j; i++ ) {
					
						var id = '#'+$(rangeArr[i]).attr('id'),
							outputID = '#'+$(rangeArr[i]).data('output');
							
						rangeSlider( id, outputID );
					
					}
				
				}
			
			}

		}
		
		/** Range Slider ends **/
		
		/** Accordion begins **/
		
		function setAccordion(){
			
			var accordionArr = $('.ux-accordion'),
				defaultParams = {'callback':function(){}},
				accordionParams = null;
			
			if (typeof uxAccordionParams === 'undefined') {
				
				accordionParams = getParams(defaultParams, {});
				
			}else{
			
				accordionParams = getParams(defaultParams, uxAccordionParams);
			}			
			
			if(accordionArr.length > 0){
			
				var accordion = function(objectSelector){
					
					var a = new Object();
						
					a.accordion = $(objectSelector);					
					a.listItem = $( a.accordion.find('.ux-list-item') );
					a.children = $( a.accordion.find('.ux-child') );
					
					a.listItem.on('click', function(e){
						var item = $(this);
						
						if(!item.hasClass('active')){
							var child = $(item.find('.ux-child') );
								
							a.children.slideUp('fast');
							child.slideToggle('fast');
							a.listItem.removeClass('active');
							item.addClass('active');
						}else{
							a.children.slideUp('fast');
							a.listItem.removeClass('active');
						}
						
						accordionParams.callback();
							
					});
				
				};
				
				var accordionCSS = ".ux-accordion{position:relative}.ux-accordion .ux-list{list-style:none;margin:0;padding:0}.ux-accordion .ux-list .ux-list-item{border:solid #ccc;border-width:0 1px 1px;background:#fff;cursor:pointer}.ux-accordion .ux-list .ux-list-item:first-child{border-top-width:1px}.ux-accordion .ux-list .ux-list-item h4{margin:0;padding:0;padding:10px}.ux-accordion .ux-list .ux-list-item:hover h4{background:#ccc}.ux-accordion ul.ux-list .ux-list-item .ux-child{display:none;padding:10px}";
				
				addCSS(accordionCSS);
					
				if( accordionArr.length > 0){
				
					for ( var i=0, j=accordionArr.length; i<j; i++ ) {
					
						var id = '#'+$(accordionArr[i]).attr('id');
						accordion( id );
					
					}
				
				}
			}
			
		}
		
		/** Accordion ends **/
		
		function init(){
			setAccordion();
			setRangeSlider();
		
		}
		
		init();
		return this;

	};

}( jQuery ));