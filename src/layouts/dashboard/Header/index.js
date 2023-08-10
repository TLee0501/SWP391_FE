import { Header } from "antd/es/layout/layout";
import { Typography } from "antd";
import React from "react";
import { ProfileBar } from "./Profile";

const { Title } = Typography;

export const AppHeader = () => {
	return (
		<Header
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<Title style={{ color: "white" }} level={4}>
				SWP Projects On-going Report System
			</Title>
			<ProfileBar />
		</Header>
	);
};
