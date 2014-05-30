$(document).ready(function() {
	
	var pageHeight=0,
		pageWidth=0, 
		slideDelay=300,		
		page = $('.page'),
		leftPanel = $('.leftpanel'),
		rightPanel = $('.rightpanel'),
		centerPanel = $('.centerpanel'),
		rightButton = $('.right'),
		leftButton = $('.left'),
		viewPort = $('.viewport'),
		header = $('.header'),
		footer = $('.footer'),
		centerWidthOffset = rightPanel.width()-leftPanel.width(),
		breakPoints = [1200,960,768,600,480,320],
		resolution = 0,
		leftPanelOn = false,
		rightPanelOn = false,
		initialPosition = 0;
	
	function SetPage(){
		pageWidth = $(window).width();
		pageHeight = $(window).height();
		headerHeight = header.height();
		footerHeight = footer.height();
		
		resolution = CheckDeviceWidth();
				
		page.height(pageHeight+footerHeight);
		leftPanel.height(pageHeight - headerHeight);
		rightPanel.height(pageHeight - headerHeight);
		centerPanel.height(pageHeight - headerHeight);
		
	}
	
	function CheckDeviceWidth(){
		
		var action = function(breakPoint){
			page.removeClass();			
			viewPort.removeAttr('style');
			page.addClass('page w'+breakPoint);
		}
		
		var returnResolution = 0;
		
		for(var i=0;i<breakPoints.length;i++){
			if(i>0){
				if(pageWidth >= breakPoints[i] && pageWidth < breakPoints[i-1]){
					action(breakPoints[i]);
					returnResolution = breakPoints[i];
				}
			}else{
				action(breakPoints[0]);
				returnResolution = breakPoints[0];
			}
		}
		
		return returnResolution;
		
	}
	
	function BindControls(){
		
		var action = function(bool, panelObj, intSwitch){
			var panelObjWidth = panelObj.outerWidth()*intSwitch;
			
			if(bool === false){
				viewPort.animate({'left':viewPort.position().left+panelObjWidth},slideDelay);
				bool = true;
			}else{
				viewPort.animate({'left':viewPort.position().left-panelObjWidth},slideDelay);
				bool = false;
			}
			return bool;
		}
		
		rightButton.bind('click', function(){
			if(resolution < 960){
				if(leftPanelOn){
					leftButton.trigger('click');
					setTimeout(function(){rightButton.trigger('click')},300);
				}else{
					rightPanelOn = action(rightPanelOn, rightPanel,-1);		
				}
			}
		});
		
		leftButton.bind('click', function(){
			if(rightPanelOn){
				rightButton.trigger('click');
				setTimeout(function(){leftButton.trigger('click')},300);
			}else{
				if(resolution === 960){
					if(leftPanelOn===false){
						var centerPanelWidth = centerPanel.width()+ (rightPanel.outerWidth()-leftPanel.outerWidth());
						centerPanel.width(centerPanelWidth);
					}else{
						var centerPanelWidth = centerPanel.width()- (rightPanel.outerWidth()-leftPanel.outerWidth());
						centerPanel.width(centerPanelWidth);
					}
				}
				leftPanelOn = action(leftPanelOn, leftPanel, 1);
			}
		});
		
		$(window).bind('resize', function(){SetPage()});
	}
	
	function Initialize(){
		SetPage();		
		BindControls();		
	}
	
	Initialize();
});