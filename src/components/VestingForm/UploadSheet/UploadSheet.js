import React from "react";
import UploadIcon from "../../../assets/upload.png";
import Level3CTA from "../../CTA/Level3CTA";
import "./UploadSheet.scss"

const UploadSheet = () => {
    
    return (
      <div className="upload_sheet_form pt-10">
        <p className="font-bold mb-12 leading-heading-1 text-54px">
          {"Upload Vesting Sheet"}
        </p>
        <div className="upload-message rounded-2xl pl-6 pr-8 py-4 flex justify-between">
          <div className="p-4 flex flex-col justify-center">
            <img
              src={UploadIcon}
              className="my-auto  inline-block"
              alt="Upload Icon"
            ></img>
          </div>
          <div className="p-4 text-paragraph-2 leading-paragraph-2">
            Drag & Drop your vesting sheet or Browse. Supported file type -
            .xlsx
          </div>
        </div>
        <hr className="border-dark-200 mt-20 h-2" />
        <div className="flex flex-row-reverse mt-8">
          <Level3CTA text="Next" icon={true} />
        </div>
      </div>
    );
}

export default UploadSheet;