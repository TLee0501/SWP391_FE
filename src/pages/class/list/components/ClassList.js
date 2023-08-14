import { List } from "antd";
import React from "react";
import { ClassItem } from "./ClassItem";

export const ClassList = ({ classes }) => {
	const renderItem = (item) => {
		return (
			<List.Item>
				<ClassItem data={item} />
			</List.Item>
		);
	};

	return (
		<div>
			<List
				grid={{ column: 3, gutter: 8 }}
				split={false}
				bordered={false}
				dataSource={classes}
				renderItem={renderItem}
			/>
		</div>
	);
};