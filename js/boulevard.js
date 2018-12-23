var Boulevard=function(){this.namespace="Boulevard",this.currentImage=0,this.timer,this.touch};Boulevard.prototype={bindImages:function(){var e=this;requestAnimationFrame(function(){e.getImages().addClass("pointer").off(e.namespace).on("click."+e.namespace,function(t){if(t.preventDefault(),!$("body").is(".k-source-album, .k-source-favorites, .k-lens-featured")||e.touch)return!0;var n=$("#album-intro").length?$(this).closest(".cell").index():$(this).closest(".cell").index()+1;n<e.currentImage?e.currentImage=n:n>=e.currentImage&&(e.currentImage=++n),e.laneScrollTo()}),$(window).trigger("resize")})},checkLane:function(){$("#lane .cell").length?$("#next,#prev").show():$("#next,#prev").hide()&&$("#lane").width("auto")},easeOut:function(e,t,n,i,a){var o=1.70158,r=0,s=i;if(0==t)return n;if(2==(t/=a/2))return n+i;if(r||(r=a*(.3*1.5)),s<Math.abs(i)){s=i;var o=r/4}else var o=r/(2*Math.PI)*Math.asin(i/s);return t<1?-.5*(s*Math.pow(2,10*(t-=1))*Math.sin((t*a-o)*(2*Math.PI)/r))+n:s*Math.pow(2,-10*(t-=1))*Math.sin((t*a-o)*(2*Math.PI)/r)*.5+i+n},getImages:function(){return $("#lane img:not(.__overlay__)")},getVideos:function(){return $("#lane .cell.video")},getCurrentImageInView:function(){var e=this,t=e.touch?$("body"):$(window);return t.scrollLeft()<=0?void(this.currentImage=0):void this.getImages().each(function(n){if(t.is("body")){if($(this).closest(".cell").offset().left>0)return e.currentImage=++n,!1}else if($(this).closest(".cell").offset().left>t.scrollLeft())return e.currentImage=++n,!1})},getMediaQueryHeight:function(){var e=window,t="inner";"innerWidth"in window||(t="client",e=document.documentElement||document.body);var n,i=e[t+"Width"],a=e[t+"Height"];return n=a>=1e3?800:a>=900?700:a>=800?600:i<767?165:520},getMediaQueryWidth:function(){var e=window,t="inner";return"innerWidth"in window||(t="client",e=document.documentElement||document.body),e[t+"Width"]},laneScrollTo:function(){var e=this.getImages().length;this.currentImage>=e?this.currentImage=e:this.currentImage<0&&(this.currentImage=0);var t=0===this.currentImage&&$("#album-intro").length?0:$("#lane .cell:eq("+this.currentImage+")").offset().left;t-=$("#lane").offset().left,$("html,body").stop().animate({scrollLeft:t-80},400,this.easeOut)},lazyHold:function(){var e=this;$K.responsiveImages(this.getImages(),function(){e.updateLaneWidth(),e.getCurrentImageInView(),requestAnimationFrame(function(){$("[data-lazy-hold]").attr("data-lazy-hold",null)})})},ready:function(){window.scrollTo(0,0),this.currentImage=0,this.lazyHold(),this.updateLaneProperties(),this.checkLane(),this.bindImages()},updateLaneProperties:function(){$("#lane").css({top:"none"===$("header").css("display")||"hidden"===$("header").css("visibility")?"0px":$("header").outerHeight(!0)+"px",width:"99999px"})},updateLaneWidth:function(){var e=1,t=$("#album-intro:visible").length<=0?10:$("#album-intro").outerWidth(!0);this.getImages().length<=0&&this.getVideos().length<=0||(this.getImages().each(function(){var t=$(this);t.parent().find("h3, p").outerWidth(t.width()),e+=t.closest(".cell").outerWidth(!0)}),this.getVideos().each(function(){var t=$(this);t.find("h3, p").outerWidth(t.outerWidth(!0)),e+=t.outerWidth(!0)}),$("#lane").css("width",e+t+"px"))},updateVimeo:function(){var e=this;$('iframe[src*="//player.vimeo.com"]').each(function(){var t=$(this).parents(".cell");t.find(".max-width-video-wrapper").css("max-width",""),t.width(Math.floor(e.getMediaQueryHeight()*t.data("aspect"))),t.attr("data-vimeo",!0)}),requestAnimationFrame(function(){e.updateLaneWidth()})},updateVideo:function(){var e=this;$(".cell.video").each(function(){var t=$(this);t.data("aspect")&&t.width(Math.floor(e.getMediaQueryHeight()*t.data("aspect")))}),requestAnimationFrame(function(){$K.resizeVideos(),e.updateLaneWidth()})}},Boulevard=new Boulevard,$(function(){function e(){return"ontouchstart"in window||navigator.MaxTouchPoints>0||navigator.msMaxTouchPoints>0}var t=window.Boulevard;(t.touch=e())&&$("html").addClass("touch"),$("#mob-menu").sidr({name:"sidr-left"}),$("#site-title img").length&&$("#site-title img").on("load",function(){$("#lane").css("top",$("header").height()+"px")}),$(window).on("resize",function(){clearTimeout(t.timer),t.timer=setTimeout(function(){clearTimeout(t.timer),t.lazyHold(),t.updateVimeo(),t.updateVideo()},250)}).on("k-infinite-loaded",function(){t.lazyHold()}),$(document).off(t.namespace).on("k-pjax-end."+t.namespace,t.checkLane).on("k-image-loading."+t.namespace,function(){t.updateLaneWidth()}).on("pjax:complete."+t.namespace,function(){$("#album-intro").length>0&&$("#site-title h2").html("/&nbsp;"+$("#album-intro h1").text().trim()),t.ready(),$K.ready()}).on("click."+t.namespace,"#next,#prev",function(e){e.preventDefault(),t.currentImage+="next"===$(this).attr("id")?1:-1,t.laneScrollTo()}).on("pjax:transition:begin koken:lightbox:loading",function(){$("body").addClass("k-pjax-loading"),$.sidr("close","sidr-left")}).on("pjax:transition:start pjax:transition:end koken:lightbox:loaded",function(){$("body").removeClass("k-pjax-loading"),$.sidr("close","sidr-left")}),$.support.pjax&&$(document).on("click."+t.namespace,"#lane a",function(){if(!$("body").is(".k-source-album, .k-lens-featured")&&$("#lane").length){var e=$(this);return $(this).closest("#lane").length>0?$("#site-title h2").html("/&nbsp;"+$(this).text().trim()):$("#site-title h2").html(""),$.pjax({url:e.attr("href"),container:"#lane"}),!1}}),$("#lane").on("mousewheel",function(e){if(!(t.getMediaQueryWidth()<767)){if($(e.target).closest("#album-intro").length)return!0;e.preventDefault();var n=Math.abs(e.deltaX)>Math.abs(e.deltaY)?e.deltaX:e.deltaY*-1;$(document).scrollLeft($(document).scrollLeft()+e.deltaFactor*n),t.getImages().each(function(e,n){if($(this).closest(".cell").offset().left>$(window).scrollLeft())return t.currentImage=e,!1})}}),$("#lane iframe").attr("scrolling","no"),window.addEventListener("orientationchange",function(){return window.setTimeout(function(){$("#lane").css("top","none"===$("header").css("display")||"hidden"===$("header").css("visibility")?"0px":$("header").height()+"px")},500),!1}),t.ready()});