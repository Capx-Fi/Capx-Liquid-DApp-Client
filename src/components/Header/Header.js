import "./Header.scss";
import CapxLogo from "../../assets/capxliquid-logo.svg";
import LogoutIcon from "../../assets/logout.svg";
import { useSnackbar } from "notistack";
import Web3 from "web3";
import { useMetamask } from "../../metamaskReactHook/index";
import { UnsupportedChainIdError } from "@web3-react/core";
import { injected, walletconnect } from "../../utils/connector";
import ChooseDashboardModal from "../Modal/ChooseDashboardModal/ChooseDashboardModal";
import DropDown from "../DropDown/DropDown";
import { Tooltip, withStyles } from "@material-ui/core";

import { useEffect, useState } from "react";
import { CHAIN_NAMES } from "../../constants/config";

import { getSortBy } from "../../constants/getChainConfig";
import useWagmi from "../../useWagmi";

function Header({
  vesting,
  hiddenNav,
  showSteps,
  hiddenSwitch,
  isWalletConnect,
}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const {
    active,
    account,
    library,
    connector,
    connect,
    deactivate,
    chainId,
    switchNetwork,
    provider,
  } = useWagmi();

  const [dashboardModal, setDashboardModal] = useState(false);
  const [sortBy, setSortBy] = useState("Ethereum");
  const [web3, setWeb3] = useState(null);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };

  const setupProvider = async () => {
    let result = await connector?.getProvider().then((res) => {
      return res;
    });
    return result;
  };

  useEffect(() => {
    active &&
      provider.then((res) => {
        setWeb3(new Web3(res));
      });
  }, [active, chainId]);

  // web3 && console.log(web3);

  useEffect(() => {
    setSortBy(chainId && getSortBy(chainId));
  }, [chainId]);

  async function connectWallet() {
    try {
      await connect(injected);
    } catch (ex) {
      if (ex instanceof UnsupportedChainIdError) {
        enqueueSnackbar(`Please connect to the ${CHAIN_NAMES} Mainnet Chain.`, {
          variant: "error",
        });
      }
    }
  }

  const chainChange = async (chainId) => {
    await switchNetwork(chainId);
  };

  async function disconnect() {
    try {
      deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      background: "#2A383C",
      color: "#F1FAF2",
      maxWidth: 800,
      fontSize: theme.typography.pxToRem(12),
      borderRadius: "4px",
      zIndex: 100,
    },
  }))(Tooltip);
  return (
    <>
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <header
        className={`header z-20 ${
          vesting ? "border-b border-dark-25 " : "border-b border-dark-25 "
        }`}
      >
        <a href="/">
          <div>
            <img
              className={`header_logo flex `}
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
              <>
                <div className="mr-4 phone:hidden screen:block">
                  <DropDown sortBy={sortBy} chainChange={chainChange} />
                </div>
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
              </>
            ) : (
              <div className="header_navbar_button">
                <div onClick={connectWallet} className="header_navbar_button_text">
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
