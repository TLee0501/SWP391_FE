import { Card, Collapse, Descriptions, List, Typography } from "antd";
import React, { useContext } from "react";
import { TeamContext } from "../../../../providers/team";
import { UserContext } from "../../../../providers/user";

const { Text } = Typography;

export const TeamBasicInfo = () => {
	const { user } = useContext(UserContext);
	const { team } = useContext(TeamContext);

	return (
		<Card title="Thông tin nhóm">
			<Descriptions
				items={[
					{
						label: "Nhóm trưởng",
						children: team?.leader.fullName,
					},
					{
						label: "Hướng dẫn bởi GV",
						children: team?.instructor?.fullName ?? "N/A",
					},
					{
						label: "Số thành viên",
						children: team?.members?.length ?? 0,
					},
				]}
			/>
			<Collapse
				ghost
				items={[
					{
						label: `Tất cả thành viên nhóm (${team?.members?.length ?? 0})`,
						children: (
							<List
								dataSource={team?.members}
								renderItem={(item) => {
									return (
										<List.Item>
											<span>
												{item.code} - {item.fullName}
												{user?.userId === item.id && (
													<span className="ml-2" style={{ fontWeight: "bold" }}>
														(Tôi)
													</span>
												)}
											</span>
										</List.Item>
									);
								}}
							/>
						),
					},
				]}
			/>
		</Card>
	);
};
