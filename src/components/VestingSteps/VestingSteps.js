import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import DownloadIcon from "../../assets/download.png";
import NextIcon from "../../assets/next-black.svg";

import "./VestingSteps.scss";

const VestingSteps = ({ setShowSteps }) => {
	return (
		<div className="vesting_steps h-screen flex bg-dark-400">
			<Header hiddenNav />
			<div className="maincontainer flex phone:flex-col screen:flex-row gap-x-14 justify-center phone:items-center screen:items-strech m-auto mt-auto">
				<div className="herocontainer px-9 py-10 rounded-3xl bg-opacity-30 text-white relative phone:mt-24 screen:mt-0 phone:mb-10 screen:mb-0 phone:w-90v screen:w-40v desktop:w-47v twok:w-30v flex flex-col items-start">
					<div className="title phone:text-paragraph-1 screen:text-heading-2 screen:leading-heading-2 desktop:text-40px desktop:leading-lh-64 twok:text-5xl twok:leading-lh-54 font-bold tracking-tight mt-2 desktop:w-full twok:w-10/12 text-left">
						{"Vest Tokens in 3 simple steps"}
					</div>
					<div className="steps-container phone:mt-1 tablet:mt-2 w-full tracking-tight phone:text-caption-3 screen:text-caption-3 screen:leading-paragraph-1 desktop:text-paragraph-2 twok:text-paragraph-1 desktop:leading-paragraph-1">
						<div className="text-container px-6 my-6 py-1 rounded-lg">
							{"1. Enter your Project Details & Contract Address"}
						</div>
						<div className="text-container px-6 my-6 py-1 rounded-lg">
							{"2. Upload your Vesting Sheet"}
						</div>
						<div className="text-container px-6 my-6 py-1 rounded-lg">
							{"3. Lock & Review your Vesting Sheet"}
						</div>
					</div>
				</div>

				{/* For Breakpoint and above */}
				<div className="side-container bg-opacity-70 text-white relative phone:mb-10 screen:mb-0 phone:w-90v desktop:w-40v screen:w-40v twok:w-30v flex flex-col justify-between">
					<div className="download-template phone:mb-10 screen:mb-0 twok:mb-10 py-8 justify-self-start flex flex-col rounded-3xl items-center">
						<a
							download
							href="https://capx-resources.s3.amazonaws.com/vesting-sheet-template.xlsx"
						>
							<div className="xldiv rounded-2xl py-4 phone:hidden screen:block text-center font-semibold screen:text-caption-3 screen:leading-caption-3 desktop:text-caption-2 desktop:leading-caption-2">
								<img
									src={DownloadIcon}
									alt="Download Icon"
									className="inline-block mx-auto"
								/>
								<div className="w-3/4 mx-auto mt-2">
									Capx Vesting Sheet Template.xlsx
								</div>
							</div>
						</a>

						<div className="phone:text-caption-1 screen:text-paragraph-1 screen:leading-paragraph-1 desktop:text-subheading desktop:leading-subheading mt-6 text-center font-bold">
							Download Vesting Sheet Template
						</div>

						<div className="phone:text-caption-3 screen:leading-caption-3 text-caption-2 leading-caption-2 mt-2 text-center w-4/5">
							To proceed further with an error-free vesting experience we
							recommend adding the token details in the following template.
						</div>
						<a
							download
							href="https://capx-resources.s3.amazonaws.com/vesting-sheet-template.xlsx"
						>
							<div className="mobile-xldiv rounded-2xl bg-dark-300 w-9/12 mx-auto py-4 mt-4 px-4 phone:flex screen:hidden text-center font-semibold screen:text-caption-3 screen:leading-caption-3 desktop:text-caption-2 desktop:leading-caption-2 justify-center items-center">
								<img
									src={DownloadIcon}
									alt="Download Icon"
									className="inline-block mx-auto w-10"
								/>
								<div className="w-3/4 mx-auto mt-2 text-left text-caption-3">
									CapX Vesting Sheet Template.xlsx (Compatible with MS Excel,
									Numbers, Gsheet)
								</div>
							</div>
						</a>
					</div>

					<div
						className="side-button justify-self-end rounded-2xl phone:mb-10 screen:mb-0 justify-center items-center flex px-1 py-3 w-full cursor-pointer"
						onClick={() => setShowSteps(false)}
					>
						<div className="button_text text-black phone:text-caption-2 screen:text-caption-1 screen:leading-caption-1 twok:text-subheading twok:leading-text-subheading font-bold">
							{"Begin Vesting"}
							<img
								src={NextIcon}
								alt="Next Icon"
								className="inline-block w-7 ml-3 mr-2"
							></img>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default VestingSteps;
