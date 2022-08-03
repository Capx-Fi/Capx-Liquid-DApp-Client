import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import "./index.scss";

const CreateVesting = () => {
    return (
        <article className="h-screen m-auto flex">
            <Header />
                <div className="maincontainer flex phone:flex-col screen:flex-row gap-x-14 justify-center phone:items-center screen:items-stretch m-auto mt-auto">
                    <div className="createvesting">
                        <div className="title">How many vestings would you like to create?</div>
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
    )
}

export default CreateVesting;