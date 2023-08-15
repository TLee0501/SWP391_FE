import React from "react";
import { Card, Typography } from "antd";

const { Text } = Typography;

export const StudentItem = ({ item }) => {
	return <Text>{item.fullName}</Text>;
};
