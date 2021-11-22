import { NotificationContainer } from "react-notifications";
import OnImagesLoaded from "react-on-images-loaded";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "react-notifications/lib/notifications.css";

import "./App.scss";

import Home from "./pages/Home/Home";
import Mint from "./pages/Mint/Mint";
import Success from "./components/Mint/Success/Success";

import Footer from "./pages/Footer/Footer";
import TopMenu from "./pages/TopMenu/TopMenu";
import Join from "./pages/Join/Join";

import LoadingImg from "./assets/img/icons/logo.svg";
import { NotificationManager } from "react-notifications";

import { connectWallet, getCurrentWalletConnected } from "./helpers/wallet";

import store from "./store/store";

const Loading = ({ isLoading }) => {
  return (
    <div className={`loading ${isLoading ? "" : "fade-hide"}`}>
      <img alt="loading" src={LoadingImg} />

      <p>Loading...</p>
    </div>
  );
};

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    const initDatas = async () => {
      if (window.ethereum) {
        const { address, status } = await getCurrentWalletConnected();
        setWalletAddress(address);
        onChangeWalletListener();
        onConnectWalletHandler();
      }
    };

    initDatas();
  }, []);

  const onConnectWalletHandler = async () => {
    if (window.ethereum) {
      const walletResponse = await connectWallet();
      setWalletAddress(walletResponse.address);
    } else {
      NotificationManager.success(
        "🦊 You must install Metamask in your browser"
      );
    }
  };

  const onChangeWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setWalletAddress(accounts[0]);
        } else {
          setWalletAddress("");
        }
      });

      window.ethereum.on("chainChanged", (chainId) => {
        onConnectWalletHandler();
      });
    } else {
    }
  };

  const hideLoading = () => {
    setIsLoading(false);

    setTimeout(() => {
      setShowLoading(false);
    }, 1000);
  };

  const displayLoading = () => {
    setIsLoading(true);
    setShowLoading(true);
  };

  return (
    <Router>
      {showLoading ? <Loading isLoading={isLoading} /> : null}

      <OnImagesLoaded
        onLoaded={() => {
          hideLoading();
        }}
      >
        <div className="App">
          <TopMenu walletAddress={walletAddress} onConnectWalletHandler={onConnectWalletHandler} />

          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/mint">
              <Mint walletAddress={walletAddress} hideLoading={hideLoading} displayLoading={displayLoading}/>
            </Route>
            <Route exact path="/success" component={Success} />
          </Switch>

          <Join />
          <Footer />
          <NotificationContainer />
        </div>
      </OnImagesLoaded>
    </Router>
  );
}

export default App;
