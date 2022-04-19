import React from 'react'
import Level3CTA from '../CTA/Level3CTA'
import InputField from '../InputField'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import '../../translations/i18n'
import './newProjectDetails.scss'
import CapxLogo from '../../assets/capxliquid-logo.svg'
import BackIcon from '../../assets/previous-cyan.png'

function ProjectDetails () {
  return (
    <div className="newProjectDetails flex flex-wrap h-screen">
      <Header vesting={true} showSteps={true} />
      <div className="left_div bg-vesting">
        <div className="mx-auto z-50">
          <img
            className="cursor-pointer hidden mx-auto mt-5 tablet:flex h-8 laptop:h-10"
            src={CapxLogo}
            alt="capx logo"
          />
        </div>
      </div>
      <div className="left_div_psuedo" />
      <div className="w-65v bg-dark-400">
        <div className="vesting_container">
          <div className="nav-pane pb-4 flex justify-between pt-4 text-blizzard items-baseline text-caption-3 leading-caption-3 laptop:text-paragraph-2 laptop:leading-paragraph-2">
            <div className={`flex flex-row cursor-pointer items-baseline`}>
              <div>
                <img className="w-3 mr-3 mt-2" src={BackIcon} alt="next icon" />
              </div>
              <div>Back</div>
            </div>
            <div>{1}/4</div>
          </div>
          <div className="pt-10">
            <p className="vesting_pages_title">{"Enter Project Details"}</p>
            <InputField
              placeholder={"Contract Address"}
              label={`${"Contract Address".toUpperCase()}`}
              className={"mb-4 tablet:mb-6"}
            />
            <InputField
              placeholder={"Project Name"}
              label={`${"project name".toUpperCase()}`}
              className={"mb-4 tablet:mb-6"}
            />
            <InputField
              placeholder={`${"Project Description"}`}
              label={`${"project description".toUpperCase()}`}
              multiline={true}
            />
            <hr className="border-dark-200 mt-20 h-2" />
            <div className="flex flex-row-reverse mt-8">
              <Level3CTA text="Next" icon={true} />
            </div>
          </div>
        </div>
      </div>
          <Footer vesting={true} className="bg-transparent w-full"/>
    </div>
  );
}

export default ProjectDetails
