(function($) {
	
	var zIndex = 100;
	
	function updateZIndex() {
		if(parseInt($(this).css('z-index'), 10) !== zIndex) {
			$(this).css('z-index', ++zIndex);
		}
	}
		
	$.fn.extend({
		jQwindow: function(options){
			options = jQuery.extend({
				className: 'default',
				height: 200,
				width: 400,
				top: 100,
				left: 100,
				minHeight: 100,
				minWidth: 200,
				maxHeight: 400,
				maxWidth: 700,
				title: 'jQwindow',
				minimizable: true,
				resizable: true,
				closable: true,
				draggable: true,
				destroyOnClose: false,
				gridX: 1,
				gridY: 1,
				ghosting: false,
				frameClass: 'jQwindowFrameClass'
			}, options);
			
			if(typeof(options.id) === 'undefined') {
				options.id = 'jQw' + new Date().getTime().toString();
				options.generated = true;
			}
			var classSuffix = (options.className !== 'default') ? '_' + options.className : '';
			
			// Create window
			var html = '<div id="' + options.id + '_jQwindow" class="jQwindow' + classSuffix + '">';
			html += '<div id="' + options.id + '_jQwindowTop" class="jQwindowTop' + classSuffix + '">';
			html += '<div id="' + options.id + '_jQwindowTopContent" class="jQwindowTopContent' + classSuffix + '">' + options.title + '</div>';
			html += '<span id="' + options.id + '_jQwindowMin" class="jQwindowMin' + classSuffix + '"></span>';
			html += '<span id="' + options.id + '_jQwindowMax" class="jQwindowMax' + classSuffix + '"></span>';
			html += '<span id="' + options.id + '_jQwindowClose" class="jQwindowClose' + classSuffix + '"></span>';
			html += '</div>';
			html += '<div id="' + options.id + '_jQwindowBottom" class="jQwindowBottom' + classSuffix + '"><div id="' + options.id + '_jQwindowBottomContent" class="jQwindowBottomContent' + classSuffix + '">&nbsp;</div></div>';
			html += '<div id="' + options.id + '_jQwindowContent" class="jQwindowContent' + classSuffix + '">' + this.html() +  '</div>';
			html += '<span id="' + options.id + '_jQwindowResize" class="jQwindowResize' + classSuffix + '"></span>';
			html += '</div>';
			$(html).appendTo('body');
			// Style setting
			$('#' + options.id + '_jQwindow').css({height: options.height, width: options.width, top: options.top, left: options.left, zIndex: ++zIndex});
			$('#' + options.id + '_jQwindowContent').css({height: options.height - 48, width: options.width - 25});
			$('#' + options.id + '_jQwindowBottom, #' + options.id + '_jQwindowBottomContent').css('height', options.height - 33);
			// Event binding
			$('#' + options.id + '_jQwindow').bind('click', updateZIndex);
			if(options.closable) {
				$('#' + options.id + '_jQwindowClose').bind('click', function() {
					var el = $('#' + options.id + '_jQwindow');
					/*
					el.TransferTo({
						to:'windowOpen',
						className:'transferer2' + classSuffix, 
						duration: 400
					});
					*/
					if(options.generated || options.destroyOnClose) {
						el.remove();
					} else {
						el.hide();
					}
				});
			} else {
				$('#' + options.id + '_jQwindowClose').css('display', 'none');
			}
			if(options.minimizable) {
				$('#' + options.id + '_jQwindowMin').bind('click', function() {
					$('#' + options.id + '_jQwindowContent').SlideToggleUp(300);
					$('#' + options.id + '_jQwindowBottom, #' + options.id + '_jQwindowBottomContent').animate({height: 10}, 300);
					$('#' + options.id + '_jQwindow').animate({height:40},300).get(0).isMinimized = true;
					$(this).hide();
					$('#' + options.id + '_jQwindowResize').hide();
					$('#' + options.id + '_jQwindowMax').show();
				});
				$('#' + options.id + '_jQwindowMax').bind('click', function() {
					var windowSize = $.iUtil.getSize(document.getElementById('' + options.id + '_jQwindowContent'));
					$('#' + options.id + '_jQwindowContent').SlideToggleUp(300);
					$('#' + options.id + '_jQwindowBottom, #' + options.id + '_jQwindowBottomContent').animate({height: windowSize.hb + 13}, 300);
					$('#' + options.id + '_jQwindow').animate({height:windowSize.hb + 43}, 300).get(0).isMinimized = false;
					$(this).hide();
					$('#' + options.id + '_jQwindowMin, #' + options.id + '_jQwindowResize').show();
				});
			} else {
				$('#' + options.id + '_jQwindowMin').css('display', 'none');
			}
			if(options.draggable) {
				var params = {
					handle: '#' + options.id + '_jQwindowTop',
					onStart: updateZIndex,
					ghosting: options.ghosting
				};
				if(options.gridX != 1 || options.gridY != 1) { params.grid = [options.gridX, options.gridY]; }
				if(options.ghosting) { params.opacity = 0.5; }
				if(typeof(options.frameClass) === 'string' && options.frameClass.length > 0) { params.frameClass = options.frameClass; }
				if(typeof(options.containment) !== 'undefined') { params.containment = options.containment; }
				if(typeof(options.axis) === 'string') { params.axis = options.axis; }
				$('#' + options.id + '_jQwindow').Draggable(params);
			} else {
				$('#' + options.id + '_jQwindowTop').css('cursor', 'default');
			}
			if(options.resizable) {
				$('#' + options.id + '_jQwindow').Resizable({
					minWidth: options.minWidth,
					minHeight: options.minHeight,
					maxWidth: options.maxWidth,
					maxHeight: options.maxHeight,
					handlers: {
						se: '#' + options.id + '_jQwindowResize'
					},
					onStart: updateZIndex,
					onResize : function(size, position) {
						$('#' + options.id + '_jQwindowBottom, #' + options.id + '_jQwindowBottomContent').css('height', size.height - 33);
						var windowContentEl = $('#' + options.id + '_jQwindowContent').css('width', size.width - 25);
						if (!document.getElementById(options.id + '_jQwindow').isMinimized) {
							windowContentEl.css('height', size.height - 48);
						}
					}
				});
			} else {
				$('#' + options.id + '_jQwindowResize').css('display', 'none');
			}
		},
		jQwindowClose: function(id){
			$('#' + id + '_jQwindowClose').click();
		}
	});
	
})(jQuery);