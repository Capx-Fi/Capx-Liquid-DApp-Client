import "./ProjectOwnerDashboardScreen.scss";

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ProjectDetailsLoading from "./ProjectDetailsLoading";
import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);

function getCheckSumAddress(_address) {
	return web3.utils.toChecksumAddress(_address);
}

function ProjectDetailsContainer({ projectOverviewData, projectDisplayID }) {
	useEffect(() => {
		displayProjectDetails();
	}, [projectDisplayID, projectOverviewData]);

	const { chainId } = useWeb3React();
	const [project, setProject] = useState(null);
	const displayProjectDetails = async () => {
		if (projectOverviewData.length > 0) {
			let description = "N/A";
			let currentProject = projectOverviewData[projectDisplayID];
			// console.log("Current Project", currentProject);
			try {
				const res = await fetch(
					`https://capx-liquid.mypinata.cloud/ipfs/${currentProject.projectDocHash}`
				);
				const desc = await res.json();
				description = desc.description;
			} catch (error) {
				console.log(error);
			}
			setProject({
				projectName: currentProject.projectName,
				tokenTicker: currentProject.projectTokenTicker,
				contractAddress: getCheckSumAddress(currentProject.projectTokenAddress),
				projectOwnerAddress: getCheckSumAddress(currentProject.projectOwnerAddress),
				projectDescription: description,
			});
		}
	};
	return project ? (
		<section className="projectdetailscontainer">
			<div className="projectdetailscontainer_title">DETAILS</div>
			<hr className="border-greyborder opacity-50 -mx-6 h-2"></hr>
			<div className="projectdetailscontainer_innercontainer">
				<div className="flex justify-between">
					<div className="projectdetailscontainer_innercontainer_detailbox">
						<div className="projectdetailscontainer_innercontainer_detailbox_key">
							PROJECT NAME
						</div>
						<div className="projectdetailscontainer_innercontainer_detailbox_value">
							{project?.projectName}
						</div>
					</div>
					<div className="projectdetailscontainer_innercontainer_detailbox">
						<div className="projectdetailscontainer_innercontainer_detailbox_key">
							TOKEN TICKER
						</div>
						<div className="projectdetailscontainer_innercontainer_detailbox_value">
							{project?.tokenTicker}
						</div>
					</div>
				</div>
				<div className="projectdetailscontainer_innercontainer_detailbox">
					<div className="projectdetailscontainer_innercontainer_detailbox_key">
						CONTRACT ADDRESS
					</div>
					<div className="projectdetailscontainer_innercontainer_detailbox_value">
						{project?.contractAddress}
					</div>
				</div>
				<div className="projectdetailscontainer_innercontainer_detailbox">
					<div className="projectdetailscontainer_innercontainer_detailbox_key">
						CREATOR ADDRESS
					</div>
					<div className="projectdetailscontainer_innercontainer_detailbox_value">
						{project?.projectOwnerAddress}
					</div>
				</div>
				<div className="projectdetailscontainer_innercontainer_detailbox">
					<div className="projectdetailscontainer_innercontainer_detailbox_key">
						PROJECT DESCRIPTION
					</div>
					<div
						className="projectdetailscontainer_innercontainer_detailbox_value projectdetailscontainer_innercontainer_detailbox_value_description"
						dangerouslySetInnerHTML={{ __html: project?.projectDescription }}
					></div>
				</div>
				<hr className="border-greyborder opacity-50 -mx-6 mt-7 h-2"></hr>
			</div>
		</section>
	) : (
		<ProjectDetailsLoading />
	);
}

export default ProjectDetailsContainer;
