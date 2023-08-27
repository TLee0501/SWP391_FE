import { Edit, More } from "@icon-park/react";
import { Button, Dropdown, Table } from "antd";
import React from "react";

export const CourseList = ({ courses, onDelete, onUpdate }) => {
	const getActionItems = (record) => {
		return [
			{
				label: "Cập nhật",
				icon: <Edit />,
				onClick: () => {
					onUpdate(record);
				},
			},
		];
	};

	const columns = [
		{
			title: "Mã môn học",
			dataIndex: "courseCode",
		},
		{
			title: "Tên môn học",
			dataIndex: "courseName",
		},
		{
			title: "Thao tác",
			render: (_, record) => {
				return (
					<Dropdown menu={{ items: getActionItems(record) }}>
						<Button icon={<More />} className="flex-center" />
					</Dropdown>
				);
			},
		},
	];

	return <Table dataSource={courses} columns={columns} pagination={false} />;
};
