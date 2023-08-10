import { DegreeHat, DocumentFolder, User } from "@icon-park/react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import React from "react";

export const AppSider = () => {
	const items = [
		{
			key: "MANAGE_ACCOUNT",
			icon: <User />,
			label: "Tài khoản",
		},
		{
			key: "MANAGE_COURSE",
			icon: <DegreeHat />,
			label: "Môn học",
		},
		{
			key: "MANAGE_PROJECT",
			icon: <DocumentFolder />,
			label: "Dự án",
		},
	];

	return (
		<Sider
			className="py-4"
			style={{
				overflow: "auto",
				height: "100vh",
				position: "fixed",
				left: 0,
				top: 0,
				bottom: 0,
			}}
		>
			<Menu
				theme="dark"
				mode="inline"
				defaultSelectedKeys={[items[0].key]}
				items={items}
			/>
		</Sider>
	);
};
