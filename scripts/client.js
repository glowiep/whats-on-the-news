$(document).ready(function(){
  $("#news-form").on("submit", function(event) {
    event.preventDefault();

    // Prevent XSS with escaping
    const escape = function(str) {
      let p = document.createElement("p");
      p.appendChild(document.createTextNode(str));
      return p.innerHTML;
    };

    const $newsSearchString = escape($("#news-search-string").val());
    const $numberOfNews = escape($("#news-search-number").val());

    const API_Key = "YOUR API KEY GOES HERE!!!";  // Create an account to obtain a NewsAPI.org API key here https://newsapi.org/
    const url = "https://newsapi.org/v2/everything";
    
    // Request parameters
    const data = {
      "q": $newsSearchString,
      "pageSize": $numberOfNews,
      "apiKey": API_Key
    }
  
    $.ajax({
      type: "GET",
      url,
      data,
      headers: {
        "X-Api-Key": "cc8f1ec300e84454929b5c4600d5dda6"
      },
      success: (data) => {
        $("#search-summary").remove()
        $("#news-results").empty();
        $("header").append(
          `
          <h4 id="search-summary">${$numberOfNews} Search Results for: "${$newsSearchString}"</h4>
          `
        )
        data.articles.forEach((article) => {
          $("#news-results").append(
            `
            <article class="single-news">
              <h2>${article.title}</h2>
                <div class="news-img">
                  <img src="${article.urlToImage}" alt="${article.title}">
                </div>
              <h5>${article.author}</h5>
              <p>${article.content}</p>
              <a href="${article.url}" target="_blank">Full article</a>
            </article>
            `);
        });
        if (data.articles.length === 0) {
          $("#news-results").html(`<h1 class="no-results"> No results for your search criteria: "${$newsSearchString}" </h1>`)
        }
      },
      error: (err) => {
        console.log(err);
      }
    });
    
    // Hide news-form after search
    $("#news-form").hide();
  })

  // Toggle button to show or hide search
  $("#search-button").on("click", function(event) {
    event.preventDefault;
    // Empty input fields
    $("#news-search-string").val("");
    $("#news-search-number").val("");
    
    $("#news-form").toggle("fast"); // show or hide compose-tweet section
    $("#news-search-string").focus(); // Enable the textarea automatically
  });
  
  // Scroll button is hidden only when the vertical scroll position is 0
  $("#scroll-button").hide();
  $(window).on("scroll", function(event) {
    event.preventDefault;
    
    let $scroll = $(window).scrollTop();
    if ($scroll === 0) {
      return $("#scroll-button").hide();
    }
    $("#scroll-button").show();
  });

  // Scroll to top button function
  $("#scroll-button").on("click", function(event) {
    event.preventDefault;
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return $("#news-form").show().find("#news-search-string").focus();
  });
});