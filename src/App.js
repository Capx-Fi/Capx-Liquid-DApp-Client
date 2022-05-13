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
import ChooseWalletModal from "./components/Modal/ChooseWalletModal/ChooseWalletModal";
import Header from "./components/Header/Header";
import BreakPoint from "./containers/Breakpoint";
import Footer from "./components/Footer/Footer";

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
					<div className="screen:block hidden">
						<Switch>
							<Route exact path="/" component={Landing} />
							<Route exact path="/vesting" component={VestingScreen} />
							<Route
								exact
								path="/investor"
								component={InvestorDashboardScreen}
							/>
							<Route
								exact
								path="/projectoverview"
								component={ProjectOwnerDashboardScreen}
							/>
							<Route exact path="/1" component={ChooseWalletModal} />
							<Route path="*" component={PageNotFound} />
						</Switch>
					</div>
					<div className="screen:hidden m-auto block align-middle justify-center items-center overflow-x-hidden">
						<Header hiddenNav />
						<BreakPoint />
						<Footer />
					</div>
				</Router>
			)}
		</>
	);
}

export default App;
