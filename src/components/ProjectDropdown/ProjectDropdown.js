import React, { useState } from "react";
import "./ProjectDropdown.scss";

function DropDown({
  projectOverviewData,
  projectDisplayID,
  setProjectDisplayID,
  setShowMenu,
}) {
  const [open, setOpen] = useState(false);
  console.log(projectOverviewData);

  return (
    <div className="relative">
      <button
        className={`project-header-dropdown-button ${
          open ? "border-success-color-400" : "border-dark-50"
        }`}
        onClick={() => setOpen(!open)}
      >
        <span className=" mr-16 screen:mr-6 pl-2 tablet:pl-3 screen:pl-3">
          {projectOverviewData?.length > 0
            ? projectOverviewData[projectDisplayID]?.projectName
            : ""}
        </span>
        <svg
          className="screen:w-4 screen:h-4 desktop:w-5 desktop:h-5 text-grayLabel dark:text-darkText"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {open && (
        <div className="absolute z-50 bg-grayFill pt-2 pb-0.5 divide-y divide-grayFill rounded-md shadow-xl screen:w-36 tablet:w-20 desktop:w-52 tablet:w-24 w-20">
          {projectOverviewData.map((project, index) => (
            <p
              className="project-option"
              onClick={() => {
                setProjectDisplayID(index);
                setOpen(false);
              }}
            >
              {project?.projectName}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropDown;
