(function(){
	document.onload = function() {
		Array.from(document.querySelectorAll(".etc-details__cell-free")).forEach(function(e) {
			console.log('ayyy')
			if (e.offsetWidth > 200) {
				e.classList.add('etc-details__cell-free--hidden');
			}
		})
	}
})();