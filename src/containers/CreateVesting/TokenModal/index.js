import React from "react";
import { Button } from "antd";
import Modal from "@material-ui/core/Modal";
import "./index.scss";

import axios from "axios";
import EtherLogo from "../../../assets/ethereum-logo.svg";
import { useState } from "react";
import { useEffect } from "react";
import useWagmi from "../../../useWagmi";

const TokenModal = ({ setSelectedToken }) => {
  const [open, setOpen] = useState(false);
  const [selectedValue, setsSlectedValue] = useState("");
  const [balances, setBalances] = useState([]);
  const [loading, setLoading] = useState(false);
  const { account } = useWagmi();
  console.log(account);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleMenuSelect = (tokenDetails) => {
    setsSlectedValue(tokenDetails);
    setSelectedToken(tokenDetails);
    handleClose();
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const response = await axios.post(
          "https://eth-mainnet.g.alchemy.com/v2/kv5G7gy76NONqj1ROFR8EffhKqn7O23N",
          JSON.stringify({
            jsonrpc: "2.0",
            method: "alchemy_getTokenBalances",
            headers: {
              "Content-Type": "application/json",
            },
            params: [account],
            id: 42,
          })
        );

        const nonZeroBalances = response.data.result.tokenBalances.filter(
          (token) => {
            return token.tokenBalance !== "0";
          }
        );

        // Counter for SNo of final output
        let i = 1;

        const tempBalance = [];
        // Loop through all tokens with non-zero balance
        for (let token of nonZeroBalances) {
          // Get balance of token
          let balance = token.tokenBalance;

          // options for making a request to get the token metadata
          const options = {
            method: "POST",
            url: "https://eth-mainnet.g.alchemy.com/v2/kv5G7gy76NONqj1ROFR8EffhKqn7O23N",
            headers: {
              accept: "application/json",
              "content-type": "application/json",
            },
            data: {
              id: 1,
              jsonrpc: "2.0",
              method: "alchemy_getTokenMetadata",
              params: [token.contractAddress],
            },
          };

          // getting the token metadata
          const metadata = await axios.request(options);

          // Compute token balance in human-readable format
          balance = balance / Math.pow(10, metadata["data"]["result"].decimals);
          balance = balance.toFixed(2);

          // Print name, balance, and symbol of token
          tempBalance.push({
            name: metadata["data"]["result"].name,
            balance: balance,
            symbol: metadata["data"]["result"].symbol,
          });
          console.log(
            `${i++}. ${metadata["data"]["result"].name}: ${balance} ${
              metadata["data"]["result"].symbol
            }`
          );
        }
        setBalances(tempBalance);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <>
      <div className="form-item" onClick={handleOpen}>
        <label
          htmlFor="token"
          className="block text-sm font-medium text-gray-700"
        >
          Token*
        </label>
      </div>
      <div
        className="selectcurrency flex items-center justify-between"
        onClick={handleOpen}
      >
        {selectedValue?.symbol ? selectedValue?.symbol : "Select token"}
        <svg
          className="w-2"
          width="23.616"
          height="13.503"
          viewBox="0 0 23.616 13.503"
        >
          <path
            d="M18,20.679l8.93-8.937a1.681,1.681,0,0,1,2.384,0,1.7,1.7,0,0,1,0,2.391L19.2,24.258a1.685,1.685,0,0,1-2.327.049L6.68,14.14a1.688,1.688,0,0,1,2.384-2.391Z"
            transform="translate(-6.188 -11.246)"
          />
        </svg>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="token-selectmodal"
      >
        <div className="token-selectmodal-inner">
          <div className="title">Select Token</div>
          <div className="search-token">
            <input placeholder="Address or ENS name" />
          </div>
          <h4 className="token-title">Wallet Balances</h4>
          <ul className="token-list">
            {balances.map((tokenDetails, ind) => {
              return (
                <li
                  key={tokenDetails.shortName + ind}
                  onClick={() => {
                    handleMenuSelect(tokenDetails);
                  }}
                >
                  <div className="left-col">
                    <div className="icons">
                      <img src={EtherLogo} />
                    </div>
                    <div>
                      <p>{tokenDetails.symbol}</p>
                      <small>{tokenDetails.name}</small>
                    </div>
                  </div>
                  <div className="right-col">{tokenDetails.balance}</div>
                </li>
              );
            })}
            {loading && <p className="text-center">Loading please wait...</p>}
          </ul>
        </div>
      </Modal>
    </>
  );
};

export default TokenModal;
