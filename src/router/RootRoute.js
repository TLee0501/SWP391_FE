import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import routes, { UnauthorizedRoutes } from "../constants/routes";

const RootRoute = () => {
	// console.log("RootRoute render");
	const navigate = useNavigate();
	const { pathname } = useLocation();
	const isAuthenticated = useAuth();

	useEffect(() => {
		const path = pathname;
		if (UnauthorizedRoutes.includes(path)) {
			if (isAuthenticated) {
				navigate(routes.dashboard.root);
			}
			return;
		} else {
			if (!isAuthenticated) {
				navigate(routes.login);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [pathname, isAuthenticated]);

	return <Outlet />;
};

export default RootRoute;
