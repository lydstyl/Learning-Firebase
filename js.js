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

const txtEmail = document.querySelector("#txtEmail");
const txtPassword = document.querySelector("#txtPassword");
const btnLogin = document.querySelector("#btnLogin");
const btnSignUp = document.querySelector("#btnSignUp");
const btnLogout = document.querySelector("#btnLogout");

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
// log in s'identifier; sign in se connecter; sign up s'inscrire; sign out déconnexion
// toto@toto.com
btnLogin.addEventListener("click", e =>{
    // TODO: CHECK FOR REAL EMAIL
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});
btnSignUp.addEventListener("click", e =>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
});
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
});
firebase.auth().onAuthStateChanged(firebaseUser => {
    console.log("onAuthStateChanged");
    
    if (firebaseUser) {
        console.log(firebaseUser);
        btnLogout.classList.remove("hide");
    } else {
        console.log('not logged in');
        btnLogout.classList.add("hide");
    }
});

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