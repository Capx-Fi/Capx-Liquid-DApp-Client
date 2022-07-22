import React, { useEffect, useState } from "react";
import InputField from "../../InputField";
import Level3CTA from "../../CTA/Level3CTA";
import { validateContractAddress } from "../../../utils/validateContractAddress";
import { checkExistingProject } from "../../../utils/checkExistingProject";
import { validateProjectName } from "../../../utils/validateProjectName";
import { validateProjectDescription } from "../../../utils/validateProjectDescription";
import "./ProjectDetails.scss";
import WarningCard from "../../WarningCard/WarningCard";
import useCapxWalletConnection from "../../../useCapxWalletConnection";

const ProjectDetails = ({
  contractAddress,
  setContractAddress,
  setStep,
  tokenDetails,
  setTokenDetails,
  projectExists,
  setProjectExists,
  metamaskAccount,
  projectName,
  projectDescription,
  setProjectName,
  setProjectDescription,
  setContractDetails,
  web3,
}) => {
  useEffect(() => {
    validContractAddress(contractAddress);
  }, [contractAddress]);

  const { active, account, chainId, isSolana, solanaConnection } =
    useCapxWalletConnection();

  const [detailsFetched, setDetailsFetched] = useState(false);

  const [checkingContract, setCheckingContract] = useState(false);

  const validContractAddress = async (address) => {
    setCheckingContract(true);
    if (projectExists.exists === true) {
      setProjectExists({
        name: "",
        description: null,
        exists: false,
      });
    }
    let validateResponse = await validateContractAddress(
      address,
      web3,
      isSolana,
      solanaConnection
    );
    // console.log(validateResponse)
    if (validateResponse) {
      setTokenDetails((prevState) => ({
        ...prevState,
        ...validateResponse,
      }));
      if (validateResponse.valid) {
        let existingDetails = await checkExistingProject(
          address,
          chainId,
          metamaskAccount,
          isSolana
        );
        setDetailsFetched(true);
        setProjectExists((prevState) => ({
          ...prevState,
          ...existingDetails,
        }));
      }
      setCheckingContract(false);
      return validateResponse.valid;
    } else return false;
  };

  useEffect(() => {
    verifyDescription(projectDescription);
  }, [projectDescription]);
  useEffect(() => {
    verifyName(projectName);
  }, [projectName]);
  useEffect(() => {
    if (projectExists.exists) {
      setContractDetails((prevState) => ({
        ...prevState,
        projectTitle: projectExists.name,
        projectDescription: projectExists.description,
      }));
    }
  }, [projectExists]);

  const [isValidProjectName, setIsValidProjectName] = useState(false);
  const [isValidProjectDescription, setIsValidProjectDescription] =
    useState(false);

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
    <div className="pt-10 project_details_form screen:w-10/12 desktop:w-11/12 twok:w-full">
      <p className="vesting_pages_title">{"Enter Project Details"}</p>
      <InputField
        placeholder={"Contract Address"}
        label={`${"Contract Address".toUpperCase()}`}
        valid={tokenDetails.valid}
        value={contractAddress}
        setValue={setContractAddress}
        // maxLength={isSolana ? 44 : 42}
        disabled={checkingContract}
        className={
          "phone:mb-4 desktop:mb-6 screen:mt-4 desktop:mt-8 twok:mt-12"
        }
        loading={checkingContract}
      />

      <InputField
        placeholder={"Project Name"}
        label={`${"project name".toUpperCase()}`}
        valid={isValidProjectName || projectExists.exists}
        value={projectName}
        setValue={setProjectName}
        disabled={
          !tokenDetails.valid || checkingContract || projectExists.exists
        }
        className={"phone:mb-4 desktop:mb-6"}
        loading={checkingContract}
      />
      <InputField
        placeholder={`${"Project Description"}`}
        label={`${"project description".toUpperCase()}`}
        valid={isValidProjectDescription || projectExists.exists}
        value={projectDescription}
        setValue={setProjectDescription}
        multiline={true}
        disabled={
          !isValidProjectName || checkingContract || projectExists.exists
        }
        loading={checkingContract}
      />

      <hr className="border-dark-25 phone:mt-6 desktop:mt-12 h-2" />
      <div
        className={`flex ${
          !tokenDetails?.valid ||
          !isValidProjectName ||
          !isValidProjectDescription
            ? "flex-row justify-between"
            : "flex-row-reverse"
        } screen:mt-4 desktop:mt-8`}
      >
        {!tokenDetails?.valid ? (
          <WarningCard text="Please Enter a Valid Contract Address." />
        ) : !isValidProjectName ? (
          <WarningCard text="Please Enter a Valid Project Name." />
        ) : !isValidProjectDescription ? (
          <WarningCard text="Please Enter a Valid project Description." />
        ) : (
          <></>
        )}
        <Level3CTA
          text="Next"
          icon={true}
          onClick={() => setStep(2)}
          disabled={
            !tokenDetails.valid ||
            !detailsFetched ||
            (projectExists.exists
              ? false
              : !isValidProjectName || !isValidProjectDescription)
          }
        />
      </div>
    </div>
  );
};

export default ProjectDetails;
