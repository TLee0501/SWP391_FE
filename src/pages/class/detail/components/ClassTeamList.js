import React from "react";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { Collapse, List, Typography } from "antd";
import { mockTeams } from "../../../../__mocks__/team";

export const ClassTeamList = () => {
	const items = mockTeams.map((e, index) => {
		return {
			key: e.id,
			label: `Nhóm ${index + 1} - Đề tài ${e.project.name}`,
			children: (
				<List
					dataSource={e.members}
					renderItem={(item) => (
						<List.Item>
							<Typography.Text mark>{item.name}</Typography.Text>
						</List.Item>
					)}
				/>
			),
		};
	});

	return (
		<ClassDetailArea title="Danh sách nhóm làm dự án" defaultOpen>
			<Collapse items={items} />
		</ClassDetailArea>
	);
};
