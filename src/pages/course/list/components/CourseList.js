import { Empty, List, Typography } from "antd";
import React from "react";
import { CourseItem } from "./CourseItem";

const { Text } = Typography;

export const CourseList = ({ courses, onDelete, onUpdate }) => {
	const renderItem = (course) => {
		return (
			<List.Item>
				<CourseItem course={course} onDelete={onDelete} onUpdate={onUpdate} />
			</List.Item>
		);
	};

	return (
		<div>
			<List
				locale={{
					emptyText: (
						<Empty description={<Text disabled>Chưa có môn học nào</Text>} />
					),
				}}
				split={false}
				dataSource={courses}
				renderItem={renderItem}
			/>
		</div>
	);
};
