/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/



;(function(e,t,n,r){e.fn.doubleTapToGo=function(r){if(!("ontouchstart"in t)&&!navigator.msMaxTouchPoints&&!navigator.userAgent.toLowerCase().match(/windows phone os 7/i))return false;this.each(function(){var t=false;e(this).on("click",function(n){var r=e(this);if(r[0]!=t[0]){n.preventDefault();t=r}});e(n).on("click touchstart MSPointerDown",function(n){var r=true,i=e(n.target).parents();for(var s=0;s<i.length;s++)if(i[s]==t[0])r=false;if(r)t=false})});return this}})(jQuery,window,document);

var helpers = (function () {

  var pushLocation = function (updatedObj, updatedHrefObj, callback) {
    if (updatedObj.pushed === true) return false
    var pathname = window.location.pathname;
    var obj = _.cloneDeep(updatedObj)
    var queryString = Object.keys(updatedHrefObj).map(function(key) {
        return key + '=' + updatedHrefObj[key]
    }).join('&');
    if (queryString) {
      var updatedPath = pathname + '?' + queryString;
      obj['pushed'] = true;
      window.history.pushState(JSON.stringify(obj), updatedPath, updatedPath);
    }

    window.onpopstate = function(e){
      if(e.state){
        callback(JSON.parse(e.state));
      }
    };


  }

  var urlParams = {};
  if (window.location.search.length > 0) {
    (window.onpopstate = function () {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
            query  = window.location.search.substring(1);
        while (match = search.exec(query))
           urlParams[decode(match[1])] = decode(match[2]);
    })();
  }

  var slugify = function (text) {
  	return text.toString()
  		.toLowerCase()
  		.replace(/\s+/g, '-')           // Replace spaces with -
  		.replace(/[^\w\-]+/g, '')       // Remove all non-word chars
  		.replace(/\-\-+/g, '-')         // Replace multiple - with single -
  		.replace(/^-+/, '')             // Trim - from start of text
  		.replace(/-+$/, '');            // Trim - from end of text
  }

  return {
    urlParams,
    findParam: function (search) {
      return !_.isUndefined(urlParams[search]) ? urlParams[search] : false;
    },
    slugify,
    pushLocation,
  }
})();

// // Resize reCAPTCHA to fit width of container
// // Since it has a fixed width, we're scaling
// // using CSS3 transforms
// // ------------------------------------------
// // captchaScale = containerWidth / elementWidth
//
// function scaleCaptcha(elementWidth) {
//   // Width of the reCAPTCHA element, in pixels
//   var reCaptchaWidth = 304;
//   // Get the containing element's width
// 	var containerWidth = $('.container').width();
//
//   // Only scale the reCAPTCHA if it won't fit
//   // inside the container
//   if(reCaptchaWidth > containerWidth) {
//     // Calculate the scale
//     var captchaScale = containerWidth / reCaptchaWidth;
//     // Apply the transformation
//     $('.g-recaptcha').css({
//       'transform':'scale('+captchaScale+')'
//     });
//   }
// }

$(function() {

  // Initialize scaling
  // scaleCaptcha();

  // Update scaling on window resize
  // Uses jQuery throttle plugin to limit strain on the browser
  // $(window).resize( $.throttle( 100, scaleCaptcha ) );

});

/*------------------------------------*\
    ::Inview Plugin
\*------------------------------------*/
/**
 * author Remy Sharp
 * url http://remysharp.com/2009/01/26/element-in-view-event-plugin/
 */
(function ($) {
    function getViewportHeight() {
        var height = window.innerHeight; // Safari, Opera
        var mode = document.compatMode;

        if ( (mode || !$.support.boxModel) ) { // IE, Gecko
            height = (mode == 'CSS1Compat') ?
            document.documentElement.clientHeight : // Standards
            document.body.clientHeight; // Quirks
        }

        return height;
    }

    $(window).scroll(function () {
        var vpH = getViewportHeight(),
            scrolltop = (document.documentElement.scrollTop ?
                document.documentElement.scrollTop :
                document.body.scrollTop),
            elems = [];

        // naughty, but this is how it knows which elements to check for
        $.each($.cache, function () {
            if (this.events && this.events.inview) {
                elems.push(this.handle.elem);
            }
        });

        if (elems.length) {
            $(elems).each(function () {
                var $el = $(this),
                    top = $el.offset().top,
                    height = $el.height(),
                    inview = $el.data("inview") || false;

                if (scrolltop > (top + height) || scrolltop + vpH < top) {
                    if (inview) {
                        $el.data("inview", false);
                        $el.trigger("inview", [ false ]);
                    }
                } else if (scrolltop < (top + height)) {
                    if (!inview) {
                        $el.data("inview", true);
                        $el.trigger("inview", [ true ]);
                    }
                }
            });
        }
    });

    // kick the event to pick up any elements already in view.
    // note however, this only works if the plugin is included after the elements are bound to 'inview'
    $(function () {
        $(window).scroll();
    });
})(jQuery);
// Slick 1.8.0
!function(i){"use strict";"function"==typeof define&&define.amd?define(["jquery"],i):"undefined"!=typeof exports?module.exports=i(require("jquery")):i(jQuery)}(function(i){"use strict";var e=window.Slick||{};(e=function(){var e=0;return function(t,o){var s,n=this;n.defaults={accessibility:!0,adaptiveHeight:!1,appendArrows:i(t),appendDots:i(t),arrows:!0,asNavFor:null,prevArrow:'<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',nextArrow:'<button class="slick-next" aria-label="Next" type="button">Next</button>',autoplay:!1,autoplaySpeed:3e3,centerMode:!1,centerPadding:"50px",cssEase:"ease",customPaging:function(e,t){return i('<button type="button" />').text(t+1)},dots:!1,dotsClass:"slick-dots",draggable:!0,easing:"linear",edgeFriction:.35,fade:!1,focusOnSelect:!1,focusOnChange:!1,infinite:!0,initialSlide:0,lazyLoad:"ondemand",mobileFirst:!1,pauseOnHover:!0,pauseOnFocus:!0,pauseOnDotsHover:!1,respondTo:"window",responsive:null,rows:1,rtl:!1,slide:"",slidesPerRow:1,slidesToShow:1,slidesToScroll:1,speed:500,swipe:!0,swipeToSlide:!1,touchMove:!0,touchThreshold:5,useCSS:!0,useTransform:!0,variableWidth:!1,vertical:!1,verticalSwiping:!1,waitForAnimate:!0,zIndex:1e3},n.initials={animating:!1,dragging:!1,autoPlayTimer:null,currentDirection:0,currentLeft:null,currentSlide:0,direction:1,$dots:null,listWidth:null,listHeight:null,loadIndex:0,$nextArrow:null,$prevArrow:null,scrolling:!1,slideCount:null,slideWidth:null,$slideTrack:null,$slides:null,sliding:!1,slideOffset:0,swipeLeft:null,swiping:!1,$list:null,touchObject:{},transformsEnabled:!1,unslicked:!1},i.extend(n,n.initials),n.activeBreakpoint=null,n.animType=null,n.animProp=null,n.breakpoints=[],n.breakpointSettings=[],n.cssTransitions=!1,n.focussed=!1,n.interrupted=!1,n.hidden="hidden",n.paused=!0,n.positionProp=null,n.respondTo=null,n.rowCount=1,n.shouldClick=!0,n.$slider=i(t),n.$slidesCache=null,n.transformType=null,n.transitionType=null,n.visibilityChange="visibilitychange",n.windowWidth=0,n.windowTimer=null,s=i(t).data("slick")||{},n.options=i.extend({},n.defaults,o,s),n.currentSlide=n.options.initialSlide,n.originalSettings=n.options,void 0!==document.mozHidden?(n.hidden="mozHidden",n.visibilityChange="mozvisibilitychange"):void 0!==document.webkitHidden&&(n.hidden="webkitHidden",n.visibilityChange="webkitvisibilitychange"),n.autoPlay=i.proxy(n.autoPlay,n),n.autoPlayClear=i.proxy(n.autoPlayClear,n),n.autoPlayIterator=i.proxy(n.autoPlayIterator,n),n.changeSlide=i.proxy(n.changeSlide,n),n.clickHandler=i.proxy(n.clickHandler,n),n.selectHandler=i.proxy(n.selectHandler,n),n.setPosition=i.proxy(n.setPosition,n),n.swipeHandler=i.proxy(n.swipeHandler,n),n.dragHandler=i.proxy(n.dragHandler,n),n.keyHandler=i.proxy(n.keyHandler,n),n.instanceUid=e++,n.htmlExpr=/^(?:\s*(<[\w\W]+>)[^>]*)$/,n.registerBreakpoints(),n.init(!0)}}()).prototype.activateADA=function(){this.$slideTrack.find(".slick-active").attr({"aria-hidden":"false"}).find("a, input, button, select").attr({tabindex:"0"})},e.prototype.addSlide=e.prototype.slickAdd=function(e,t,o){var s=this;if("boolean"==typeof t)o=t,t=null;else if(t<0||t>=s.slideCount)return!1;s.unload(),"number"==typeof t?0===t&&0===s.$slides.length?i(e).appendTo(s.$slideTrack):o?i(e).insertBefore(s.$slides.eq(t)):i(e).insertAfter(s.$slides.eq(t)):!0===o?i(e).prependTo(s.$slideTrack):i(e).appendTo(s.$slideTrack),s.$slides=s.$slideTrack.children(this.options.slide),s.$slideTrack.children(this.options.slide).detach(),s.$slideTrack.append(s.$slides),s.$slides.each(function(e,t){i(t).attr("data-slick-index",e)}),s.$slidesCache=s.$slides,s.reinit()},e.prototype.animateHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.animate({height:e},i.options.speed)}},e.prototype.animateSlide=function(e,t){var o={},s=this;s.animateHeight(),!0===s.options.rtl&&!1===s.options.vertical&&(e=-e),!1===s.transformsEnabled?!1===s.options.vertical?s.$slideTrack.animate({left:e},s.options.speed,s.options.easing,t):s.$slideTrack.animate({top:e},s.options.speed,s.options.easing,t):!1===s.cssTransitions?(!0===s.options.rtl&&(s.currentLeft=-s.currentLeft),i({animStart:s.currentLeft}).animate({animStart:e},{duration:s.options.speed,easing:s.options.easing,step:function(i){i=Math.ceil(i),!1===s.options.vertical?(o[s.animType]="translate("+i+"px, 0px)",s.$slideTrack.css(o)):(o[s.animType]="translate(0px,"+i+"px)",s.$slideTrack.css(o))},complete:function(){t&&t.call()}})):(s.applyTransition(),e=Math.ceil(e),!1===s.options.vertical?o[s.animType]="translate3d("+e+"px, 0px, 0px)":o[s.animType]="translate3d(0px,"+e+"px, 0px)",s.$slideTrack.css(o),t&&setTimeout(function(){s.disableTransition(),t.call()},s.options.speed))},e.prototype.getNavTarget=function(){var e=this,t=e.options.asNavFor;return t&&null!==t&&(t=i(t).not(e.$slider)),t},e.prototype.asNavFor=function(e){var t=this.getNavTarget();null!==t&&"object"==typeof t&&t.each(function(){var t=i(this).slick("getSlick");t.unslicked||t.slideHandler(e,!0)})},e.prototype.applyTransition=function(i){var e=this,t={};!1===e.options.fade?t[e.transitionType]=e.transformType+" "+e.options.speed+"ms "+e.options.cssEase:t[e.transitionType]="opacity "+e.options.speed+"ms "+e.options.cssEase,!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.autoPlay=function(){var i=this;i.autoPlayClear(),i.slideCount>i.options.slidesToShow&&(i.autoPlayTimer=setInterval(i.autoPlayIterator,i.options.autoplaySpeed))},e.prototype.autoPlayClear=function(){var i=this;i.autoPlayTimer&&clearInterval(i.autoPlayTimer)},e.prototype.autoPlayIterator=function(){var i=this,e=i.currentSlide+i.options.slidesToScroll;i.paused||i.interrupted||i.focussed||(!1===i.options.infinite&&(1===i.direction&&i.currentSlide+1===i.slideCount-1?i.direction=0:0===i.direction&&(e=i.currentSlide-i.options.slidesToScroll,i.currentSlide-1==0&&(i.direction=1))),i.slideHandler(e))},e.prototype.buildArrows=function(){var e=this;!0===e.options.arrows&&(e.$prevArrow=i(e.options.prevArrow).addClass("slick-arrow"),e.$nextArrow=i(e.options.nextArrow).addClass("slick-arrow"),e.slideCount>e.options.slidesToShow?(e.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.prependTo(e.options.appendArrows),e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.appendTo(e.options.appendArrows),!0!==e.options.infinite&&e.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true")):e.$prevArrow.add(e.$nextArrow).addClass("slick-hidden").attr({"aria-disabled":"true",tabindex:"-1"}))},e.prototype.buildDots=function(){var e,t,o=this;if(!0===o.options.dots){for(o.$slider.addClass("slick-dotted"),t=i("<ul />").addClass(o.options.dotsClass),e=0;e<=o.getDotCount();e+=1)t.append(i("<li />").append(o.options.customPaging.call(this,o,e)));o.$dots=t.appendTo(o.options.appendDots),o.$dots.find("li").first().addClass("slick-active")}},e.prototype.buildOut=function(){var e=this;e.$slides=e.$slider.children(e.options.slide+":not(.slick-cloned)").addClass("slick-slide"),e.slideCount=e.$slides.length,e.$slides.each(function(e,t){i(t).attr("data-slick-index",e).data("originalStyling",i(t).attr("style")||"")}),e.$slider.addClass("slick-slider"),e.$slideTrack=0===e.slideCount?i('<div class="slick-track"/>').appendTo(e.$slider):e.$slides.wrapAll('<div class="slick-track"/>').parent(),e.$list=e.$slideTrack.wrap('<div class="slick-list"/>').parent(),e.$slideTrack.css("opacity",0),!0!==e.options.centerMode&&!0!==e.options.swipeToSlide||(e.options.slidesToScroll=1),i("img[data-lazy]",e.$slider).not("[src]").addClass("slick-loading"),e.setupInfinite(),e.buildArrows(),e.buildDots(),e.updateDots(),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),!0===e.options.draggable&&e.$list.addClass("draggable")},e.prototype.buildRows=function(){var i,e,t,o,s,n,r,l=this;if(o=document.createDocumentFragment(),n=l.$slider.children(),l.options.rows>1){for(r=l.options.slidesPerRow*l.options.rows,s=Math.ceil(n.length/r),i=0;i<s;i++){var d=document.createElement("div");for(e=0;e<l.options.rows;e++){var a=document.createElement("div");for(t=0;t<l.options.slidesPerRow;t++){var c=i*r+(e*l.options.slidesPerRow+t);n.get(c)&&a.appendChild(n.get(c))}d.appendChild(a)}o.appendChild(d)}l.$slider.empty().append(o),l.$slider.children().children().children().css({width:100/l.options.slidesPerRow+"%",display:"inline-block"})}},e.prototype.checkResponsive=function(e,t){var o,s,n,r=this,l=!1,d=r.$slider.width(),a=window.innerWidth||i(window).width();if("window"===r.respondTo?n=a:"slider"===r.respondTo?n=d:"min"===r.respondTo&&(n=Math.min(a,d)),r.options.responsive&&r.options.responsive.length&&null!==r.options.responsive){s=null;for(o in r.breakpoints)r.breakpoints.hasOwnProperty(o)&&(!1===r.originalSettings.mobileFirst?n<r.breakpoints[o]&&(s=r.breakpoints[o]):n>r.breakpoints[o]&&(s=r.breakpoints[o]));null!==s?null!==r.activeBreakpoint?(s!==r.activeBreakpoint||t)&&(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):(r.activeBreakpoint=s,"unslick"===r.breakpointSettings[s]?r.unslick(s):(r.options=i.extend({},r.originalSettings,r.breakpointSettings[s]),!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e)),l=s):null!==r.activeBreakpoint&&(r.activeBreakpoint=null,r.options=r.originalSettings,!0===e&&(r.currentSlide=r.options.initialSlide),r.refresh(e),l=s),e||!1===l||r.$slider.trigger("breakpoint",[r,l])}},e.prototype.changeSlide=function(e,t){var o,s,n,r=this,l=i(e.currentTarget);switch(l.is("a")&&e.preventDefault(),l.is("li")||(l=l.closest("li")),n=r.slideCount%r.options.slidesToScroll!=0,o=n?0:(r.slideCount-r.currentSlide)%r.options.slidesToScroll,e.data.message){case"previous":s=0===o?r.options.slidesToScroll:r.options.slidesToShow-o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide-s,!1,t);break;case"next":s=0===o?r.options.slidesToScroll:o,r.slideCount>r.options.slidesToShow&&r.slideHandler(r.currentSlide+s,!1,t);break;case"index":var d=0===e.data.index?0:e.data.index||l.index()*r.options.slidesToScroll;r.slideHandler(r.checkNavigable(d),!1,t),l.children().trigger("focus");break;default:return}},e.prototype.checkNavigable=function(i){var e,t;if(e=this.getNavigableIndexes(),t=0,i>e[e.length-1])i=e[e.length-1];else for(var o in e){if(i<e[o]){i=t;break}t=e[o]}return i},e.prototype.cleanUpEvents=function(){var e=this;e.options.dots&&null!==e.$dots&&(i("li",e.$dots).off("click.slick",e.changeSlide).off("mouseenter.slick",i.proxy(e.interrupt,e,!0)).off("mouseleave.slick",i.proxy(e.interrupt,e,!1)),!0===e.options.accessibility&&e.$dots.off("keydown.slick",e.keyHandler)),e.$slider.off("focus.slick blur.slick"),!0===e.options.arrows&&e.slideCount>e.options.slidesToShow&&(e.$prevArrow&&e.$prevArrow.off("click.slick",e.changeSlide),e.$nextArrow&&e.$nextArrow.off("click.slick",e.changeSlide),!0===e.options.accessibility&&(e.$prevArrow&&e.$prevArrow.off("keydown.slick",e.keyHandler),e.$nextArrow&&e.$nextArrow.off("keydown.slick",e.keyHandler))),e.$list.off("touchstart.slick mousedown.slick",e.swipeHandler),e.$list.off("touchmove.slick mousemove.slick",e.swipeHandler),e.$list.off("touchend.slick mouseup.slick",e.swipeHandler),e.$list.off("touchcancel.slick mouseleave.slick",e.swipeHandler),e.$list.off("click.slick",e.clickHandler),i(document).off(e.visibilityChange,e.visibility),e.cleanUpSlideEvents(),!0===e.options.accessibility&&e.$list.off("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().off("click.slick",e.selectHandler),i(window).off("orientationchange.slick.slick-"+e.instanceUid,e.orientationChange),i(window).off("resize.slick.slick-"+e.instanceUid,e.resize),i("[draggable!=true]",e.$slideTrack).off("dragstart",e.preventDefault),i(window).off("load.slick.slick-"+e.instanceUid,e.setPosition)},e.prototype.cleanUpSlideEvents=function(){var e=this;e.$list.off("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.off("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.cleanUpRows=function(){var i,e=this;e.options.rows>1&&((i=e.$slides.children().children()).removeAttr("style"),e.$slider.empty().append(i))},e.prototype.clickHandler=function(i){!1===this.shouldClick&&(i.stopImmediatePropagation(),i.stopPropagation(),i.preventDefault())},e.prototype.destroy=function(e){var t=this;t.autoPlayClear(),t.touchObject={},t.cleanUpEvents(),i(".slick-cloned",t.$slider).detach(),t.$dots&&t.$dots.remove(),t.$prevArrow&&t.$prevArrow.length&&(t.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.prevArrow)&&t.$prevArrow.remove()),t.$nextArrow&&t.$nextArrow.length&&(t.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display",""),t.htmlExpr.test(t.options.nextArrow)&&t.$nextArrow.remove()),t.$slides&&(t.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function(){i(this).attr("style",i(this).data("originalStyling"))}),t.$slideTrack.children(this.options.slide).detach(),t.$slideTrack.detach(),t.$list.detach(),t.$slider.append(t.$slides)),t.cleanUpRows(),t.$slider.removeClass("slick-slider"),t.$slider.removeClass("slick-initialized"),t.$slider.removeClass("slick-dotted"),t.unslicked=!0,e||t.$slider.trigger("destroy",[t])},e.prototype.disableTransition=function(i){var e=this,t={};t[e.transitionType]="",!1===e.options.fade?e.$slideTrack.css(t):e.$slides.eq(i).css(t)},e.prototype.fadeSlide=function(i,e){var t=this;!1===t.cssTransitions?(t.$slides.eq(i).css({zIndex:t.options.zIndex}),t.$slides.eq(i).animate({opacity:1},t.options.speed,t.options.easing,e)):(t.applyTransition(i),t.$slides.eq(i).css({opacity:1,zIndex:t.options.zIndex}),e&&setTimeout(function(){t.disableTransition(i),e.call()},t.options.speed))},e.prototype.fadeSlideOut=function(i){var e=this;!1===e.cssTransitions?e.$slides.eq(i).animate({opacity:0,zIndex:e.options.zIndex-2},e.options.speed,e.options.easing):(e.applyTransition(i),e.$slides.eq(i).css({opacity:0,zIndex:e.options.zIndex-2}))},e.prototype.filterSlides=e.prototype.slickFilter=function(i){var e=this;null!==i&&(e.$slidesCache=e.$slides,e.unload(),e.$slideTrack.children(this.options.slide).detach(),e.$slidesCache.filter(i).appendTo(e.$slideTrack),e.reinit())},e.prototype.focusHandler=function(){var e=this;e.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick","*",function(t){t.stopImmediatePropagation();var o=i(this);setTimeout(function(){e.options.pauseOnFocus&&(e.focussed=o.is(":focus"),e.autoPlay())},0)})},e.prototype.getCurrent=e.prototype.slickCurrentSlide=function(){return this.currentSlide},e.prototype.getDotCount=function(){var i=this,e=0,t=0,o=0;if(!0===i.options.infinite)if(i.slideCount<=i.options.slidesToShow)++o;else for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else if(!0===i.options.centerMode)o=i.slideCount;else if(i.options.asNavFor)for(;e<i.slideCount;)++o,e=t+i.options.slidesToScroll,t+=i.options.slidesToScroll<=i.options.slidesToShow?i.options.slidesToScroll:i.options.slidesToShow;else o=1+Math.ceil((i.slideCount-i.options.slidesToShow)/i.options.slidesToScroll);return o-1},e.prototype.getLeft=function(i){var e,t,o,s,n=this,r=0;return n.slideOffset=0,t=n.$slides.first().outerHeight(!0),!0===n.options.infinite?(n.slideCount>n.options.slidesToShow&&(n.slideOffset=n.slideWidth*n.options.slidesToShow*-1,s=-1,!0===n.options.vertical&&!0===n.options.centerMode&&(2===n.options.slidesToShow?s=-1.5:1===n.options.slidesToShow&&(s=-2)),r=t*n.options.slidesToShow*s),n.slideCount%n.options.slidesToScroll!=0&&i+n.options.slidesToScroll>n.slideCount&&n.slideCount>n.options.slidesToShow&&(i>n.slideCount?(n.slideOffset=(n.options.slidesToShow-(i-n.slideCount))*n.slideWidth*-1,r=(n.options.slidesToShow-(i-n.slideCount))*t*-1):(n.slideOffset=n.slideCount%n.options.slidesToScroll*n.slideWidth*-1,r=n.slideCount%n.options.slidesToScroll*t*-1))):i+n.options.slidesToShow>n.slideCount&&(n.slideOffset=(i+n.options.slidesToShow-n.slideCount)*n.slideWidth,r=(i+n.options.slidesToShow-n.slideCount)*t),n.slideCount<=n.options.slidesToShow&&(n.slideOffset=0,r=0),!0===n.options.centerMode&&n.slideCount<=n.options.slidesToShow?n.slideOffset=n.slideWidth*Math.floor(n.options.slidesToShow)/2-n.slideWidth*n.slideCount/2:!0===n.options.centerMode&&!0===n.options.infinite?n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)-n.slideWidth:!0===n.options.centerMode&&(n.slideOffset=0,n.slideOffset+=n.slideWidth*Math.floor(n.options.slidesToShow/2)),e=!1===n.options.vertical?i*n.slideWidth*-1+n.slideOffset:i*t*-1+r,!0===n.options.variableWidth&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,!0===n.options.centerMode&&(o=n.slideCount<=n.options.slidesToShow||!1===n.options.infinite?n.$slideTrack.children(".slick-slide").eq(i):n.$slideTrack.children(".slick-slide").eq(i+n.options.slidesToShow+1),e=!0===n.options.rtl?o[0]?-1*(n.$slideTrack.width()-o[0].offsetLeft-o.width()):0:o[0]?-1*o[0].offsetLeft:0,e+=(n.$list.width()-o.outerWidth())/2)),e},e.prototype.getOption=e.prototype.slickGetOption=function(i){return this.options[i]},e.prototype.getNavigableIndexes=function(){var i,e=this,t=0,o=0,s=[];for(!1===e.options.infinite?i=e.slideCount:(t=-1*e.options.slidesToScroll,o=-1*e.options.slidesToScroll,i=2*e.slideCount);t<i;)s.push(t),t=o+e.options.slidesToScroll,o+=e.options.slidesToScroll<=e.options.slidesToShow?e.options.slidesToScroll:e.options.slidesToShow;return s},e.prototype.getSlick=function(){return this},e.prototype.getSlideCount=function(){var e,t,o=this;return t=!0===o.options.centerMode?o.slideWidth*Math.floor(o.options.slidesToShow/2):0,!0===o.options.swipeToSlide?(o.$slideTrack.find(".slick-slide").each(function(s,n){if(n.offsetLeft-t+i(n).outerWidth()/2>-1*o.swipeLeft)return e=n,!1}),Math.abs(i(e).attr("data-slick-index")-o.currentSlide)||1):o.options.slidesToScroll},e.prototype.goTo=e.prototype.slickGoTo=function(i,e){this.changeSlide({data:{message:"index",index:parseInt(i)}},e)},e.prototype.init=function(e){var t=this;i(t.$slider).hasClass("slick-initialized")||(i(t.$slider).addClass("slick-initialized"),t.buildRows(),t.buildOut(),t.setProps(),t.startLoad(),t.loadSlider(),t.initializeEvents(),t.updateArrows(),t.updateDots(),t.checkResponsive(!0),t.focusHandler()),e&&t.$slider.trigger("init",[t]),!0===t.options.accessibility&&t.initADA(),t.options.autoplay&&(t.paused=!1,t.autoPlay())},e.prototype.initADA=function(){var e=this,t=Math.ceil(e.slideCount/e.options.slidesToShow),o=e.getNavigableIndexes().filter(function(i){return i>=0&&i<e.slideCount});e.$slides.add(e.$slideTrack.find(".slick-cloned")).attr({"aria-hidden":"true",tabindex:"-1"}).find("a, input, button, select").attr({tabindex:"-1"}),null!==e.$dots&&(e.$slides.not(e.$slideTrack.find(".slick-cloned")).each(function(t){var s=o.indexOf(t);i(this).attr({role:"tabpanel",id:"slick-slide"+e.instanceUid+t,tabindex:-1}),-1!==s&&i(this).attr({"aria-describedby":"slick-slide-control"+e.instanceUid+s})}),e.$dots.attr("role","tablist").find("li").each(function(s){var n=o[s];i(this).attr({role:"presentation"}),i(this).find("button").first().attr({role:"tab",id:"slick-slide-control"+e.instanceUid+s,"aria-controls":"slick-slide"+e.instanceUid+n,"aria-label":s+1+" of "+t,"aria-selected":null,tabindex:"-1"})}).eq(e.currentSlide).find("button").attr({"aria-selected":"true",tabindex:"0"}).end());for(var s=e.currentSlide,n=s+e.options.slidesToShow;s<n;s++)e.$slides.eq(s).attr("tabindex",0);e.activateADA()},e.prototype.initArrowEvents=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.off("click.slick").on("click.slick",{message:"previous"},i.changeSlide),i.$nextArrow.off("click.slick").on("click.slick",{message:"next"},i.changeSlide),!0===i.options.accessibility&&(i.$prevArrow.on("keydown.slick",i.keyHandler),i.$nextArrow.on("keydown.slick",i.keyHandler)))},e.prototype.initDotEvents=function(){var e=this;!0===e.options.dots&&(i("li",e.$dots).on("click.slick",{message:"index"},e.changeSlide),!0===e.options.accessibility&&e.$dots.on("keydown.slick",e.keyHandler)),!0===e.options.dots&&!0===e.options.pauseOnDotsHover&&i("li",e.$dots).on("mouseenter.slick",i.proxy(e.interrupt,e,!0)).on("mouseleave.slick",i.proxy(e.interrupt,e,!1))},e.prototype.initSlideEvents=function(){var e=this;e.options.pauseOnHover&&(e.$list.on("mouseenter.slick",i.proxy(e.interrupt,e,!0)),e.$list.on("mouseleave.slick",i.proxy(e.interrupt,e,!1)))},e.prototype.initializeEvents=function(){var e=this;e.initArrowEvents(),e.initDotEvents(),e.initSlideEvents(),e.$list.on("touchstart.slick mousedown.slick",{action:"start"},e.swipeHandler),e.$list.on("touchmove.slick mousemove.slick",{action:"move"},e.swipeHandler),e.$list.on("touchend.slick mouseup.slick",{action:"end"},e.swipeHandler),e.$list.on("touchcancel.slick mouseleave.slick",{action:"end"},e.swipeHandler),e.$list.on("click.slick",e.clickHandler),i(document).on(e.visibilityChange,i.proxy(e.visibility,e)),!0===e.options.accessibility&&e.$list.on("keydown.slick",e.keyHandler),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),i(window).on("orientationchange.slick.slick-"+e.instanceUid,i.proxy(e.orientationChange,e)),i(window).on("resize.slick.slick-"+e.instanceUid,i.proxy(e.resize,e)),i("[draggable!=true]",e.$slideTrack).on("dragstart",e.preventDefault),i(window).on("load.slick.slick-"+e.instanceUid,e.setPosition),i(e.setPosition)},e.prototype.initUI=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.show(),i.$nextArrow.show()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.show()},e.prototype.keyHandler=function(i){var e=this;i.target.tagName.match("TEXTAREA|INPUT|SELECT")||(37===i.keyCode&&!0===e.options.accessibility?e.changeSlide({data:{message:!0===e.options.rtl?"next":"previous"}}):39===i.keyCode&&!0===e.options.accessibility&&e.changeSlide({data:{message:!0===e.options.rtl?"previous":"next"}}))},e.prototype.lazyLoad=function(){function e(e){i("img[data-lazy]",e).each(function(){var e=i(this),t=i(this).attr("data-lazy"),o=i(this).attr("data-srcset"),s=i(this).attr("data-sizes")||n.$slider.attr("data-sizes"),r=document.createElement("img");r.onload=function(){e.animate({opacity:0},100,function(){o&&(e.attr("srcset",o),s&&e.attr("sizes",s)),e.attr("src",t).animate({opacity:1},200,function(){e.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading")}),n.$slider.trigger("lazyLoaded",[n,e,t])})},r.onerror=function(){e.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),n.$slider.trigger("lazyLoadError",[n,e,t])},r.src=t})}var t,o,s,n=this;if(!0===n.options.centerMode?!0===n.options.infinite?s=(o=n.currentSlide+(n.options.slidesToShow/2+1))+n.options.slidesToShow+2:(o=Math.max(0,n.currentSlide-(n.options.slidesToShow/2+1)),s=n.options.slidesToShow/2+1+2+n.currentSlide):(o=n.options.infinite?n.options.slidesToShow+n.currentSlide:n.currentSlide,s=Math.ceil(o+n.options.slidesToShow),!0===n.options.fade&&(o>0&&o--,s<=n.slideCount&&s++)),t=n.$slider.find(".slick-slide").slice(o,s),"anticipated"===n.options.lazyLoad)for(var r=o-1,l=s,d=n.$slider.find(".slick-slide"),a=0;a<n.options.slidesToScroll;a++)r<0&&(r=n.slideCount-1),t=(t=t.add(d.eq(r))).add(d.eq(l)),r--,l++;e(t),n.slideCount<=n.options.slidesToShow?e(n.$slider.find(".slick-slide")):n.currentSlide>=n.slideCount-n.options.slidesToShow?e(n.$slider.find(".slick-cloned").slice(0,n.options.slidesToShow)):0===n.currentSlide&&e(n.$slider.find(".slick-cloned").slice(-1*n.options.slidesToShow))},e.prototype.loadSlider=function(){var i=this;i.setPosition(),i.$slideTrack.css({opacity:1}),i.$slider.removeClass("slick-loading"),i.initUI(),"progressive"===i.options.lazyLoad&&i.progressiveLazyLoad()},e.prototype.next=e.prototype.slickNext=function(){this.changeSlide({data:{message:"next"}})},e.prototype.orientationChange=function(){var i=this;i.checkResponsive(),i.setPosition()},e.prototype.pause=e.prototype.slickPause=function(){var i=this;i.autoPlayClear(),i.paused=!0},e.prototype.play=e.prototype.slickPlay=function(){var i=this;i.autoPlay(),i.options.autoplay=!0,i.paused=!1,i.focussed=!1,i.interrupted=!1},e.prototype.postSlide=function(e){var t=this;t.unslicked||(t.$slider.trigger("afterChange",[t,e]),t.animating=!1,t.slideCount>t.options.slidesToShow&&t.setPosition(),t.swipeLeft=null,t.options.autoplay&&t.autoPlay(),!0===t.options.accessibility&&(t.initADA(),t.options.focusOnChange&&i(t.$slides.get(t.currentSlide)).attr("tabindex",0).focus()))},e.prototype.prev=e.prototype.slickPrev=function(){this.changeSlide({data:{message:"previous"}})},e.prototype.preventDefault=function(i){i.preventDefault()},e.prototype.progressiveLazyLoad=function(e){e=e||1;var t,o,s,n,r,l=this,d=i("img[data-lazy]",l.$slider);d.length?(t=d.first(),o=t.attr("data-lazy"),s=t.attr("data-srcset"),n=t.attr("data-sizes")||l.$slider.attr("data-sizes"),(r=document.createElement("img")).onload=function(){s&&(t.attr("srcset",s),n&&t.attr("sizes",n)),t.attr("src",o).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),!0===l.options.adaptiveHeight&&l.setPosition(),l.$slider.trigger("lazyLoaded",[l,t,o]),l.progressiveLazyLoad()},r.onerror=function(){e<3?setTimeout(function(){l.progressiveLazyLoad(e+1)},500):(t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"),l.$slider.trigger("lazyLoadError",[l,t,o]),l.progressiveLazyLoad())},r.src=o):l.$slider.trigger("allImagesLoaded",[l])},e.prototype.refresh=function(e){var t,o,s=this;o=s.slideCount-s.options.slidesToShow,!s.options.infinite&&s.currentSlide>o&&(s.currentSlide=o),s.slideCount<=s.options.slidesToShow&&(s.currentSlide=0),t=s.currentSlide,s.destroy(!0),i.extend(s,s.initials,{currentSlide:t}),s.init(),e||s.changeSlide({data:{message:"index",index:t}},!1)},e.prototype.registerBreakpoints=function(){var e,t,o,s=this,n=s.options.responsive||null;if("array"===i.type(n)&&n.length){s.respondTo=s.options.respondTo||"window";for(e in n)if(o=s.breakpoints.length-1,n.hasOwnProperty(e)){for(t=n[e].breakpoint;o>=0;)s.breakpoints[o]&&s.breakpoints[o]===t&&s.breakpoints.splice(o,1),o--;s.breakpoints.push(t),s.breakpointSettings[t]=n[e].settings}s.breakpoints.sort(function(i,e){return s.options.mobileFirst?i-e:e-i})}},e.prototype.reinit=function(){var e=this;e.$slides=e.$slideTrack.children(e.options.slide).addClass("slick-slide"),e.slideCount=e.$slides.length,e.currentSlide>=e.slideCount&&0!==e.currentSlide&&(e.currentSlide=e.currentSlide-e.options.slidesToScroll),e.slideCount<=e.options.slidesToShow&&(e.currentSlide=0),e.registerBreakpoints(),e.setProps(),e.setupInfinite(),e.buildArrows(),e.updateArrows(),e.initArrowEvents(),e.buildDots(),e.updateDots(),e.initDotEvents(),e.cleanUpSlideEvents(),e.initSlideEvents(),e.checkResponsive(!1,!0),!0===e.options.focusOnSelect&&i(e.$slideTrack).children().on("click.slick",e.selectHandler),e.setSlideClasses("number"==typeof e.currentSlide?e.currentSlide:0),e.setPosition(),e.focusHandler(),e.paused=!e.options.autoplay,e.autoPlay(),e.$slider.trigger("reInit",[e])},e.prototype.resize=function(){var e=this;i(window).width()!==e.windowWidth&&(clearTimeout(e.windowDelay),e.windowDelay=window.setTimeout(function(){e.windowWidth=i(window).width(),e.checkResponsive(),e.unslicked||e.setPosition()},50))},e.prototype.removeSlide=e.prototype.slickRemove=function(i,e,t){var o=this;if(i="boolean"==typeof i?!0===(e=i)?0:o.slideCount-1:!0===e?--i:i,o.slideCount<1||i<0||i>o.slideCount-1)return!1;o.unload(),!0===t?o.$slideTrack.children().remove():o.$slideTrack.children(this.options.slide).eq(i).remove(),o.$slides=o.$slideTrack.children(this.options.slide),o.$slideTrack.children(this.options.slide).detach(),o.$slideTrack.append(o.$slides),o.$slidesCache=o.$slides,o.reinit()},e.prototype.setCSS=function(i){var e,t,o=this,s={};!0===o.options.rtl&&(i=-i),e="left"==o.positionProp?Math.ceil(i)+"px":"0px",t="top"==o.positionProp?Math.ceil(i)+"px":"0px",s[o.positionProp]=i,!1===o.transformsEnabled?o.$slideTrack.css(s):(s={},!1===o.cssTransitions?(s[o.animType]="translate("+e+", "+t+")",o.$slideTrack.css(s)):(s[o.animType]="translate3d("+e+", "+t+", 0px)",o.$slideTrack.css(s)))},e.prototype.setDimensions=function(){var i=this;!1===i.options.vertical?!0===i.options.centerMode&&i.$list.css({padding:"0px "+i.options.centerPadding}):(i.$list.height(i.$slides.first().outerHeight(!0)*i.options.slidesToShow),!0===i.options.centerMode&&i.$list.css({padding:i.options.centerPadding+" 0px"})),i.listWidth=i.$list.width(),i.listHeight=i.$list.height(),!1===i.options.vertical&&!1===i.options.variableWidth?(i.slideWidth=Math.ceil(i.listWidth/i.options.slidesToShow),i.$slideTrack.width(Math.ceil(i.slideWidth*i.$slideTrack.children(".slick-slide").length))):!0===i.options.variableWidth?i.$slideTrack.width(5e3*i.slideCount):(i.slideWidth=Math.ceil(i.listWidth),i.$slideTrack.height(Math.ceil(i.$slides.first().outerHeight(!0)*i.$slideTrack.children(".slick-slide").length)));var e=i.$slides.first().outerWidth(!0)-i.$slides.first().width();!1===i.options.variableWidth&&i.$slideTrack.children(".slick-slide").width(i.slideWidth-e)},e.prototype.setFade=function(){var e,t=this;t.$slides.each(function(o,s){e=t.slideWidth*o*-1,!0===t.options.rtl?i(s).css({position:"relative",right:e,top:0,zIndex:t.options.zIndex-2,opacity:0}):i(s).css({position:"relative",left:e,top:0,zIndex:t.options.zIndex-2,opacity:0})}),t.$slides.eq(t.currentSlide).css({zIndex:t.options.zIndex-1,opacity:1})},e.prototype.setHeight=function(){var i=this;if(1===i.options.slidesToShow&&!0===i.options.adaptiveHeight&&!1===i.options.vertical){var e=i.$slides.eq(i.currentSlide).outerHeight(!0);i.$list.css("height",e)}},e.prototype.setOption=e.prototype.slickSetOption=function(){var e,t,o,s,n,r=this,l=!1;if("object"===i.type(arguments[0])?(o=arguments[0],l=arguments[1],n="multiple"):"string"===i.type(arguments[0])&&(o=arguments[0],s=arguments[1],l=arguments[2],"responsive"===arguments[0]&&"array"===i.type(arguments[1])?n="responsive":void 0!==arguments[1]&&(n="single")),"single"===n)r.options[o]=s;else if("multiple"===n)i.each(o,function(i,e){r.options[i]=e});else if("responsive"===n)for(t in s)if("array"!==i.type(r.options.responsive))r.options.responsive=[s[t]];else{for(e=r.options.responsive.length-1;e>=0;)r.options.responsive[e].breakpoint===s[t].breakpoint&&r.options.responsive.splice(e,1),e--;r.options.responsive.push(s[t])}l&&(r.unload(),r.reinit())},e.prototype.setPosition=function(){var i=this;i.setDimensions(),i.setHeight(),!1===i.options.fade?i.setCSS(i.getLeft(i.currentSlide)):i.setFade(),i.$slider.trigger("setPosition",[i])},e.prototype.setProps=function(){var i=this,e=document.body.style;i.positionProp=!0===i.options.vertical?"top":"left","top"===i.positionProp?i.$slider.addClass("slick-vertical"):i.$slider.removeClass("slick-vertical"),void 0===e.WebkitTransition&&void 0===e.MozTransition&&void 0===e.msTransition||!0===i.options.useCSS&&(i.cssTransitions=!0),i.options.fade&&("number"==typeof i.options.zIndex?i.options.zIndex<3&&(i.options.zIndex=3):i.options.zIndex=i.defaults.zIndex),void 0!==e.OTransform&&(i.animType="OTransform",i.transformType="-o-transform",i.transitionType="OTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.MozTransform&&(i.animType="MozTransform",i.transformType="-moz-transform",i.transitionType="MozTransition",void 0===e.perspectiveProperty&&void 0===e.MozPerspective&&(i.animType=!1)),void 0!==e.webkitTransform&&(i.animType="webkitTransform",i.transformType="-webkit-transform",i.transitionType="webkitTransition",void 0===e.perspectiveProperty&&void 0===e.webkitPerspective&&(i.animType=!1)),void 0!==e.msTransform&&(i.animType="msTransform",i.transformType="-ms-transform",i.transitionType="msTransition",void 0===e.msTransform&&(i.animType=!1)),void 0!==e.transform&&!1!==i.animType&&(i.animType="transform",i.transformType="transform",i.transitionType="transition"),i.transformsEnabled=i.options.useTransform&&null!==i.animType&&!1!==i.animType},e.prototype.setSlideClasses=function(i){var e,t,o,s,n=this;if(t=n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden","true"),n.$slides.eq(i).addClass("slick-current"),!0===n.options.centerMode){var r=n.options.slidesToShow%2==0?1:0;e=Math.floor(n.options.slidesToShow/2),!0===n.options.infinite&&(i>=e&&i<=n.slideCount-1-e?n.$slides.slice(i-e+r,i+e+1).addClass("slick-active").attr("aria-hidden","false"):(o=n.options.slidesToShow+i,t.slice(o-e+1+r,o+e+2).addClass("slick-active").attr("aria-hidden","false")),0===i?t.eq(t.length-1-n.options.slidesToShow).addClass("slick-center"):i===n.slideCount-1&&t.eq(n.options.slidesToShow).addClass("slick-center")),n.$slides.eq(i).addClass("slick-center")}else i>=0&&i<=n.slideCount-n.options.slidesToShow?n.$slides.slice(i,i+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"):t.length<=n.options.slidesToShow?t.addClass("slick-active").attr("aria-hidden","false"):(s=n.slideCount%n.options.slidesToShow,o=!0===n.options.infinite?n.options.slidesToShow+i:i,n.options.slidesToShow==n.options.slidesToScroll&&n.slideCount-i<n.options.slidesToShow?t.slice(o-(n.options.slidesToShow-s),o+s).addClass("slick-active").attr("aria-hidden","false"):t.slice(o,o+n.options.slidesToShow).addClass("slick-active").attr("aria-hidden","false"));"ondemand"!==n.options.lazyLoad&&"anticipated"!==n.options.lazyLoad||n.lazyLoad()},e.prototype.setupInfinite=function(){var e,t,o,s=this;if(!0===s.options.fade&&(s.options.centerMode=!1),!0===s.options.infinite&&!1===s.options.fade&&(t=null,s.slideCount>s.options.slidesToShow)){for(o=!0===s.options.centerMode?s.options.slidesToShow+1:s.options.slidesToShow,e=s.slideCount;e>s.slideCount-o;e-=1)t=e-1,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t-s.slideCount).prependTo(s.$slideTrack).addClass("slick-cloned");for(e=0;e<o+s.slideCount;e+=1)t=e,i(s.$slides[t]).clone(!0).attr("id","").attr("data-slick-index",t+s.slideCount).appendTo(s.$slideTrack).addClass("slick-cloned");s.$slideTrack.find(".slick-cloned").find("[id]").each(function(){i(this).attr("id","")})}},e.prototype.interrupt=function(i){var e=this;i||e.autoPlay(),e.interrupted=i},e.prototype.selectHandler=function(e){var t=this,o=i(e.target).is(".slick-slide")?i(e.target):i(e.target).parents(".slick-slide"),s=parseInt(o.attr("data-slick-index"));s||(s=0),t.slideCount<=t.options.slidesToShow?t.slideHandler(s,!1,!0):t.slideHandler(s)},e.prototype.slideHandler=function(i,e,t){var o,s,n,r,l,d=null,a=this;if(e=e||!1,!(!0===a.animating&&!0===a.options.waitForAnimate||!0===a.options.fade&&a.currentSlide===i))if(!1===e&&a.asNavFor(i),o=i,d=a.getLeft(o),r=a.getLeft(a.currentSlide),a.currentLeft=null===a.swipeLeft?r:a.swipeLeft,!1===a.options.infinite&&!1===a.options.centerMode&&(i<0||i>a.getDotCount()*a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else if(!1===a.options.infinite&&!0===a.options.centerMode&&(i<0||i>a.slideCount-a.options.slidesToScroll))!1===a.options.fade&&(o=a.currentSlide,!0!==t?a.animateSlide(r,function(){a.postSlide(o)}):a.postSlide(o));else{if(a.options.autoplay&&clearInterval(a.autoPlayTimer),s=o<0?a.slideCount%a.options.slidesToScroll!=0?a.slideCount-a.slideCount%a.options.slidesToScroll:a.slideCount+o:o>=a.slideCount?a.slideCount%a.options.slidesToScroll!=0?0:o-a.slideCount:o,a.animating=!0,a.$slider.trigger("beforeChange",[a,a.currentSlide,s]),n=a.currentSlide,a.currentSlide=s,a.setSlideClasses(a.currentSlide),a.options.asNavFor&&(l=(l=a.getNavTarget()).slick("getSlick")).slideCount<=l.options.slidesToShow&&l.setSlideClasses(a.currentSlide),a.updateDots(),a.updateArrows(),!0===a.options.fade)return!0!==t?(a.fadeSlideOut(n),a.fadeSlide(s,function(){a.postSlide(s)})):a.postSlide(s),void a.animateHeight();!0!==t?a.animateSlide(d,function(){a.postSlide(s)}):a.postSlide(s)}},e.prototype.startLoad=function(){var i=this;!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&(i.$prevArrow.hide(),i.$nextArrow.hide()),!0===i.options.dots&&i.slideCount>i.options.slidesToShow&&i.$dots.hide(),i.$slider.addClass("slick-loading")},e.prototype.swipeDirection=function(){var i,e,t,o,s=this;return i=s.touchObject.startX-s.touchObject.curX,e=s.touchObject.startY-s.touchObject.curY,t=Math.atan2(e,i),(o=Math.round(180*t/Math.PI))<0&&(o=360-Math.abs(o)),o<=45&&o>=0?!1===s.options.rtl?"left":"right":o<=360&&o>=315?!1===s.options.rtl?"left":"right":o>=135&&o<=225?!1===s.options.rtl?"right":"left":!0===s.options.verticalSwiping?o>=35&&o<=135?"down":"up":"vertical"},e.prototype.swipeEnd=function(i){var e,t,o=this;if(o.dragging=!1,o.swiping=!1,o.scrolling)return o.scrolling=!1,!1;if(o.interrupted=!1,o.shouldClick=!(o.touchObject.swipeLength>10),void 0===o.touchObject.curX)return!1;if(!0===o.touchObject.edgeHit&&o.$slider.trigger("edge",[o,o.swipeDirection()]),o.touchObject.swipeLength>=o.touchObject.minSwipe){switch(t=o.swipeDirection()){case"left":case"down":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide+o.getSlideCount()):o.currentSlide+o.getSlideCount(),o.currentDirection=0;break;case"right":case"up":e=o.options.swipeToSlide?o.checkNavigable(o.currentSlide-o.getSlideCount()):o.currentSlide-o.getSlideCount(),o.currentDirection=1}"vertical"!=t&&(o.slideHandler(e),o.touchObject={},o.$slider.trigger("swipe",[o,t]))}else o.touchObject.startX!==o.touchObject.curX&&(o.slideHandler(o.currentSlide),o.touchObject={})},e.prototype.swipeHandler=function(i){var e=this;if(!(!1===e.options.swipe||"ontouchend"in document&&!1===e.options.swipe||!1===e.options.draggable&&-1!==i.type.indexOf("mouse")))switch(e.touchObject.fingerCount=i.originalEvent&&void 0!==i.originalEvent.touches?i.originalEvent.touches.length:1,e.touchObject.minSwipe=e.listWidth/e.options.touchThreshold,!0===e.options.verticalSwiping&&(e.touchObject.minSwipe=e.listHeight/e.options.touchThreshold),i.data.action){case"start":e.swipeStart(i);break;case"move":e.swipeMove(i);break;case"end":e.swipeEnd(i)}},e.prototype.swipeMove=function(i){var e,t,o,s,n,r,l=this;return n=void 0!==i.originalEvent?i.originalEvent.touches:null,!(!l.dragging||l.scrolling||n&&1!==n.length)&&(e=l.getLeft(l.currentSlide),l.touchObject.curX=void 0!==n?n[0].pageX:i.clientX,l.touchObject.curY=void 0!==n?n[0].pageY:i.clientY,l.touchObject.swipeLength=Math.round(Math.sqrt(Math.pow(l.touchObject.curX-l.touchObject.startX,2))),r=Math.round(Math.sqrt(Math.pow(l.touchObject.curY-l.touchObject.startY,2))),!l.options.verticalSwiping&&!l.swiping&&r>4?(l.scrolling=!0,!1):(!0===l.options.verticalSwiping&&(l.touchObject.swipeLength=r),t=l.swipeDirection(),void 0!==i.originalEvent&&l.touchObject.swipeLength>4&&(l.swiping=!0,i.preventDefault()),s=(!1===l.options.rtl?1:-1)*(l.touchObject.curX>l.touchObject.startX?1:-1),!0===l.options.verticalSwiping&&(s=l.touchObject.curY>l.touchObject.startY?1:-1),o=l.touchObject.swipeLength,l.touchObject.edgeHit=!1,!1===l.options.infinite&&(0===l.currentSlide&&"right"===t||l.currentSlide>=l.getDotCount()&&"left"===t)&&(o=l.touchObject.swipeLength*l.options.edgeFriction,l.touchObject.edgeHit=!0),!1===l.options.vertical?l.swipeLeft=e+o*s:l.swipeLeft=e+o*(l.$list.height()/l.listWidth)*s,!0===l.options.verticalSwiping&&(l.swipeLeft=e+o*s),!0!==l.options.fade&&!1!==l.options.touchMove&&(!0===l.animating?(l.swipeLeft=null,!1):void l.setCSS(l.swipeLeft))))},e.prototype.swipeStart=function(i){var e,t=this;if(t.interrupted=!0,1!==t.touchObject.fingerCount||t.slideCount<=t.options.slidesToShow)return t.touchObject={},!1;void 0!==i.originalEvent&&void 0!==i.originalEvent.touches&&(e=i.originalEvent.touches[0]),t.touchObject.startX=t.touchObject.curX=void 0!==e?e.pageX:i.clientX,t.touchObject.startY=t.touchObject.curY=void 0!==e?e.pageY:i.clientY,t.dragging=!0},e.prototype.unfilterSlides=e.prototype.slickUnfilter=function(){var i=this;null!==i.$slidesCache&&(i.unload(),i.$slideTrack.children(this.options.slide).detach(),i.$slidesCache.appendTo(i.$slideTrack),i.reinit())},e.prototype.unload=function(){var e=this;i(".slick-cloned",e.$slider).remove(),e.$dots&&e.$dots.remove(),e.$prevArrow&&e.htmlExpr.test(e.options.prevArrow)&&e.$prevArrow.remove(),e.$nextArrow&&e.htmlExpr.test(e.options.nextArrow)&&e.$nextArrow.remove(),e.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden","true").css("width","")},e.prototype.unslick=function(i){var e=this;e.$slider.trigger("unslick",[e,i]),e.destroy()},e.prototype.updateArrows=function(){var i=this;Math.floor(i.options.slidesToShow/2),!0===i.options.arrows&&i.slideCount>i.options.slidesToShow&&!i.options.infinite&&(i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false"),0===i.currentSlide?(i.$prevArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$nextArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-i.options.slidesToShow&&!1===i.options.centerMode?(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")):i.currentSlide>=i.slideCount-1&&!0===i.options.centerMode&&(i.$nextArrow.addClass("slick-disabled").attr("aria-disabled","true"),i.$prevArrow.removeClass("slick-disabled").attr("aria-disabled","false")))},e.prototype.updateDots=function(){var i=this;null!==i.$dots&&(i.$dots.find("li").removeClass("slick-active").end(),i.$dots.find("li").eq(Math.floor(i.currentSlide/i.options.slidesToScroll)).addClass("slick-active"))},e.prototype.visibility=function(){var i=this;i.options.autoplay&&(document[i.hidden]?i.interrupted=!0:i.interrupted=!1)},i.fn.slick=function(){var i,t,o=this,s=arguments[0],n=Array.prototype.slice.call(arguments,1),r=o.length;for(i=0;i<r;i++)if("object"==typeof s||void 0===s?o[i].slick=new e(o[i],s):t=o[i].slick[s].apply(o[i].slick,n),void 0!==t)return t;return o}});

/*------------------------------------*\
        ::Accordion
\*------------------------------------*/
jQuery(function($){
    var $allTitles = $('.js-accordion-title');
    $allTitles.on('click', function(){
        var $this = $(this);
          if(!$this.hasClass('accordion-active')){
            $allTitles
                .removeClass('accordion-active')
                    .next()
                        .slideUp();
            $this
                .addClass('accordion-active')
                .next()
                    .slideDown();
        } else {
            $this
                .removeClass('accordion-active')
                .next()
                    .slideUp();
        }
    });
});

var activateAnimation = function() {
	$(".js-line-animation, .js-ease, .js-from-left, .js-scale").each(function(){
		var $this = $(this);
		$this.addClass('active');
		$this.bind('inview', function (event, visible) {
			var $that = $(this);
			if (visible === true && !$that.hasClass('active')) {
				$that.addClass('active');
			} else {
				return false;
			}
		});
	});
};

function hoverStick(resources){
	$(resources[0]).addClass('active');

	resources.on('mouseenter', function(r){
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
	});
}

function addFlash(parent){
	parent.bind('inview', function (event, visible) {
		var $this = $(this);
		if (visible && !$this.hasClass('flashed')){
			$this.addClass('flashed');
			$this.children().each(function(i, el){
				setTimeout(function(){
					$(el).addClass('flashing');
				}, i * 400);
			});
		}
	});
}

jQuery(function($){
	$(function () {
		$(window).scroll();
	});
	activateAnimation();
	hoverStick($('.resources__all').children());
	addFlash($('.footer__social'));
});

/*------------------------------------*\
	::Ajax Requests
\*------------------------------------*/

// get testimonials by term
var term_ajax_get = function(options, animate, callback) {
	var $loader = $('.loading');
	var $pager = $('#pagination');
	var $wrapper = $(options.wrapper) || null;
	var postsPerPage = options.postsPerPage || 8;
	var page = options.page || 0;
	var name = options.name || null;
	var categoryName = options.categoryName || null;
	var term = {
		id: options.term && options.term.id ? options.term.id : null,
		name: options.term && options.term.name ? options.term.name : null,
		slug: options.term && options.term.slug ? options.term.slug : null,
	};
	var postID = options.postID || null;
	var tag = {
		slug: options.tag && options.tag.slug ?  options.tag.slug : null,
		name: options.tag && options.tag.name ?  options.tag.name : null,
	};
	var action = options.action || null;
	var type = options.type || null;

	$loader.addClass('active');

	if (type !== 'infiniteScroll') {
		// reset pager with each load;
		$wrapper.html('');
		$pager.html('');
	}

	$.ajax({
		type: 'POST',
		url: ajax_posts.ajaxurl,
		data: {
			'action': action,
			'term': term.id,
			'page': page,
			'categoryName': categoryName,
			'postsPerPage': postsPerPage,
			'tag': tag.slug,
			'postID': postID,
			'name' : name,
		},
		success: function(response) {
			var res = JSON.parse(response);
			var totalPages = res['total_pages'] ? Math.ceil(parseFloat(res['total_pages'])) : 0;

			if (page > 0 && type === 'infiniteScroll'){
				$wrapper.append(res.output);
			} else {
				$wrapper.html(res.output);
			}

			if (totalPages > 1) {
				$pager.html(buildPager(page, totalPages));
				var $pagerOptions = $pager.find('button');
				$pagerOptions.each(function() {
					$(this).not('.current').on('click', function(e) {
						e.preventDefault();
						options.page = $(this).val();
						options.pushed = false;
						term_ajax_get(options, true);
					})
				})
			}

			var urlUpdateObj = { }

			if (tag.slug !== null) urlUpdateObj['tag'] = tag.slug;
			if (term.slug !== null) urlUpdateObj['category'] = term.slug;
			if (term.id !== null) urlUpdateObj['id'] = term.id;
			if (postID !== null) urlUpdateObj['postID'] = postID;
			if (name !== null) urlUpdateObj['name'] = name;
			urlUpdateObj['page'] = page;

			helpers.pushLocation(options, urlUpdateObj, function(stateUpdate) {
				term_ajax_get(stateUpdate, true);
				filterOptions('#category-filters', stateUpdate);
				filterTestOptions('.testimonials__navigation', stateUpdate)
			});

			if (animate) {
				$('html, body').animate({
					scrollTop: $('.section-header').offset().top - 100
				}, 500);
			}

			$loader.removeClass('active');
			if (callback) callback();

			return false;
		},
		error: function(err) {
				console.error(err)
		}
	});
}

var urlParams = helpers.urlParams;

// implementation
$(document).ready(function() {
	var $totop = $('.scrolltoTop');
	var buttonClicked;
	var options = {
		page: 0,
		tag: {},
		term: {},
	};
	var urlParams = {};

	if (window.location.search.length > 0) {
		urlParams = helpers.urlParams;
	}

	$('.filters.dropdown').on('click', function() {
		$(this).toggleClass('is-active');
	})

	if ($('.post-category').length > 0) {
		options.wrapper = '.post-category .content';
		options.action = 'load-filter3';
		options.categoryName = $('.post-category').data('category-slug');

		options.page = urlParams.page !== 'undefined' ? urlParams.page : 0;
		if (urlParams.tag) options.tag['slug'] = urlParams.tag;
		if (urlParams.id) options.term['id'] = urlParams.id;

		term_ajax_get(options);
		filterOptions('#category-filters', options, true)
	}

	if ($('.testimonials__navigation').length > 0) {
		options.action = 'load-filter2';
		options.wrapper = '.testimonials__wrapper';
		options.type = 'infiniteScroll';
		getTestimonials(options);
	}

	function getTestimonials (options) {
		var $list = $('.testimonials__inner');
		var $filters  = $('.testimonials__navigation');
		options['bottom'] = 0;
		options['loadMore'] = true;

		// checks to see if the URL is passing queries to filter testimonials
		// categories options added from module-taxonomy.php
		if (urlParams.termID || urlParams.category) {
			options.term = urlParams.category ? (categories.find( category => category.slug === urlParams.category)) : (categories.find( category => category.id === parseInt(urlParams.termID)));
			// add active class with located term
			$('.testimonials__navigation').find("[value='" + options.term.id + "']").addClass('active');
		} else if (urlParams.postID) {
			options['postID'] = isNaN(parseInt(urlParams.postID)) ? 0 : parseInt(urlParams.postID);
			options.loadMore = false;
		} else if (urlParams.individual) {
			options['name'] = helpers.slugify(urlParams.individual);
			options.loadMore = false;
		} else {
			$('.view-all').addClass('active')
		}

		term_ajax_get(options);

		$filters.bind('inview', function (event, visible) {
			if (visible === true) {
				$totop.removeClass('visible');
			} else {
				$totop.addClass('visible');
			}
		});

		$totop.click(function() {
			$('html, body').animate({scrollTop: 0}, 800);
		});

		if (options.loadMore) {
			var last_known_scroll_position = 0;
			var run = true;

			function doSomething() {
			  // do something with the scroll position
				options['page'] = options.page + 1;
				term_ajax_get(options, false, function () {
					options['bottom'] = getBottom()
					run = true;
				});
			}
			window.addEventListener('scroll', function(e) {
				last_known_scroll_position = window.scrollY;
			  if (run && options.bottom < last_known_scroll_position) {
			    window.requestAnimationFrame(function() {
						run = false;
			      doSomething();
			    });
			  }
			});
		}

		filterTestOptions('.testimonials__navigation', options, true)
	}
});

function getBottom () {
	var $list = $('.testimonials__inner');
	return $list.position().top + $list.outerHeight(true) - 600;
}

function filterTestOptions(filterButtonList, options, init) {
	var $filter = $(filterButtonList);
	var $buttons = $filter.find('button');
	var slug = categories.find( category => category.id === parseInt(options.term.id));

	$buttons.each(function() {
		var $this = $(this);
		if (slug && parseInt($this.val()) === slug.id) {
			$this.addClass('active').siblings().removeClass('active');
		}

		if (init) {
			$this.click(function() {
				$this.addClass('active').siblings().removeClass('active');
				resetOptions(options)
				options['term'] = categories.find( category => category.id === parseInt($this.val()));
				options['page'] = 0;
				term_ajax_get(options, false, function() {
					options['bottom'] = getBottom();
				});
			})
		}
	})

	function resetOptions (options) {
		// var options = options || {};
		options['page'] = 0;
		options['name'] = null;
		options['postID'] = null;
		options['loadMore'] = true;
		return options;
	}
}

function filterOptions (filterButtonContainer, options, initClicks) {
	var $catFilters = $(filterButtonContainer);
	if (options.tag) var slug = options.tag.slug
	if (options.term) var slug = options.term.id

	if ($catFilters.length === 0) return;
	var $buttons = $catFilters.find('button');
	var $selectedTopic = $catFilters.find('.trigger');
	var slug = slug || null;

	if ($buttons.length > 0) {
		$buttons.each(function() {
			var $this = $(this);

			if (slug) {
				if (helpers.slugify($this.val()) === slug) {
					$this.addClass('current').siblings().removeClass('current');
					if ($selectedTopic.length > 0) $selectedTopic.text($this.text());
				}
			} else {
				$selectedTopic.text('Select a Series');
			}

			if (initClicks) {
				$this.on('click', function(e) {
					e.preventDefault();
					if ($this.hasClass('current')) return false;
					options.page = 0;
					options.tax = $this.attr('data-taxonoomy');
					options.term = {
						name: $this.text(),
						id: $this.val(),
						// slug: helpers.slugify($this.text()),
					};
					term_ajax_get(options, true);
					$this.addClass('current').siblings().removeClass('current');
					// update topic message
					if ($selectedTopic.length > 0) {
						if ($this.val()) {
							// $selectedTopic.text($this.text());
						} else {
							$selectedTopic.text('Select a Series');
						}
					}
				})
			}
		})
	}
	if ($selectedTopic.is(':hidden')) $selectedTopic.show();
}

function buildPager (currentPage, totalPages) {
	var currentPage = parseInt(currentPage) + 1;
	var idealRange = 1;
	var start = currentPage - idealRange;
	var end = idealRange + currentPage;
	var pagerRange = {
		start: start < 1 ? 1 : start,
		end: end > totalPages ? totalPages : end,
	}
	var range = _.range(pagerRange.start, pagerRange.end + 1);
	if (!_.includes(range, 1)) {
		range.unshift(1);
	}
	if (!_.includes(range, totalPages)) {
		range.push(totalPages);
	}

	// built links
	var result = '';
	var i = 0;
	do {
		var pageTitle = range[i];
		// replacing 0 index
		var page = range[i] - 1;
		// convert to words on first or last
		if (range[i] === 1 && idealRange < (currentPage - (idealRange + 1))) {
			pageTitle = 'Newer';
		} else if (range[i] === totalPages && totalPages > (currentPage + idealRange + 1)) {
			pageTitle = 'Older(' + range[i] + ')';
		}
		// make buttons and add current to current page
		if (page === currentPage - 1) {
			result +=`<button class="current" value="${page}">${pageTitle}</button>`;
		} else {
			result += `<button value="${page}">${pageTitle}</button>`;
		}
		i++;
	} while (range[i]);

	return result;
}

/*------------------------------------*\
    ::Archive Drawer
\*------------------------------------*/
var archiveDrawer = function(){
    var $archive = $('#archive');
    $archive.on('click', function(){
        $('#archive-drawer').toggleClass('open');
    });
};

jQuery(function($){
	archiveDrawer();
});
var handleStateDropdownSelection = function () {
	$('#broker-state-select').change(function () {
		if (window.innerWidth <= 800 || typeof map === 'undefined') {
			window.location.assign(site.site_url + '/commercial-real-estate-agent/' + stateNameFromAbbr(this.value));
		} else {
			zoomToState(this.value);
		}
	});
};


var zoomToState = function (stateAbbr) {
	if (!stateShapes.hasOwnProperty(stateAbbr)){return false;}

	map.data.revertStyle();
	map.data.overrideStyle(stateShapes[stateAbbr], { fillColor: hoverColor });

	if (stateBounds.hasOwnProperty(stateAbbr)){
		map.fitBounds(stateBounds[stateAbbr]);
	} else {
		var _bounds = new google.maps.LatLngBounds();

		stateShapes[stateAbbr].getGeometry().forEachLatLng(function(path) {
			_bounds.extend(path);
		});

		if (_bounds){
			stateBounds[stateAbbr] = _bounds;
			map.fitBounds(_bounds);
		}
	}
	stateZoom = map.getZoom();

	// $('.broker-verticals').show();

	if (brokersFetched.indexOf(stateAbbr) < 0) {
		$.post(postURL, { 'stateAbbr' : stateAbbr }, function(brokers) {
			var	marker,
				broker,
				regions = [],
				brokerData = $.parseJSON(brokers);

			var brokerRegions = _.groupBy(brokerData, 'brokerRegion');

			$.each(brokerRegions, function(i, region) {
				var stateSlug = helpers.slugify(region[0].brokerState.label);
				var regionSlug = helpers.slugify(i);
				var brokerLng = _.meanBy(region, function(lng) {
					return parseFloat(lng.brokerLng);
				});
				var brokerLat = _.meanBy(region, function(lat) {
					return parseFloat(lat.brokerLat);
				});
				var brokerCount = region.length > 1 ? ', '+ (region.length).toString() + ' Brokers' : '';
				regions.push({
					lat: brokerLat,
					lng: brokerLng,
					title: i + brokerCount,
					count: brokerCount,
					url: site.site_url + '/commercial-real-estate-agent/' + stateSlug + '?region=' + regionSlug,
				})
			});

			$.each(regions, function (i, region) {
				marker = new google.maps.Marker({
					icon: {
						size: new google.maps.Size(33, 42),
						scaledSize: new google.maps.Size(33, 42),
						url: site.theme_url+'/images/FindaBroker_Icon_2.png'
					},
					position: new google.maps.LatLng(region.lat, region.lng),
					title: region.title,
					url: region.url,
					map: map,
				});

				markers.push(marker);
				marker.addListener('click', function() {
					window.location.href = this.url
				});

			});

			brokersFetched.push(stateAbbr);
		});
	}

	var stateName = stateNameFromAbbr(stateAbbr);
	if (stateName){
		$('#brokers-state-link').text('See Our ' + statesWithBrokerCoverage[stateAbbr] + ' Team ').prop('href', site.site_url + '/commercial-real-estate-agent/' + stateName).fadeIn();
	} else {
		// failsafe if clickable element loaded but there is no coverage. This should never happen.
		$('#brokers-state-link').text('No Brokers Available').prop('href', '#').fadeIn();
	}
};


var stateNameFromAbbr = function(abbr){
	var _name = '';
	if (statesWithBrokerCoverage.hasOwnProperty(abbr)){
		_name = statesWithBrokerCoverage[abbr];
	}
	return helpers.slugify(_name);
}


jQuery(function($) {
	// captureActiveVerticals();
	handleStateDropdownSelection();
});


var $brokerRegions = $('section.brokers');
if ($brokerRegions.length > 0 && helpers.findParam('region')) {
	var primary = $brokerRegions.find('.' + helpers.findParam('region'))
	primary.remove();
	primary.clone().prependTo('section.brokers')
}

var $brokerContactContainer = $('.contact-info-container');
if ($brokerContactContainer.length > 0) {
	$.each($brokerContactContainer, function() {
		var $contactContainer = $(this);
		var $contactsInfo = $contactContainer.find('.contact-info');
		var $contactReveal = $contactContainer.find('.contact-info-reveal');

		$.each($contactsInfo, function() {
			var contactString = $(this).attr('data-contact-info');
			$(this).hover(function() {
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				$contactReveal.addClass('active');
				$contactReveal.html(contactString);
			})
		});
	});
}

/*------------------------------------*\
    ::Broker Filter
\*------------------------------------*/
var filterBrokers = function(){
	var $filters = $('#js-broker-filter').find('input'),
		$brokers = $('.js-broker');

	$filters.on('change', function(evt){
		var chosen = evt.target.value;

		$brokers.addClass('hidden');

		if (chosen === 'all'){
			$brokers.removeClass('hidden');
		} else {
			$brokers.each(function(){
				var $broker = $(this);

				if ($.inArray(chosen, $broker.data('verticals')) > -1){
					$broker.removeClass('hidden');
				}
			});
		}
	});
};

jQuery(function($){
	filterBrokers();
});

function comparisonator(wrapper) {
	var _uls, _lis, other,
		li_map = [];

	wrapper.each(function(i){
		_uls = $(this).find('ul');

		if (_uls.length === 2) {
			// equalize_height(_uls);

			// $(window).resize(function(){
			// 	equalize_height(_uls);
			// });

			_uls.each(function(i){
				_lis = $(this).children();
				li_map[i] = _lis;

				_lis.on('click mouseenter', function(e){
					var index = $(this).index();
					other = i ? 0 : 1;

					li_map[other].removeClass('flash');
					li_map[other][index].classList.add('flash');
				});
			});
		}
	});
};

// commenting this codes usage out but could be useful later
function equalize_height(uls){
	var lis1 = uls[0].children,
		lis2 = uls[1].children;

	for (var i = 0; i < lis1.length; i++) {
			var row1Height = $(lis1[i]).outerHeight(true);
		var row2Height = $(lis2[i]).outerHeight(true);

		var h = Math.max(row1Height, row2Height);
		lis1[i].style.height = h + 'px';
		lis2[i].style.height = h + 'px';
	}
}

jQuery(function($){
	var comparisons = $('.comparison__wrapper');

	if (comparisons.length){
		comparisonator(comparisons);
	}
});

(function($) {

  var $formElements = $('.wpcf7-form-control-wrap');

  $.each($formElements, function() {
    var $this = $(this);
    var $colEle = $this.find("[class*='col']");
    if ($colEle.length > 0) {
      var colEleClassList = $colEle[0].classList;
      colEleClassList.forEach(function(c) {
        if (c.includes('col')) {
          $this.addClass(c);
        }
      });
    }
  });

  $('.wpcf7-recaptcha').parent().addClass('wpcf7-recaptcha')
  $('.wpcf7-submit').wrap('<div class="wpcf7-submit"></div>')

})(jQuery)

// var wpcf7Elm = document.querySelector( '.wpcf7' );
//
// wpcf7Elm.addEventListener( 'wpcf7submit', function( event ) {
//     alert( "Fire!" );
//     console.log(event);
// }, false );
// wpcf7Elm.addEventListener( 'wpcf7invalid', function( event ) {
//     alert( "Fire invalid!" );
//     console.log(event);
// }, false );

// Resize reCAPTCHA to fit width of container
// Since it has a fixed width, we're scaling
// using CSS3 transforms
// ------------------------------------------
// captchaScale = containerWidth / elementWidth

// function scaleCaptcha(elementWidth) {
//   // Width of the reCAPTCHA element, in pixels
//   var reCaptchaWidth = 304;
//   // Get the containing element's width
// 	var containerWidth = $('.container').width();
//
//   // Only scale the reCAPTCHA if it won't fit
//   // inside the container
//   if(reCaptchaWidth > containerWidth) {
//     // Calculate the scale
//     var captchaScale = containerWidth / reCaptchaWidth;
//     // Apply the transformation
//     $('.g-recaptcha').css({
//       'transform':'scale('+captchaScale+')'
//     });
//   }
// }
//
// $(function() {
//
//   // Initialize scaling
//   scaleCaptcha();
//
//   // Update scaling on window resize
//   // Uses jQuery throttle plugin to limit strain on the browser
//   $(window).resize( $.throttle( 100, scaleCaptcha ) );
// })

/*------------------------------------*\
    ::Hero CTA
\*------------------------------------*/
var heroCTA = function(){
	var $hero = $('#hero-cta');

    if(0 < $hero.length){
        var stickyTop = $('#hero-cta').offset().top - 150;

    	$(window).on( 'scroll', function(){
            if ($(window).scrollTop() >= stickyTop) {
                $('#hero-cta').addClass('stick');
            } else {
                $('#hero-cta').removeClass('stick');
            }
        });
    }
};

var backgroundPos = function(){
	var $hero_bg = $('.hero__background');
	if(0 < $hero_bg.length){
		var $background = $hero_bg.css('background-image');
        if (($background.indexOf('Golden-Ridge') >= 0) || ($background.indexOf('New-Aurora') >= 0)) {
			$hero_bg.css('background-position', 'bottom');
		}
    }
};


jQuery(function($){
	heroCTA();
	backgroundPos();
});

$(document).ready(function () {
  $('._hero-image__background--fixed').addClass('hero-image__background--fixed');

});

/*------------------------------------*\
  ::Sticky Header
\*------------------------------------*/
jQuery(function($) {
  var didScroll;
  var lastScrollTop = 0;
  var delta = 1;
  var logoWidth = $('.head-nav__logo').outerWidth();
  var navbarHeight = $('.main-head__nav').outerHeight();

  $(window).scroll(function(event){
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 250);

  function hasScrolled() {
    var $mNav = $('.main-head__trigger');
    if(!$mNav.hasClass('active')) { // if the nav is open don't shrink header
      var st = $(this).scrollTop();
      // Make sure they scroll more than delta
      if(Math.abs(lastScrollTop - st) <= delta)
        return;
      // If they scrolled down and are past the navbar, add class .nav-up.
      // This is necessary so you never see what is "behind" the navbar.
      if (st > lastScrollTop && st > navbarHeight){
        // Scroll Down
        $('.main-head__nav').removeClass('nav--show').addClass('nav--hidden');
      } else {
        // Scroll Up
        if(st + $(window).height() < $(document).height()) {
          $('.main-head__nav').removeClass('nav--hidden').addClass('nav--show');
        }
      }
      lastScrollTop = st;
    }
  }
});


/*
*  Mobile Nav Functionality
*  Submenu Dropdowns
*/
var mobileNav = (function() {
  // $( '.head-nav__mobile .menu-item-has-children' ).doubleTapToGo();
  var $hasChildren = $( '.head-nav__mobile .menu-item-has-children' );
  $hasChildren.each(function(index) {
    var $liWithChild = $(this);
    $liWithChild.click( function(e) {
      $(this).siblings().removeClass('active').find( '.sub-menu' ).removeClass('active');
      if (!($( this ).hasClass( 'active' ))) {
        e.preventDefault();
        $( this ).find( '.sub-menu' ).addClass('active');
      }
      $( this ).addClass( 'active' );
    });
  });
})();

/*
*  Hamburger Helper Animation
*/
var hamburgerHelper = (function() {
  $("#hamburger-6").click(function(){
    $('#head-nav__phone').removeClass("is-active");

    $(this).toggleClass("is-active");
    $('#head-nav__mobile').toggleClass("is-active");

    $(this).hasClass('is-active') ? $('body').addClass('is-active') : $('body').removeClass('is-active');
  });

  $("#mobile-telephone").click(function(e){
    e.preventDefault();

    $('#hamburger-6').removeClass("is-active");
    $('#head-nav__mobile').removeClass("is-active");

    $('#head-nav__phone').toggleClass("is-active");

    $('#head-nav__phone').hasClass('is-active') ? $('body').addClass('is-active') : $('body').removeClass('is-active');
  });
})();

/*
*  Desktop Nav Functionality
*  Submenu Dropdowns
*/
var desktopNav = (function() {
  // $( '.head-nav__desktop .menu-item-has-children' ).mouseenter( function() {
  //   $( this ).find( '.sub-menu' ).addClass('slide');
  // });
  //
  // $( '.head-nav__desktop .menu-item-has-children' ).mouseleave( function() {
  //   $( this ).find( '.sub-menu' ).removeClass('slide');
  // });
})();


// jQuery(function($){
//   desktopNav();
//   mobileNav();
//   hamburgerHelper();
// });

/*------------------------------------*\
    ::Popout
\*------------------------------------*/
var popout = function(){
    var $popup = $('#js-youtube-popout-root');
    $('.js-popout-play-button').on('click', function() {
        var $this = $(this);
        var $content = $this.siblings('.js-youtube-popout');
        $popup.addClass('active');
        console.log($content);
        $popup.html($content.clone());
    });
    $('.js-popout-has-buttons').on('click', '.js-popout-play-button', function() {
        // console.log('yes');
        var $this = $(this);
        var $content = $this.siblings('.js-youtube-popout');
        $popup.addClass('active');
        $popup.html($content.clone());
    });

    // /*DEBUG*/$('.play-button').eq(0).trigger('click');

    $popup.on('click', '.js-close', function() {
        $popup.html('');
        $popup.removeClass('active');
    });
};

jQuery(function($){
    popout();
});

var slider = function() {
	var navAmount = $( ".slider__slide-content" ).length;
	$('.js-slide-content').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: false,
		autoplay: true,
		autoplaySpeed: 4000,
		asNavFor: '.js-slide-nav',
		variableWidth: false,
	});
	$('.js-slide-nav').slick({
		slidesToShow: navAmount,
		asNavFor: '.js-slide-content',
		variableWidth: true,
		focusOnSelect: true,
	});
	$('.slider__prev').on('click', function(){
		$('.js-slide-content').slick("slickPrev");
	});
	$('.slider__next').on('click', function(){
		$('.js-slide-content').slick("slickNext");
	});
	if ($('.slider__slide-nav.see-all-container').length > 0) {
		$('.slider__slide-nav.see-all-container').detach().appendTo('.js-slide-nav .slick-track');
	}
};

var TestimonialSlider = function() {
	var faderholder = document.querySelectorAll('.module-testimonial-slider__quotes');

	for (var f = 0; f < faderholder.length; f++) {
		fade_em(faderholder[f]);
	}

	function fade_em(parent){
		var index = 1,
			children = parent.children,
			count = children.length - 1, // align with zero-based array access
			interval,
			delay = 4000,
			maxH = 180;

		for (var c = 0; c <= count; c++) {
			maxH = Math.max(maxH, children[c].clientHeight);
		}
		parent.style.height = maxH + 'px';

		children[0].classList.add('shown');

		interval = setInterval(function(){
			fade_to(index);
		}, delay);

		parent.parentNode.parentNode.parentNode.addEventListener('click', function(evt){ // go stupid. get dumb.
			if (evt.target.classList.contains('module-testimonial-slider__nav')){
				clearInterval(interval);

				if (evt.target.classList.contains('module-testimonial-slider__prev')){
					index = get_prev(get_prev(index));
					fade_to(index);
				} else {
					fade_to(index);
				}

				interval = setInterval(function(){
					fade_to(index);
				}, delay);
			}
		});

		var fade_to = function(i){
			for (var s = 0; s <= count; s++) {
				if (children[s].classList.contains('shown')){
					children[s].classList.remove('shown');
				}
			}

			children[i].classList.add('shown');

			index = get_next(i);
		}

		var get_next = function(i){
			var next = i + 1;
			if (next > count){
				next = 0;
			}

			return next;
		}

		var get_prev = function(i){
			var prev = i - 1;
			if (prev < 0){
				prev = count;
			}

			return prev;
		}
	}
};

var imageGallery = function() {
	var gallerySlider = $('.js-image-content'),
		galleryNav = $('.js-image-nav');

	gallerySlider.slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: true,
	}).on('beforeChange', function(evt, slick, cur, next){
		galleryNav.find('.slick-current').removeClass('slick-current').end().children().eq(next).addClass('slick-current');
	});

	galleryNav.on('click', function(e){
		if (e.target.nodeName === 'IMG'){
			gallerySlider.slick('slickGoTo', $(this.children).index(e.target.parentNode));
		}
	});

	$('.image__prev').on('click', function(){
		gallerySlider.slick('slickPrev');
	});
	$('.image__next').on('click', function(){
		gallerySlider.slick('slickNext');
	});
};

var twoColSlider = function() {
	$('.js-two-col-slider').slick({
		infinite: true,
		autoplay: true,
		autoplaySpeed: 5000,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		fade: true,
		adaptiveHeight: false,
	});
};


var events = function(count) {
	var $number = parseInt(count);

	$('.js-events-slider').slick({
		infinite: false,
		slidesToShow: 3,
		arrows: false,
		slidesToScroll: 1,
		initialSlide: $number,
		responsive: [
			{
			  breakpoint: 900,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});

	$('.event__prev').on('click', function(){
		$('.js-events-slider').slick("slickPrev");
	});
	$('.event__next').on('click', function(){
		$('.js-events-slider').slick("slickNext");
	});
};


jQuery(function($){
	slider();
	TestimonialSlider();
	twoColSlider();
	imageGallery();
	events($('.first').first().attr('data-counter'));
});

/*
*  YouTube API
*  Only executes if '.ytvideo' is on page
*/
if( $( '.ytvideo' ).length ) {
	//take all the elements (and their data attributes) that have the class 'ytvideo' and create array
	var playerInfoList = $( '.ytvideo' ).map(function() {
		var $loop = 0;
		var $autoplay = 0;
		var $mute = 0;

		if ( $(this).attr('data-loop') === 'true' ) {
			var $loop = 1;
		}
		if ( $(this).attr('data-autoplay') === 'true' ) {
			var $autoplay = 1;
		}

		if ( $(this).attr('data-mute') === 'true' ) {
			var $mute = 1;
		}
		return {
			id: $(this).attr('id'),
			videoId: $(this).attr('data-videoid'),
			autoplay: $autoplay,
			loop: $loop,
			mute: $mute,
		};
	}).get();


	var tag = document.createElement('script');
	tag.src = "https://www.youtube.com/iframe_api";
	var firstScriptTag = document.getElementsByTagName('script')[0];
	firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

	//when YT API is ready create players and pass it the parameters set by the user and found in the data attributes
	function onYouTubeIframeAPIReady() {
		if (typeof playerInfoList === 'undefined') return;

		if((typeof YT !== "undefined") && YT && YT.Player){
			for (var i = 0; i < playerInfoList.length; i++) {
				var curplayer = createPlayer(playerInfoList[i]);
				players[i] = curplayer;
			}
		}else{
			setTimeout(onYouTubeIframeAPIReady, 100);
		}
	}

	var players = new Array();

	function createPlayer(playerInfo) {

		return new YT.Player(playerInfo.id, {
			identifier: playerInfo.id,
			videoId: playerInfo.videoId,
			playerVars: {
				'autoplay': playerInfo.autoplay,
				'loop' : 0,
				'modestbranding': 1,
				'controls': 0,
				'rel' : 0,
				'autohide': 1,
				'showinfo': 0,
				'playlist': playerInfo.videoId,
			},
			events: {

				"onReady": createYTEvent(playerInfo)
			}
		});
	}

	// onReady create YT event that allows for a custom play button
	function createYTEvent(identifier) {

		return function (event) {
			if ((identifier.mute) === 1) {
				event.target.mute();
			}
			var player = identifier; // Set player reference
			var the_div = document.getElementById(identifier.id);
			var sibling = the_div.nextElementSibling;

			$(sibling).on('click', function() {
				event.target.stopVideo();
			});

			$('.youtube-popout').on('click', function() {
				event.target.stopVideo();
				$('.youtube-popout').removeClass('active');
				$('.slider__wrapper-content').removeClass('active');
			});


		}
	}
}
