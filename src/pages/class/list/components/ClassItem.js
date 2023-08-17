import { Card, Descriptions, Typography } from "antd";
import React from "react";
import { formatDate } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

export const ClassItem = ({ data }) => {
	const navigate = useNavigate();

	const items = [
		{
			key: "1",
			label: "Ngày bắt đầu",
			children: formatDate(data.startTime, "DD/MM/yyyy"),
		},
		{
			key: "2",
			label: "Ngày kết thúc",
			children: formatDate(data.endTime, "DD/MM/yyyy"),
		},
	];

	const handleClick = () => {
		navigate(data.id);
	};

	return (
		<Card
			className="w-full cursor-pointer"
			hoverable
			title={
				<Text className="text-base">
					<span className="font-light">Lớp</span> {data.className}
				</Text>
			}
			onClick={handleClick}
		>
			<Descriptions layout="vertical" items={items} />
			<Descriptions
				items={[
					{
						label: "Môn học",
						children: `${data.courseCode} - ${data?.courseName}`,
					},
				]}
			/>
		</Card>
	);
};
