/*
Name: Sticky Side
Description: Make the sidebar floatin
Version: 1.0
Author: Renz Ricalde Ramos
Author URL: http://www.renzramos.com
Tags: sticky,sidebar,stick,side
*/
(function ( $ ) {
 
    $.fn.stickySide = function( options ) {
        
        // default
        var settings = $.extend({
            gapTop: 15,
            gapBottom: 15,
            selector: '.sticky-sidebar',
            responsive: {
				'min': 768,
				'max': 9999,
			}
        }, options );

        // declarations
        var win = $(window);
		var stickSidebar =  $(settings.selector) ;
		var stickSidebarHeight =  stickSidebar.outerHeight();

		var stickSidebarParent = stickSidebar.closest('div') ;
		stickSidebarParent.css('position','relative');
		
		var stickSidebarParentWidth = stickSidebarParent.width();

		var mainContainerOffset = $(this).offset().top;
		var mainContainerHeight = $(this).outerHeight();
		var mainContainerBottomOffset = (mainContainerOffset + mainContainerHeight) - stickSidebarHeight;

		// styles
		var styles = {
			'relative': {
				"position": "relative", 
				"top": 'auto',
				"width": 'auto',
				"bottom": "auto"
			},
        	'fixed': {
				"position": "fixed", 
				"top": settings.gapTop,
				"width": stickSidebarParentWidth,
				"bottom": "auto"
			},
			'absolute': {
				"position": "absolute", 
				"top": "auto",
				"width": stickSidebarParentWidth,
				"bottom": settings.gapBottom
			}
        };

        // initialize
		initStickyFloating();

		win.scroll(function(){
			initStickyFloating();
		});

		win.resize(function(){
			initStickyFloating();
			initStickyFloating();
		});

		function initStickyFloating(){
			if (win.width() >= settings.responsive.min && win.width() <= settings.responsive.max){
				var scrollTop = win.scrollTop();

				if (scrollTop >= mainContainerOffset - settings.gapTop){

					if (scrollTop < mainContainerBottomOffset){
						stickSidebar.css(styles.fixed);
					}else{
						stickSidebar.css(styles.absolute);
					}
				}else{
					stickSidebar.css(styles.relative);
				}
				console.log('Sticky Side 1.0 - Running');
			}else{
				stickSidebar.css(styles.relative);
				console.log('Sticky Side 1.0 - Stop');
			}
		}
    };
 
}( jQuery ));
