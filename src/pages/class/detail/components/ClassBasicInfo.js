import { Card, Descriptions } from "antd";
import React, { useContext } from "react";
import { formatDate } from "../../../../utils";
import { ClassContext } from "../../../../providers/class";
import { useRole } from "../../../../hooks/role";
import { roles } from "../../../../constants/app";

export const ClassBasicInfo = () => {
	const data = useContext(ClassContext);

	const role = useRole();

	const items1 = [
		{
			key: "CLASS_NAME",
			label: "Tên lớp",
			children: <strong>{data?.className?.toUpperCase()}</strong>,
		},
		{
			key: "COURSE",
			label: "Môn học",
			children: (
				<strong>
					{`${data?.courseCode ?? ""} - ${data?.courseName ?? ""}`}
				</strong>
			),
		},
	];

	if (role === roles.STUDENT) {
		items1.push({
			key: "TEACHER",
			label: "Giáo viên",
			children: data?.teacherName,
		});
	}

	const items2 = [
		{
			key: "SEMESTER",
			label: "Học kỳ",
			// Hard code for testing only, wait for BE
			children: "Spring2023_2024 (Năm học 2023 - 2024)",
		},
		{
			key: "START_DATE",
			label: "Ngày bắt đầu",
			children: formatDate(data?.startTime, "DD/MM/yyyy"),
		},
		{
			key: "END_DATE",
			label: "Ngày kết thúc",
			children: formatDate(data?.endTime, "DD/MM/yyyy"),
		},
	];

	return (
		<Card className="mt-3 mb-4" title="Thông tin cơ bản">
			<Descriptions layout="vertical" items={items1} />
			<Descriptions layout="vertical" items={items2} />
		</Card>
	);
};
