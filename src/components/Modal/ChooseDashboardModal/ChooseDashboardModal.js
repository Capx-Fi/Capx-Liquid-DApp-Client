import "./ChooseDashboardModal.scss";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import closeIcon from "../../../assets/cross.svg";
import investorIllustration from "../../../assets/investor.png";
import ownerIllustration from "../../../assets/owner.png";
import { useState } from "react";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
  paper: {
    width: "600px",
    background: "linear-gradient(215.24deg, #263232 3.85%, #1a1f23 89.73%)",
    boxShadow: "0px 4px 140px rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
    padding: theme.spacing(2),
    outline: "none",
    "@media (max-width:420px)": {
      padding: theme.spacing(2),
      width: "360px",
    },
    "@media (max-width:365px)": {
      padding: theme.spacing(2),
      width: "300px",
    },
  },
}));
function ChooseDashboardModal({
  handleCloseSelectDashboard,
  dashboardModal,
  handleCloseError,
}) {
  const classes = useStyles();
  return (
    <Modal
      open={dashboardModal}
      onClose={handleCloseSelectDashboard}
      aria-labelledby="simple-modal-title"
      className={classes.modal}
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className="flex justify-center relative items-center pb-2 px-4">
          <div className="dmodal-title">Select Dashboard</div>
          <img
            onClick={() => {
              handleCloseSelectDashboard();
            }}
            className="cursor-pointer w-6 absolute top-0 right-2"
            src={closeIcon}
            alt="close icon"
          />
        </div>
        <hr className="border-dark-200 mt-2 mb-4 h-2"></hr>
        <div className="dmodal-maincontainer">
          <div className="choose-container">
            <Link
              to={`/projectoverview`}
              id="owner"
              className={`owner-card choose-card`}
            >
              <img
                className={`card-img`}
                height={80}
                alt="owner"
                src={ownerIllustration}
              />
              <div className={`card-title`}>Project Overview</div>
            </Link>
            <Link
              to={`/investor`}
              id="investor"
              className={`investor-card choose-card`}
            >
              <img
                className={`card-img`}
                height={80}
                alt="investor"
                src={investorIllustration}
              />
              <div className={`card-title`}>Investor</div>
            </Link>
          </div>
        </div>
        <hr className="border-dark-200 mt-8 mb-4 h-2"></hr>
      </div>
    </Modal>
  );
}

export default ChooseDashboardModal;
