import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import WalletModal from "../../components/Modal/WalletModal/WalletModal";
import useWagmi from "../../useWagmi";
import "./index.scss";

const CreateVesting = () => {
  const { active } = useWagmi();
  const [modalMode, setModalMode] = useState(0);
  return active ? (
    <article className="h-screen m-auto flex">
      <Header hiddenNav />
      <div className="maincontainer flex phone:flex-col screen:flex-row gap-x-14 justify-center phone:items-center screen:items-stretch m-auto mt-auto">
        <div className="createvesting">
          <div className="title">
            How many vestings would you like to create?
          </div>
          <div className="createvesting-inner">
            <Link to="/create-single-vesting" className="cards bg-grayFill">
              <div className="one-box"></div>
              <div className="text-container">One</div>
            </Link>
            <Link to="/create-multiple-vesting" className="cards bg-grayFill">
              <div className="four-box">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <div className="text-container">Multiple</div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </article>
  ) : (
    <WalletModal modalMode={modalMode} setModalMode={setModalMode} />
  );
};

export default CreateVesting;
