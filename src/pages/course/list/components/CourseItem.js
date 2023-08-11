import React, { useState } from "react";
import { Button, Card, Col, Row, Typography } from "antd";
import { Down, Up } from "@icon-park/react";

const { Text, Paragraph } = Typography;

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
			<div>
				<Paragraph className="mt-2 mb-0 pb-0">
					<strong>Mô tả:</strong> {course.description}
				</Paragraph>
				<Row gutter={8}>
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
			</div>
		);
	};

	const toggleExpanded = () => {
		setExpanded(!expanded);
	};

	return (
		<Card className="w-full cursor-pointer" onClick={toggleExpanded}>
			<Row justify="space-between">
				<Text className="text-lg font-medium">
					[{course.code}] {course.name}
				</Text>
				{!expanded ? <Down size={26} /> : <Up size={26} />}
			</Row>
			{expanded && renderExpandedInfo()}
		</Card>
	);
};
