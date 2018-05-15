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
