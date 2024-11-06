const firebaseConfig = {
    apiKey: "AIzaSyDdhWlujbBdjVdjiiMcjjSWkwO7LeoAZls",
    authDomain: "startup-69c0e.firebaseapp.com",
    databaseURL: "https://startup-69c0e-default-rtdb.firebaseio.com",
    projectId: "startup-69c0e",
    storageBucket: "startup-69c0e.firebasestorage.app",
    messagingSenderId: "710444015584",
    appId: "1:710444015584:web:a7aa7b85ffadf7c5c99585",
    measurementId: "G-8FRL620MLK"
 };
  
  const app = firebase.initializeApp(firebaseConfig);
  const database = firebase.database(app);