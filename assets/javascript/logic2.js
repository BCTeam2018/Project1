

$("button").on("click", async function () {

    var proxy = "https://cors-anywhere.herokuapp.com/";
    var queryURL = "http://api.eventful.com/json/events/search?date=Future&app_key=xDx7HLFpRJgTBLJL"
    await $.ajax({
        url: proxy + queryURL,
        method: "GET"
      })
      .then(function (response) {
  
        let newResponse = JSON.parse(response);
        console.log(newResponse);
        console.log(newResponse.events.event[0].title);
        console.log(newResponse.events.event[0].latitude);
        console.log(newResponse.events.event[0].longitude);
        eventLon = parseInt(newResponse.events.event[0].longitude);
        eventLat = parseInt(newResponse.events.event[0].latitude);
        eventTitle = newResponse.events.event[0].title;
      });
  
  })

var map = function initMap() {
  // The location of Uluru
  var uluru = {lat: -25.344, lng: 131.036};
  // The map, centered at Uluru
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 4, center: uluru});
  // The marker, positioned at Uluru
  var marker = new google.maps.Marker({position: uluru, map: map});
};