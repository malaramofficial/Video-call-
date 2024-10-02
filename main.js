
// Firebase Messaging Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js').then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(err) {
        console.error('Service Worker registration failed:', err);
    });
}

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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Request Permission to Send Notifications
messaging.requestPermission().then(function() {
    console.log('Notification permission granted.');
    return messaging.getToken();
}).then(function(token) {
    console.log('FCM Token:', token);
    // Send token to your server (store it in the database)
}).catch(function(err) {
    console.log('Unable to get permission to notify.', err);
});

// Call button click event to trigger notification
document.getElementById('callButton').addEventListener('click', function() {
    sendNotification();
});

// Function to send a notification
function sendNotification() {
    const notification = {
        "to": "<RECEIVER_DEVICE_TOKEN>", // Replace with receiver's FCM Token
        "notification": {
            "title": "Incoming Call",
            "body": "You have an incoming call",
            "icon": "/call-icon.png",
            "click_action": "https://your-web-app-url.com"
        }
    };

    // Send notification using your server or Firebase Function
    fetch('https://fcm.googleapis.com/fcm/send', {
        method: 'POST',
        headers: {
            'Authorization': 'key=<YOUR_SERVER_KEY>', // Replace with your FCM Server Key
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notification)
    }).then(response => {
        console.log('Notification sent successfully:', response);
    }).catch(error => {
        console.error('Error sending notification:', error);
    });
}
