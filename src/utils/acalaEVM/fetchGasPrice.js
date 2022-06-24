import { acalaRPC } from "../../constants/config";

export const fetchGasPrice = () => {
  //Promise
  return new Promise((resolve, reject) => {
    fetch(acalaRPC, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_getEthGas",
        params: [],
        id: 1,
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        resolve(data.result);
      });
  });
};
