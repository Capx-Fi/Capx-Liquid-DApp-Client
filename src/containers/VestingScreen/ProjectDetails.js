import React, { useEffect, useState } from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import InputField from "../../components/InputField";
import { validateProjectName } from "../../utils/validateProjectName";
import { validateProjectDescription } from "../../utils/validateProjectDescription";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import "./VestingScreen.scss";
function ProjectDetails({
  projectName,
  projectDescription,
  setProjectName,
  setProjectDescription,
  setStep,
  projectExists,
  setContractDetails,
}) {
  useEffect(() => {
    verifyDescription(projectDescription);
  }, [projectDescription]);
  useEffect(() => {
    verifyName(projectName);
  }, [projectName]);
  useEffect(() => {
    if (projectExists.exists)
      setContractDetails((prevState) => ({
        ...prevState,
        projectTitle: projectExists.name,
        projectDescription: projectExists.description,
      }));
  }, [projectExists]);

  const [isValidProjectName, setIsValidProjectName] = useState(false);
  const [isValidProjectDescription, setIsValidProjectDescription] =
    useState(false);
  const { t } = useTranslation();
  const verifyName = (name) => {
    validateProjectName(name)
      ? setIsValidProjectName(true)
      : setIsValidProjectName(false);
  };
  const verifyDescription = (description) => {
    validateProjectDescription(description)
      ? setIsValidProjectDescription(true)
      : setIsValidProjectDescription(false);
  };

  return (
    <div className="pt-10">
      <p className="vesting_pages_title">{t("enter_project_details")}</p>
      <InputField
        placeholder={`${t("project_name")}`}
        label={`${t("project_name").toUpperCase()}`}
        valid={isValidProjectName || projectExists.exists}
        value={projectName}
        setValue={setProjectName}
        className={"mb-4 tablet:mb-6"}
        disabled={projectExists.exists}
      />
      <InputField
        placeholder={`${t("project_description")}`}
        label={`${t("project_description").toUpperCase()}`}
        valid={isValidProjectDescription || projectExists.exists}
        value={projectDescription}
        setValue={setProjectDescription}
        multiline={true}
        disabled={projectExists.exists}
      />
      <hr className="border-dark-200 mt-4 h-2"></hr>
      <div className="flex flex-row-reverse mt-6">
        <Level3CTA
          text="Next"
          icon={true}
          onClick={() => setStep(3)}
          disabled={
            projectExists.exists
              ? false
              : !isValidProjectName || !isValidProjectDescription
          }
        />
      </div>
    </div>
  );
}

export default ProjectDetails;
