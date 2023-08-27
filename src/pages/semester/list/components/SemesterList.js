import React from "react";
import { BaseTable } from "../../../../components/BaseTable";
import { Button } from "antd";
import { More } from "@icon-park/react";

export const SemesterList = ({ semesters, loading }) => {
	const columns = [
		{
			title: "Tên học kỳ",
			dataIndex: "semesterName",
		},
		{
			title: "Ngày bắt đầu",
			render: (_, { startTime }) => {
				return <div>132</div>;
			},
		},
		{
			title: "Ngày kết thúc",
			render: (_, { endTime }) => {
				return <div>132</div>;
			},
		},
		{
			title: "Thao tác",
			render: (_, record) => {
				<Button icon={<More />} className="flex-center" />;
			},
		},
	];

	return (
		<BaseTable
			title="Danh sách học kỳ"
			columns={columns}
			dataSource={semesters}
			loading={loading}
		/>
	);
};
