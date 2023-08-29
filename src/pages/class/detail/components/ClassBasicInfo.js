import { Card, Descriptions } from "antd";
import React, { useContext, useState } from "react";
import { formatDate } from "../../../../utils";
import { ClassContext } from "../../../../providers/class";
import { useRole } from "../../../../hooks/role";
import { roles } from "../../../../constants/app";
import SemesterApi from "../../../../apis/semester";

export const ClassBasicInfo = () => {
	const data = useContext(ClassContext);
	const role = useRole();

	const [semester, setSemester] = useState([]);
	const [loading, setLoading] = useState(false);

	const getSemesterById = async (semesterId) => {
		setLoading(true);
		const data = await SemesterApi.getSemesterById(semesterId);
		setSemester(data);
		setLoading(false);
	};

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

	if (role === roles.STUDENT || role === roles.ADMIN || role === roles.TEACHER ) {
		items1.push({
			key: "TEACHER",
			label: "Giáo viên hướng dẫn",
			children: data?.teacherName,
		});
	}

	const items2 = [
		{
			key: "SEMESTER",
			label: "Học kỳ",
			children: semester.semesterName,
		},
		{
			key: "START_DATE",
			label: "Ngày bắt đầu",
			children: formatDate(semester?.startTime, "DD/MM/yyyy"),
		},
		{
			key: "END_DATE",
			label: "Ngày kết thúc",
			children: formatDate(semester?.endTime, "DD/MM/yyyy"),
		},
	];

	return (
		<Card className="mt-3 mb-4" title="Thông tin cơ bản">
			<Descriptions layout="vertical" items={items1} />
			<Descriptions layout="vertical" items={items2} />
		</Card>
	);
};
