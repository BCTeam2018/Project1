
$("button").on("click", function() {
    //var userEvent = $(this).attr("what");
    //var userLocation = $(this).attr("where");
     var proxy = "https://cors-anywhere.herokuapp.com/";
     var queryURL = "http://api.eventful.com/json/events/search?location=Austin&date=Future&app_key=xDx7HLFpRJgTBLJL"
     $.ajax({
    url: proxy + queryURL,
    method: "GET"
    })
  .done(function(response) {
    // console.log(response["total_items"]);
    // console.log(JSON.stringify(response));
    let newResponse = JSON.parse(response);
    console.log(newResponse.events.event[0].title);
    console.log(newResponse["total_items"]);
    console.log(newResponse)
   // console.log(response)
    });
  })
  
  
  
  
  
  //"http://api.eventful.com/json/events/search?keywords=concerts&location=Austin=Future&app_key=xDx7HLFpRJgTBLJL";
  
  ///Plug in the Google Maps API here __________________________
  
  //  $("button").on("click", function() {
  //  var city = $(this).attr("data-name");
  
  //  var queryURL =
  //  })
  
  //End Google Maps API call here__________________________
  
  
  
  // TEST ENVIRONMENT
  
  //User input button event
  
  //$("#submit-btn").on("click", function(event) {
  //  event.preventDefault();
  //  var userCity = $("#city-input").val().trim();
  //  var userKeyword = $("#keyword-input").val().trim();
  //  eventfulArray.push(userCity.name, userKeyword);
  //});
  
  //var eventfulArray = [];
  //console.log(eventfulArray);
  
  
  
  