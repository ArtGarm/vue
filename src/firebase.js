import firebase from 'firebase';

    let config = {
        apiKey: "AIzaSyCvD10GRq1qvsTqwtKLLInkuwCXj7LDG8k",
        authDomain: "vuefirst.firebaseapp.com",
        databaseURL: "https://vuefirst.firebaseio.com",
        projectId: "vuefirst",
        storageBucket: "vuefirst.appspot.com",
        messagingSenderId: "892641324273"
    };

    firebase.initializeApp(config);

export default {
    database : firebase.database()
}