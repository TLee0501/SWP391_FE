const routes = {
	root: "/",
	login: "/login",
	register: "/register",
	dashboard: {
		root: "/dashboard",
		courses: "courses",
		classes: "classes",
		accounts: "accounts",
		projects: "projects",
		profile: "profile",
	},
};

export const UnauthorizedRoutes = [routes.login, routes.register];

export default routes;
