import React from 'react'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import './newVestingSteps.scss'

const newLanding = () => {
  return (
    <div className="newVestingScreen h-screen flex bg-dark-400">
      <Header hiddenNav />
      <div className="maincontainer flex gap-x-14 justify-center items-strech m-auto mt-auto">
        <div className="herocontainer px-8 py-12 rounded-3xl bg-opacity-70 text-white relative w-37v flex flex-col items-start">
          <div className="title text-5xl font-bold leading-lh-54 tracking-tight mt-2 w-10/12 text-left">
            {"Vest Tokens in 3 simple steps"}
          </div>
          <div className="steps-container mt-2 w-full tracking-tight">
            <div className="text-container px-6 my-6 py-1 text-paragraph-1 leading-paragraph-1 rounded-lg">
              {"1. Enter your Project Details & Contract Address"}
            </div>
            <div className="text-container px-6 my-6 py-1 text-paragraph-1 leading-paragraph-1 rounded-lg">
              {"2. Upload your Vesting Sheet"}
            </div>
            <div className="text-container px-6 my-6 py-1 text-paragraph-1 leading-paragraph-1 rounded-lg">
              {"3. Lock & Review your Vesting Sheet"}
            </div>
          </div>
        </div>

        <div className="side-container bg-opacity-70 text-white relative w-37v flex flex-col justify-between">
          <div className="download-template py-10 justify-self-start flex flex-col rounded-3xl items-center">
            <div className="title text-5xl text-center font-bold leading-lh-54 tracking-tight">
              .<br></br>.<br></br>.
            </div>
            <div className="text-subheading leading-subheading mt-2 text-center font-bold">
              Download Vesting Sheet Template
            </div>

            <div className="text-caption-2 leading-caption-2 mt-2 text-center w-4/5">
              To proceed further with an error-free vesting experience we
              recommend adding the token details in the following template.
            </div>
          </div>
          <div className="side-button justify-self-end rounded-2xl justify-center items-center flex px-1 py-3 w-full cursor-pointer">
            <div className="button_text text-black text-subheading leading-text-subheading font-bold">
              {"Begin Vesting"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default newLanding
