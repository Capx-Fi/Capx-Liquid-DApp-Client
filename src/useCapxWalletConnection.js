import { useEffect, useState } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useNetwork,
  useSwitchNetwork,
} from "wagmi";

import {
  Keypair as SolanaKeypair,
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";

import * as anchor from "@project-serum/anchor";

import { idl } from "./assets/idl_tk";
import {
  SOLANA_CLUSTER_API_URL,
  SOLANA_CONTRACT_PUBLIC_KEY,
} from "./constants/config";

import CapxSolanaSDK from "@capx/capx-solana-sdk";

function useCapxWalletConnection() {
  const [walletAvail, setWalletAvail] = useState(false);
  const [providerSolana, setProviderSolana] = useState(null);
  const [connected, setConnected] = useState(false);
  const [pubKey, setPubKey] = useState(null);
  const [anchorProgram, setAnchorProgram] = useState(null);

  useEffect(() => {
    if ("solana" in window) {
      const solWindow = window;
      if (solWindow?.solana?.isPhantom) {
        setProviderSolana(solWindow.solana);
        setWalletAvail(true);
        solWindow.solana.connect({ onlyIfTrusted: true });
      }
    }
  }, []);

  const loadAnchor = async () => {
    if (providerSolana) {
      const myProgram = new anchor.Program(
        idl,
        new PublicKey(SOLANA_CONTRACT_PUBLIC_KEY),
        providerSolana
      );
      console.log(myProgram);
      setAnchorProgram(myProgram);
    }
  };

  useEffect(() => {
    loadAnchor();
  }, [providerSolana]);

  useEffect(() => {
    providerSolana?.on("connect", (publicKey) => {
      console.log(`connect event: ${publicKey}`);
      setConnected(true);
      setPubKey(publicKey);
    });
    providerSolana?.on("disconnect", () => {
      console.log("disconnect event");
      setConnected(false);
      setPubKey(null);
    });
  }, [providerSolana]);

  const client = new CapxSolanaSDK({
    providerSolana: providerSolana,
    clusterURL: "devnet",
    commitment: "processed",
    idl: idl,
    publicKey: pubKey,
  });

  const connectHandler = (event) => {
    console.log(`connect handler`);
    // providerSolana?.connect().catch((err) => {
    //   console.error("connect ERROR:", err);
    // });
    client.connectWallet(1);
  };

  const disconnectHandler = (event) => {
    console.log("disconnect handler");
    providerSolana?.disconnect().catch((err) => {
      console.error("disconnect ERROR:", err);
    });
  };

  const wagmiConnect = useConnect();
  const wagmiDisconnect = useDisconnect();
  const wagmiAccount = useAccount();
  const wagmiNetwork = useNetwork();
  const wagmiSwitch = useSwitchNetwork();

  const active = wagmiAccount.isConnected;
  const account = wagmiAccount.address;
  const chainId = wagmiNetwork.chain?.id;
  const error = wagmiNetwork.error;
  const connectors = wagmiConnect.connectors;
  const connector = wagmiConnect.data?.connector;
  const deactivate = wagmiDisconnect.disconnect;
  const connect = wagmiConnect.connect;
  const switchNetwork = wagmiSwitch.switchNetwork;
  const provider = wagmiAccount.connector?.getProvider().then((res) => {
    return res;
  });
  const randomKey = SolanaKeypair.generate();
  const solanaConnection = new Connection(
    clusterApiUrl(SOLANA_CLUSTER_API_URL),
    "processed"
  );

  return {
    active: active || connected,
    isSolana: connected,
    hasPhantom: walletAvail,
    providerSolana,
    account: account,
    phantomPublicKey: pubKey,
    connector,
    deactivate,
    chainId,
    connectors,
    error,
    connect,
    randomKey,
    switchNetwork,
    solanaConnection,
    anchorProgram,
    provider,
    phantomConnect: connectHandler,
    phantomDisconnect: disconnectHandler,
  };
}

export default useCapxWalletConnection;
