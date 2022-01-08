import "./App.css";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen/HomeScreen";
import VestingScreen from "./pages/VestingScreen/VestingScreen";
import InvestorDashboardScreen from "./pages/InvestorDashboardScreen/InvestorDashboardScreen";
import ProjectOwnerDashboardScreen from "./pages/ProjectOwnerDashboard/ProjectOwnerDashboardScreen";
import { useEffect, useState } from "react";
import LoadingScreen from "./containers/LoadingScreen";
import PageNotFound from "./pages/PageNotFound/PageNotFound";

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
            <Route exact path="/" component={HomeScreen} />
            <Route exact path="/vesting" component={VestingScreen} />
            <Route exact path="/investor" component={InvestorDashboardScreen} />
            <Route
              exact
              path="/projectowner"
              component={ProjectOwnerDashboardScreen}
            />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
