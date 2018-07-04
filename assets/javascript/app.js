//Globals
var time = moment().format('MMM Do YYYY, h:mm a')
//function runners

$(document).ready(function() {
  $(window).keydown(function(event){
    if(event.keyCode == 13) {
      event.preventDefault();
      return false;
    }
  });
});

 $(document).on("click", "#trainSubmit", submitForm);
 $(window).on("load",function (){
    realTime ();
    adminCheck ();

})
 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyB1tjbpUB1_6kuq4DAN7XzabRAnnel2og4",
    authDomain: "trainsim-3be51.firebaseapp.com",
    databaseURL: "https://trainsim-3be51.firebaseio.com",
    projectId: "trainsim-3be51",
    storageBucket: "trainsim-3be51.appspot.com",
    messagingSenderId: "770846602240"
  };
  firebase.initializeApp(config);
  //Database Declarations
  var database = firebase.database();
  var trainName;
  var trainDest;
  var trainTime;
  var trainFreq;

//Add Trains function
function submitForm () {    
  event.preventDefault(); //why isn't this working?

  // This line will grab the text from the input box
  // vars now equal html ids
  var trainName = $('#nameInput').val().trim();
  var trainDest = $('#destInput').val().trim();
  var trainTime = $('#timeInput').val().trim();
  var  trainFreq = $('#freqInput').val().trim();
  
  if (trainName, trainDest, trainTime, trainFreq === ""){
    alert("All fields must have an entry before submission.");
    return
  }

  if (trainFreq <= 0){
    alert("Train frequency must have a positive value.");
    return
  }
  console.log(trainName);
//Push to database
   database.ref().push({
       eName: trainName,
       eDest: trainDest,
       eTime: trainTime,
       eFreq: trainFreq
   })
//empties the input field
$('#nameInput').val("");
$('#destInput').val("");
$('#timeInput').val("");
$('#freqInput').val("");
  //console.log(basedGifs);
};
//
database.ref().on('child_added', function(snapshot) {
    var sv = snapshot.val();
    console.log('snapshot ', sv);
    trainName = sv.eName;
    trainDest = sv.eDest;
    trainTime= sv.eTime;
    trainFreq = sv.eFreq;

   


    // Time Variables 
    //Freq and Start
    var tFrequency = trainFreq;
    var startTime = moment(trainTime, "HH:mm").subtract(1, "years");
    console.log(startTime);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(startTime), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    if (tMinutesTillTrain === 1){
      tMinutesTillTrain = "BOARDING";
    
    }
    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm")); 

    //Adds Firebase Info to DOM
    let trainSet = $('#tableItems')
    let row = $('<tr id=newRow>').appendTo(trainSet);
    $('<td>').text(trainName).appendTo(row);
    $('<td>').text(trainDest).appendTo(row);
    $('<td>').text(trainFreq).appendTo(row);
    $('<td>').text(nextTrain.format("hh:mm:a")).appendTo(row);
    $("<td class='timeBox'>").text(tMinutesTillTrain).appendTo(row);
    $('</tr>').appendTo(trainSet);
  
});
//Fade In function
function welcome() {
    $(".adminAlert").fadeIn(2000);
};
//Gloss for that authentic feel

function adminCheck(){

    alert("Administrator Access Requested")
    var password = prompt("Please enter the admin code.");
    if (password === "password") {
        welcome();
        alert("Welcome Back");
     }
    else {
        alert("Access Denied")
        window.location.href = 'https://www.njtransit.com/hp/hp_servlet.srv?hdnPageAction=HomePageTo';
       
    }
}

function realTime () {
  $(".clock").text(time);
}


// function tester (){
// $( "#trainSchedule" ).load( "index.html #trainSchedule" );

// };

//  setInterval(tester, 5000)