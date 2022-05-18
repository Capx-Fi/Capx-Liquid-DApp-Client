import React from "react";
import UploadIcon from "../../../assets/upload.png";
import Level3CTA from "../../CTA/Level3CTA";

import Web3 from "web3";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";
import { parseSheetObj } from "../../../utils/parseSheetObject";
import { verifyVestingData } from "../../../utils/verifyVestingData";

import "./UploadSheet.scss";

const UploadSheet = (
	vestingArray,
	error,
	setStep,
	setVestingData,
	setUploadErrors,
	uploadedFile,
	tokenDetails
) => {
	const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt"]
		.map((x) => `.${x}`)
		.join(",");

	const defaultWeb3 = new Web3(
		"https://rinkeby.infura.io/v3/6351bb49adde41ec86bd60b451b9f1c5"
	);

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
		<div className="upload_sheet_form pt-10">
			<p className="font-bold mb-12 phone:text-paragraph-1 screen:text-54px leading-heading-1 text-54px">
				{"Upload Vesting Sheet"}
			</p>
			<div className="upload-message rounded-2xl pl-6 pr-8 screen:py-4 phone:py-10 flex justify-between">
				<div className="p-4 flex flex-col justify-center">
					<img
						src={UploadIcon}
						className="my-auto inline-block"
						alt="Upload Icon"
					></img>
				</div>
				<div className="p-4 text-paragraph-2 leading-paragraph-2">
					Drag & Drop your vesting sheet or Browse. Supported file type - .xlsx
				</div>
			</div>
			<hr className="border-dark-200 mt-20 h-2" />
			<div className="flex flex-row-reverse mt-8">
				<Level3CTA text="Next" icon={true} />
			</div>
		</div>
	);
};

export default UploadSheet;
