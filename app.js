// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import {
  set,
  push,
  ref,
  getDatabase,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDa8-kA9gGEpC-QMvjZ4143PopfWN8xk44",
  authDomain: "practice-bootstrap-03412.firebaseapp.com",
  databaseURL: "https://practice-bootstrap-03412-default-rtdb.firebaseio.com",
  projectId: "practice-bootstrap-03412",
  storageBucket: "practice-bootstrap-03412.appspot.com",
  messagingSenderId: "389015875183",
  appId: "1:389015875183:web:854db25f0502912df3a79a",
  measurementId: "G-5EL66RP7GL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

var studentName = document.getElementById("studentName");
var fatherName = document.getElementById("fatherName");
var eMail = document.getElementById("eMail");
var contact = document.getElementById("contact");
var address = document.getElementById("address");
var allStudensData = "";
var perent = document.getElementById("perent");

window.addData = function () {
  var obj = {
    student: studentName.value,
    father: fatherName.value,
    email: eMail.value,
    contact: contact.value,
    address: address.value,
  };
  console.log(obj);
  var refrence = ref(db, `studentInfo/`);
  push(refrence, obj);
};

function getData() {
  const refrence = ref(db, `studentInfo/`);
  onValue(refrence, function (studentInfo) {
    allStudensData = studentInfo.val();
    console.log(allStudensData);
    var arr = Object.values(allStudensData);
    console.log(arr);
    perent.innerHTML = "";
    for (var i = 0; i < arr.length; i++) {
      perent.innerHTML += `
            <div
      class="container d-flex justify-content-evenly border border-1"
      id="displayMain"
    >
    <p id="displayStudentName">${arr[i].student}</p>
            <p  id="displayFatherName">${arr[i].father}</p>
            <p  id="displayEmail">${arr[i].email}</p>
            <p  id="displayContact">${arr[i].contact}</p>
            <p  id="displayAddress">${arr[i].address}</p>
    
    </div>`;
    }
    // return arr;
  });
}
getData();
