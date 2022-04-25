import React, {useState} from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import NextIcon from "../../assets/next.svg";
import NextIconBlack from "../../assets/next-black.svg";
import CapxCoinIllustration from "../../assets/CapxCoinIllustration.png";
import { Link } from 'react-router-dom'
import ChooseDashboardModal from '../Modal/ChooseDashboardModal/ChooseDashboardModal';
import "./Landing.scss"

const Landing = () => {
  
  const [dashboardModal, setDashboardModal] = useState(false);
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false);
  };

  return (
    <div className="landing_screen h-screen flex bg-dark-400">
      <Header hiddenNav />
      <ChooseDashboardModal
        dashboardModal={dashboardModal}
        handleCloseSelectDashboard={handleCloseSelectDashboard}
      />
      <div className="maincontainer flex flex-col justify-center m-auto mt-auto">
        <div className="herocontainer px-12 py-12 rounded-3xl bg-opacity-70 text-white relative desktop:w-65v twok:w-50v flex flex-col items-start">
          <div className="upperbutton px-4 py-2.5 rounded-lg desktop:text-caption-3 desktop:leading-caption-3 twok:text-caption-2 twok:leading-caption-2 desktop:font-bold twok:font-semibold">
            {"CAPX LIQUID"}
          </div>
          <div className="title desktop:text-40px desktop:leading-lh-64 twok:text-title-1 twok:leading-title-1 tracking-tight leading-title-1 font-bold laptop:mt-4 w-10/12 text-left">
            {"Planning to Launch an ICO ?"}
          </div>
          <div className="desktop:text-paragraph-1 desktop:leading-subheading twok:text-heading-2 twok:leading-heading-2 mt-3">
            {"Start vesting tokens today"}
          </div>
          <div className="herocontainer_button rounded-xl desktop:mt-12 twok:mt-8 justify-center items-center flex px-5 py-4 z-10 cursor-pointer">
            <Link to="/vesting">
              <div className="button_text text-white desktop:text-captions-1 twok:text-subheading desktop-captions-1 twok:leading-subheading towk:font-medium desktop:font-bold">
                {"Get Started"}
                <img
                  src={NextIcon}
                  alt="Next Icon"
                  className="inline-block w-5 ml-3 mr-2"
                ></img>
              </div>
            </Link>
          </div>
          <img
            src={CapxCoinIllustration}
            alt="Next Icon"
            className="inline-block desktop:w-72 twok:w-80 absolute desktop:-bottom-32 desktop:-right-24 twok:-bottom-40 twok:-right-32"
          ></img>
        </div>
        <div className="lowercontainer desktop:mt-4 twok:mt-10 px-12 py-1 rounded-2xl bg-opacity-70 text-white relative desktop:w-50v twok:w-40v flex">
          <div className="flex flex-row justify-between items-center desktop:text-captions-1 desktop:leading-captions-1 twok:text-paragraph-1 twok:leading-paragraph-1 w-full font-medium">
            <div className="flex items-center">
              <div>{"Already Vested? Check out Dashboard"}</div>
            </div>
            <div>
              <div className="lowercontainer_button rounded-md justify-center items-center flex my-3 px-1 py-1 w-40 cursor-pointer">
    
                <div className="button_text flex text-black text-caption-3 leading-text-caption-3 font-bold"
                  onClick={() => { setDashboardModal(true) }}>
                    <div className="flex items-center">{"DASHBOARD"}</div>
                    <img
                      src={NextIconBlack}
                      alt="Next Icon"
                      className="inline-block w-5 ml-3 mr-2"
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
}

export default Landing;
