import React from "react";
import CapxLogo from "../assets/capxliquid-logo.svg";

function LoadingScreen() {
	return (
		<div className="align-middle justify-center justify-items-center bg-dark-400 flex h-screen">
			<img
				alt="logo"
				src={CapxLogo}
				className="animate-pulse phone:w-55v screen:w-auto align-middle justify-center m-auto "
			/>
		</div>
	);
}

export default LoadingScreen;
