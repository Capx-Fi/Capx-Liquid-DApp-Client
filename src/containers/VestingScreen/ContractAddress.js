import React, { useEffect, useState } from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import InputField from "../../components/InputField";
import { validateContractAddress } from "../../utils/validateContractAddress";
import { checkExistingProject } from "../../utils/checkExistingProject";
import { useWeb3React } from "@web3-react/core";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import "./VestingScreen.scss";

function ContractAddress({
  contractAddress,
  setContractAddress,
  setStep,
  tokenDetails,
  setTokenDetails,
  projectExists,
  setProjectExists,
  metamaskAccount,
}) {
  useEffect(() => {
    validContractAddress(contractAddress);
  }, [contractAddress]);
  const { t } = useTranslation();
  const { active, account, chainId } = useWeb3React();
  const [detailsFetched, setDetailsFetched] = useState(false);
  const validContractAddress = async (address) => {
    if (projectExists.exists === true) {
      setProjectExists({
        name: "",
        description: null,
        exists: false,
      });
    }
    let validateResponse = await validateContractAddress(address);
    // console.log(validateResponse);
    if (validateResponse) {
      setTokenDetails((prevState) => ({
        ...prevState,
        ...validateResponse,
      }));
      if (validateResponse.valid) {
        let existingDetails = await checkExistingProject(
          address,
          chainId,
          metamaskAccount
        );
        setDetailsFetched(true);
        setProjectExists((prevState) => ({
          ...prevState,
          ...existingDetails,
        }));
      }
      return validateResponse.valid;
    } else return false;
  };
  return (
    <div className="pt-10">
      <p className="vesting_pages_title">{t("enter_contract_address")}</p>
      <InputField
        placeholder={`${t("contract_address")}`}
        label={`${t("contract_address").toUpperCase()}`}
        valid={tokenDetails.valid}
        value={contractAddress}
        setValue={setContractAddress}
        maxLength={42}
      />
      <hr className="border-dark-200 mt-10 h-2"></hr>
      <div className="flex flex-row-reverse mt-8">
        <Level3CTA
          text="Next"
          icon={true}
          onClick={() => setStep(2)}
          disabled={!tokenDetails.valid || !detailsFetched}
        />
      </div>
    </div>
  );
}

export default ContractAddress;
