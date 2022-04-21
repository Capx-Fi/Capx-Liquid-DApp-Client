import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import NextIcon from "../../assets/next.svg";
import investorIllustration from "../../assets/investor.png";
import ownerIllustration from "../../assets/owner.png";
import "./newChoose.scss";

const newChoose = () => {
  return (
    <div className="newChoose h-screen flex bg-dark-400">
      <Header />
      <div className="maincontainer flex flex-col justify-center m-auto mt-auto">
        <div className="herocontainer overflow-hidden rounded-3xl bg-opacity-70 text-white relative w-50v flex flex-col items-start">
          <div className="border-div font-semibold text-heading-1 pt-10 pb-8 leading-heading-1 text-center w-full">
            {"Select Dashboard"}
          </div>
          <div className="border-div flex flex-row justify-center w-full pt-10 pb-16 mb-12">
            <div className="image-div px-16 py-10 rounded-3xl m-8">
              <img
                src={investorIllustration}
                alt="investorIcon"
                className="inline-block w-36"
              ></img>
              <div className="text-paragraph-1 leading-paragraph-1 text-center">
                Investor
              </div>
            </div>

            <div className="image-div px-16 py-10 rounded-3xl m-8">
              <img
                src={ownerIllustration}
                alt="ownerIcon"
                className="inline-block w-36"
              ></img>
              <div className="text-paragraph-1 leading-paragraph-1 text-center">
                Owner
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default newChoose;
