
// Import the Firebase scripts required for messaging
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAYQAK-c5-EBGDN2fuBiAWK17HnqSg058E",
    authDomain: "voting-app-f5d8b.firebaseapp.com",
    databaseURL: "https://voting-app-f5d8b-default-rtdb.firebaseio.com",
    projectId: "voting-app-f5d8b",
    storageBucket: "voting-app-f5d8b.appspot.com",
    messagingSenderId: "572075489115",
    appId: "1:572075489115:web:30e506ae04806e8a128c7e"
};

// Initialize Firebase app in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance
const messaging = firebase.messaging();

// Handle background notifications
messaging.onBackgroundMessage(function(payload) {
    console.log('Received background message: ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});
