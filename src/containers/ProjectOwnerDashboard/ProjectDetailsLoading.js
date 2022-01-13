import "./ProjectOwnerDashboardScreen.scss";

import { useEffect, useState } from "react";

function ProjectDetailsLoading() {
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
