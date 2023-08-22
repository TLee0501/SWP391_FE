import { Card, Descriptions } from "antd";
import React, { useContext } from "react";
import { formatDate } from "../../../../utils";
import { ClassContext } from "../../../../providers/class";
import { useRole } from "../../../../hooks/role";
import { roles } from "../../../../constants/app";

export const ClassBasicInfo = () => {
	const data = useContext(ClassContext);

	const role = useRole();

	const items = [
		{
			key: "CLASS_NAME",
			label: "Tên lớp",
			children: <strong>{data?.className?.toUpperCase()}</strong>,
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
		role === roles.STUDENT && {
			key: "TEACHER",
			label: "Giáo viên",
			children: data?.teacherName,
		},
	];

	return (
		<Card className="mt-3 mb-4" title="Thông tin cơ bản">
			<Descriptions layout="vertical" items={items} />
			<Descriptions
				layout="vertical"
				items={[
					{
						key: "COURSE",
						label: "Môn học",
						children: (
							<strong>{`${data?.courseCode} - ${data?.courseName}`}</strong>
						),
					},
				]}
			/>
		</Card>
	);
};
