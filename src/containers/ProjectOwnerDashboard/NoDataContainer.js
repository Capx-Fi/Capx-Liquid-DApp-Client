import "./ProjectOwnerDashboardScreen.scss";
import ProjectOwnerEmptyState from "../../assets/ProjectOwnerEmptyState.png";
import { useEffect, useState } from "react";

function NoDataContainer() {
  return (
    <section className="nodatacontainer">
        <img src={ProjectOwnerEmptyState} alt="No data for owner"/>
    </section>
  );
}

export default NoDataContainer;
