import { NavLink } from "react-router-dom";

import "./MintNow.scss";
import Select from "react-select";

import arrowLeft from "../../../assets/img/icons/arrow_left.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import title from "../../../assets/img/font_svg/mint_title_congratulations.svg";
import tag from "../../../assets/img/tags/5.svg";
import pic from "../../../assets/img/mint/mint_avatar.png";

import skeleton from "../../../assets/img/icons/skeleton_white.svg";
import { ethers, utils } from "ethers";

import { useState, useEffect } from "react";
import { mintNFT } from "../../../helpers/interact";
import { getCurrentTotalSupply } from "../../../helpers/contract";
import { calculatePublicTimeLeft } from "../../../helpers/timer";
import { NotificationManager } from "react-notifications";
import { calculateTimeLeft } from "../../../helpers/timer";
import { useLocation, useHistory } from "react-router-dom";
export const MintNow = ({ walletAddress, arrWhite }) => {
  const [mintLoading, setMintLoading] = useState(false);
  const [totalSupply, setTotalSupply] = useState(0);
  const [waitTime, setTime] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  const history = useHistory();
  const timeLeft = calculatePublicTimeLeft();

  useEffect(() => {
    const load = async () => {
      let supply = await getCurrentTotalSupply();
      setTotalSupply(supply);
    };
    load();
  }, []);

  useEffect(() => {
    let interval = null;

    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((waitTime) => waitTime - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePauseResume = () => {
    setIsPaused(!isPaused);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(3600);
  };

  const [number, setNumber] = useState(1);
  const options = [
    { value: "1", label: "1 - 0.06 ETH" },
    { value: "2", label: "2 - 0.12 ETH" },
    { value: "3", label: "3 - 0.18 ETH" },
    { value: "4", label: "4 - 0.24 ETH" },
  ];

  const onMint = async (amount) => {
    if (!!walletAddress) {
      setMintLoading(true);
      handleStart();
      const { success, status } = await mintNFT(
        walletAddress,
        setMintLoading,
        amount
      );
      if (success) {
        NotificationManager.success(
          "Congratulations. CyberRunners are  successfully minted!"
        );
        history.push("/success");
      } else if (status.indexOf("insufficient fund") >= 0) {
        NotificationManager.info(
          "You don't have enough eths to mint CyberRunners!"
        );
      } else if (status.indexOf("presale is not open") >= 0) {
        NotificationManager.info("Presale is not open!");
      } else if (
        status.indexOf("this address is not whitelisted for the presale") >= 0
      ) {
        NotificationManager.info(
          "This address is not whitelisted for the presale!"
        );
      } else if (
        status.indexOf(
          "this address is not allowed to mint that many during the presale"
        ) >= 0
      ) {
        NotificationManager.info(
          "This address is not allowed to mint that many during the presale!"
        );
      } else {
        NotificationManager.info("Transaction is failed!");
      }
    }
  };
  const onMintHandler = async (amount) => {
    console.log(amount);
    if (Object.keys(timeLeft).length === 0) {
      // public sale
      onMint(amount);
    } else {
      //presale
      if (arrWhite.indexOf(ethers.utils.getAddress(walletAddress)) > -1) {
        onMint(amount);
      } else {
        NotificationManager.info(
          "This address is not allowed to mint during the presale!"
        );
      }
    }
  };

  return (
    <div>
      <div className="mint__backHome">
        <NavLink to={{ pathname: "/" }}>
          <img alt="icon" src={arrowLeft} />
          Back to home
        </NavLink>
      </div>

      <section className="mint__mintNow">
        <div className="mint__mintNow__main">
          <div className="mint__mintNow__main__title">
            <img alt="title" src={title} />
            <p>YOU’VE BEEN SELECTED TO MINT YOUR CYBERUNNERS NFT</p>
          </div>

          <div className="mint__create__main__select">
            <Select
              defaultMenuIsOpen={false}
              defaultValue={options[0]}
              options={options}
              onChange={(e) => {
                setNumber(e.value);
              }}
              classNamePrefix="mint__create__main__select"
            />
          </div>

          <button
            onClick={() => {
              if (!mintLoading) onMintHandler(number);
            }}
            className="mint__mintNow__main__button"
          >
            {mintLoading && (
              <FontAwesomeIcon
                className="mint-spinner"
                icon={faSpinner}
                size="1x"
              />
            )}
            &nbsp;MINT MY CYBERUNNERS
          </button>

          <div className="mint__mintNow__main__timer">
            <div className="mint__mintNow__main__timer__desc">
              Estimated Wait Time
            </div>
            <div className="mint__mintNow__main__timer__wrapper">
              <div className="mint__mintNow__main__timer__value">
                <p className="mint__mintNow__main__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).hours}{" "}
                </p>
              </div>

              <div className="mint__mintNow__main__timer__split">
                <p>:</p>
              </div>

              <div className="mint__mintNow__main__timer__value">
                <p className="mint__mintNow__main__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).minutes}{" "}
                </p>
              </div>

              <div className="mint__mintNow__main__timer__split">
                <p>:</p>
              </div>

              <div className="mint__mintNow__main__timer__value">
                <p className="mint__mintNow__main__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).seconds}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mint__mintNow__pic">
          <div className="mint__mintNow__pic__wrapper">
            <img className="mint__mintNow__pic__tag" alt="pic" src={tag} />
            <img className="mint__mintNow__pic__main" alt="pic" src={pic} />
          </div>

          <div className="mint__mintNow__pic__ballance">
            <div className="mint__mintNow__pic__ballance__icon">
              <img alt="tag" src={skeleton} />
            </div>

            <div className="mint__mintNow__pic__ballance__detail">
              <div className="mint__mintNow__pic__ballance__detail__number">
                {totalSupply} / 8,888
              </div>

              <div className="mint__mintNow__pic__ballance__detail__info">
                CYBERUNNERS ALREADY MINTED
              </div>
            </div>
          </div>
        </div>

        <div className="mint__mintNow__timer">
          <div className="container">
            <div className="mint__mintNow__timer__tag">
              <img alt="tag" src={tag} />
            </div>

            <div className="mint__mintNow__timer__desc">
              Estimated Wait Time
            </div>
            <div className="mint__mintNow__timer__wrapper">
              <div className="mint__mintNow__timer__value">
                <p className="mint__mintNow__timer__value__desc"> HOURS </p>
                <p className="mint__mintNow__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).hours}{" "}
                </p>
              </div>

              <div className="mint__mintNow__timer__split">
                <p>:</p>
              </div>

              <div className="mint__mintNow__timer__value">
                <p className="mint__mintNow__timer__value__desc"> MINUTES </p>
                <p className="mint__mintNow__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).minutes}{" "}
                </p>
              </div>

              <div className="mint__mintNow__timer__split">
                <p>:</p>
              </div>

              <div className="mint__mintNow__timer__value">
                <p className="mint__mintNow__timer__value__desc"> SECONDS </p>
                <p className="mint__mintNow__timer__value__number">
                  {" "}
                  {calculateTimeLeft(waitTime).seconds}{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MintNow;
