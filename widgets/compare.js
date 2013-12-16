/*

	compare build.0.1
	
	compare is Copyright © 2013-2018 Virgilio Cometa. It is freely distributable under the terms of an MIT-style license.

    Copyright (c) 2013-2018 Virgilio Cometa

    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(function($){

	$.fn.compare = function() {
		return this.each(function() {
		
			var carsJSON =  JSON.parse(localStorage.getItem('carList')), carList= null;
		
			function checkLocalStorage(){
				
				var retData = {cars:{}}, keys='', c = carsJSON.cars;

				if( Object.keys(c).length>0 ){
				
					for( key in c ) {

						$('#'+key+' .check' ).prop('checked', true);
						
						keys += key;
					}
					
					retData = carsJSON;
				
				}
				
				$('.result-set').html( JSON.stringify(carsJSON) );
				return retData;

			}

			carList = checkLocalStorage();

			$('.check').on('click',function(e){
			
				var item = $( $(this).siblings('.item-set') ),
					key = item.parent().attr('id');
					
				if( this.checked ){
					
					carList.cars[key] = {
						
						make: $(item.find('.make span')).text(),
						model: $(item.find('.model span')).text(),
						trim: $(item.find('.trim span')).text(),
						year: $(item.find('.year span')).text()
					
					};			
					
				}else{
				
					delete carList.cars[key];
					
					$('.result-set').html(carList.cars);
					
				}
				
				var c = JSON.stringify(carList);
				
				localStorage.setItem( "carList", c );
				
				$('.result-set').html( c );
					
			});
			
		});
	};
})(jQuery);
