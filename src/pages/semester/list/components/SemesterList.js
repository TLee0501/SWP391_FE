import React, { useState } from "react";
import { BaseTable } from "../../../../components/BaseTable";
import { Button } from "antd";
import { More, Plus } from "@icon-park/react";
import { SemesterFormModal } from "../../components/SemesterFormModal";

export const SemesterList = ({ semesters, loading }) => {
	const columns = [
		{
			title: "Tên học kỳ",
			dataIndex: "semesterName",
		},
		{
			title: "Ngày bắt đầu",
			render: (_, { startTime }) => {
				return <div>132</div>;
			},
		},
		{
			title: "Ngày kết thúc",
			render: (_, { endTime }) => {
				return <div>132</div>;
			},
		},
		{
			title: "Năm học",
			dataIndex: "academicYear",
		},
		{
			title: "Loại",
			dataIndex: "semesterType",
		},
		{
			title: "Thao tác",
			render: (_, record) => {
				<Button icon={<More />} className="flex-center" />;
			},
		},
	];

	const [showCreateModal, setShowCreateModal] = useState(false);

	return (
		<>
			<BaseTable
				title="Danh sách học kỳ"
				columns={columns}
				dataSource={semesters}
				loading={loading}
				actions={[
					<Button
						type="primary"
						icon={<Plus />}
						className="flex-center"
						onClick={() => setShowCreateModal(true)}
					>
						Thêm học kỳ
					</Button>,
				]}
			/>
			<SemesterFormModal
				title="Thêm học kỳ"
				open={showCreateModal}
				onCancel={() => setShowCreateModal(false)}
			/>
		</>
	);
};
