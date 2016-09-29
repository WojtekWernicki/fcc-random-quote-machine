$(function() {
  getQuote();
  
  $("#random").click(function(event) {
    event.preventDefault();
    getQuote();
    $("#tweet").removeClass("disabled");
    $("#tweet").html('<i class="fa fa-twitter" aria-hidden="true"></i> Tweet');
  });
});

var tweetText = '';
$("#tweet").click(function() {
  if(tweetText.length > 140) {
    tweetText = '';
    $(this).addClass('disabled');
    $(this).html("Limit of 140 chars is exceeded");
  } else {
    $(this).attr("href", "https://twitter.com/intent/tweet?text=" + tweetText).attr("target", "_blank");
  }
});

function getQuote() {
  var apiURL = "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";
  $.getJSON(apiURL, function(data) {
    $("#quoteText").html(data.quoteText);
    if(data.quoteAuthor) {
      $("#quoteAuthor").html(data.quoteAuthor);
    } else {
      $("#quoteAuthor").html('Anonymous');
    }    
    $("#link").attr("href", data.quoteLink).attr("target", "_blank");
    tweetText = data.quoteText + '\u2013 ' + data.quoteAuthor;
  });
}