import React from "react";
import "./InvestorDashboardScreen.scss";
import Redirect from "../../assets/Redirect.svg";
import NextIconBlack from "../../assets/next-black.svg";

function InvestorLoading({ i }) {
  return (
    <div
      key={`${i}`}
      className="investordashboardscreen_maincontainer_innercontainer_projectcontainer"
    >
      <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_leftcontainer">
        <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
            PROJECT NAME
          </div>
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value_loading"></div>
        </div>
        <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
            ALLOCATED ASSETS
          </div>
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value_loading"></div>
        </div>
        <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox">
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_key">
            UNLOCK DATE
          </div>
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_detailbox_value_loading"></div>
        </div>
        <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_buttoncontainer">
          <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button pointer-events-none opacity-50 z-10">
            <div className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button_text_loading "></div>
            <img
              className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_button_icon"
              src={Redirect}
              alt="redirect icon"
            />
          </div>

          <div
            className={`investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton 
             pointer-events-none opacity-50 z-10
              
              `}
          >
            <div
              className={`investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton_text`}
            >
              Withdraw
            </div>
            <img
              className="investordashboardscreen_maincontainer_innercontainer_projectcontainer_withdrawbutton_icon"
              src={NextIconBlack}
              alt="arrow icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestorLoading;
