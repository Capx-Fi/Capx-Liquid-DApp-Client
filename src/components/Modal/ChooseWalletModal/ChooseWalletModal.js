import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import MetamaskIcon from "../../../assets/metamask.svg";
import WalletConnectIcon from "../../../assets/walletconnect-logo.svg";
import { Link } from "react-router-dom";
import "./ChooseWalletModal.scss";
import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { injected, walletconnect } from "../../../utils/connector";
import { CHAIN_NAMES } from "../../../constants/config";
import { useTranslation } from "react-i18next";
import infoIcon from "../../../assets/Info.png";

const Landing = ({ setModalMode }) => {
  const { active, account, library, connector, activate } = useWeb3React();
  const [isWalletConnect, setIsWalletConnect] = useState(false);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { error } = useWeb3React();
  const unsupportedChainIdError =
    error && error instanceof UnsupportedChainIdError;

  async function connect() {
    try {
      await activate(injected);
      if (unsupportedChainIdError) {
        enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
          variant: "error",
        });
      }
    } catch (ex) {
      if (error instanceof UnsupportedChainIdError) {
        enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
          variant: "error",
        });
      }
      alert(ex);
    }
  }

  async function walletConnect() {
    try {
      await activate(walletconnect);
      if (unsupportedChainIdError) {
        enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
          variant: "error",
        });
      }
    } catch (ex) {
      if (error instanceof UnsupportedChainIdError) {
        enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
          variant: "error",
        });
      }
      console.log(ex);
    }
  }

  return (
    <article className="h-screen bg-dark-400 flex choose_screen">
      <Header hiddenNav />
      <div className="justify-center laptop:items-center m-auto mt-32 tablet:mt-48 laptop:mt-auto">
        <div className="herocontainer bg-white border border-lightGrayBorder phone:w-90v phone:mt-12 tablet:mt-0 desktop:mt-8 tablet:w-75v phone:px-8 phone:py-6 screen:px-16 screen:py-10 desktop:px-20 desktop:py-14 rounded-2xl bg-opacity-70 text-darkText relative screen:w-65v desktop:w-60v flex flex-col items-start">
          <div className="title phone:text-paragraph-2 phone:leading-1 tablet:text-heading-2 screen:text-heading-2 screen:leading-lh-64 desktop:text-40px desktop:leading-lh-64 twok:text-50px twok:leading-lh-54 tablet:leading-title-1 font-semibold w-10/12 text-left">
            {"Connect your wallet"}
          </div>
          <div className="tablet:text-paragraph-2 desktop:mt-2 desktop:text-paragraph-1 desktop:leading-subheading twok:text-subheading twok:leading-subheading text-darkText">
            {"Connect with one of our available wallet providers"}
          </div>
          <div className="herobuttons flex flex-col gap-y-2 my-14 w-full">
            <div
              onClick={() => {
                connect();
              }}
              className="herocontainer_button  border border-lightGrayBorder flex flex-start rounded-xl items-center flex px-5 py-4 z-10 cursor-pointer"
            >
              <div>
                <img
                  src={MetamaskIcon}
                  alt="Metamask Icon"
                  className="inline-block phone:w-10 phone:h-10 desktop:w-12 ml-3 mr-12"
                />
              </div>
              <div className="button_text text-darkText desktop:text-captions-1 twok:text-subheading desktop-captions-1 twok:leading-subheading desktop:font-semibold">
                {"Metamask"}
              </div>
            </div>
            <div
              onClick={() => {
                walletConnect();
              }}
              className="herocontainer_button  border border-lightGrayBorder flex flex-start rounded-xl items-center flex px-5 py-4 z-10 cursor-pointer"
            >
              <div>
                <img
                  src={WalletConnectIcon}
                  alt="WalletConnect Icon"
                  className="inline-block phone:w-10 phone:h-10 desktop:w-12 ml-3 mr-12"
                />
              </div>
              <div className="flex flex-col text-left phone:pl-10 tablet:pl-0">
                <div className="text-darkText desktop:text-paragraph-2 breakpoint:text-caption-1 twok:text-subheading desktop-captions-1 twok:leading-subheading font-semibold">
                  {"WalletConnect"}
                </div>
                <p className="infoText text-left mt-2 text-tradeTitle">
                  <img
                    src={infoIcon}
                    className="w-4 pb-0.5 mr-2 phone:hidden tablet:inline tablet:mr-1 items-center"
                    alt="info icon"
                  />
                  {"Please refresh the page after connecting your wallet."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  );
};

export default Landing;
