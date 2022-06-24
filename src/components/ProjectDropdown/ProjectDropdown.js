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
				<span className="mr-4">
					{projectOverviewData.length > 0
						? projectOverviewData[projectDisplayID].projectName
						: ""}
				</span>
			</button>
			{open && (
				<div className="absolute bg-grayFill pt-2 pb-0.5 divide-y divide-grayFill rounded-md shadow-xl w-40">
					{projectOverviewData.map(
						(project, index) => (
							<p
								className="project-option"
								onClick={() => {
									setProjectDisplayID(index);
								}}
							>
								{project?.projectName}
							</p>
						),
						"div"
					)}
				</div>
			)}
		</div>
	);
}

export default DropDown;
