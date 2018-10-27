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
const loadButton = document.querySelector("#loadButton");

function getRealtimeUpdates(doc) {
    docRef.onSnapshot(doc =>{
        updateHeader(doc);
    });
}

function updateHeader(doc) {
    if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
    }
}

saveButton.addEventListener("click", () => {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + "to Firestore");
    docRef
        .set({
            hotDogStatus: textToSave
        })
        .then( () => {
            console.log("Status saved!");
        })
        .catch(error => {
            console.log("Got an error: ", error);
        });
});

loadButton.addEventListener("click", () => {
    docRef
        .get()
        .then(doc => {
            updateHeader(doc);
        })
        .catch( error => {
            console.log("Got an error: ", error);
        });
});

getRealtimeUpdates();