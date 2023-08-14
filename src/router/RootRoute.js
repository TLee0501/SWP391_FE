import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/auth";
import routes from "../constants/routes";

const RootRoute = () => {
	const navigate = useNavigate();
	const isAuthenticated = useAuth();

	useEffect(() => {
		if (isAuthenticated) {
			navigate(routes.dashboard.root);
		} else {
			navigate(routes.login);
		}
	}, [isAuthenticated, navigate]);

	return <Outlet />;
};

export default RootRoute;
