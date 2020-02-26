(function(){

	var revealEl = document.createElement("DIV");
	revealEl.classList.add("etc-details__cell-concealer");
	var revealHTML = '<span class="etc-details__cell-concealer-text">\
                            Read More\
                        </span>\<button class="etc-details__cell-concealer-button">+</button>'
	var hideHTML = '<span class="etc-details__cell-concealer-text">\
                            Read Less\
                        </span>\<button class="etc-details__cell-concealer-button">-</button>'

	revealEl.innerHTML = revealHTML; 
    revealEl.onclick = function(e) {
    	e.target.innerHTML = hideHTML;
    }

	Array.from(document.querySelectorAll(".etc-details__cell-free")).forEach(function(e) {
		if (e.offsetWidth > 200) {
			var content = e.querySelector(".etc-details__cell-free-content");
			content.classList.add('etc-details__cell-free-content--hidden');
			e.appendChild(revealEl);
		}
	});
})();