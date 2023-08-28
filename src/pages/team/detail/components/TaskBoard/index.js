import React, { useContext } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { TaskColumn } from "./TaskColumn";
import { Col, Row } from "antd";
import { TeamContext } from "../../../../../providers/team";
import { TaskStatus } from "../../../../../constants/enum";

export const TaskBoard = () => {
	const { team } = useContext(TeamContext);
	const tasks = team?.tasks;

	const columns = [
		{
			id: "TODO",
			title: "Cần làm",
			tasks: tasks.filter((e) => e.status === TaskStatus.new),
		},
		{
			id: "IN_PROGRESS",
			title: "Đang làm",
			tasks: tasks.filter((e) => e.status === TaskStatus.inProgress),
		},
		{
			id: "COMPLETED",
			title: "Đã hoàn thành",
			tasks: tasks.filter((e) => e.status === TaskStatus.completed),
		},
	];

	const onDragEnd = (result) => {
		console.log("on drag end: ", result);
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Row gutter={16}>
				{columns.map((column) => (
					<Col span={8}>
						<TaskColumn column={column} />
					</Col>
				))}
			</Row>
		</DragDropContext>
	);
};
