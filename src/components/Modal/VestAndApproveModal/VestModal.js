import Web3 from "web3";
import React, { useEffect, useState } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Lottie from "lottie-react";
import LockToChain from "../../../assets/Lock/Lock-to-Chain.json";
import LockingSuccess from "../../../assets/Lock/Locking-Success.json";
import LockingFailed from "../../../assets/Lock/Locking-Failed.json";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
    zIndex: "9999",
    color: "#F1FAF2",
  },
  paper: {
    background: "linear-gradient(215.24deg, #263232 3.85%, #1a1f23 89.73%)",
    borderRadius: "35px",
    padding: theme.spacing(2, 0, 3),
    outline: "none",
    width: "800px",
    "@media (max-width:1023px)": {
      width: "500px",
      borderRadius: "24px",
    },
    "@media (max-width:640px)": {
      width: "400px",
      borderRadius: "24px",
    },

    "@media (max-width:420px)": {
      width: "300px",
      borderRadius: "16px",
    },
  },
}));
function VestModal({ open, setOpen, vestModalStatus }) {
  const [viewNFTID, setviewNFTID] = React.useState("");
  const [viewNFTDet, setviewNFTDet] = React.useState("");
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <div className="flex flex-col laptop:flex-row justify-center mx-auto items-center laptop:h-72 pb-8">
            {console.log(vestModalStatus)}
            <Lottie
              className="w-32 laptop:w-64"
              loop={true}
              animationData={
                vestModalStatus === "success"
                  ? LockingSuccess
                  : vestModalStatus === "failure"
                  ? LockingFailed
                  : LockToChain
              }
            />
            <div className="text-white text-center laptop:text-left text-paragraph-2 leading-paragraph-2 tablet:text-heading-1 tablet:leading-heading-1 font-semibold w-8/12 laptop:w-6/12">
              {vestModalStatus === "success"
                ? "Your tokens are now successfully vested"
                : vestModalStatus === "failure"
                ? "Oops! We couldn't vest your tokens"
                : "Your tokens are being vested"}
            </div>
          </div>
          <hr className="border-dark-200 mt-2 mb-4 h-2"></hr>
        </div>
      </Fade>
    </Modal>
  );
}

export default VestModal;
