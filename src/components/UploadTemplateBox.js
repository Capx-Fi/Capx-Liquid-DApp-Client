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
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {uploadedFile ? (
        error ? (
          <>
            <div
              className={`tablet:w-auto cursor-pointer tablet:px-8 tablet:py-6 px-4 py-5 rounded-lg tablet:rounded-xl flex ring-2 ring-warning-color-500 flex-row bg-dark-300 `}
            >
              <div>
                <img
                  alt="upload vesting sheet"
                  src={ErrorIcon}
                  className="w-8 tablet:w-8 desktop:w-10 mr-12 tablet:pt-1 "
                />
              </div>
              <div className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2 flex ">
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
              className={`tablet:w-auto laptop:w-max cursor-pointer tablet:px-8 tablet:py-6 px-4 py-5 rounded-lg tablet:rounded-xl flex flex-row bg-success-color-300 bg-opacity-10 `}
            >
              <div>
                <img
                  alt="upload vesting sheet"
                  src={DoneIcon}
                  className="w-6 tablet:w-6 desktop:w-8 mr-8 tablet: pt-3 "
                />
              </div>
              <div className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2 flex flex-col">
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
            className={`tablet:w-max cursor-pointer tablet:px-8 px-4 py-5 rounded-lg tablet:rounded-xl flex flex-row ring-1 bg-dark-300 ring-success-color-300`}
          >
            <div>
              <img
                alt="upload vesting sheet"
                src={UploadIcon}
                className="w-8 tablet:w-8 desktop:w-10 mr-8 "
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