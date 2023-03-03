export const avalancheChain = {
  id: 43114,
  name: "Avalanche",
  network: "avalanche",
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://api.avax.network/ext/bc/C/rpc",
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io/" },
  },
  testnet: true,
};

export const bscChain= {
  id: 56,
  name: "Binance Smart Chain",
  network: "bsc",
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://bsc-dataseed1.binance.org",
  },
  blockExplorers: {
    default: { name: "Binance", url: "https://bscscan.com/" },
  },
};

export const fantomChain = {
  id: 250,
  name: "Fantom Opera",
  network: "fantom",
  nativeCurrency: {
    name: "FTM",
    symbol: "FTM",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://rpc.ftm.tools/",
  },
  blockExplorers: {
    default: { name: "Fantom", url: "https://ftmscan.com/" },
  },
};

export const karuraChain = {
  id: 686,
  name: "Karura",
  network: "karura",
  nativeCurrency: {
    name: "KAR",
    symbol: "KAR",
    decimals: 18,
  },
  rpcUrls: {
    default: "https://eth-rpc-karura.aca-api.network/",
  },
  blockExplorers: {
    default: { name: "Karura", url: "https://blockscout.karura.network/" },
  },
};
