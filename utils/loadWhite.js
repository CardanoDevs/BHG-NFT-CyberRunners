const firebase = require('firebase');
const fs = require('fs');
const ethers = require('ethers');

const firebaseConfig = {
    apiKey: "AIzaSyD1M49Z5_FgMLrvBWOij3VNbeAxumm8pDU",
    authDomain: "cyberrunners-1ae33.firebaseapp.com",
    databaseURL: "https://cyberrunners-1ae33-default-rtdb.firebaseio.com",
    projectId: "cyberrunners-1ae33",
    storageBucket: "cyberrunners-1ae33.appspot.com",
    messagingSenderId: "336388052087",
    appId: "1:336388052087:web:e33e9e628b18b16a57e272",
    measurementId: "G-7Y4Q5JVM4F"
  };

  firebase.initializeApp(firebaseConfig);
  const database = firebase.database();
  var walletList = [];

async function Run() {
    var array = fs.readFileSync('./utils/whitelist.txt').toString().split(",");
    var newArray = [];
    let ref = database.ref("whitelist");
    console.log("Uploading the address to the Database ..." + array.length);
    for(let i in array) {
        array[i] = array[i].replace(/(\r\n|\n|\r)/gm, "");
        if (array[i] == "") continue;
        walletList.push(array[i]);
        const item = {
            address: ethers.utils.getAddress(array[i])
        }
        let newItem = ref.push();
        newItem.set(item);
        console.log(i + "  : " + item.address);
    }
    console.log("Uploading is completed...");
}

Run();

