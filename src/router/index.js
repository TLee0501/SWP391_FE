import { createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";
import { LoginPage } from "../pages/login";
import { RegisterAccountPage } from "../pages/register";

export const router = createBrowserRouter([
	{
		path: routes.root,
		element: <div>SWP391 Projects</div>,
	},
	{
		path: routes.login,
		element: <LoginPage />,
	},
	{
		path: routes.register,
		element: <RegisterAccountPage />,
	},
]);
