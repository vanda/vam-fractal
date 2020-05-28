var search_pagination_container = "b-search-pagination";
var search_prev_link_class = search_pagination_container + "__prev-link";
var search_next_link_class = search_pagination_container + "__next-link";
var button_class = search_pagination_container + "__page-button";
var seperator_class = search_pagination_container + "__page-button-seperator";
var start = "-start";
var middle = "-middle";
var last = "-last";
var inactive = "--inactive";
var active = "--active";
var current = "--current";
var current_button_class = button_class + current;
var inactive_search_prev_link_class = search_prev_link_class + inactive;
var inactive_search_next_link_class = search_next_link_class + inactive;
var number_of_pages = document.querySelectorAll("." + button_class).length + 2;


function hideButton(index) {
	document.querySelector("button[page-index='" + String(index) + "']").classList.remove(button_class + active);
}

function showButton(index) {
	document.querySelector("button[page-index='" + String(index) + "']").classList.add(button_class + active);	
}

Array.from(document.querySelectorAll("." + button_class)).forEach(function (e) {
	e.onclick = function(e) {
		document.querySelector("." + current_button_class).classList.remove(current_button_class);
		e.target.classList.add(current_button_class);
		e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
	}
});

document.querySelector("." + button_class + start).onclick = function(e) {
	document.querySelector("." + current_button_class).classList.remove(current_button_class);
	e.target.classList.add(current_button_class);
	e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
}

document.querySelector("." + button_class + last).onclick = function(e) {
	document.querySelector("." + current_button_class).classList.remove(current_button_class);
	e.target.classList.add(current_button_class);
	e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
}

document.addEventListener('DOMContentLoaded', function (event) {
	document.querySelector(".b-search-pagination").addEventListener("changeSearchPage", function() {
		var current_button = document.querySelector("." + current_button_class);
		var current_button_index = parseInt(current_button.getAttribute("page-index"));
		
		if (current_button_index > 1) {
			document.querySelector("." + search_prev_link_class).classList.remove(inactive_search_prev_link_class);
		} else {
			document.querySelector("." + search_prev_link_class).classList.add(inactive_search_prev_link_class);			
		}

		if (current_button_index < number_of_pages) {
			document.querySelector("." + search_next_link_class).classList.remove(inactive_search_next_link_class);
		} else {
			document.querySelector("." + search_next_link_class).classList.add(inactive_search_next_link_class);			
		}

		var current_button = document.querySelector("." + current_button_class);
		if (number_of_pages > 4) {
			// activate this logic...
			document.querySelectorAll("." + button_class + active).forEach(function(e) {
				e.classList.remove(button_class + active)
			});

			if ((number_of_pages - current_button_index >= 3 && current_button_index > 2 && current_button_index < number_of_pages - 1) || current_button_index == number_of_pages - 2) {
				document.querySelector("." + seperator_class + start).classList.remove(seperator_class + start + inactive);				
				document.querySelector("." + seperator_class + middle).classList.add(seperator_class + middle + inactive);
				document.querySelector("." + seperator_class + last).classList.remove(seperator_class + last + inactive);

				showButton(current_button_index - 1);
				showButton(current_button_index);
				showButton(current_button_index + 1);

			} else {
				if (current_button_index <= 2) {
					showButton(2);
					showButton(3);
					document.querySelector("." + seperator_class + start).classList.add(seperator_class + start + inactive);
					document.querySelector("." + seperator_class + middle).classList.add(seperator_class + middle + inactive);
					document.querySelector("." + seperator_class + last).classList.remove(seperator_class + last + inactive);
				} else if (current_button_index >= number_of_pages - 1 && current_button_index <= number_of_pages) {
					showButton(number_of_pages - 1);
					showButton(number_of_pages - 2);
					document.querySelector("." + seperator_class + start).classList.remove(seperator_class + start + inactive);
					document.querySelector("." + seperator_class + middle).classList.add(seperator_class + middle + inactive);
					document.querySelector("." + seperator_class + last).classList.add(seperator_class + last + inactive);
				}
			}
		}
	}, true);

	if (number_of_pages > 4) {
		document.querySelector("." + seperator_class + middle).classList.remove(seperator_class + middle + inactive)
		var current_button_index = parseInt(document.querySelector("." + current_button_class).getAttribute("page-index"));
		if (current_button_index < 3) {
			Array.from(document.querySelectorAll("." + button_class)).slice(3, number_of_pages - 1).forEach(function(e) {
				e.classList.add(button_class + inactive);
			});
		}
	}

	function increment_decrement_page(op) {
		var current_button = parseInt(document.querySelector("." + current_button_class).getAttribute("page-index"));

		if ((current_button > 1 && op === "-")  || (op === "+" && current_button < number_of_pages))
		{
			document.querySelector("." + current_button_class).classList.remove(current_button_class);
			if (op === '+') {
				document.querySelector("button[page-index='" + String(current_button + 1) + "']").classList.add(current_button_class);
			} else {
				document.querySelector("button[page-index='" + String(current_button - 1) + "']").classList.add(current_button_class);
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

	var current_button = parseInt(document.querySelector("." + current_button_class).getAttribute("page-index"));
	document.querySelector("button[page-index='" + String(current_button) + "']").click();
})
