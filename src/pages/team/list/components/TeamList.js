import { Empty, List, Typography } from "antd";
import React from "react";
import { TeamItem } from "./TeamItem";


const { Text } = Typography;

export const TeamList = ({ courses, onDelete, onUpdate }) => {
	const renderItem = (course) => {
		return (
			<List.Item>
				<TeamItem course={course} onDelete={onDelete} onUpdate={onUpdate} />
			</List.Item>
		);
	};

	return (
		<div>
			<List
				locale={{
					emptyText: (
						<Empty description={<Text disabled>Chưa có nhóm nào đăng ký.</Text>} />
					),
				}}
				split={false}
				dataSource={courses}
				renderItem={renderItem}
			/>
		</div>
	);
};
