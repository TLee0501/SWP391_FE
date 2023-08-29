import React, { useState } from "react";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ReportSection } from "../components/ReportSection";
import { mockReports } from "../../../__mocks__/report";
import { List } from "antd";
import { SubmitReportDrawer } from "./components/SubmitReportDrawer";
import { ReportDetailDrawer } from "./components/ReportDetailDrawer";

const StudentTeamReportPage = ({ teamId }) => {
	const [showReportDrawer, setShowReportDrawer] = useState(false);
	const [showReportDetailDrawer, setShowReportDetailDrawer] = useState(false);

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
	return (
		<BasePageContent title="Báo cáo gửi cho giáo viên: Nguyễn Văn A">
			<List
				rowKey={(e) => e.id}
				dataSource={mockReports}
				renderItem={renderItem}
			/>
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
