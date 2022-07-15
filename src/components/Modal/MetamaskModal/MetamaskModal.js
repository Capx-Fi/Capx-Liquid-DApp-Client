import "./MetamaskModal.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import FirefoxIllustration from "../../../assets/FirefoxIllustration.png";
import NextIcon from "../../../assets/NextGreen.svg";
import { injected, walletconnect } from "../../../utils/connector";
import { UnsupportedChainIdError } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { CHAIN_NAMES } from "../../../constants/config";
import React, { useState } from "react";
import useCapxWalletConnection from "../../../useCapxWalletConnection";

function MetamaskModal({ setModalMode }) {
  const { t } = useTranslation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMetamask = window.ethereum && window.ethereum.isMetaMask;
  const { active, account, library, connector, connect, error } =
    useCapxWalletConnection();
  const unsupportedChainIdError =
    error && error instanceof UnsupportedChainIdError;

  return (
    <article className="metamaskmodalscreen">
      <Header hiddenNav />
      <section className="metamaskmodalscreen_maincontainer">
        <div className="metamaskmodalscreen_maincontainer_herocontainer border border-lightGrayBorder">
          <div className="metamaskmodalscreen_maincontainer_herocontainer_title">
            {t("please_connect_metamask")}
            <br /> {t("Wallet to Proceed")}
          </div>
          {/* <div className="metamaskmodalscreen_maincontainer_herocontainer_title">
            {t("please_connect_metamask_2")}
          </div> */}

          <div
            className="metamaskmodalscreen_maincontainer_herocontainer_button"
            onClick={() => {
              setModalMode(1);
            }}
          >
            <div className="metamaskmodalscreen_maincontainer_herocontainer_button_text">
              Connect Wallet
            </div>
            <img
              className="metamaskmodalscreen_maincontainer_herocontainer_button_icon"
              src={NextIcon}
              alt="Next Icon"
            />
          </div>

          <img
            className="metamaskmodalscreen_maincontainer_herocontainer_firefoxillustration"
            src={FirefoxIllustration}
            alt="ETH Illustration"
          />
        </div>
      </section>
      <Footer />
    </article>
  );
}

export default MetamaskModal;
