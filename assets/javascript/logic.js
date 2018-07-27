
// Setting global variables
var eventLoc = "";
var eventLat = 30.2672;
var eventLon = -97.7431;

var eventCity = "";
var eventKeyword = "";

var eventTitle = "";

$("button").on("click", async function () {
  // Capturing using input from 
  eventCity = $("#city-input").val().trim();
  eventKeyword = $("#keyword-input").val().trim();

  var proxy = "https://cors-anywhere.herokuapp.com/";
  var queryURL = "http://api.eventful.com/json/events/search?date=Future&app_key=xDx7HLFpRJgTBLJL"+ "&q=" + eventKeyword + "&l=" + eventCity  + "&page_size=10";
  console.log(queryURL);
  
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

  initMap();
})
console.log(eventLat);
console.log(eventLon);

var map;
var infowindow;

function initMap() {

  // change this var for different locations.
  var eventLoc = {
    lat: eventLat,
    lng: eventLon
  };
  // console.log(eventLat);
  // console.log(eventLon);
  // console.log(eventLoc);
  // this is where the map is being sent to the map div for rendering
  map = new google.maps.Map(document.getElementById("map"), {
    center: eventLoc,
    zoom: 15
  });
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch({
      location: eventLoc,
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