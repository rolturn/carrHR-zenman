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
