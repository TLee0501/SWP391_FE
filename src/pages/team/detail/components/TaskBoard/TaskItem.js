import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card, Typography } from "antd";

const { Text } = Typography;

export const TaskItem = ({ task, index }) => {
	const { id, title } = task;
	return (
		<Draggable draggableId={id} index={index}>
			{(provided) => (
				<Card
					hoverable
					className="mb-2"
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
				>
					<Text>{title}</Text>
				</Card>
			)}
		</Draggable>
	);
};
