
;(function ($) {
	$.fn.popWin=function(options){
		var opts=$.extend({},$.fn.popWin.defaults,options);
		return this.each(function(){
			$this=$(this);
			var popW=$(this);
			var popMask=popW.find(".pop-mask");
			var popContent=popW.find(".pop-content");
			var getTitle=popW.find(".pop-title").html();
		
			popContent.css({
				"width":opts.width,
				"height":opts.height
			});
			popW.css({
				"z-index":opts.zIndex
			})
			if(opts.mask){
				popMask.css({
					"display":"block"
				});
			}else{
				popMask.css({
					"display":"none"
				});
			}
			if(opts.move){
                    $this.find("[control-move]").css("cursor","move").on("mousedown",function(e){
                        $(this)[0].oncontextmenu = function(e) { return false; }//防止右击弹出菜单
                        var getStartX = e.pageX,
                            getStartY =  e.pageY;
                        var getPositionX = $(popContent).offset().left,
                            getPositionY = $(popContent).offset().top;
                        $(document).on("mousemove",function(e){
                            var getEndX = e.pageX,
                                getEndY =  e.pageY;
                            $(popContent).css({
                                left: getEndX-getStartX+getPositionX,
                                top: getEndY-getStartY+getPositionY
                            });
                        });
                        $(document).on("mouseup",function(){
                            $(document).unbind("mousemove");
                        })
                    });
            };
            function position(){
            	if(opts.position==1){
	            	popContent.css({
						"left":($(document).width()- parseInt(opts.width))*0.5,
						"top":($(window).height()- parseInt(popContent.height()))*0.5
					});
	            }else if(opts.position==2){
					popContent.css({
							"left":($(document).width()- parseInt(opts.width))*1,
						"top":($(window).height()- parseInt(popContent.height()))*1
						});
	            }
            }
            position();
            $(window).resize(function(){
            	position();
            })
            $(".pop-close").click(function(){
            	$(this).parents(".popWin").hide();
            });

		})

	};
	$.fn.popWin.defaults = {
		position:1,
		width:"500px",
		height:"auto",
		zIndex:"100",
		mask:false,
		move:false

	}
})(jQuery);