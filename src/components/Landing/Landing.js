import React, { useState } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NextIcon from "../../assets/next.svg";
import NextIconBlack from "../../assets/next-black.svg";
import CapxCoinIllustration from "../../assets/CapxCoinIllustration.png";
import { Link } from "react-router-dom";
import ChooseDashboardModal from "../Modal/ChooseDashboardModal/ChooseDashboardModal";
import "./Landing.scss";

const Landing = () => {
	const [dashboardModal, setDashboardModal] = useState(false);
	const handleCloseSelectDashboard = () => {
		setDashboardModal(false);
	};
	const windowWidth = window.innerWidth;

	return (
		<div className="landing_screen h-screen flex bg-dark-400">
			<Header hiddenNav />
			<ChooseDashboardModal
				dashboardModal={dashboardModal}
				handleCloseSelectDashboard={handleCloseSelectDashboard}
			/>
			<div className="maincontainer flex flex-col justify-center phone:items-center screen:items-start m-auto mt-auto">
				<div className="herocontainer phone:px-6 mx-10 screen:px-12 py-12 rounded-3xl bg-opacity-70 text-white relative phone:w-90v screen:w-65v desktop:w-65v twok:w-50v flex flex-col items-start">
					<div className="upperbutton px-4 py-2.5 rounded-lg phone:text-caption-4 screen:leading-caption-3 desktop:text-caption-3 desktop:leading-caption-3 twok:text-caption-2 twok:leading-caption-2 desktop:font-bold twok:font-semibold">
						{"CAPX LIQUID"}
					</div>
					<div className="title phone:text-subheading screen:text-heading-2 screen:leading-heading-2 desktop:text-40px desktop:leading-lh-64 twok:text-title-1 twok:leading-title-1 tracking-tight screen:leading-title-1 font-bold laptop:mt-4 w-10/12 text-left">
						{`Planning to \n Launch an ICO?`}
					</div>
					<div className="phone:text-caption-3 screen:text-caption-1 screen:caption-1 desktop:text-paragraph-1 desktop:leading-subheading twok:text-heading-2 twok:leading-heading-2 mt-3">
						{"Start vesting tokens today"}
					</div>
					<div className="herocontainer_button rounded-xl screen:mt-10 desktop:mt-12 twok:mt-8 justify-center items-center flex px-5 phone:py-2 phone:mt-8 screen:py-4 z-10 cursor-pointer">
						<Link to="/vesting">
							<div className="button_text text-white phone:text-caption-4 screen:text-caption-2 desktop:text-caption-1 twok:text-subheading twok:leading-subheading towk:font-medium desktop:font-bold">
								{"Get Started"}
								<img
									src={NextIcon}
									alt="Next Icon"
									className="inline-block screen:w-5 mx-3 mr-2"
								></img>
							</div>
						</Link>
					</div>
					<img
						src={CapxCoinIllustration}
						alt="Next Icon"
						className="inline-block screen:block z-40 phone:w-36 phone:w-52 desktop:w-72 twok:w-80 absolute phone:-bottom-36 desktop:-bottom-32 phone:-right-16 desktop:-right-24 twok:-bottom-40 twok:-right-32"
					/>
				</div>
				<div className="lowercontainer screen:mt-4 desktop:mt-4 twok:mt-10 phone:px-6 screen:px-12 phone:py-2 screen:py-1 rounded-2xl bg-opacity-70 text-white relative phone:mt-6 phone:w-90v screen:ml-10 screen:w-52v desktop:w-50v twok:w-40v flex">
					<div className="flex phone:flex-col screen:flex-row screen:justify-between screen:items-center phone:items-start phone:text-caption-3 screen:text-caption-2 screen:leading-caption-2 desktop:text-captions-1 desktop:leading-captions-1 twok:text-paragraph-1 twok:leading-paragraph-1 w-full font-medium">
						<div className="flex items-center">
							<div>
								{windowWidth > 1279
									? "Already Vested? Check out Dashboard"
									: "Already Vested? Explore."}
							</div>
						</div>
						<div>
							<div className="lowercontainer_button phone:w-32 screen:w-40 rounded-md justify-center items-center flex my-3 px-4 py-2 w-40 cursor-pointer">
								<div
									className="button_text flex text-black screen:py-1 twok:py-0 desktop:py-1 phone:text-caption-3 screen:text-caption-3 screen:leading-caption-3 desktop:text-caption-3 desktop:leading-text-caption-3 font-bold"
									onClick={() => {
										setDashboardModal(true);
									}}
								>
									<div className="flex items-center">{"DASHBOARD"}</div>
									<img
										src={NextIconBlack}
										alt="Next Icon"
										className="inline-block items-center w-5 ml-2 mr-2"
									></img>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default Landing;
