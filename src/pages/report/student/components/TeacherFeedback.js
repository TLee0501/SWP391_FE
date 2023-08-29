import { User } from "@icon-park/react";
import { Avatar, Card, Col, Row, Typography } from "antd";
import React from "react";

const { Text, Paragraph } = Typography;

export const TeacherFeedback = () => {
	return (
		<Card>
			<Row align="middle" gutter={8} className="mb-1">
				<Col>
					<Avatar size={24} icon={<User size={10} />} className="flex-center" />
				</Col>
				<Col>
					<Text style={{ padding: 0 }} strong>
						Nguyễn Văn A
					</Text>
				</Col>
			</Row>
			<Paragraph>
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy text ever
				since the 1500s, when an unknown printer took a galley of type and
				scrambled it to make a type specimen book. It has survived not only five
				centuries, but also the leap into electronic typesetting, remaining
				essentially unchanged. It was popularised in the 1960s with the release
				of Letraset sheets containing Lorem Ipsum passages, and more recently
				with desktop publishing software like Aldus PageMaker including versions
				of Lorem Ipsum.
			</Paragraph>
		</Card>
	);
};
