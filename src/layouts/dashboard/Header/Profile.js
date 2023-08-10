import { Dropdown } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import routes from "../../../constants/routes";

const Container = styled.div`
	color: white;
`;

export const ProfileBar = () => {
	const items = [
		{
			key: "PROFILE",
			label: <Link to={routes.login}>Hồ sơ</Link>,
		},
		{
			key: "LOGOUT",
			label: (
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.aliyun.com"
				>
					2nd menu item (disabled)
				</a>
			),
			disabled: true,
		},
	];

	return (
		<Container>
			<Dropdown
				menu={{
					items,
				}}
			>
				<span>Nguyen Minh Hoang</span>
			</Dropdown>
		</Container>
	);
};
