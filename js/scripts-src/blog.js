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