import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import VestingScreen from "./pages/VestingScreen/VestingScreen";
import InvestorDashboardScreen from "./pages/InvestorDashboardScreen/InvestorDashboardScreen";
import ProjectOwnerDashboardScreen from "./pages/ProjectOwnerDashboard/ProjectOwnerDashboardScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

import Landing from "./components/Landing/Landing";
import ChooseDashboard from "./components/ChooseDashboard/ChooseDashboard";

import SuccessScreen from "./components/SuccessScreen/SuccessScreen";
import VestingForm from "./components/VestingForm/VestingForm";
import ProjectDetails from "./components/VestingForm/ProjectDetails/ProjectDetails";
import UploadSheet from "./components/VestingForm/UploadSheet/UploadSheet";


function App() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Router>
          <Switch>
            <Route exact path="/" component={Landing} />
            <Route exact path="/vesting" component={VestingScreen} />
            <Route exact path="/investor" component={InvestorDashboardScreen} />
            <Route
              exact
              path="/projectoverview"
              component={ProjectOwnerDashboardScreen}
            />
            <Route exact path="/dashboard" component={ChooseDashboard} />  
              
            <Route path="/1" render={() => <VestingForm InnerForm={<ProjectDetails/>} />} />
            <Route path="/2" render={() => <VestingForm InnerForm={<UploadSheet />} />} />
            <Route path="/3" component={SuccessScreen} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
