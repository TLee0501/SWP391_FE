import { Edit } from "@icon-park/react";
import { Button, Table, Tag, Typography } from "antd";
import React from "react";
import { mockAccounts } from "../../../__mocks__/account";
import { roles } from "../../../constants/app";

const { Title } = Typography;

export const AccountListPage = () => {
	const getRoleName = (role) => {
		switch (role) {
			case roles.ADMIN:
				return "Admin";
			case roles.STUDENT:
				return "Sinh viên";
			case roles.TEACHER:
				return "Giáo viên";
			default:
				return undefined;
		}
	};

	const columns = [
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Họ tên",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Vai trò",
			dataIndex: "role",
			key: "role",
			render: (_, { role }) => {
				return (
					<Tag
						color={
							role === roles.ADMIN
								? "blue-inverse"
								: role === roles.STUDENT
								? "cyan-inverse"
								: "purple-inverse"
						}
					>
						{getRoleName(role)}
					</Tag>
				);
			},
		},
		{
			title: "Thao tác",
			dataIndex: "action",
			key: "action",
			render: (_, record) => {
				return <Button className="flex-center" icon={<Edit />} />;
			},
		},
	];

	return (
		<div>
			<Title level={4}>Quản lý tài khoản</Title>
			<Table dataSource={mockAccounts} columns={columns} />
		</div>
	);
};
