import { Card, Descriptions } from "antd";
import React, { useContext } from "react";
import { TeamContext } from "../../../../providers/team";
import { TaskStatus } from "../../../../constants/enum";
import moment, { now } from "moment";

export const TeamProgressOverview = () => {
	const { team } = useContext(TeamContext);

	return (
		<Card title="Báo cáo tổng quan">
			<Descriptions
				items={[
					{
						label: "Tổng số công việc",
						children: team?.tasks?.length,
					},
					{
						label: "Công việc chưa làm",
						children: team?.tasks?.filter((e) => e.status === TaskStatus.new)
							?.length,
					},
					{
						label: "Công việc đang làm",
						children: team?.tasks?.filter(
							(e) => e.status === TaskStatus.inProgress
						)?.length,
					},
					{
						label: "Công việc đã hoàn thành",
						children: team?.tasks?.filter(
							(e) => e.status === TaskStatus.completed
						)?.length,
					},
					{
						label: "Công việc đã quá hạn",
						children: team?.tasks?.filter((e) =>
							moment(e.endTime).isBefore(now())
						)?.length,
					},
				]}
			/>
		</Card>
	);
};
