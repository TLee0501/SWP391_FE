import { Layout, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { AppSider } from "./Sider";
import { AppHeader } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/home-animation";
import AuthApi from "../../apis/auth";
import { UserContext } from "../../providers/user";

const { Content } = Layout;
const { Title } = Typography;

export const Dashboard = () => {
	const location = useLocation();
	const [user, setUser] = useState();

	useEffect(() => {
		console.log("Dashboard -> useEffect()");
		AuthApi.getUser().then((user) => setUser(user));
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
