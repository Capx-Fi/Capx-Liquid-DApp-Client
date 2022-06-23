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
		padding: "0px",
	},
	paper: {
		background: "white",
		border: "1px solid #2f3137",
		borderRadius: "27px",
		overflow: "hidden",
		margin: "0px",
		padding: "0",
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
			width: "280px",
			borderRadius: "16px",
		},
	},
}));
function VestModal({ open, setOpen, vestModalStatus }) {
	const [viewNFTID, setviewNFTID] = React.useState("");
	const [viewNFTDet, setviewNFTDet] = React.useState("");
	const classes = useStyles();

	const vestMessage = [
		<p>
			Your tokens are being vested!
			<br />
			<span
				className="screen:text-caption-1 text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
				style={{ color: "#2f3137" }}
			>
				Please do not reload or refresh the page.
			</span>
		</p>,
	];

	const errorMessage = [
		<p>
			Oops! We have encountered an error.
			<br />
			<span
				className="screen:text-caption-1 text-caption-2 phone:text-10px tablet:text-caption-3 breakpoint:text-caption-2"
				style={{ color: "#2f3137" }}
			>
				{" "}
				Please try again!
			</span>
		</p>,
	];

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
					<div className="flex justify-between w-full items-center laptop:h-80 items-stretch">
						<div
							style={{ background: "#2F3137" }}
							className="w-2/5 flex justify-center items-center"
						>
							<Lottie
								className="w-32 laptop:w-48"
								loop={true}
								animationData={
									vestModalStatus === "success"
										? LockingSuccess
										: vestModalStatus === "failure"
										? LockingFailed
										: LockToChain
								}
							/>
						</div>
						<div className="text-darkText text-left flex justify-center items-center w-3/5 pr-20 pl-12 leading-paragraph-2 screen:text-heading-2 screen:leading-heading-1 tablet:text-caption-1 tablet:leading-heading-1 desktop:text-heading-2 font-semibold w-8/12 laptop:w-6/12 desktop:w-8/12">
							<div>
								{vestModalStatus === "success"
									? "Your tokens are now successfully vested"
									: vestModalStatus === "failure"
									? errorMessage
									: vestMessage}
							</div>
						</div>
					</div>
					<hr className="border-dark-25 mt-2 mb-4 h-2"></hr>
				</div>
			</Fade>
		</Modal>
	);
}

export default VestModal;
