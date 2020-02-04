(function() {
	if (document.querySelectorAll('.image-carosel__image-preview').length > 4) {
		Array.from(document.querySelectorAll('.image-carosel__navigation-container')).forEach(function(e) {
			e.style.visibility = 'visible';
		})
	}

	function scrollCarosel(px) {
		var currentScroll = document.querySelector('.image-carosel__image-carosel').scrollLeft;
		document.querySelector(".image-carosel__image-carosel").scrollLeft = currentScroll + px;
	}

	document.querySelector(".image-carosel__next").onclick = function(){scrollCarosel(140);};
	document.querySelector(".image-carosel__prev").onclick = function(){scrollCarosel(-140);};
})()