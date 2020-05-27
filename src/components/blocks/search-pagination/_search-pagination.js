var search_pagination_container = "b-search-pagination";
var search_prev_link_class = search_pagination_container + "__prev-link";
var search_next_link_class = search_pagination_container + "__next-link";
var button_class = search_pagination_container + "__page-button";
var seperator_class = search_pagination_container + "__page-button-seperator";
var start = "-start";
var middle = "-middle";
var last = "-last";
var inactive = "--inactive";
var current = "--current";
var current_button_class = button_class + current;
var inactive_search_prev_link_class = search_prev_link_class + inactive;
var inactive_search_next_link_class = search_next_link_class + inactive;
var number_of_pages = document.querySelectorAll("." + button_class).length;


function hideButton(index) {
	document.querySelector("button[page-index='" + String(index) + "']").classList.add(button_class + inactive);
}

function showButton(index) {
	document.querySelector("button[page-index='" + String(index) + "']").classList.remove(button_class + inactive);	
}

Array.from(document.querySelectorAll("." + button_class)).forEach(function (e) {
	e.onclick = function(e) {
		document.querySelector("." + current_button_class).classList.remove(current_button_class);
		e.target.classList.add(current_button_class);
		e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
	}
});

document.addEventListener('DOMContentLoaded', function (event) {
	document.querySelector(".b-search-pagination").addEventListener("changeSearchPage", function() {
		var currentButton = document.querySelector("." + current_button_class);
		var currentButtonIndex = parseInt(currentButton.getAttribute("page-index"));
		
		if (currentButtonIndex > 1) {
			document.querySelector("." + search_prev_link_class).classList.remove(inactive_search_prev_link_class);
		} else {
			document.querySelector("." + search_prev_link_class).classList.add(inactive_search_prev_link_class);			
		}

		if (currentButtonIndex < number_of_pages) {
			document.querySelector("." + search_next_link_class).classList.remove(inactive_search_next_link_class);
		} else {
			document.querySelector("." + search_next_link_class).classList.add(inactive_search_next_link_class);			
		}

		var currentButton = document.querySelector("." + current_button_class);
		if (number_of_pages > 4) {
			if (currentButtonIndex >= 3 && (currentButtonIndex < number_of_pages - 1)) {

				document.querySelector("." + seperator_class + start).classList.remove(seperator_class + start + inactive);
				document.querySelector("." + seperator_class + middle).classList.add(seperator_class + middle + inactive);
				document.querySelector("." + seperator_class + last).classList.remove(seperator_class + last + inactive);

				for (var i = currentButtonIndex - 1; i < currentButtonIndex + 2; i++) {
					showButton(i);
				}

				hideButton(currentButtonIndex - 2);
				hideButton(currentButtonIndex + 2);
				
				showButton(1);
				showButton(number_of_pages);
			} else if (currentButtonIndex <= 2) {
				document.querySelector("." + seperator_class + start).classList.add(seperator_class + start + inactive);
				document.querySelector("." + seperator_class + middle).classList.remove(seperator_class + middle + inactive);
				document.querySelector("." + seperator_class + last).classList.add(seperator_class + last + inactive);			

				for (var i = 1; i < 3; i++) {
					showButton(i);
				}

				Array.from(document.querySelectorAll("." + button_class)).slice(3, number_of_pages - 1).forEach(function(e) {
					e.classList.add(button_class + inactive);
				});

				if (currentButtonIndex === 1) {
					showButton(3);
				}
			} else if (currentButtonIndex > 3 && (currentButtonIndex >= number_of_pages - 1)) {
				document.querySelector("." + seperator_class + start).classList.remove(seperator_class + start + inactive);
				document.querySelector("." + seperator_class + middle).classList.add(seperator_class + middle + inactive);
				document.querySelector("." + seperator_class + last).classList.add(seperator_class + last + inactive);

				Array.from(document.querySelectorAll("." + button_class)).slice(1, number_of_pages - 3).forEach(function(e) {
					e.classList.add(button_class + inactive);
				});

				if (currentButtonIndex === number_of_pages) {
					for (var i = number_of_pages - 2; i < number_of_pages; i++) {
						showButton(i)
					}				
				}			
			}
		}
	}, true);

	if (number_of_pages > 4) {
		document.querySelector("." + seperator_class + middle).classList.remove(seperator_class + middle + inactive)
		var currentButtonIndex = parseInt(document.querySelector("." + current_button_class).getAttribute("page-index"));
		if (currentButtonIndex < 3) {
			Array.from(document.querySelectorAll("." + button_class)).slice(3, number_of_pages - 1).forEach(function(e) {
				e.classList.add(button_class + inactive);
			});
		}
	}

	function increment_decrement_page(op) {
		var currentButton = parseInt(document.querySelector("." + current_button_class).getAttribute("page-index"));

		if ((currentButton > 1 && op === "-")  || (op === "+" && currentButton < number_of_pages))
		{
			document.querySelector("." + current_button_class).classList.remove(current_button_class);
			if (op === '+') {
				document.querySelector("button[page-index='" + String(currentButton + 1) + "']").classList.add(current_button_class);
			} else {
				document.querySelector("button[page-index='" + String(currentButton - 1) + "']").classList.add(current_button_class);
			}		
		}

	}

	document.querySelector("."+ search_prev_link_class).onclick = function(e) {
		increment_decrement_page("-");
		e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
	}

	document.querySelector("." + search_next_link_class).onclick = function(e) {
		increment_decrement_page("+");
		e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
	}

	document.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
})