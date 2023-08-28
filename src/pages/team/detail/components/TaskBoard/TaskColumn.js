import { Button, Card, Empty, Typography } from "antd";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { TaskItem } from "./TaskItem";
import { Plus } from "@icon-park/react";

const { Text } = Typography;

export const TaskColumn = ({ column }) => {
	const { id, title, tasks } = column;
	return (
		<Card title={title}>
			<Droppable droppableId={id}>
				{(provided) => (
					<div ref={provided.innerRef} {...provided.droppableProps}>
						{tasks.map((task, index) => (
							<TaskItem key={task.id} task={task} index={index} />
						))}
						{tasks.length <= 0 && (
							<Empty description={<Text disabled>Chưa có công việc</Text>} />
						)}
						{provided.placeholder}
						{id === "TODO" && (
							<Button
								type="dashed"
								icon={<Plus />}
								className="flex-center w-full mt-4"
								size="large"
							>
								Thêm công việc
							</Button>
						)}
					</div>
				)}
			</Droppable>
		</Card>
	);
};
