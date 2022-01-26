import "./Header.scss";
import CapxLogo from "../../assets/capxliquid-logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";
import { injected } from "../../utils/connector";
import ChooseDashboardModal from "../Modal/ChooseDashboardModal/ChooseDashboardModal";

import { useEffect, useState } from "react";

function Header({ vesting, hiddenNav, showSteps, hiddenSwitch }) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { active, account, library, connector, activate, deactivate, chainId } =
    useWeb3React();
  const { metaState, getChain } = useMetamask();
  const desiredChainId = "4";
  const currentChainId = metaState.chain.id?.toString();
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };
  async function connect() {
    try {
      await activate(injected);
    } catch (ex) {
      if (ex instanceof UnsupportedChainIdError) {
        enqueueSnackbar(
          "Please connect to the Rinkeby / BSC Testnet / MATIC Mumbai Testnet Chain.",
          { variant: "error" }
        );
      }
    }
  }

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }
  return (
    <>
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <header
        className={`header z-20 ${
          vesting
            ? "border-b border-dark-200 tablet:border-none"
            : "border-b border-dark-200 "
        }`}
      >
        <a href="/">
          <div>
            <img
              className={`header_logo ${vesting && "flex tablet:hidden "}`}
              src={CapxLogo}
              alt="capx logo"
            />
          </div>
        </a>
        {!hiddenNav && (
          <div className="header_navbar">
            {!vesting && (
              <>
                {" "}
                <div
                  className={`header_navbar_text ${
                    hiddenSwitch ? "hidden tablet:flex" : ""
                  }`}
                  onClick={() => {
                    setDashboardModal(true);
                  }}
                >
                  Switch Dashboard
                </div>
                <div
                  className={`header_navbar_gap ${
                    hiddenSwitch ? "hidden tablet:flex" : ""
                  }`}
                ></div>
              </>
            )}
            {active ? (
              <div className="header_navbar_logoutbutton">
                <div className="header_navbar_logoutbutton_text">
                  {" "}
                  {`${account.substr(0, 6)}...${account.substr(-4)}`}
                </div>
                <img
                  className="header_navbar_logoutbutton_icon"
                  onClick={disconnect}
                  src={LogoutIcon}
                  alt="logout icon"
                />
              </div>
            ) : (
              <div className="header_navbar_button">
                <div onClick={connect} className="header_navbar_button_text">
                  Connect Wallet
                </div>
              </div>
            )}
          </div>
        )}{" "}
      </header>
    </>
  );
}

export default Header;
