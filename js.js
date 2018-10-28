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

const txtEmail = document.getElementById("txtEmail"); // coco@coco.com
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnResetPassword = document.getElementById("btnResetPassword");
const btnSignUp = document.getElementById("btnSignUp");
const btnLogout = document.getElementById("btnLogout");
const log = document.getElementById("log");

const main = document.querySelector("main");
const outputHeader = document.getElementById("hotDogOutput");
const inputTextField = document.getElementById("latestHotDogStatus");
const saveButton = document.getElementById("saveButton");
const loadButton = document.getElementById("loadButton");

function getRealtimeUpdates(doc) {
    docRef
        .onSnapshot(doc =>{
            updateHeader(doc);
        });
}
function updateHeader(doc) {
    if (doc && doc.exists) {
        const myData = doc.data();
        outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus;
    }
}
function loadDocRef() {
    docRef
        .get()
        .then(doc => {
            updateHeader(doc);
        })
        .catch( error => {
            console.log("Got an error: ", error);
        });
}

// log in s'identifier; sign in se connecter; sign up s'inscrire; sign out déconnexion
//btnResetPassword.classList.remove('hide');
btnResetPassword.addEventListener("click", e => {
    e.preventDefault();
    let email = txtEmail.value;
    firebase.auth().sendPasswordResetEmail(email)
});

btnLogin.addEventListener("click", e =>{
    // TODO: CHECK FOR REAL EMAIL
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
        log.innerHTML = e.message
        if (e.message == "The password is invalid or the user does not have a password.") {
            btnResetPassword.classList.remove('hide');
        }
    });
    if (outputHeader.innerText == "Hot dog status:") {
        console.log("TODO");
        //getRealtimeUpdates();
        //loadDocRef();
        // reload to get the loadDocRef
        // location.reload();
    }
});
btnSignUp.addEventListener("click", e =>{
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => log.innerHTML = e.message);
});
btnLogout.addEventListener("click", e => {
    firebase.auth().signOut();
    btnLogin.classList.remove("hide");
    btnSignUp.classList.remove("hide");
});
firebase.auth().onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        if (firebaseUser.email) {
            btnResetPassword.classList.add('hide');
        }
        log.innerHTML = "logged with " + firebaseUser.email;
        btnLogin.classList.add("hide");
        btnSignUp.classList.add("hide");
        btnLogout.classList.remove("hide");
        main.classList.remove("hide");
    } else {
        log.innerHTML = 'not logged in';
        btnLogout.classList.add("hide");
        main.classList.add("hide");
    }
});
saveButton.addEventListener("click", () => {
    const textToSave = inputTextField.value;
    console.log("I am going to save " + textToSave + " to Firestore");
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
    loadDocRef();
});
getRealtimeUpdates();



// var actionCodeSettings = {
//     url: 'https://www.example.com/?email=user@example.com',
//     iOS: {
//         bundleId: 'com.example.ios'
//     },
//     android: {
//         packageName: 'com.example.android',
//         installApp: true,
//         minimumVersion: '12'
//     },
//     handleCodeInApp: true
// };
// firebase.auth().sendPasswordResetEmail(
//     'user@example.com', actionCodeSettings)
//     .then(function() {
//         // Password reset email sent.
//     })
//     .catch(function(error) {
//         // Error occurred. Inspect error.code.
//     });


// todo email  vérification and reset password

// todo 2 pages toujour loggé ?

// todo recevoir un email quand qqn se connecte sur mon cv ?