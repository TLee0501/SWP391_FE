import { Empty, List, Typography } from "antd";
import React from "react";
import { ClassItem } from "./ClassItem";

const { Text } = Typography;

export const ClassList = ({ classes, onDelete }) => {
	const renderItem = (item) => {
		return (
			<List.Item>
				<ClassItem data={item} onDelete={onDelete} />
			</List.Item>
		);
	};

	return (
		<div>
			<List
				grid={{ column: 3, gutter: 8 }}
				locale={{
					emptyText: (
						<Empty description={<Text disabled>Chưa có lớp học nào</Text>} />
					),
				}}
				split={false}
				bordered={false}
				dataSource={classes}
				renderItem={renderItem}
			/>
		</div>
	);
};
