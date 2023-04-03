import React from "react";
import CapxLogo from "../assets/logo.png";

function LoadingScreen() {
	return (
		<div className="align-middle justify-center justify-items-center bg-dark-400 flex h-screen" style={{background:"#150732"}}>
			<img
				alt="logo"
				src={CapxLogo}
				className="animate-pulse phone:w-55v screen:w-auto align-middle justify-center m-auto "
			/>
		</div>
	);
}

export default LoadingScreen;
