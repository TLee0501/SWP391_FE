import { Table } from "antd";
import React from "react";

export const StudentList = ({ students }) => {
	const columns = [
		{
			title: "Họ tên",
			dataIndex: "fullName",
			key: "fullName",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
	];

	return (
		<Table
			pagination={false}
			bordered
			dataSource={students}
			columns={columns}
		/>
	);
};
