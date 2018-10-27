// Initialize Firebase
var config = {
    apiKey: "AIzaSyDKZkqcOSbX8pESCoLGPujO99S_83oi6DU",
    authDomain: "learning-c6598.firebaseapp.com",
    databaseURL: "https://learning-c6598.firebaseio.com",
    projectId: "learning-c6598",
    storageBucket: "learning-c6598.appspot.com",
    messagingSenderId: "808975769506"
};
firebase.initializeApp(config);
let firestore = firebase.firestore();

const docRef = firestore.doc("samples/sandwichData");

const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.nodeValue;
    console.log("I am going to save " + textToSave + "to Firestore");
    docRef.set({
        hotDogStatus: textToSave
    });
})







// var bigOne = document.getElementById('bigOne');
// var dbRef = firebase.database().ref().child('text');
// dbRef.on('value', snap => {
// console.log('dddd');

// bigOne.innerHTML = snap.val()

// }
// );

// console.log(firebase);
// console.log(firebase.database().ref().child('text'));