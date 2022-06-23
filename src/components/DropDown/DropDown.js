import React, { useState } from "react";
import "./DropDown.scss";
import Web3 from "web3";
import bscLogo from "../../assets/bsc-logo.svg";
import maticLogo from "../../assets/matic-logo.svg";
import avalancheLogo from "../../assets/avalanche-logo.svg";
import ethLogo from "../../assets/ethereum-logo.svg";
import fantomLogo from "../../assets/fantom-logo.svg";

function DropDown({ sortBy, chainChange, setShowMenu }) {
	const [open, setOpen] = useState(false);
	const web3 = new Web3(Web3.givenProvider);
	window.w3 = web3;

	return (
		<div className="relative">
			<button
				className={`header-dropdown-button ${
					open ? "border-success-color-400" : "border-dark-50"
				}`}
				onClick={() => setOpen(!open)}
			>
				<img
					src={
						sortBy === "Matic"
							? maticLogo
							: sortBy === "BSC"
							? bscLogo
							: sortBy === "Ethereum"
							? ethLogo
							: sortBy === "Avalanche"
							? avalancheLogo
							: fantomLogo
					}
					alt="chain-logo"
					className="w-4 h-4 tablet:w-3 tablet:h-3 breakpoint:w-4 breakpoint:h-4 mr-2"
				/>
				<span className="mr-4">{sortBy === "matic" ? "Matic" : sortBy}</span>
				<svg
					className="screen:w-4 screen:h-4 desktop:w-5 desktop:h-5 text-grayLabel dark:text-darkText"
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path
						fillRule="evenodd"
						d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
						clipRule="evenodd"
					/>
				</svg>
			</button>
			{open && (
				<div className="absolute right-0 bg-grayFill pt-2 pb-0.5 divide-y divide-grayFill rounded-md shadow-xl w-40">
					<p
						className="option"
						onClick={() => {
							chainChange("Ethereum");
							setOpen(false);
						}}
					>
						<img src={ethLogo} alt="eth-logo" className="w-4 h-4 mr-2" />
						Ethereum
					</p>
					<p
						className="option"
						onClick={() => {
							chainChange("Matic");
							setOpen(false);
							setShowMenu && setShowMenu(false);
						}}
					>
						<img src={maticLogo} alt="matic-logo" className="w-4 h-4 mr-2" />
						Matic
					</p>
					<p
						className="option"
						onClick={() => {
							chainChange("BSC");
							setOpen(false);
							setShowMenu && setShowMenu(false);
						}}
					>
						<img src={bscLogo} alt="bsc-logo" className="w-4 h-4 mr-2" />
						BSC
					</p>
					<p
						className="option"
						onClick={() => {
							chainChange("Avalanche");
							setOpen(false);
							setShowMenu && setShowMenu(false);
						}}
					>
						<img src={avalancheLogo} alt="avax-logo" className="w-4 h-4 mr-2" />
						Avalanche
					</p>
					<p
						className="option"
						onClick={() => {
							chainChange("Fantom");
							setOpen(false);
							setShowMenu && setShowMenu(false);
						}}
					>
						<img src={fantomLogo} alt="fantom-logo" className="w-4 h-4 mr-2" />
						Fantom
					</p>
				</div>
			)}
		</div>
	);
}

export default DropDown;
