import { Switch, Route } from "react-router-dom";

import Create from "../../components/Mint/Create/Create";
import Confirmation from "../../components/Mint/Confirmation/Confirmation";
import MintNow from "../../components/Mint/MintNow/MintNow";
import Sorry from "../../components/Mint/Sorry/Sorry";
import Success from "../../components/Mint/Success/Success";

import "./Mint.scss";

import { database } from "../../firebase/firebase";
import { useState, useEffect } from "react";
import { calculatePublicTimeLeft } from "../../helpers/timer";

import store from "../../store/store";
import { ethers, utils } from "ethers";

export const Mint = ({ walletAddress }) => {
  const [arrWhite, setWhite] = useState([]);
  const [arrWaiting, setWaiting] = useState([]);
  const [arrRaffle, setRaffle] = useState([]);
  const timeLeft = calculatePublicTimeLeft();

  useEffect(() => {
    const loadWhiteList = async () => {
      database
        .ref("whitelist/")
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let walletList = [];
            const newArray = snapshot.val();
            if (newArray) {
              Object.keys(newArray).map((key, index) => {
                const value = newArray[key];
                walletList.push((value.address));
              });
            }
            setWhite(walletList);
          }
        });
    };

    const loadWaitingList = async () => {
      database
        .ref("waiting/")
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let walletList = [];
            const newArray = snapshot.val();
            if (newArray) {
              Object.keys(newArray).map((key, index) => {
                const value = newArray[key];
                walletList.push((value.address));
              });
            }
            setWaiting(walletList);
          }
        });
    };

    const loadRaffle = async () => {
      database
        .ref("raffle/")
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            let walletList = [];
            const newArray = snapshot.val();
            if (newArray) {
              Object.keys(newArray).map((key, index) => {
                const value = newArray[key];
                walletList.push((value.address));
              });
            }
            setRaffle(walletList);
          }
        });
    };

    loadWhiteList();
    loadWaitingList();
    loadRaffle();
  }, []);

  // status => component
  //       0 : create
  //       1 : confirmation
  //       2 : mintnow
  //       3 : sorry
  //       4 : success
  /* <Switch>
        <Route exact path='/mint/create' component={Create} />
        <Route exact path='/mint/confirm' component={Confirmation} />
        <Route exact path='/mint/mintNow' component={MintNow} />
        <Route exact path='/mint/sorry' component={Sorry} />
        <Route exact path='/mint/success' component={Success} />
    </Switch> */

  return (
    <div className="container">
      {Object.keys(timeLeft).length === 0 ? (
        arrWhite.length > 0 &&
        arrRaffle.length > 0 && (
          <div className="mint">
            {arrWhite.indexOf(ethers.utils.getAddress(walletAddress)) > -1 ||
            arrWaiting.indexOf(ethers.utils.getAddress(walletAddress)) > -1 ? (
              <MintNow walletAddress={walletAddress}/>
            ) : (
              <Sorry />
            )}
          </div>
        )
      ) : (
        <div>
          {arrWhite.length > 0 && (
            <div className="mint">
              {arrWhite.indexOf(ethers.utils.getAddress(walletAddress)) > -1 ? (
                <MintNow walletAddress={walletAddress} />
              ) : arrWaiting.indexOf(ethers.utils.getAddress(walletAddress)) >
                -1 ? (
                <Confirmation />
              ) : (
                <Create walletAddress ={walletAddress}/>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mint;
