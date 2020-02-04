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

	var concealCarosel = document.querySelector(".image-carosel--conceal .image-carosel__image-carosel")

	if (concealCarosel) {
		/* fix this later */
		document.querySelector(".image-carosel__conceal-left").onclick = function(){scrollCarosel(140);};
		document.querySelector(".image-carosel__conceal-right").onclick = function(){scrollCarosel(-140);};		
	}

	concealCarosel && concealCarosel.addEventListener("scroll", function(e){

		var scrollLeft = e.target.scrollLeft;
		var scrollWidth = e.target.scrollWidth;
		var width = e.target.offsetWidth;

		if (scrollLeft <= 120) {
			document.querySelector(".image-carosel__conceal-left").style.width = scrollLeft.toString() + 'px';
		} 
		if (scrollWidth - (scrollLeft + width) <= 120) {
			document.querySelector(".image-carosel__conceal-right").style.width = (scrollWidth - (scrollLeft + width)).toString() + 'px';
		}
	});


})()