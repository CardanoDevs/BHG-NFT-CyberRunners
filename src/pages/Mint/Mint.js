import { Switch, Route } from "react-router-dom";

import Create from "../../components/Mint/Create/Create";
import Confirmation from "../../components/Mint/Confirmation/Confirmation";
import MintNow from "../../components/Mint/MintNow/MintNow";
import Sorry from "../../components/Mint/Sorry/Sorry";
import Success from "../../components/Mint/Success/Success";

import "./Mint.scss";

import { database } from "../../firebase/firebase";
import { useState, useEffect } from "react";

import store from "../../store/store";
import { ethers, utils } from "ethers";

export const Mint = ({ walletAddress, hideLoading, displayLoading }) => {
  const [arrWhite, setArrWhite] = useState([]);
  const [loading, setLoading] = useState(true);

  const finishLoading = () => {
    hideLoading();
    setLoading(false);
  };

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
                walletList.push(value.address);
              });
            }

            setArrWhite(walletList);
            setTimeout(() => {
              finishLoading();
            }, 300);
          }
        });
    };

    setLoading(true);
    displayLoading();
    loadWhiteList();
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

  // Object.keys(timeLeft).length === 0

  return (
    <div className="container">
      {!loading && arrWhite.length > 0 && (
        <div className="mint">
          <MintNow walletAddress={walletAddress} arrWhite={arrWhite} />
        </div>
      )}
    </div>
  );
};

export default Mint;
