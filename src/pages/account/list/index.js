import { Edit, Plus } from "@icon-park/react";
import { Button, Input, Row, Table, Tag, Typography } from "antd";
import React, { useState } from "react";
import { mockAccounts } from "../../../__mocks__/account";
import { roles } from "../../../constants/app";
import { AccountModal } from "../components/AccountModal";

const { Title } = Typography;

export const AccountListPage = () => {
	const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
	const [showUpdateAccountModal, setShowUpdateAccountModal] = useState(false);

	const handleShowCreateAccountModal = () => {
		setShowCreateAccountModal(true);
	};
	const handleCloseCreateAccountModal = () => {
		setShowCreateAccountModal(false);
	};

	const handleShowUpdateAccountModal = () => {
		setShowUpdateAccountModal(true);
	};
	const handleCloseUpdateAccountModal = () => {
		setShowUpdateAccountModal(false);
	};

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
				return (
					<Button
						onClick={handleShowUpdateAccountModal}
						className="flex-center"
						icon={<Edit />}
					/>
				);
			},
		},
	];

	return (
		<div>
			<Row justify="space-between mb-2">
				<Input.Search placeholder="Tìm tài khoản..." className="w-1/2" />
				<Button
					onClick={handleShowCreateAccountModal}
					type="primary"
					className="flex-center"
					icon={<Plus />}
				>
					Thêm tài khoản
				</Button>
			</Row>
			<Table dataSource={mockAccounts} columns={columns} />
			<AccountModal
				title="Thêm tài khoản"
				open={showCreateAccountModal}
				onCancel={handleCloseCreateAccountModal}
			/>
			<AccountModal
				title="Cập nhật tài khoản"
				open={showUpdateAccountModal}
				onCancel={handleCloseUpdateAccountModal}
			/>
		</div>
	);
};
