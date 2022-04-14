import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import "./newLanding.scss"

const newLanding = () => {
  return (
    <div className="newlandingscreen h-screen flex bg-dark-400">
      <Header hiddenNav />
      <div className="maincontainer flex flex-col justify-center items-center m-auto mt-auto">
        <div className="herocontainer px-12 py-12 rounded-3xl bg-opacity-70 text-white relative w-60v flex flex-col items-start">
          <div className="upperbutton px-4 py-2.5 rounded-lg text-caption-2 leading-caption-2 font-semi-bold">
            {"CAPX LIQUID"}
          </div>
          <div className="title text-title-1 tracking-tight leading-title-1 font-bold laptop:mt-4 w-10/12 text-left">
            {"Planning to Launch an ICO ?"}
          </div>
          <div className="text-heading-2 leading-heading-2 mt-3">
            {"Start vesting tokens today"}
          </div>
          <div className="herocontainer_button rounded-xl mt-8 justify-center items-center flex px-5 py-4 z-10 cursor-pointer">
            <div className="button_text text-white text-subheading leading-subheading font-medium">
              {"Get Started"}
            </div>
          </div>
        </div>
        <div className="lowercontainer mt-10 px-12 py-1 rounded-2xl bg-opacity-70 text-white relative w-60v flex">
          <div className='flex flex-row justify-between items-center text-paragraph-1 leading-paragraph-1 w-full font-medium'>
            <div>{"Already Vested? Check out Dashboard"}</div>
            <div>
              <div className="lowercontainer_button rounded-md justify-center items-center flex my-3 px-1 py-1 w-40 cursor-pointer">
                <div className="button_text text-black text-caption-3 leading-text-caption-3 font-bold">
                  {"DASHBOARD"}
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

export default newLanding
