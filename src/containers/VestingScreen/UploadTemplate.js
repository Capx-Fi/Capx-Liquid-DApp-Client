import React from "react";
import Level3CTA from "../../components/CTA/Level3CTA";
import UploadTemplateBox from "../../components/UploadTemplateBox";

import Web3 from "web3";

import { useDropzone } from "react-dropzone";
import "./VestingScreen.scss";

import XLSX from "xlsx";
import { parseSheetObj } from "../../utils/parseSheetObject";
import { verifyVestingData } from "../../utils/verifyVestingData";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";
function UploadTemplate({
	vestingArray,
	error,
	setStep,
	setVestingData,
	setUploadErrors,
	uploadedFile,
	tokenDetails,
}) {
	const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt"]
		.map((x) => `.${x}`)
		.join(",");

	const defaultWeb3 = new Web3(
		"https://rinkeby.infura.io/v3/6351bb49adde41ec86bd60b451b9f1c5"
	);

	const { t } = useTranslation();
	const onDrop = async (acceptedFiles) => {
		acceptedFiles.forEach((file) => {
			const reader = new FileReader();
			reader.readAsArrayBuffer(file);
			reader.onload = (e) => {
				const ab = e.target.result;
				const wb = XLSX.read(ab, { type: "array" });
				const wsname = wb.SheetNames[0];
				const ws = wb.Sheets[wsname];
				// let data = XLSX.utils.sheet_to_json(ws, { header: false });
				parseSheetObj(ws).then((res) => {
					// console.log(res, "parseResponse");
					let errors = verifyVestingData(
						res,
						defaultWeb3,
						tokenDetails.decimal
					);

					if (errors.length === 0) {
						res = res.map((v) => ({ ...v, isSellable: true, isWrapped: true }));

						setVestingData(res, file);
					} else setUploadErrors(errors, file);
				});

				// setVestingData(data);
				// verifyVestingData(data);
			};
		});
	};

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		disabled: false,
		accept: SheetJSFT,
		onDrop,
	});

	return (
		<div className="pt-14 screen:w-10/12 desktop:w-11/12 twok:w-full">
			<p className="font-bold phone:mb-8 screen:mb-12 phone:text-subheading screen:text-heading-2 screen:leading-heading-2 desktop:text-heading-1 desktop:leading-heading-1 twok:leading-heading-1 twok:text-54px px-4">
				{t("upload_vesting_sheet")}
			</p>
			<UploadTemplateBox
				getInputProps={getInputProps}
				getRootProps={getRootProps}
				acceptedFiles={acceptedFiles}
				uploadedFile={uploadedFile}
				vestingArray={vestingArray}
				error={error}
			/>
			<hr className="border-dark-200 mt-16 h-2"></hr>
			<div className="desktop:w-11/12 twok:w-full flex flex-row-reverse mt-8">
				<Level3CTA
					text={error ? "View Errors" : "Next"}
					icon={true}
					disabled={!uploadedFile}
					onClick={() => setStep(error ? -1 : 3)}
				/>
			</div>
		</div>
	);
}

export default UploadTemplate;
