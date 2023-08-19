import { Card, Descriptions, Tag, Typography } from "antd";
import React from "react";
import { formatDate } from "../../../../utils";
import { useNavigate } from "react-router-dom";
import { useRole } from "../../../../hooks/role";
import { roles } from "../../../../constants/app";

const { Text } = Typography;

export const ClassItem = ({ data }) => {
	const navigate = useNavigate();

	const role = useRole();

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
		navigate(data.classId);
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
			extra={
				role === roles.STUDENT && (
					<Tag color={data.enrolled ? "blue-inverse" : "default"}>
						{data.enrolled ? "Đã tham gia" : "Chưa tham gia"}
					</Tag>
				)
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
			{role === roles.STUDENT && (
				<Descriptions
					items={[
						{
							label: "Giáo viên",
							children: data.teacherName,
						},
					]}
				/>
			)}
		</Card>
	);
};
