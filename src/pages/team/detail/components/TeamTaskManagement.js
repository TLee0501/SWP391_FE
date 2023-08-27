import { Row, Typography } from "antd";
import React from "react";
import { TaskBoard } from "./TaskBoard";

const { Title } = Typography;

export const TeamTaskManagement = () => {
	return (
		<div>
			<Row align="middle" className="mb-3">
				<Title level={5}>Danh sách công việc (0) </Title>
			</Row>
			<TaskBoard />
		</div>
	);
};
