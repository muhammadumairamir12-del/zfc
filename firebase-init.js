// Firebase Initialization Script for SkyEagle Studio
const firebaseConfig = {
  apiKey: "AIzaSyB0LwjtjOGib10acfQNTxkhllofP1Tenus",
  authDomain: "skyeaglestudio-45886.firebaseapp.com",
  projectId: "skyeaglestudio-45886",
  storageBucket: "skyeaglestudio-45886.firebasestorage.app",
  messagingSenderId: "300452551069",
  appId: "1:300452551069:web:41c0bce1c400569eb17774",
  measurementId: "G-D6X9PTK3YR"
};

// Check if Firebase core script is loaded from CDN
if (typeof firebase !== 'undefined') {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    console.log("Firebase Core initialized successfully.");

    // Expose services to window object if their libraries are loaded
    if (typeof firebase.analytics !== 'undefined') {
        window.analytics = firebase.analytics();
        console.log("Firebase Analytics initialized.");
    }

    if (typeof firebase.firestore !== 'undefined') {
        window.db = firebase.firestore();
        console.log("Firebase Firestore initialized.");
    }

    if (typeof firebase.auth !== 'undefined') {
        window.auth = firebase.auth();
        console.log("Firebase Auth initialized.");
    }
} else {
    console.warn("Firebase core SDK not loaded. Make sure Firebase CDN scripts are imported.");
}
