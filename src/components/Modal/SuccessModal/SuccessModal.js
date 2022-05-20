import "./SuccessModal.scss";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import ETHDropIllustration from "../../../assets/ETHDropIllustration.png";
import CapxLiquidDiamond from "../../../assets/CapxLiquidDiamond.png";
import MetamaskButton from "../../../assets/MetamaskButton.png";
import Level1CTA from "../../CTA/Level1CTA";

import { useHistory } from "react-router";
import Level3CTA from "../../CTA/Level3CTA";

function SuccessModal() {
	const history = useHistory();
	return (
		<article className="successmodalscreen">
			<Header hiddenSwitch={true} />
			<section className="successmodalscreen_maincontainer">
				<div className="successmodalscreen_maincontainer_herocontainer">
					<div className="successmodalscreen_maincontainer_herocontainer_title">
						Congratulations! Your tokens have been successfully vested!
					</div>
					<p className="screen:border-div pb-6 phone:text-caption-2 desktop:text-paragraph-1 screen:text-captions-1 text-caption-2 mt-5 mb-8 text-center tablet:text-left tablet:w-8/12 laptop:w-10/12 desktop:w-full success_subtitle">
						You can view your vested projects in Project Owner Dashboard
					</p>

					<Level1CTA
						text="Go to My Dashboard"
						icon={true}
						onClick={() => history.push("/projectoverview")}
					/>

					<img
						className="hidden tablet:flex w-64 screen:w-72 desktop:w-96 absolute -bottom-4 tablet:-bottom-10 right-0"
						src={ETHDropIllustration}
						alt="ETH Illustration"
					/>
					<div className="phone:flex tablet:hidden flex eth-liquid h-36 eth-liquid-icon"></div>
					<img
						className="phone:flex tablet:hidden flex w-64 absolute bottom-0 eth-liquid-icon"
						src={CapxLiquidDiamond}
						alt="ETH Illustration"
					/>
				</div>
			</section>
			<Footer />
		</article>
	);
}

export default SuccessModal;
