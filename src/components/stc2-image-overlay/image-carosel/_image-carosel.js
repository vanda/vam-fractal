(function() {
	if (document.querySelectorAll('.image-carosel__image-preview').length > 4) {
		Array.from(document.querySelectorAll('.image-carosel__navigation-container')).forEach(
			function(e) {
				e.style.visibility = 'visible';
			}
		);
	}

	function scrollCarosel(px) {
		var currentScroll = document.querySelector('.image-carosel__image-carosel').scrollLeft;
		document.querySelector(".image-carosel__image-carosel").scrollLeft = currentScroll + px;
	}

	if (document.querySelector('.image-carosel__image-carosel')) {
		document.querySelector(".image-carosel__next").onclick = function(){scrollCarosel(140);};
		document.querySelector(".image-carosel__prev").onclick = function(){scrollCarosel(-140);};
	}

	var concealCarosel = document.querySelector(".image-carosel--conceal .image-carosel__image-carosel");

	if (concealCarosel) {
		var concealLeft = document.querySelector(".image-carosel__conceal-left");
		var concealRight = document.querySelector(".image-carosel__conceal-right");
		var buttonLeft = document.querySelector(".image-carosel__prev");
		var buttonRight = document.querySelector(".image-carosel__next");

		concealLeft.onclick = function(){scrollCarosel(-140);};
		concealRight.onclick = function(){scrollCarosel(140);};		

		concealCarosel.addEventListener("scroll", function(e){
			var scrollLeft = e.target.scrollLeft;
			var scrollWidth = e.target.scrollWidth;
			var width = e.target.offsetWidth;

			/* controlling the gradient concealer */
			if (scrollLeft <= 120) {
				concealLeft.style.width =
					scrollLeft.toString() + 'px';
			} 
			if (scrollWidth - (scrollLeft + width) <= 120) {
				concealRight.style.width =
					(scrollWidth - (scrollLeft + width)).toString() + 'px';
			}

			/* controlling the buttons */
			if (scrollLeft == 0) {
				buttonLeft.classList.remove("image-carosel__prev--enabled");
			} else if (scrollLeft > 0) {
				buttonLeft.classList.add("image-carosel__prev--enabled");
			}
			/* controlling the buttons */
			if (scrollLeft === (scrollWidth - width)) {
				buttonRight.classList.remove("image-carosel__next--enabled");
			} else if (scrollLeft < (scrollWidth - width)) {
				buttonRight.classList.add("image-carosel__next--enabled");
			}
		});
	}

	var changeImageEvent = function(el) {
		return new Event('change_image', {
			target: el
		});
	}

	Array.from(document.querySelector(".image-carosel__image-preview-container")).forEach(
		function(x) {
			x.target.onclick = function(e) {
				e.target.dispatchEvent(changeImageEvent(e));
			}
		}
	);
})();