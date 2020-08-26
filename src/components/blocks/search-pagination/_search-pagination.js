var search_prev_link_class = "b-search-pagination__prev-link";
var search_next_link_class = "b-search-pagination__next-link";
var button_class = "b-search-pagination__page-button";
var seperator_class = "b-search-pagination__page-button-seperator";
var start = "-start";
var middle = "-middle";
var last = "-last";
var inactive = "--inactive";
var active = "--active";
var current = "--current";
var current_button_class = button_class + current;
var inactive_search_prev_link_class = search_prev_link_class + inactive;
var inactive_search_next_link_class = search_next_link_class + inactive;
var number_of_pages = document.querySelectorAll("." + button_class).length;
var default_offset = 20;

function hideButton(index) {
  document.querySelector("button[page-index='" + String(index) + "']").classList.remove(button_class + active);
}

function showButton(index) {
  document.querySelector("button[page-index='" + String(index) + "']").classList.add(button_class + active);
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

if (document.querySelector(".b-search-pagination")) {
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
    } else {
      document.querySelector("." + seperator_class + last) && document.querySelector("." + seperator_class + last).classList.add(seperator_class + last + inactive);

      showButton(1);

      if (number_of_pages >= 2) {
        showButton(2);
      }
      if (number_of_pages >= 3) {
        showButton(3);
      }

      if (number_of_pages === 4) {
        showButton(4);
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

  document.querySelector(".b-search-pagination__prev-link").onclick = function(e) {
    increment_decrement_page("-");
    e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
  }

  document.querySelector(".b-search-pagination__next-link").onclick = function(e) {
    increment_decrement_page("+");
    e.target.dispatchEvent(new CustomEvent("changeSearchPage", { bubbles: true, detail: true }));
  }

  document.querySelector(".b-search-pagination").addEventListener("changeSearchPage", function(e) {
    var page_index = document.querySelector(".b-search-pagination__page-button--current").getAttribute("page-index");

    if (page_index || e.detail) {
      var request = new XMLHttpRequest();

      request.onreadystatechange = function () {
        if ( request.readyState === 4 ) {
          if ( request.status !== 200 ) {
            return;
          }
          document.querySelector("#results-table-container").innerHTML = JSON.parse(request.response).rendered;
        }
      };

      var params = new URLSearchParams(window.location.search);

      if (!params.get('limit')) {
        params.set('limit', String(default_offset));
      }

      var offset = parseInt(params.get('limit'))*(parseInt(page_index) - 1);

      params.set('offset', offset);

      document.querySelector(".b-search-pagination__display-counter").innerHTML = `
        ${offset + 1} - ${offset + default_offset} of ${total_count}
      `;

      // request.open('GET', "http://" + window.location.host + "/search.json?" + params.toString());

      // history.replaceState({page: 'smth'}, "", "?" + params.toString())

      // request.setRequestHeader("Content-Type", "application/json");
      // request.send();
    }
  });

  var button_container = document.querySelector(".b-search-pagination__page-button-container");
  var total_count = parseInt(document.querySelector(".b-search-results__count").getAttribute("data-count"));
  var number_of_pages = Math.ceil(total_count / default_offset);

  console.log(total_count);
  console.log(number_of_pages);

  if (number_of_pages > 3) {
    for (let i = 3; i < number_of_pages - 1; i++) {
        document.querySelector(".b-search-pagination__page-button-container").innerHTML =
          document.querySelector(".b-search-pagination__page-button-container").innerHTML + `
                <button page-index="${i + 1}" class="b-search-pagination__page-button">
                    ${ i < 9 ? 0 : ''}${i + 1}
                </button>
          `
    }

    document.querySelector(".b-search-pagination__page-button-container").innerHTML =
      document.querySelector(".b-search-pagination__page-button-container").innerHTML + `
          <span class="b-search-pagination__page-button-seperator-last">
                ...
            </span>
              <button page-index="${number_of_pages}" class="b-search-pagination__page-button-last">
                  ${ number_of_pages < 10 ? 0 : ''}${number_of_pages}
              </button>
    `
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

  if (document.querySelector("." + button_class + last)) {
    document.querySelector("." + button_class + last).onclick = function(e) {
    document.querySelector("." + current_button_class).classList.remove(current_button_class);
      e.target.classList.add(current_button_class);
      e.target.dispatchEvent(new Event("changeSearchPage", { bubbles: true }));
    }
  }

  var current_button = document.querySelector("." + current_button_class).getAttribute("page-index");
  var params = new URLSearchParams(window.location.search);
  var current_page = Math.ceil((parseInt(!params.get('offset') ? 1 : params.get('offset')) + default_offset) / default_offset);

  if (current_page !== current_button) {
    document.querySelector("button[page-index='" + String(current_page) + "']").click();
  } else {
    document.querySelector("button[page-index='" + String(current_button) + "']").click();
  }

}
