import React, { useEffect, useState } from "react";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import MetamaskIcon from "../../../assets/metamask.svg";
import WalletConnectIcon from "../../../assets/walletconnect-logo.svg";
import "./ChooseWalletModal.scss";
import useWagmi from "../../../useWagmi";

const Landing = ({ setModalMode }) => {
  const { active, account, library, connectors, connect } = useWagmi();

  return (
    <article className="h-screen bg-dark-400 flex choose_screen">
      <Header hiddenNav />
      <div className="justify-center laptop:items-center m-auto mt-32 tablet:mt-48 laptop:mt-auto">
        <div className="herocontainer bg-white border border-lightGrayBorder phone:w-90v phone:mt-12 tablet:mt-0 desktop:mt-8 tablet:w-75v phone:px-8 phone:py-6 screen:px-16 screen:py-10 desktop:px-20 desktop:py-14 rounded-2xl bg-opacity-70 text-darkText relative screen:w-65v desktop:w-60v flex flex-col items-start">
          <div className="text-white title phone:text-paragraph-2 phone:leading-1 tablet:text-heading-2 screen:text-heading-2 screen:leading-lh-64 desktop:text-40px desktop:leading-lh-64 twok:text-50px twok:leading-lh-54 tablet:leading-title-1 font-semibold w-10/12 text-left">
            {"Connect your wallet"}
          </div>
          <div className="text-white tablet:text-paragraph-2 desktop:mt-2 desktop:text-paragraph-1 desktop:leading-subheading twok:text-subheading twok:leading-subheading text-white">
            {"Connect with one of our available wallet providers"}
          </div>
          <div className="herobuttons flex flex-col gap-y-2 my-14 w-full">
            {connectors[0].ready && (
              <div
                onClick={() => connect({ connector: connectors[0] })}
                className="herocontainer_connectbutton flex flex-start rounded-xl items-center  px-5 py-4 z-10 cursor-pointer"
              >
                <div>
                  <img
                    src={MetamaskIcon}
                    alt="Metamask Icon"
                    className="inline-block phone:w-10 phone:h-10 desktop:w-16 desktop:h-16 ml-3 tablet:mr-12 phone:mr-6"
                  />
                </div>
                <div className="text-white desktop:text-paragraph-2 breakpoint:text-caption-1 twok:text-subheading desktop-captions-1 twok:leading-subheading font-semibold">
                  {connectors[0].name}
                </div>
              </div>
            )}
            {connectors[1].ready && (
              <div
                onClick={() => connect({ connector: connectors[1] })}
                className="herocontainer_connectbutton flex flex-start rounded-xl items-center  px-5 py-4 z-10 cursor-pointer"
              >
                <div>
                  <img
                    src={WalletConnectIcon}
                    alt="WalletConnect Icon"
                    className="inline-block phone:w-10 phone:h-10 desktop:w-16 desktop:h-16 ml-3 tablet:mr-12 phone:mr-6"
                  />
                </div>
                <div className="text-white desktop:text-paragraph-2 breakpoint:text-caption-1 twok:text-subheading desktop-captions-1 twok:leading-subheading font-semibold">
                  {connectors[1].name}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </article>
  );
};

export default Landing;
