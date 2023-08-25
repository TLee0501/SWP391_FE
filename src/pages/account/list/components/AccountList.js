import { Edit, Forbid, More, Unlock } from "@icon-park/react";
import { Button, Dropdown, Input, Row, Table, Tag, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import RoleApi from "../../../../apis/role";
import UserApi from "../../../../apis/user";
import { roles } from "../../../../constants/app";
import { UpdateRoleModal } from "../../components/UpdateRoleModal";
import { getRoleName } from "../../../../utils";

const AccountList = () => {
	const [accountLoading, setAccountLoading] = useState(false);
	const [showUpdateRoleModal, setShowUpdateRoleModal] = useState(false);
	const [accounts, setAccounts] = useState([]);

	const userRef = useRef();
	const rolesRef = useRef();

	const getUsers = async (keyword) => {
		setAccountLoading(true);
		const data = await UserApi.searchUsers(keyword);
		data.sort((a, b) => {
			if (a.role === roles.ADMIN) {
				return -1; // a comes before b
			}
			if (b.role === roles.ADMIN) {
				return 1; // b comes before a
			}
			return 0; // no change in order
		});
		setAccounts(data);
		setAccountLoading(false);
	};

	const getAllRoles = async () => {
		const result = await RoleApi.getAllRoles();
		rolesRef.current = result.filter((e) => e.name !== roles.ADMIN);
	};

	const banUser = async (userId) => {
		const success = await UserApi.banUser(userId);
		if (success) {
			message.success("Đã khóa tài khoản");
			getUsers();
		} else {
			message.error("Khóa tài khoản thất bại");
		}
	};

	const unbanUser = async (userId) => {
		const success = await UserApi.unbanUser(userId);
		if (success) {
			message.success("Đã mở khóa tài khoản");
			getUsers();
		} else {
			message.error("Mở khóa tài khoản thất bại");
		}
	};

	useEffect(() => {
		getUsers();
		getAllRoles();
	}, []);

	const getActionItems = (record) => {
		const { isBan, userId, role } = record;

		return [
			{
				key: "UPDATE_ROLE",
				label: "Cập nhật vai trò",
				icon: <Edit />,
				disabled: role === roles.ADMIN,
				onClick: () => {
					userRef.current = record;
					setShowUpdateRoleModal(true);
				},
			},
			{
				key: "SET_STATUS",
				label: isBan ? "Mở khóa tài khoản" : "Khóa tài khoản",
				danger: !isBan,
				icon: !isBan ? <Forbid /> : <Unlock />,
				onClick: () => {
					if (isBan) {
						unbanUser(userId);
					} else {
						banUser(userId);
					}
				},
				disabled: role === roles.ADMIN,
			},
		];
	};

	const columns = [
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			sorter: (a, b) => a.email.localeCompare(b.email),
		},
		{
			title: "Họ tên",
			dataIndex: "fullName",
			key: "fullName",
			sorter: (a, b) => a.fullName.localeCompare(b.fullName),
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
								? "blue"
								: role === roles.STUDENT
								? "cyan"
								: "purple"
						}
					>
						{getRoleName(role)}
					</Tag>
				);
			},
			sorter: (a, b) => a.role.localeCompare(b.role),
		},
		{
			title: "Trạng thái",
			dataIndex: "status",
			key: "status",
			render: (_, { isBan }) => {
				return (
					<Tag color={!isBan ? "blue-inverse" : "red-inverse"}>
						{!isBan ? "Đang hoạt động" : "Khóa"}
					</Tag>
				);
			},
			sorter: (a, b) => a.isBan - b.isBan,
		},
		{
			title: "Thao tác",
			dataIndex: "action",
			key: "action",
			render: (_, record) => {
				return (
					<>
						{record.role !== roles.ADMIN && (
							<Dropdown menu={{ items: getActionItems(record) }}>
								<Button className="flex-center" icon={<More />} />
							</Dropdown>
						)}
					</>
				);
			},
		},
	];

	const handleSearch = (value) => {
		getUsers(value);
	};

	return (
		<>
			<Row justify="space-between mb-2">
				<Input.Search
					placeholder="Tìm tài khoản..."
					className="w-1/2"
					onSearch={handleSearch}
				/>
			</Row>
			<Table
				pagination={false}
				loading={accountLoading}
				dataSource={accounts}
				columns={columns}
			/>
			<UpdateRoleModal
				user={userRef.current}
				open={showUpdateRoleModal}
				onCancel={() => setShowUpdateRoleModal(false)}
				allRoles={rolesRef.current}
				onSuccess={() => getUsers()}
			/>
		</>
	);
};

export default AccountList;
