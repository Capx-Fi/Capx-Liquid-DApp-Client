import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MetamaskStateProvider } from "./metamaskReactHook/index";
import MetamaskModal from "./components/Modal/MetamaskModal/MetamaskModal";
import { SnackbarProvider } from "notistack";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import { WagmiConfig, createClient, configureChains } from "wagmi";

import { rinkeby, polygonMumbai } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { avalancheChain, bscTestnet } from "./chainObjects";

const { chains, provider, webSocketProvider } = configureChains(
  [avalancheChain, bscTestnet, rinkeby, polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: false,
  connectors: [
    new InjectedConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        qrcode: true,
      },
    }),
  ],
  provider,
  webSocketProvider,
});

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <WagmiConfig client={client}>
      <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        maxSnack={3}
      >
        <App />
      </SnackbarProvider>
    </WagmiConfig>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
