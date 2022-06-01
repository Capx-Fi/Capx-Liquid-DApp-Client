import "./MetamaskModal.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import FirefoxIllustration from "../../../assets/FirefoxIllustration.png";
import NextIcon from "../../../assets/next-black.png";
import { injected, walletconnect } from "../../../utils/connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import "../../../translations/i18n";
import { CHAIN_NAMES } from "../../../constants/config";
import React, { useState } from "react";

function MetamaskModal({ setModalMode }) {
	const { t } = useTranslation();
	const { enqueueSnackbar, closeSnackbar } = useSnackbar();
	const isMetamask = window.ethereum && window.ethereum.isMetaMask;
	const { active, account, library, connector, activate } = useWeb3React();
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

	return (
		<article className="metamaskmodalscreen">
			<Header hiddenNav />
			<section className="metamaskmodalscreen_maincontainer">
				<div className="metamaskmodalscreen_maincontainer_herocontainer">
					<div className="metamaskmodalscreen_maincontainer_herocontainer_title">
						{t("please_connect_metamask")}
						<br /> {t("Wallet to proceed")}
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
