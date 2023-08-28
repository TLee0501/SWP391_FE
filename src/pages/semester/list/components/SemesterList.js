import React, { useEffect, useState } from "react";
import { BaseTable } from "../../../../components/BaseTable";
import { Button, message } from "antd";
import { More, Plus } from "@icon-park/react";
import { SemesterFormModal } from "../../components/SemesterFormModal";
import SemesterApi from "../../../../apis/semester";
import moment from "moment";

export const SemesterList = ({ semesters, loading }) => {
	const [showCreateModal, setShowCreateModal] = useState(false);

	const columns = [
		{
			title: "Tên học kỳ",
			dataIndex: "semeterName",
			key: "semeterName"
		},
		{
			title: "Ngày bắt đầu",
			dataIndex: "startTime",
			key: "startTime",
			render: (_, { startTime }) => {
				return moment(startTime).format("DD/MM/YYYY");
			},
		},
		{
			title: "Ngày kết thúc",
			dataIndex: "endTime",
			key: "endTime",
			render: (_, { endTime }) => {
				return moment(endTime).format("DD/MM/YYYY");
			},
		},
		// {
		// 	title: "Năm học",
		// 	dataIndex: `endTime`,
		// 	key: "endTime",
		// 	render: (_, { endTime }) => {
		// 		return moment(endTime).format("YYYY");
		// 	},
		// },
		// {
		// 	title: "Thao tác",
		// 	render: (_, record) => {
		// 		<Button icon={<More />} className="flex-center" />;
		// 	},
		// },
	];

	const handleCreateSemester = async (values) => {
		const { semeterName, dates } = values;
		console.log("values: ", values)
		const data = {
			semeterName: semeterName,
			timeStart: dates[0],
			timeEnd: dates[1],
		};

		setShowCreateModal(true);
		const success = await SemesterApi.createSemester( data );
		if (success) {
			message.success("Tạo học kỳ thành công");
		} else {
			message.error("Tạo học kỳ thất bại");
		}
		setShowCreateModal(false);
	};

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
				onSubmit={handleCreateSemester}
			/>
		</>
	);
};
