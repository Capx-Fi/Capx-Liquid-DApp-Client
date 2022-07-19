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
import * as anchor from "@project-serum/anchor";
import { useEffect, useState } from "react";
import { CHAIN_NAMES } from "../../constants/config";
import { createMint, getMinimumBalanceForRentExemptMint, createInitializeMintInstruction, MINT_SIZE , TOKEN_PROGRAM_ID, getAssociatedTokenAddress, ASSOCIATED_TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, createMintToInstruction, MintLayout} from '@solana/spl-token';
import { idl } from "../../assets/idl_tk";
import { getSortBy } from "../../constants/getChainConfig";
import useCapxWalletConnection from "../../useCapxWalletConnection";
import {
  useAnchorWallet,
  useWallet,
  useConnection,
} from "@solana/wallet-adapter-react/lib/cjs";
// import { idl } from "../../idl";
import { config } from "../../consts";
import {
  Keypair as SolanaKeypair,
  Connection,
  clusterApiUrl,
  Transaction,
  SystemProgram,
  PublicKey,
} from "@solana/web3.js";

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
    activate,
    deactivate,
    chainId,
    switchNetwork,
    provider,
    providerSolana,
    isSolana,
    phantomDisconnect,
    phantomPublicKey,
  } = useCapxWalletConnection();

  console.log(providerSolana);
  const [dashboardModal, setDashboardModal] = useState(false);
  const [sortBy, setSortBy] = useState("Ethereum");
  const [web3, setWeb3] = useState(null);
  const [anchorProgram, setAnchorProgram] = useState(null);
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
      !isSolana &&
      provider.then((res) => {
        setWeb3(new Web3(res));
      });
  }, [active, chainId]);

  // web3 && console.log(web3);

  useEffect(() => {
    setSortBy(chainId && getSortBy(chainId));
  }, [chainId]);


  useEffect(() => {
    loadAnchor();
  }, [providerSolana]);

  async function connect() {
    try {
      await activate(injected);
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


  const loadAnchor = async () => {
    if (providerSolana) {
      const myProgram = new anchor.Program(idl, new PublicKey("vFh6o78BPYbxbrezQqC5TQqHT6Ttt1RsN1iuHgHk1Sj"), providerSolana);
      console.log(myProgram);
      setAnchorProgram(myProgram);
    }
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

  // const { connection } = useConnection();
  // const { publicKey, wallet, signTransaction, signAllTransactions } =
  //   useWallet();
  

  //TODO:ANCHOR INTEGRATION
  // const getProvider = () => {
  //   const myProgram = new anchor.Program(idl, PROGRAM_ID, providerSolana);
  //   console.log(myProgram);
  // };

  // getProvider();

  //WITHOUT ANCHOR
  let connection = new Connection(clusterApiUrl("devnet"), "processed");
  console.log(connection);

  let randomKey = SolanaKeypair.generate();

  let programId = TOKEN_PROGRAM_ID;

    let associatedTokenProgramId = ASSOCIATED_TOKEN_PROGRAM_ID;

    const asyncFn = async () => {
    
    

    await console.log(anchorProgram)
    let tx2 = await anchorProgram.methods.initialize(new anchor.BN(31)).instruction();

    await console.log("DATA")
    await console.log(tx2)

    const associatedToken = await getAssociatedTokenAddress(randomKey.publicKey,phantomPublicKey,false,programId,associatedTokenProgramId);
    const recentBH = await connection?.getRecentBlockhash();
    await console.log(phantomPublicKey)
    await console.log(randomKey)

    let t = new Transaction({
      feePayer: phantomPublicKey,
      recentBlockhash: recentBH.blockhash,
      // signatures : [randomKey]
    })
    // .sign(randomKey)
    .add(tx2)
    .add(
      SystemProgram.createAccount({
      fromPubkey: phantomPublicKey,
      newAccountPubkey: randomKey.publicKey,
      space: MintLayout.span,
      lamports: await getMinimumBalanceForRentExemptMint(connection),
      programId: TOKEN_PROGRAM_ID,
    })
    ,
    createInitializeMintInstruction(
      randomKey.publicKey,
      7,
      phantomPublicKey,
      phantomPublicKey,
      TOKEN_PROGRAM_ID
    )
    )
    .add(
      createAssociatedTokenAccountInstruction(
        phantomPublicKey,
          associatedToken,
          phantomPublicKey,
          randomKey.publicKey,
          programId,
          associatedTokenProgramId
      )
  ).add(
    createMintToInstruction(
      randomKey.publicKey,
        associatedToken,
        phantomPublicKey,
        67000000000,
        [],
        programId
    ))
    
    ;
    // .add
    // SystemProgram.createAccount({
    //   fromPubkey: phantomPublicKey,
    //   newAccountPubkey: randomKey.publicKey,
    //   space: MintLayout.span,
    //   lamports: await spl.getMinimumBalanceForRentExemptMint(connection),
    //   programId: spl.TOKEN_PROGRAM_ID,
    // })
    // init mint account
    // spl.createInitializeMintInstruction(
    //   randomKey.publicKey,
    //   7,
    //   phantomPublicKey,
    //   phantomPublicKey,
    //   spl.TOKEN_PROGRAM_ID
    // )

    
    await console.log(randomKey._keypair);
    let kpi = {
      publicKey: randomKey.publicKey,
      secretKey: randomKey._keypair.secretKey
    }
    // t.sign()
    
    await console.log("Hello1")
    await console.log(randomKey.publicKey.toBase58())
    await console.log("Hello1.5")
    await console.log(t, "Combat")
    // await console.log(t.signatures)
    await console.log(providerSolana)
    // t.signatures.push(kpi)
    // await t.sign([randomKey]);
    await console.log(t, "Combat2")
    const sendT = await providerSolana.signTransaction(t);
    sendT.partialSign(randomKey);
    await console.log("Hello2")
    
    // const rawTransaction = await connection.sendRawTransaction(t.serialize());
    // const rawTransaction = await connection.sendTransaction(t);
    await console.log("Hello3")
    // const complete = await connection.confirmTransaction(rawTransaction);
    // console.log(complete);
    const fsignature = await connection.sendRawTransaction(sendT.serialize());

  };

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
        <button onClick={() => asyncFn()}>TRANSACTION</button>
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
                    {isSolana
                      ? `${phantomPublicKey
                          ?.toBase58()
                          .toString()
                          ?.substr(0, 6)}...${phantomPublicKey
                          ?.toBase58()
                          .toString()
                          ?.substr(-4)}`
                      : `${account.substr(0, 6)}...${account.substr(-4)}`}
                  </div>
                  <img
                    className="header_navbar_logoutbutton_icon"
                    onClick={isSolana ? phantomDisconnect : disconnect}
                    src={LogoutIcon}
                    alt="logout icon"
                  />
                </div>
              </>
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
