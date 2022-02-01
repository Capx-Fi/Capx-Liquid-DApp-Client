import React from 'react'
import DownloadIcon from "../assets/download.png"
import vestingSheetTemplate from "../assets/vesting-sheet-template.xlsx"

function DownloadTemplateBox() {
    return (
      <div className="tablet:w-max cursor-pointer tablet:px-8 px-4 py-5 bg-dark-300 rounded-xl flex flex-row ring-1 ring-success-color-300">
        <a
          className="flex"
          download
          href="https://capx-resources.s3.amazonaws.com/vesting-sheet-template.xlsx"
        >
          <div>
            <img
              alt="download vesting sheet"
              src={DownloadIcon}
              className="w-8 tablet:w-8 desktop:w-10 mr-8 "
            />
          </div>
          <div className="whitespace-normal desktop:text-paragraph-2 tablet:text-caption-1 text-caption-2 flex flex-col">
            CapX Vesting Sheet Template.xls
            <br />
            (Compatible with MS Excel, Numbers, Gsheet)
          </div>
        </a>
      </div>
    );
}

export default DownloadTemplateBox
