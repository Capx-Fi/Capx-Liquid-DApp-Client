import React from "react";
import InputField from "../../InputField";
import Level3CTA from "../../CTA/Level3CTA";
import "./ProjectDetails.scss"

const ProjectDetails = () => {
    return (
      <div className="pt-10 project_details_form">
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
    );
}

export default ProjectDetails;