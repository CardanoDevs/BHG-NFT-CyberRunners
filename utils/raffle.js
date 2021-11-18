const firebase = require("firebase");
const fs = require("fs");
const ethers = require("ethers");

const firebaseConfig = {
  apiKey: "AIzaSyD1M49Z5_FgMLrvBWOij3VNbeAxumm8pDU",
  authDomain: "cyberrunners-1ae33.firebaseapp.com",
  databaseURL: "https://cyberrunners-1ae33-default-rtdb.firebaseio.com",
  projectId: "cyberrunners-1ae33",
  storageBucket: "cyberrunners-1ae33.appspot.com",
  messagingSenderId: "336388052087",
  appId: "1:336388052087:web:e33e9e628b18b16a57e272",
  measurementId: "G-7Y4Q5JVM4F",
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();
var walletList = [];

let amtRaffle = 10;

async function Run() {
  database
    .ref("waiting/")
    .get()
    .then((snapshot) => {
      if (snapshot.exists) {
        const newArray = snapshot.val();
        if (newArray) {
          Object.keys(newArray).map((key, index) => {
            const value = newArray[key];
            walletList.push(value.address);
          });
        }
      }

      console.log(
        "Raffle number : " + amtRaffle + " waiting :" + walletList.length
      );
      let ref = database.ref("raffle");
      if (amtRaffle > walletList.length) {
        console.log("No Raffle due to shortage of waiting address...");

        for (let i in walletList) {
          const item = {
            address: ethers.utils.getAddress(walletList[i]),
          };
          let newItem = ref.push();
          newItem.set(item);
          console.log(i + " : raffle : " + item.address);
        }
      } else {
        console.log("Raffle, pick " + amtRaffle + " addresses");

        let indexArr = [];
        while (indexArr.length < amtRaffle) {
          var r = Math.floor(Math.random() * walletList.length);
          if (indexArr.indexOf(r) === -1) indexArr.push(r);
        }

        for (let i in indexArr) {
          const item = {
            address: ethers.utils.getAddress(walletList[indexArr[i]]),
          };
          let newItem = ref.push();
          newItem.set(item);
          console.log(i + " : raffle : " + item.address);
        }
      }
    });
}

Run();
