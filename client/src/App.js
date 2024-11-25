import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home"; // Importing the Home component
import Login from "./login"; // Importing the Login component
import Register from "./register"; // Importing the Register component
import Admin from "./Admin";
import MainPage from "./MainPage";
import SuperAdminPage from "./SuperAdminPage";
import PrivateRoute from "./private/privateRouteA";
import PrivateRouteS from "./private/privateRouteS";

const App = () => {
	return (
		<Router>
			{" "}
			{/* Wrap the whole app with Router */}
			<Routes>
				{" "}
				{/* Define your routes here */}
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route
					path="/admin"
					element={
						<PrivateRoute>
							<Admin />
						</PrivateRoute>
					}
				/>
				<Route
					path="/superadmin"
					element={
						<PrivateRouteS>
							<SuperAdminPage />
						</PrivateRouteS>
					}
				/>
				<Route path="/user" element={<MainPage />} />
			</Routes>
		</Router>
	);
};

export default App;
