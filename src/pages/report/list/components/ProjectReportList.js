import { Button, Empty, List, Table, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";

const { Text } = Typography;

export const ProjectReportList = ({ teams }) => {
	const navigate = useNavigate();

	const columns = [
		{
			title: "Dự án",
			dataIndex: "projectName",
		},
		{
			title: "Số lượng sinh viên",
			align: "center",
			render: (_, { users }) => {
				return <div>{users.length}</div>;
			},
		},
		{
			align: "right",
			render: (_, record) => {
				return (
					<Button
						type="primary"
						onClick={() => {
							navigate(record?.projectId);
						}}
					>
						Xem báo cáo
					</Button>
				);
			},
		},
	];

	return (
		<Table
			dataSource={teams}
			columns={columns}
			pagination={false}
			locale={{
				emptyText: <Empty description={<Text disabled>Chưa có dự án</Text>} />,
			}}
			expandable={{
				expandedRowRender: ({ users }) => {
					return (
						<List
							dataSource={users}
							renderItem={(user) => {
								return (
									<List.Item>
										{user.mssv} - {user.fullName}
									</List.Item>
								);
							}}
						/>
					);
				},
			}}
		/>
	);
};
