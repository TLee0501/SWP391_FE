import { Empty, List, Typography } from "antd";
import React from "react";
import { TaskItem } from "./TaskItem";

const { Text } = Typography;

export const TaskList = ({ tasks, onItemClick, onItemDelete }) => {
	const renderItem = (item) => {
		return (
			<List.Item>
				<TaskItem task={item} onClick={onItemClick} onDelete={onItemDelete} />
			</List.Item>
		);
	};

	return (
		<List
			rowKey={(item) => item.id}
			dataSource={tasks}
			split={false}
			locale={{
				emptyText: (
					<Empty description={<Text disabled>Chưa có công việc nào</Text>} />
				),
			}}
			renderItem={renderItem}
		/>
	);
};
