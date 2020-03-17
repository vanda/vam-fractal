(function() {
	if (!!document.querySelector('.image-carosel')) {
		
		var updateImageAndCounterEvent = function(i = -1) {
			if (i >= 0 ) {
				return new CustomEvent("updateimageandcounter", {
					bubbles: true,
					detail: {
						index: i
					}
				});
			} else {
				return new CustomEvent("updateimageandcounter", {bubbles: true});
			}
		} 

		var scrollPx = 112;

		var image_carosel_preview = document.createElement("div");
		image_carosel_preview.classList.add("image-carosel__image-preview-container");
		image_carosel_preview.innerHTML = "<div class='image-carosel__image-preview'></div>";

		Array.from(document.querySelectorAll(".etc-image-overlay__image")).forEach(
			function(el, i) {
				var cln = image_carosel_preview.cloneNode(true);
				cln.setAttribute("data-image-index", i);
				document.querySelector(".image-carosel__image-carosel").appendChild(cln);
			}
		)

		if (document.querySelectorAll('.image-carosel__image-preview').length > 5) {
			Array.from(document.querySelectorAll('.image-carosel__navigation-container')).forEach(
				function(e) {
					e.style.visibility = 'visible';
				}
			);

			document.querySelector(".image-carosel__conceal-right").style.visibility = 'visible';
			document.querySelector('.image-carosel').classList.add("image-carosel--conceal");
		}		

		Array.from(document.querySelectorAll(".image-carosel__image-preview-container")).forEach(
			function(el, i) {
				el.onclick = function(e) {
				    e.preventDefault();
					e.target.dispatchEvent(updateImageAndCounterEvent(i));
				}

				if (i === 0) {
					el.dispatchEvent(updateImageAndCounterEvent(i));
				}

				var imgSrc = document.querySelector("img[data-image-index='" + String(i) + "']").getAttribute("src");

				el.style.background = "url(" + imgSrc + ")";
				el.style.backgroundSize = "cover";
			}
		);

		function scrollCarosel(px) {
			var currentScroll = document.querySelector('.image-carosel__image-carosel').scrollLeft;
			var currentY = window.pageYOffset;
			document.querySelector(".image-carosel__image-carosel").scrollLeft = currentScroll + px;
			window.scrollY = currentY;
		}

		if (document.querySelector('.image-carosel__image-carosel')) {
			document.querySelector(".image-carosel__next").onclick = function(){
				scrollCarosel(scrollPx);
			};
			document.querySelector(".image-carosel__prev").onclick = function(){
				scrollCarosel(-scrollPx);
			};
		}

		var concealCarosel = document.querySelector(".image-carosel--conceal .image-carosel__image-carosel");

		if (concealCarosel) {
			var concealLeft = document.querySelector(".image-carosel__conceal-left");
			var concealRight = document.querySelector(".image-carosel__conceal-right");
			var buttonLeft = document.querySelector(".image-carosel__prev");
			var buttonRight = document.querySelector(".image-carosel__next");

			concealLeft.onclick = function(e){
			    e.preventDefault();
				scrollCarosel(-scrollPx);
			};
			concealRight.onclick = function(e){
			    e.preventDefault();
				scrollCarosel(scrollPx);
			};

			concealCarosel.addEventListener("scroll", function(e){
				var scrollLeft = e.target.scrollLeft;
				var scrollWidth = e.target.scrollWidth;
				var width = e.target.offsetWidth;

				/* controlling the buttons */
				if (scrollLeft == 0) {
					document.querySelector(".image-carosel__conceal-left").style.visibility = 'hidden';
					buttonLeft.classList.remove("image-carosel__prev--enabled");
				} else if (scrollLeft > 0) {
					document.querySelector(".image-carosel__conceal-left").style.visibility = 'visible';
					buttonLeft.classList.add("image-carosel__prev--enabled");
				}
				/* controlling the buttons */
				if (scrollLeft === (scrollWidth - width)) {
					document.querySelector(".image-carosel__conceal-right").style.visibility = 'hidden';
					buttonRight.classList.remove("image-carosel__next--enabled");
				} else if (scrollLeft < (scrollWidth - width)) {
					document.querySelector(".image-carosel__conceal-right").style.visibility = 'visible';
					buttonRight.classList.add("image-carosel__next--enabled");
				}
			});
		}
	}
})();