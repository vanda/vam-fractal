(function() {
	if (!!document.querySelector('.image-carosel')) {
		
		var updateImageCounterEvent = new Event("updateimagecounter", {bubbles: true});
		var scrollPx = 112;

		if (document.querySelectorAll('.image-carosel__image-preview').length > 5) {
			Array.from(document.querySelectorAll('.image-carosel__navigation-container')).forEach(
				function(e) {
					e.style.visibility = 'visible';
				}
			);

            document.querySelector(".image-carosel__conceal-left").style.visibility = 'visible';
			document.querySelector(".image-carosel__conceal-right").style.visibility = 'visible';

			document.querySelector('.image-carosel').classList.add("image-carosel--conceal");
		}

		Array.from(document.querySelectorAll(".image-carosel__image-preview-container")).forEach(
			function(el, i) {
				if (i === 0) {
					el.classList.add("image-carosel__image-preview-container--selected");
					el.dispatchEvent(updateImageCounterEvent);
				}

				el.onclick = function(e) {
					var classSelected = "image-carosel__image-preview-container--selected";
					document.querySelector("." + classSelected).classList.remove(classSelected);
					e.target.classList.add(classSelected);
					e.target.dispatchEvent(updateImageCounterEvent);
					e.target.dispatchEvent(changeImageEvent(e));
				}
			}
		);

		function scrollCarosel(px) {
			var currentScroll = document.querySelector('.image-carosel__image-carosel').scrollLeft;
			document.querySelector(".image-carosel__image-carosel").scrollLeft = currentScroll + px;
		}

		window.scrollCarosel = scrollCarosel;

		if (document.querySelector('.image-carosel__image-carosel')) {
			document.querySelector(".image-carosel__next").onclick = function(){scrollCarosel(scrollPx);};
			document.querySelector(".image-carosel__prev").onclick = function(){scrollCarosel(-scrollPx);};
		}

		var concealCarosel = document.querySelector(".image-carosel--conceal .image-carosel__image-carosel");

		if (concealCarosel) {
			var concealLeft = document.querySelector(".image-carosel__conceal-left");
			var concealRight = document.querySelector(".image-carosel__conceal-right");
			var buttonLeft = document.querySelector(".image-carosel__prev");
			var buttonRight = document.querySelector(".image-carosel__next");

				// e.target.dispatchEvent(updateImageCounterEvent);

			concealLeft.onclick = function(e){
				scrollCarosel(-scrollPx);
			};
			concealRight.onclick = function(e){
				scrollCarosel(scrollPx);
			};


			concealCarosel.addEventListener("scroll", function(e){
				var scrollLeft = e.target.scrollLeft;
				var scrollWidth = e.target.scrollWidth;
				var width = e.target.offsetWidth;

				/* controlling the gradient concealer */
				if (scrollLeft <= scrollPx) {
					concealLeft.style.width =
						scrollLeft.toString() + 'px';
				} 
				if (scrollWidth - (scrollLeft + width) <= scrollPx) {
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
	}
})();