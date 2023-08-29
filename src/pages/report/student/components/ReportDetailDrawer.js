import {
	Collapse,
	Descriptions,
	Divider,
	Drawer,
	Empty,
	Spin,
	Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { TextTile } from "../../../../components/TextTile";
import { TeacherFeedback } from "./TeacherFeedback";
import ReportApi from "../../../../apis/report";
import { TeamContext } from "../../../../providers/team";

const { Title, Text } = Typography;

export const ReportDetailDrawer = ({
	reportId,
	open,
	onCancel,
	afterOpenChange,
}) => {
	const { team } = useContext(TeamContext);
	const [report, setReport] = useState();
	const [loading, setLoading] = useState(false);

	const getReport = async () => {
		if (!reportId) return;
		setLoading(true);
		const data = await ReportApi.getReportById(reportId);
		setReport(data);
		setLoading(false);
	};

	useEffect(() => {
		console.log("hihi: ", reportId);
		getReport();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [reportId]);

	return (
		<Drawer
			open={open}
			onClose={onCancel}
			maskClosable={false}
			title={`Báo cáo lần ${report?.period + 1 ?? ""}`}
			placement="right"
			size="large"
			afterOpenChange={afterOpenChange}
		>
			<Spin spinning={loading}>
				<Descriptions
					items={[
						{
							label: "Sinh viên báo cáo",
							children: team?.leader?.fullName ?? "N/A",
						},
					]}
				/>
				<Descriptions
					items={[
						{
							label: "Giáo viên nhận báo cáo",
							children: team?.instructor?.fullName ?? "N/A",
						},
					]}
				/>
				<TextTile label="Tiêu đề" colon>
					<div className="mt-1">{report?.title ?? "-"}</div>
				</TextTile>
				<Divider />
				<TextTile label="Báo cáo chung" colon>
					<div className="mt-1">{report?.overviewReport ?? "-"}</div>
				</TextTile>
				<Divider />
				<TextTile label="Công việc đã làm" colon>
					<div className="mt-1">{report?.doneReport ?? "-"}</div>
				</TextTile>
				<Divider />
				<TextTile label="Công việc đang làm" colon>
					<div className="mt-1">{report?.doingReport ?? "-"}</div>
				</TextTile>
				<Divider />
				<TextTile label="Công việc dự định làm" colon>
					<div className="mt-1">{report?.todoReport ?? "-"}</div>
				</TextTile>
				<Divider />
				<Collapse
					ghost
					items={[
						{
							label: <Title level={5}>Nhận xét của giáo viên</Title>,
							children: report?.feedback ? (
								<div>
									<TeacherFeedback />
								</div>
							) : (
								<Empty description={<Text disabled>Chưa có nhận xét</Text>} />
							),
						},
					]}
				/>
			</Spin>
		</Drawer>
	);
};
