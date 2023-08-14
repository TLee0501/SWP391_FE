import { Card, Descriptions } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockStudents } from "../../../__mocks__/account";
import { mockClasses } from "../../../__mocks__/class";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { formatDate } from "../../../utils";
import { StudentList } from "./components/StudentList";

const ClassDetailPage = () => {
	const { id } = useParams();
	const [data, setData] = useState({});

	const items = [
		{
			key: "CLASS_NAME",
			label: "Tên lớp",
			children: <strong>{data.name}</strong>,
		},
		{
			key: "START_DATE",
			label: "Ngày bắt đầu",
			children: formatDate(data.startDate, "DD/MM/yyyy"),
		},
		{
			key: "END_DATE",
			label: "Ngày kết thúc",
			children: formatDate(data.endDate, "DD/MM/yyyy"),
		},
		{
			key: "COURSE",
			label: "Môn học",
			children: <strong>{data?.course?.name}</strong>,
		},
	];

	useEffect(() => {
		const currentClass = mockClasses.find((e) => e.id === id);
		console.log("currentClass", currentClass);
		if (data) {
			setData(currentClass);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<BasePageContent title={`Lớp ${data.name}`}>
			<Card className="mt-3 mb-4" title="Thông tin cơ bản">
				<Descriptions layout="vertical" items={items} />
			</Card>
			<Card className="mb-4" title="Danh sách nhóm làm đề tài"></Card>
			<Card title="Danh sách sinh viên">
				<StudentList students={mockStudents} />
			</Card>
		</BasePageContent>
	);
};

export default ClassDetailPage;
