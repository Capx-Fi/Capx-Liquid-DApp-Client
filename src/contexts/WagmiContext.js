import React from "react";

import i18next from "i18next";
import { WagmiConfig, createClient, configureChains } from "wagmi";

import { polygonMumbai, goerli } from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { avalancheChain, bscTestnet } from "../chainObjects";

export const WagmiContext = ({ children }) => {
  const { chains, provider, webSocketProvider } = configureChains(
    [avalancheChain, bscTestnet, goerli, polygonMumbai],
    [publicProvider()]
  );

  const client = createClient({
    autoConnect: false,
    connectors: [
      new MetaMaskConnector({ chains }),
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

  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
