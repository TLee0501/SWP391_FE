import {
	Button,
	Card,
	Collapse,
	Descriptions,
	Divider,
	Dropdown,
	List,
	Row,
	Spin,
	Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockStudents } from "../../../__mocks__/account";
import ClassApi from "../../../apis/class";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { formatDate } from "../../../utils";
import { StudentList } from "./components/StudentList";
import { useRole } from "../../../hooks/role";
import { usePermissions } from "../../../hooks/permission";
import { ALL_PERMISSIONS } from "../../../constants/app";
import { Key, Setting } from "@icon-park/react";
import { ClassEnrollKeyModal } from "./components/ClassEnrollKeyModal";

const datas = [
	"Nguyễn Văn A",
	"Nguyễn Văn B",
	"Nguyễn Văn C",
	"Nguyễn Văn D",
	"Nguyễn Văn E",
];

const ClassDetailPage = () => {
	const { id } = useParams();

	const permissions = usePermissions();
	const canEnroll = permissions?.includes(ALL_PERMISSIONS.class.enroll);

	const [data, setData] = useState({});
	const [loading, setLoading] = useState({});

	const [showEnrollKeyModal, setShowEnrollKeyModal] = useState(false);

	const items = [
		{
			key: "CLASS_NAME",
			label: "Tên lớp",
			children: <strong>{data.className?.toUpperCase()}</strong>,
		},
		{
			key: "START_DATE",
			label: "Ngày bắt đầu",
			children: formatDate(data.startTime, "DD/MM/yyyy"),
		},
		{
			key: "END_DATE",
			label: "Ngày kết thúc",
			children: formatDate(data.endTime, "DD/MM/yyyy"),
		},
		{
			key: "COURSE",
			label: "Môn học",
			children: <strong>{`${data?.courseCode} - ${data?.courseName}`}</strong>,
		},
	];

	const settingItems = [
		{
			key: "ENROLL_KEY",
			label: "Cập nhật mã tham gia",
			icon: <Key />,
			onClick: () => setShowEnrollKeyModal(true),
		},
	];

	const getClass = async () => {
		setLoading(true);
		const response = await ClassApi.getClassById(id);
		if (response) {
			setData(response);
		}
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			getClass();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<BasePageContent
			title={<span>{`Lớp ${data.className}`} </span>}
			action={
				<Row>
					{canEnroll && <Button type="primary">Tham gia lớp học</Button>}
					<Dropdown menu={{ items: settingItems }}>
						<Button className="flex-center ml-2" icon={<Setting />} />
					</Dropdown>
				</Row>
			}
		>
			<Spin spinning={loading}>
				<Card className="mt-3 mb-4" title="Thông tin cơ bản">
					<Descriptions layout="vertical" items={items} />
				</Card>
				<Divider orientation="center" STYLE="font-size:20px;">
					Danh sách nhóm làm dự án
				</Divider>

				<Collapse
					items={[
						{
							key: "1",
							label: "Nhóm 1 - Đề tài A",
							children: (
								<List
									dataSource={datas}
									renderItem={(item) => (
										<List.Item>
											<Typography.Text mark></Typography.Text> {item}
										</List.Item>
									)}
								/>
							),
						},
						{
							key: "2",
							label: "Nhóm 1 - Đề tài A",
							children: (
								<List
									dataSource={datas}
									renderItem={(item) => (
										<List.Item>
											<Typography.Text mark></Typography.Text> {item}
										</List.Item>
									)}
								/>
							),
						},
						{
							key: "3",
							label: "Nhóm 1 - Đề tài A",
							children: (
								<List
									dataSource={datas}
									renderItem={(item) => (
										<List.Item>
											<Typography.Text mark>
												<p></p>
											</Typography.Text>{" "}
											{item}
										</List.Item>
									)}
								/>
							),
						},
					]}
				></Collapse>

				<Card className="mb-4"></Card>
				<Divider orientation="center" STYLE="font-size:20px;">
					Danh sách sinh viên
				</Divider>
				<Card>
					<StudentList students={mockStudents} />
				</Card>
			</Spin>
			<ClassEnrollKeyModal
				open={showEnrollKeyModal}
				onCancel={() => setShowEnrollKeyModal(false)}
				classId={data?.classId}
			/>
		</BasePageContent>
	);
};

export default ClassDetailPage;
