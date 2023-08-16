import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

export const ProjectTeamItem = ({ item }) => {
	return <Text>{item.projectName}</Text>;
};
