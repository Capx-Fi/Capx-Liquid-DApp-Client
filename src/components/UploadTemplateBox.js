import React from "react";
import UploadIcon from "../assets/upload.png";

import DoneIcon from "../assets/done.png";
import ErrorIcon from "../assets/error.png";

function UploadTemplateBox({
	vestingArray,
	error,
	getInputProps,
	getRootProps,
	acceptedFiles,
	uploadedFile,
}) {
	return (
		<div {...getRootProps()} className="px-4">
			<input {...getInputProps()} />
			{uploadedFile ? (
				error ? (
					<>
						<div
							className={`desktop:w-11/12 twok:w-full cursor-pointer phone:px-8 phone:py-6 px-4 desktop:py-5 screen:py-7 rounded-lg tablet:rounded-xl flex ring-2 ring-warning-color-500 flex-row bg-dark-300 `}
						>
							<div className="flex flex-col justify-center">
								<img
									alt="upload vesting sheet"
									src={ErrorIcon}
									className="w-10 screen:w-8 desktop:w-8 mr-14 pt-3 inline-block my-auto"
								/>
							</div>
							<div className="whitespace-normal tablet:text-left text-warning-color-200 desktop:text-paragraph-2 screen:text-caption-1 text-caption-2 flex ">
								Your vesting sheet upload was successful but we have encountered
								some errors in your vesting sheet.
								<br />
								You can review the errors and try uploading again.
							</div>
						</div>
					</>
				) : (
					<>
						<div
							className={`desktop:w-11/12 twok:w-full cursor-pointer tablet:px-8 tablet:py-6 px-4 phone:px-4 phone:py-6 desktop:py-5 screen:py-7 rounded-lg tablet:rounded-xl flex flex-row bg-success-color-300 bg-opacity-10 `}
						>
							<div className="flex flex-col justify-center">
								<img
									alt="upload vesting sheet"
									src={DoneIcon}
									className="w-6 screen:w-8 desktop:w-8 mr-10 tablet: pt-3 inline-block my-auto"
								/>
							</div>
							<div className="whitespace-normal desktop:text-paragraph-2 screen:text-caption-2 flex flex-col">
								{uploadedFile.name} has been successfully uploaded.
								<br />
								Proceed to review by clicking Next.
							</div>
						</div>
					</>
				)
			) : (
				<>
					<div
						className={`desktop:w-11/12 twok:w-full cursor-pointer phone:px-4 phone:py-6 tablet:px-8 px-4 desktop:py-5 screen:py-7 rounded-lg tablet:rounded-xl flex flex-row ring-1 bg-dark-300 ring-success-color-300`}
					>
						<div className="flex flex-col justify-center">
							<img
								alt="upload vesting sheet"
								src={UploadIcon}
								className="w-6 screen:w-8 desktop:w-12 mr-8 inline-block my-auto"
							/>
						</div>
						<div className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2 flex flex-col">
							Drag & Drop your vesting sheet or Browse
							<br />
							Supported file type - .xlsx
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default UploadTemplateBox;
