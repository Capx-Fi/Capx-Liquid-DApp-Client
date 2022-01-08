import "./ProjectOwnerDashboardScreen.scss";

import { useEffect, useState } from "react";

function ProjectDetailsLoading() {
  //   useEffect(() => {
  //     displayProjectDetails();
  //   }, [projectDisplayID, projectOverviewData]);
  //   const [project, setProject] = useState({
  //     projectName: "-",
  //     tokenTicker: "-",
  //     derivativeID: "-",
  //     contractAddress: "-",
  //     projectDescription: "-",
  //   });
  //   const displayProjectDetails = async () => {
  //     if (projectOverviewData) {
  //       let description = "To the moon!";
  //       let currentProject = projectOverviewData[projectDisplayID];
  //       try {
  //         const res = await fetch(
  //           `https://milliondollarhomepage.mypinata.cloud/ipfs/${currentProject.projectDocHash}`
  //         );
  //         const desc = await res.json();
  //         description = desc.description;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //       setProject({
  //         projectName: currentProject.projectName,
  //         tokenTicker: currentProject.projectTokenTicker,
  //         contractAddress: currentProject.projectTokenAddress,
  //         projectDescription: description,
  //       });
  //     }
  //   };
  return (
    <section className="projectdetailscontainer">
      <div className="projectdetailscontainer_title">DETAILS</div>
      <hr className="border-dark-200 px-2 h-2"></hr>
      <div className="projectdetailscontainer_innercontainer">
        <div className="flex justify-between">
          <div className="projectdetailscontainer_innercontainer_detailbox">
            <div className="projectdetailscontainer_innercontainer_detailbox_key">
              PROJECT NAME
            </div>
            <div className="projectdetailscontainer_innercontainer_detailbox_value_loading"></div>
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox">
            <div className="projectdetailscontainer_innercontainer_detailbox_key">
              TOKEN TICKER
            </div>
            <div className="projectdetailscontainer_innercontainer_detailbox_value_loading"></div>
          </div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            CONTRACT ADDRESS
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value_loading"></div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            CREATOR ADDRESS
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value_loading"></div>
        </div>
        <div className="projectdetailscontainer_innercontainer_detailbox">
          <div className="projectdetailscontainer_innercontainer_detailbox_key">
            PROJECT DESCRIPTION
          </div>
          <div className="projectdetailscontainer_innercontainer_detailbox_value_loading"></div>
        </div>
      </div>
    </section>
  );
}

export default ProjectDetailsLoading;
