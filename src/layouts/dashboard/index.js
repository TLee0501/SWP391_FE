import { Layout, Typography } from "antd";
import React from "react";
import { AppSider } from "./Sider";
import { AppHeader } from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import routes from "../../constants/routes";
import Lottie from "react-lottie";
import animationData from "../../assets/lotties/home-animation";

const { Content } = Layout;
const { Title } = Typography;

export const Dashboard = () => {
	const location = useLocation();

	return (
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
	);
};
