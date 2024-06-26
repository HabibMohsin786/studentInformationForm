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

  // var refrence = ref(db, `studentInfo/`);
  // push(refrence, obj);
  
  obj.id = push(ref(db, `studentInfo`)).key;
  var refrence = ref(db, `studentInfo/`);
  set(refrence, obj);

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
    <tr
    class="text-center"
      id="displayMain"
    >
            <td class="" id="displayStudentName">${arr[i].student}</td>
            <td class=""  id="displayFatherName">${arr[i].father}</td>
            <td class=""  id="displayEmail">${arr[i].email}</td>
            <td class=""  id="displayContact">${arr[i].contact}</td>
            <td class=""  id="displayAddress">${arr[i].address}</td>
            <td class=""  id="displayAddress"><button onclick="deletList()" type="button" class="btn btn-primary">Remove</button></td>
    
    </tr>`;
    }
    // return arr;
  });
}
getData();

window.deletList = function (id) {
  const refrence = ref(db, `studentInfo/${id}`);
  remove(refrence);
}