import React, { useState } from "react";
import { Button, Card, Col, Row, Tag, Typography } from "antd";
import { Down, Up } from "@icon-park/react";

const { Text } = Typography;

export const CourseItem = ({ course, onDelete, onUpdate }) => {
	const [expanded, setExpanded] = useState(false);

	const handleUpdate = (e) => {
		e.stopPropagation();
		onUpdate(course);
	};

	const handleDelete = (e) => {
		e.stopPropagation();
		onDelete(course);
	};

	const renderExpandedInfo = () => {
		return (
			<Row gutter={8} className="mt-2">
				<Col>
					<Button type="primary" onClick={handleUpdate}>
						Cập nhật
					</Button>
				</Col>
				<Col>
					<Button danger onClick={handleDelete}>
						Xóa
					</Button>
				</Col>
			</Row>
		);
	};

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className="w-full cursor-pointer" hoverable onClick={toggleExpanded}>
			<Row justify="space-between">
				<div>
					<Text className="text-lg font-medium" ellipsis>
						[{course.code}] {course.name}
					</Text>
					<Tag
						className="ml-2"
						color={course.active ? "blue-inverse" : "default"}
					>
						{course.active ? "Kích hoạt" : "Chưa kích hoạt"}
					</Tag>
				</div>
				{!expanded ? <Down size={26} /> : <Up size={26} />}
			</Row>
			{expanded && renderExpandedInfo()}
		</Card>
	);
};
