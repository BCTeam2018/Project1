// Initialize Firebase
var config = {
  apiKey: "AIzaSyDEhMTsOkTgVKsLA5Zmp5R4ZVaIzllYJnU",
  authDomain: "project1-6d6a1.firebaseapp.com",
  databaseURL: "https://project1-6d6a1.firebaseio.com",
  projectId: "project1-6d6a1",
  storageBucket: "project1-6d6a1.appspot.com",
  messagingSenderId: "503406212698"
};
firebase.initializeApp(config);


// Initializing global variables
var eventLoc = "";
var eventLat = 30.2672;
var eventLon = -97.7431;
var eventTitle = "";
var eventVenue = "";
var eventTime = "";
var events = "";


// User input variables
var eventCity = "";
var eventKeyword = "";




// Button event for searching for events
$("button").on("click", async function () {

  event.preventDefault();

  // Capturing using input from fields
  eventCity = $("#city-input").val().trim();
  eventKeyword = $("#keyword-input").val().trim();

  // Capturing using input from 
 var eventCity = $("#city-input").val().trim();
 var eventKeyword = $("#keyword-input").val().trim();
 console.log(eventCity);
 console.log(eventKeyword)

  // Setup AJAX call by defining parameters for proxy URL and Eventful API. Proxy handles CORS issue.
  var proxy = "https://cors-anywhere.herokuapp.com/";
  var queryURL = "http://api.eventful.com/json/events/search?date=Future&app_key=xDx7HLFpRJgTBLJL"+ "&q=" + eventKeyword + "&l=" + eventCity  + "&page_size=10&include=tickets,price&sort_order=date&sort_direction=ascending";
  console.log(queryURL);
  
  await $.ajax({
      url: proxy + queryURL,
      method: "GET"
    })
    .then(function(response) {
      let newResponse = JSON.parse(response);
      
      // Looping over every result item 9page count is set to 10)
      for (var i = 0; i < newResponse.events.event.length; i++) {

      // Setting global variables to event data
      eventLon = parseInt(newResponse.events.event[i].longitude);
      eventLat = parseInt(newResponse.events.event[i].latitude);
      eventTitle = newResponse.events.event[i].title;
      eventVenue = newResponse.events.event[i].venue_name;
      eventTime = newResponse.events.event[i].start_time;
      eventVenueAddress = newResponse.events.event[i].venue_address;
      eventTickets = newResponse.events.event[i].tickets;
      eventPrice = newResponse.events.event[i].price;
    
      
      console.log(newResponse);
      console.log(newResponse.events.event[i].title);
      console.log(newResponse.events.event[i].latitude);
      console.log(newResponse.events.event[i].longitude);
      console.log(eventVenue = newResponse.events.event[i].venue_name);
      console.log(eventTime = newResponse.events.event[i].start_time);
      console.log(newResponse.events.event[i].venue_address);
      console.log(newResponse.events.event[i].tickets);
      console.log(newResponse.events.event[i].price);
      }

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
