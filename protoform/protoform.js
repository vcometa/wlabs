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
																	
									e.attr({'id':'link_'+key, 'href':proto.data.nodes[key][ e.data('url') ]}).html(proto.data.nodes[key][ e.data('bind') ]);

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
				
			};
			
			bindDataToTemplate();
			
		} catch( err ){
		
			console.log(err);
		
		}
	
	};
}( jQuery ));