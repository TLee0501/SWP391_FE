import { Button, Collapse, Empty, List, Spin, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import TeamApi from "../../../../apis/team";
import { ClassContext } from "../../../../providers/class";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { TableReport } from "@icon-park/react";
import { useNavigate } from "react-router";
import routes from "../../../../constants/routes";

const { Text } = Typography;

export const ClassTeamList = () => {
	const navigate = useNavigate();
	const data = useContext(ClassContext);

	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(false);

	const getTeams = async (classId) => {
		setLoading(true);
		const list = await TeamApi.getProjectTeamInClass(classId);
		setTeams(list);
		setLoading(false);
	};

	const items = teams.map((e, index) => {
		return {
			key: e.id,
			label: `Nhóm ${index + 1} - Đề tài ${e.projectName}`,
			children: (
				<>
					<List
						dataSource={e.users}
						renderItem={(item) => (
							<List.Item>
								<Typography.Text>
									{item.mssv} - {item.fullName}
								</Typography.Text>
							</List.Item>
						)}
					/>
					<Button
						type="primary"
						className="flex-center mt-4"
						icon={<TableReport />}
						onClick={() =>
							navigate(
								`${routes.dashboard.root}/${routes.dashboard.report}/${e?.projectId}`
							)
						}
					>
						Xem báo cáo
					</Button>
				</>
			),
		};
	});

	useEffect(() => {
		const { classId } = data;
		if (classId) {
			getTeams(classId);
		}
	}, [data]);

	return (
		<ClassDetailArea title="Danh sách nhóm làm dự án" defaultOpen>
			<Spin spinning={loading}>
				{items.length > 0 ? (
					<Collapse items={items} />
				) : (
					<Empty description={<Text disabled>Chưa có nhóm nào đăng ký</Text>} />
				)}
			</Spin>
		</ClassDetailArea>
	);
};
