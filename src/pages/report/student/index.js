import { List } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReportApi from "../../../apis/report";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ReportSection } from "../components/ReportSection";
import { ReportDetailDrawer } from "./components/ReportDetailDrawer";
import { SubmitReportDrawer } from "./components/SubmitReportDrawer";

const StudentTeamReportPage = () => {
	const { id } = useParams();

	const [showReportDrawer, setShowReportDrawer] = useState(false);
	const [showReportDetailDrawer, setShowReportDetailDrawer] = useState(false);

	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(false);

	const report1 = reports?.find((e) => e.period === 0);
	const report2 = reports?.find((e) => e.period === 1);
	const report3 = reports?.find((e) => e.period === 2);

	const getReports = async () => {
		if (!id) return;

		setLoading(true);
		const data = await ReportApi.getReports(id);
		setReports(data);
		setLoading(false);
	};

	const onSendReport = (report) => {
		setShowReportDrawer(true);
	};

	const onViewReport = (report) => {
		setShowReportDetailDrawer(true);
	};

	const renderItem = (report) => {
		return (
			<List.Item>
				<ReportSection
					report={report}
					onSendReport={onSendReport}
					onViewReport={onViewReport}
				/>
			</List.Item>
		);
	};

	useEffect(() => {
		getReports();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<BasePageContent title="Báo cáo gửi cho giáo viên: Nguyễn Văn A">
			<div className="mt-4 mb-4">
				<ReportSection
					report={report1}
					onSendReport={onSendReport}
					onViewReport={onViewReport}
				/>
			</div>
			<div className="mt-4 mb-4">
				<ReportSection
					report={report2}
					onSendReport={onSendReport}
					onViewReport={onViewReport}
				/>
			</div>
			<div className="mt-4 mb-4">
				<ReportSection
					report={report3}
					onSendReport={onSendReport}
					onViewReport={onViewReport}
				/>
			</div>
			<SubmitReportDrawer
				open={showReportDrawer}
				onCancel={() => setShowReportDrawer(false)}
			/>
			<ReportDetailDrawer
				open={showReportDetailDrawer}
				onCancel={() => setShowReportDetailDrawer(false)}
			/>
		</BasePageContent>
	);
};

export default StudentTeamReportPage;
