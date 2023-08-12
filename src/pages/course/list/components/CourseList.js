import { List } from "antd";
import React from "react";
import { CourseItem } from "./CourseItem";

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
			<List dataSource={courses} renderItem={renderItem} />
		</div>
	);
};
