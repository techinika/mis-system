const firebaseConfig = {
    apiKey: "AIzaSyDTzoLMaNov9qlzLU10BWQSUpd-RSrT22w",
    authDomain: "nigute-mis.firebaseapp.com",
    projectId: "nigute-mis",
    storageBucket: "nigute-mis.appspot.com",
    messagingSenderId: "369517831523",
    appId: "1:369517831523:web:1e75a3685e511f5c0a5f56",
    measurementId: "G-9R63X2RXQ3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


  const db = firebase.firestore();