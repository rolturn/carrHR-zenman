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
