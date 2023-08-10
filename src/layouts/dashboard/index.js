import { Layout } from "antd";
import React from "react";
import { AppSider } from "./Sider";
import { AppHeader } from "./Header";
import { Outlet } from "react-router-dom";

const { Content } = Layout;

export const Dashboard = () => {
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
						margin: "24px 16px 0",
						overflow: "initial",
					}}
				>
					<Outlet />
				</Content>
			</Layout>
		</Layout>
	);
};
