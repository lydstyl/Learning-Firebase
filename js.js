var config = {
    apiKey: "AIzaSyDKZkqcOSbX8pESCoLGPujO99S_83oi6DU",
    authDomain: "learning-c6598.firebaseapp.com",
    databaseURL: "https://learning-c6598.firebaseio.com",
    projectId: "learning-c6598",
    storageBucket: "learning-c6598.appspot.com",
    messagingSenderId: "808975769506"
};
firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

const docRef = firestore.doc("samples/sandwichData");

const outputHeader = document.querySelector("#hotDogOutput");
const inputTextField = document.querySelector("#latestHotDogStatus");
const saveButton = document.querySelector("#saveButton");

saveButton.addEventListener("click", function () {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + "to Firestore");
    docRef
        .set({
            hotDogStatus: textToSave
        })
        .then( function () {
            console.log("Status saved!");
        })
        .catch(function (error) {
            console.log("Got an error: ", error);
        });
})