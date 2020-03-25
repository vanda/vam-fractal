(function(){

	var revealEl = document.createElement("DIV");
	var classes = [
		"etc-details__cell-concealer",	
		"etc-details__cell-revealer"
	];
	var html = [
		'<span class="etc-details__cell-concealer-text">\
	         Read More\
        </span>\<button class="etc-details__cell-concealer-button">+</button>',
		'<span class="etc-details__cell-concealer-text">\
            Read Less\
        </span>\<button class="etc-details__cell-concealer-button">-</button>'
	];
	
	revealEl.className = classes[0];
	revealEl.innerHTML = html[0];

	var clickFunction = function(e) {
    	var hiddenClass = "etc-details__cell-free-content--hidden";
    	var textEl = e.target.parentElement.querySelector(".etc-details__cell-free-content");
    	var textElConcealed = textEl.classList.contains(hiddenClass);
    	
    	e.target.innerHTML = html[textElConcealed ? 1 : 0];
    	e.target.className = classes[textElConcealed ? 1 : 0];

    	if (textElConcealed) {
    		textEl.classList.remove(hiddenClass)
    	} else {
    		textEl.classList.add(hiddenClass)
    	}
    }

	Array.from(document.querySelectorAll(".etc-details__cell-free")).forEach(function(e) {
		if (e.offsetHeight > 200) {
			var content = e.querySelector(".etc-details__cell-free-content");
			content.classList.add('etc-details__cell-free-content--hidden');
			var clone = revealEl.cloneNode(true);
			clone.onclick = clickFunction;
			e.appendChild(clone);
		}
	});
})();