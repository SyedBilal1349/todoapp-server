// IMPORTS
const firebase = require('firebase');
const admin = require('firebase-admin');

var serviceAccount = require("./todo-db-fa97d-firebase-adminsdk-d3lhd-925153a3e4.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-db-fa97d.firebaseio.com"
});

//Firebase credentials
const firebaseapp = firebase.initializeApp({
    apiKey: "AIzaSyAb8EDphzbsD7muS-1ROhpT4DaifBAQUDw",
    authDomain: "todo-db-fa97d.firebaseapp.com",
    databaseURL: "https://todo-db-fa97d.firebaseio.com",
    projectId: "todo-db-fa97d",
    storageBucket: "todo-db-fa97d.appspot.com",
    messagingSenderId: "52692270265"
  })

exports.fbase = firebase
exports.fbadmin = admin
exports.fbapp = firebaseapp