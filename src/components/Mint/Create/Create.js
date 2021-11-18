import {
    NavLink,
} from "react-router-dom";

import './Create.scss';
import Select from 'react-select';

import title from '../../../assets/img/font_svg/mint_title_want_cyberunner.svg';
import discordIcon from '../../../assets/img/icons/topIcon1.svg';
import twitterIcon from '../../../assets/img/icons/topIcon2.svg';

import tag from '../../../assets/img/tags/5.svg';
import pic from '../../../assets/img/mint/mint_avatar.png';

import arrowLeft from '../../../assets/img/icons/arrow_left.svg';
import { database } from "../../../firebase/firebase"
import { useLocation, useHistory } from "react-router-dom";
import { ethers, utils } from "ethers";

export const Create = ({walletAddress}) => {

    const history = useHistory();
    const location = useLocation();

    const registerWallet = async() => {
        let ref = database.ref("waiting");
        const item = {
            address: utils.getAddress(walletAddress)
        }
        let newItem = ref.push();
        newItem.set(item);
    }

    const registerWithDiscord = async () => {

        await registerWallet();
        history.push("/");
        window.open(
            "https://discord.gg/cyberunners", "_blank");
    }

    const registerWithTwitter = async () => {

        await registerWallet();
        window.open(
            "https://twitter.com/cyberunners", "_blank");
    }

    const options = [
        { value: '1', label: '1 - 0.06 ETH' },
        { value: '2', label: '2 - 0.12 ETH' },
        { value: '3', label: '3 - 0.18 ETH' },
        { value: '4', label: '4 - 0.24 ETH' }
    ];

    return (
        <div>
            <div className="mint__backHome">
                <NavLink to={{ pathname: '/' }}>
                    <img alt="icon" src={ arrowLeft }></img>
                    Back to home 
                </NavLink>
            </div>

            <div className="mint__create">
                <div className="mint__create__main">
                    <div className="mint__create__main__title">
                        <img alt="title" src={title}></img>
                        <p>REGISTER TO JOIN THE RAFFLE</p>
                    </div>

                    <div className="mint__create__main__select">
                        <p>number of cyberunners you want to mint</p>
                        <Select 
                            defaultMenuIsOpen = {false}
                            defaultValue={options[0]}
                            options={options} 
                            classNamePrefix="mint__create__main__select" />
                    </div>

                    <div className="mint__create__main__buttons">
                        <button className="discord" onClick={() => {registerWithDiscord()}}>
                            <img alt="icon" src={ discordIcon }></img>
                            REGISTER WITH DISCORD
                        </button>

                        <div className="splitter">
                            <p className="splitter__line"></p>
                            <p className="splitter__text">OR</p>
                            <p className="splitter__line"></p>
                        </div>

                        <button className="twitter" onClick={() => {registerWithTwitter()}}>
                            <img alt="icon" src={ twitterIcon }></img>
                            REGISTER WITH TWITTER
                        </button>
                    </div>
                </div>

                <div className="mint__create__pic">
                    <div className="mint__create__pic__wrapper">
                        <img className="mint__create__pic__tag" alt="pic" src={tag}></img>
                        <img className="mint__create__pic__main" alt="pic" src={pic}></img>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Create;