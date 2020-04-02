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

		var scrollPx = 114;

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

		if (document.querySelectorAll('.image-carosel__image-preview').length > 3) {
			Array.from(document.querySelectorAll('.image-carosel__navigation-container')).forEach(
				function(e) {
					e.style.display = 'block';
				}
			);

			document.querySelector(".image-carosel__conceal-right").style.display = 'block';
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

				el.querySelector(".image-carosel__image-preview").style.background = "url(" + imgSrc + ")";
				el.querySelector(".image-carosel__image-preview").style.backgroundSize = "cover";
			}
		);

		function scrollCarosel(px) {
			var currentScroll = document.querySelector('.image-carosel__image-carosel').scrollLeft;
			document.querySelector(".image-carosel__image-carosel").scrollLeft = currentScroll + px;
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

		document.querySelector('.image-carosel').addEventListener("keypress", function(e) {
			  console.log('????')
			  if (e.keyCode === 39) {
			  	scrollCarosel(scrollPx);
			  } else if (e.keycode === 37) {
				scrollCarosel(-scrollPx);
			  }
		});

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
					document.querySelector(".image-carosel__conceal-left").style.display = 'none';
					buttonLeft.classList.remove("image-carosel__prev--enabled");
				} else if (scrollLeft > 0) {
					document.querySelector(".image-carosel__conceal-left").style.display = 'block';
					buttonLeft.classList.add("image-carosel__prev--enabled");
				}
				/* controlling the buttons */
				if (scrollLeft === (scrollWidth - width)) {
					document.querySelector(".image-carosel__conceal-right").style.display = 'none';
					buttonRight.classList.remove("image-carosel__next--enabled");
				} else if (scrollLeft < (scrollWidth - width)) {
					document.querySelector(".image-carosel__conceal-right").style.display = 'block';
					buttonRight.classList.add("image-carosel__next--enabled");
				}
			});
		}
	}
})();