/**

	author: Virgilio Cometa

**/
(function ( $ ) {
	$.protoform = function() {
	
		var proto = {};
	
		try{
		
			var bindDataToTemplate = function(){
		
				if( typeof $('html[data-protoform="true"]') != 'undefined' && $('html[data-protoform="true"]').length > 0){
		
					proto.template = $('[data-template="true"]');
					
					for( var g=0, h = proto.template.length; g<h;g++ ){
					
						var node = $(proto.template[g]),
						
							parent = $( node.parent() );
					
						proto.data = JSON.parse(node.data('src'));
						
										
						for( key in proto.data.nodes ){
							
							var clone = $(node.clone()).prop('id', 'T'+g+'_'+key),
						
								elem = $( clone.find('[data-bind]') );
							
							for( var i=0, j = elem.length; i<j;i++ ){
							
								$( elem[i] ).html( proto.data.nodes[key][ $( elem[i] ).data('bind') ] ).removeAttr('data-bind');
								
								parent.append( clone.removeAttr('data-template') );
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