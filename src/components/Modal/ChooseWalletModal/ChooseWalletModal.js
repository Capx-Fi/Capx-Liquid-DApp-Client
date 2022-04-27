import React, { useState } from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import MetamaskIcon from '../../../assets/metamask.svg'
import WalletConnectIcon from '../../../assets/walletconnect-logo.svg'
import { Link } from 'react-router-dom'
import './ChooseWalletModal.scss'

const Landing = () => {
  const [dashboardModal, setDashboardModal] = useState(false)
  const handleCloseSelectDashboard = () => {
    setDashboardModal(false)
  }

  return (
    <div className="choose_screen h-screen flex bg-dark-400">
      <Header hiddenNav />

      <div className="maincontainer flex flex-col justify-center m-auto mt-auto">
        <div className="herocontainer px-20 py-14 rounded-3xl bg-opacity-70 text-white relative desktop:w-60v flex flex-col items-start">
          <div className="title desktop:text-40px desktop:leading-lh-64 twok:text-50px twok:leading-lh-54 leading-title-1 font-semibold w-10/12 text-left">
            {'Connect your wallet'}
          </div>
          <div className="mt-2 desktop:text-paragraph-1 desktop:leading-subheading twok:text-subheading twok:leading-subheading text-greylabel">
            {'Connect with one of our available wallet providers'}
          </div>
          <div className="herobuttons flex flex-col gap-y-2 my-14 w-full">
            <div className="herocontainer_button flex flex-start rounded-xl items-center flex px-5 py-4 z-10 cursor-pointer">
              <div>
                <img
                  src={MetamaskIcon}
                  alt="Next Icon"
                  className="inline-block w-12 ml-3 mr-12"
                />
              </div>
              <div className="button_text text-white desktop:text-captions-1 twok:text-subheading desktop-captions-1 twok:leading-subheading desktop:font-semibold">
                {'Metamask'}
              </div>
            </div>
            <div className="herocontainer_button flex flex-start rounded-xl items-center flex px-5 py-4 z-10 cursor-pointer">
              <div>
                <img
                  src={WalletConnectIcon}
                  alt="Next Icon"
                  className="inline-block w-12 ml-3 mr-12"
                />
              </div>
              <div className="button_text text-white desktop:text-captions-1 twok:text-subheading desktop-captions-1 twok:leading-subheading desktop:font-semibold">
                {'WalletConnect'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Landing
