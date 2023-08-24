import { Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AppSider } from "./Sider";
import { AppHeader } from "./Header";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import routes from "../../constants/routes";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/home-animation";
import AuthApi from "../../apis/auth";
import { UserContext } from "../../providers/user";
import { roles } from "../../constants/app";

const { Content } = Layout;
const { Title } = Typography;

export const Dashboard = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const [user, setUser] = useState();

	useEffect(() => {
		AuthApi.getUser().then((user) => {
			setUser(user);
			if (location.pathname === routes.dashboard.root) {
				var path = routes.dashboard.classes;
				if (user.role === roles.ADMIN) {
					path = routes.dashboard.accounts;
				}

				navigate(path);
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserContext.Provider value={{ user: user, setUser: setUser }}>
			<Layout hasSider>
				<AppSider />
				<Layout
					style={{
						marginLeft: 200,
					}}
				>
					<AppHeader />
					<Content
						style={{
							padding: "16px 16px 0",
							overflow: "initial",
							backgroundColor: "white",
						}}
					>
						{location.pathname === routes.dashboard.root && (
							<div className="flex-center" style={{ flexDirection: "column" }}>
								<Lottie
									width="30%"
									options={{
										animationData: animationData,
										autoplay: true,
										loop: true,
										rendererSettings: {
											preserveAspectRatio: "xMidYMid slice",
										},
									}}
								/>
								<Title level={3}>SWP Projects On-going Report System</Title>
							</div>
						)}
						<Outlet />
					</Content>
				</Layout>
			</Layout>
		</UserContext.Provider>
	);
};
