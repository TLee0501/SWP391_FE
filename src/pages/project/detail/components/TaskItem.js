import { Delete } from "@icon-park/react";
import { Button, Card, Row, Typography } from "antd";
import React from "react";

const { Text } = Typography;

export const TaskItem = ({ task, onClick, onDelete }) => {
	return (
		<Card onClick={() => onClick(task)} hoverable className="w-full">
			<Row justify="space-between" align="middle">
				<Text>{task.taskName}</Text>
				<Button
					onClick={(e) => {
						e.stopPropagation();
						onDelete(task);
					}}
					className="flex-center"
					icon={<Delete />}
					danger
					type="text"
				/>
			</Row>
		</Card>
	);
};
