import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import routes, { UnauthorizedRoutes } from "../constants/routes";

const RootRoute = () => {
	console.log("RootRoute render");
	const navigate = useNavigate();
	const location = useLocation();
	const isAuthenticated = useAuth();

	useEffect(() => {
		const path = location.pathname;
		if (!UnauthorizedRoutes.includes(path)) {
			return;
		}

		if (isAuthenticated) {
			navigate(routes.dashboard.root);
		} else {
			navigate(routes.login);
		}
	}, [isAuthenticated, navigate, location]);

	return <Outlet />;
};

export default RootRoute;
