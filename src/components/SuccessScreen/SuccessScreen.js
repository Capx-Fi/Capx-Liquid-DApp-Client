import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import NextIcon from "../../assets/next.svg";
import CapxLiquidDiamond from "../../assets/CapxLiquidDiamond.png";
import "./SuccessScreen.scss";

const newSuccess = () => {
  return (
    <div className="newSuccess h-screen flex bg-dark-400">
      <Header hiddenNav />
      <div className="maincontainer flex flex-col justify-center m-auto mt-auto">
        <div className="herocontainer overflow-hidden px-12 pt-14 pb-16 rounded-3xl bg-opacity-70 text-white relative w-50v flex flex-col items-start">
          <div className="title text-54px leading-lh-54 tracking-tight font-semibold mt-4 w-11/12 text-left">
            {"Congratulations! Your tokens have been successfully vested"}
          </div>
          <div className="border-div text-paragraph-1 leading-paragraph-1 mt-6 pb-14">
            {"You can view your vested projects in Project Owner Dashboard"}
          </div>
          <div className="herocontainer_button rounded-xl mt-10 justify-center items-center flex px-5 py-4 z-10 cursor-pointer">
            <div className="button_text text-white text-caption-1 leading-caption-1 font-bold">
              {"Go to My Dashboard"}
              <img
                src={NextIcon}
                alt="Next Icon"
                className="inline-block w-5 ml-3 mr-2"
              ></img>
            </div>
          </div>
          <img
            src={CapxLiquidDiamond}
            alt="Next Icon"
            className="inline-block w-25v absolute -bottom-5 -right-24"
          ></img>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default newSuccess;
