var userEvent= "";
var userLatitude = 30.2672;
var userLongitude= -97.7431;

var userTitle = "";

$("button").on("click", async function () {
  //var userEvent = $(this).attr("what");
  //var userLocation = $(this).attr("where");
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var queryURL = "http://api.eventful.com/json/events/search?date=Future&app_key=xDx7HLFpRJgTBLJL"
  await $.ajax({
      url: proxy + queryURL,
      method: "GET"
    })
    .then(function (response) {
      // console.log(response["total_items"]);
      // console.log(JSON.stringify(response));
      let newResponse = JSON.parse(response);
      console.log(newResponse);
      console.log(newResponse.events.event[0].title);
      console.log(newResponse.events.event[0].latitude);
      console.log(newResponse.events.event[0].longitude);
      userLongitude = parseInt(newResponse.events.event[0].longitude);
      userLatitude = parseInt(newResponse.events.event[0].latitude);
      userTitle = newResponse.events.event[0].title;
      // console.log(typeof userLatitude);
      // console.log(userTitle);
      // console.log(typeof userLongitude);
    });

initMap();
})
console.log(userLatitude);
console.log(userLongitude);

var map;
var infowindow;

function initMap() {
  
  // change this var for different locations.
  var userEvent = {
    lat: userLatitude,
    lng: userLongitude
  };
  // console.log(userLatitude);
  // console.log(userLongitude);
  // console.log(userEvent);
  // this is where the map is being sent to the map div for rendering
  map = new google.maps.Map(document.getElementById("map"), {
    center: userEvent,
    zoom: 15
  });
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: userEvent,
      radius: 500,
      type: ["store"]
    },
    callback
  );
}

function callback(results, status) {
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}
// console.log(response)





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