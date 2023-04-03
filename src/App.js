import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import VestingScreen from "./pages/VestingScreen/VestingScreen";
import InvestorDashboardScreen from "./pages/InvestorDashboardScreen/InvestorDashboardScreen";
import ProjectOwnerDashboardScreen from "./pages/ProjectOwnerDashboard/ProjectOwnerDashboardScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Landing from "./components/Landing/Landing";
import ChooseWalletModal from "./components/Modal/ChooseWalletModal/ChooseWalletModal";

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
            <Route exact path="/" component={InvestorDashboardScreen} />
            {/* <Route exact path="/vesting" component={VestingScreen} /> */}
            <Route exact path="/investor" component={InvestorDashboardScreen} />
            <Route
              exact
              path="/projectoverview"
              component={ProjectOwnerDashboardScreen}
            />
            <Route exact path="/137" component={ChooseWalletModal} />
            <Route path="*" component={InvestorDashboardScreen} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
