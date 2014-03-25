/**

	author: Virgilio Cometa

**/
(function ( $ ) {
	$.protoform = function() {
	
		var proto = {};
	
		try{
		
			var loadDataFromSource = function(src){
			
				var json = null;
				$.ajax({
					'async': false,
					'global': false,
					'url': src,
					'dataType': "json",
					'success': function (data) {
						json = data;
					}
				});
				
				return json;
			}
			
			var loadIncludes = function(nodes){
				var arr = [];
				for( var i=0, j=nodes.length; i < j; i++){
				
					var d = new $.Deferred(),
					
						node = $(nodes[i]);
						
					arr.push(d);
					
					node.load(node.data('src')+' '+node.data('target'), function(){ d.resolve(); });
					
					$.when(arr).then(function() {
						bindDataToTemplate();
					});
									
				}
							
				/*var d1 = new $.Deferred(),
					d2 = new $.Deferred(),
					d3 = new $.Deferred();*/

				// Set up the chain of events...
				/*$.when(d1, d2, d3).then(function() {
					bindDataToTemplate();
				});*/
				
				/*$('header').load('includes/navigation.html #navContent', function() { d1.resolve(); });
				$('footer').load('includes/navigation.html #navContent', function() { d2.resolve(); });
				$('.right-panel').load('includes/rightPanel.html #rightPanel', function() { d3.resolve(); });*/
			
			}
		
			var bindDataToTemplate = function(){
		
				if( typeof $('html[data-protoform="true"]') != 'undefined' && $('html[data-protoform="true"]').length > 0){
		
					proto.template = $('[data-template="true"]');
					
					for( var g=0, h = proto.template.length; g<h;g++ ){
					
						var node = $(proto.template[g]),
						
							parent = $( node.parent() );
					
						proto.data = loadDataFromSource(node.data('src'));
						
						for( key in proto.data.nodes ){
							
							var clone = $(node.clone()).prop('id', 'T'+g+'_'+key),
						
								elem = $( clone.find('[data-bind]') );
							
							for( var i=0, j = elem.length; i<j;i++ ){
							
								var e = $( elem[i] ), t=null;
							
								if( e.prop('tagName').toLowerCase() === 'figure' ){
								
									t = '<img id="img_'+key+'" src="'+proto.data.nodes[key][ e.data('bind') ]+'" />';
									
									e.html( t );
								
								} else if( e.prop('tagName').toLowerCase() === 'a' ){
									
									if( e.data('url') === undefined ){
									
										e.attr({'id':'link_'+key, 'href':proto.data.nodes[key][ e.data('bind') ]});
									
									}else{
									
										e.attr({'id':'link_'+key, 'href':proto.data.nodes[key][ e.data('url') ]}).html(proto.data.nodes[key][ e.data('bind') ]);
										
									}
									
								} else {
							
									t = proto.data.nodes[key][ e.data('bind') ];
									
									e.html( t );
								
								}
								
								e.removeAttr('data-bind data-url');
								
								parent.append( clone.removeAttr('data-template data-src') );
							}
						
						}
						
						node.remove();
					
					}
				
				}		

				$('.main').fadeIn('slow').removeClass('hidden');
				
			};
			
			function loadTempate(){
			
				var bodyHTML = $('article'),
					dbody = $(document.body),
					template = dbody.data('template')+'.html #main';
			
				dbody.load(template, function() { 
				
					$('.content-panel').html(bodyHTML);
				
					loadIncludes($('[data-type="include"]'));
					
					$(this).fadeIn('fast');

				});
			
			}
			
			function init(){
			
				loadTempate();
			
			}
			
			init();
			
		} catch( err ){
		
			console.log(err);
		
		}
	
	};
}( jQuery ));
$(function() {	
		
	$.protoform();

});