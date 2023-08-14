import { Card, Descriptions } from "antd";
import React from "react";
import { formatDate } from "../../../../utils";
import { useNavigate } from "react-router-dom";

export const ClassItem = ({ data }) => {
	const navigate = useNavigate();

	const items = [
		{
			key: "1",
			label: "Bắt đầu",
			children: formatDate(data.startDate, "DD/MM/yyyy"),
		},
		{
			key: "2",
			label: "Kết thúc",
			children: formatDate(data.endDate, "DD/MM/yyyy"),
		},
	];

	const handleClick = () => {
		navigate(data.id);
	};

	return (
		<Card
			className="w-full cursor-pointer"
			hoverable
			title={data.name}
			onClick={handleClick}
		>
			<Descriptions layout="vertical" items={items} />
			<Descriptions
				items={[{ label: "Môn học", children: data.course.name }]}
			/>
		</Card>
	);
};
