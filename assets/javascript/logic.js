$("#submit-btn").on("click", function{

    //function should include call to API here as well as what's to be saved to firebase, correct??
});

var config = {
    apiKey: "AIzaSyAvlIGPDiN-B4geksM_dpsOZ-kvgTYKdgo",
    authDomain: "class-project-1-78416.firebaseapp.com",
    databaseURL: "https://class-project-1-78416.firebaseio.com",
    projectId: "class-project-1-78416",
    storageBucket: "class-project-1-78416.appspot.com",
    messagingSenderId: "312601248206"
  };
  firebase.initializeApp(config);

  database.ref().on("child_added",function(snapshot,prevChildKey){
    
    var mostRecentAdd = snapshot.val();
  })
    