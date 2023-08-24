import { PreviewOpen } from "@icon-park/react";
import { Button, Table, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import { roles } from "../../../../constants/app";
import { useRole } from "../../../../hooks/role";
import { formatDate } from "../../../../utils";

const { Text } = Typography;

export const ClassList = ({ classes, onDelete }) => {
	const role = useRole();
	const navigate = useNavigate();

	const columns = [
		{
			title: "Tên lớp",
			dataIndex: "className",
			key: "className",
			ellipsis: true,
		},
		{
			title: "Môn học",
			dataIndex: "courseName",
			key: "courseName",
			ellipsis: true,
		},
		{
			title: "Bắt đầu",
			dataIndex: "startTime",
			key: "startTime",
			render: (_, { startTime }) => {
				return <Text>{formatDate(startTime, "DD/MM/yyyy")}</Text>;
			},
		},
		{
			title: "Kết thúc",
			dataIndex: "endTime",
			key: "endTime",
			render: (_, { endTime }) => {
				return <Text>{formatDate(endTime, "DD/MM/yyyy")}</Text>;
			},
		},
	];

	if (role === roles.STUDENT) {
		columns.push({
			title: "Giáo viên",
			dataIndex: "teacherName",
			key: "teacherName",
		});
	}

	columns.push({
		title: "Thao tác",
		dataIndex: "action",
		key: "action",
		render: (_, { classId }) => {
			return (
				<Button
					icon={<PreviewOpen />}
					className="flex-center"
					type="primary"
					onClick={() => navigate(classId)}
				/>
			);
		},
	});

	return <Table dataSource={classes} columns={columns} pagination={false} />;
};
