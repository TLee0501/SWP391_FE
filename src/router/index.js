import { createBrowserRouter } from "react-router-dom";
import routes from "../constants/routes";
import { LoginPage } from "../pages/login";
import { RegisterAccountPage } from "../pages/register";
import { Dashboard } from "../layouts/dashboard";
import { AccountListPage } from "../pages/account/list";
import { CourseListPage } from "../pages/course/list";
import { AccountDetailPage } from "../pages/account/detail";
import { CourseDetailPage } from "../pages/course/detail";

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
	{
		path: routes.dashboard.root,
		element: <Dashboard />,
		children: [
			{
				path: routes.dashboard.accounts,
				element: <AccountListPage />,
			},
			{
				path: `${routes.dashboard.accounts}/:id`,
				element: <AccountDetailPage />,
			},
			{
				path: routes.dashboard.courses,
				element: <CourseListPage />,
			},
			{
				path: `${routes.dashboard.courses}/:id`,
				element: <CourseDetailPage />,
			},
		],
	},
]);
