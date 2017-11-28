// 1. Initialize Firebase
  var config = {
    apiKey: "AIzaSyD7nPeg9u7apHUrUVOvrEhBkaz0scGLJvc",
    authDomain: "myawesomeproject-2ad12.firebaseapp.com",
    databaseURL: "https://myawesomeproject-2ad12.firebaseio.com",
    projectId: "myawesomeproject-2ad12",
    storageBucket: "myawesomeproject-2ad12.appspot.com",
    messagingSenderId: "110114561535"
  };
  

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destinationInput = $("#destination-input").val().trim();
  var timeInput = moment($("#time-input").val().trim(), "HH:mm").format("HH:mm");
  var frequencyInput = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destinationInput,
    time: timeInput,
    frequency: frequencyInput
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destinationInput = childSnapshot.val().destination;
  var timeInput = childSnapshot.val().time;
  var frequencyInput = childSnapshot.val().frequency;
  
  var tFrequency = frequencyInput;

  // Time is equal to timeInput
  var firstTime = timeInput;

    // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

    // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
  var tRemainder = diffTime % tFrequency;
  console.log(tRemainder);

    // Minute Until Train
  var tMinutesTillTrain = tFrequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
 

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destinationInput + "</td><td>" +
  frequencyInput + "</td><td>" + moment(nextTrain).format("h:mm a") + "</td><td>"+ tMinutesTillTrain+"</td></tr>");
});