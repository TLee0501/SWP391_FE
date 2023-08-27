import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamApi from "../../../apis/team";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { TeamProvider } from "../../../providers/team";
import { TeamBasicInfo } from "./components/TeamBasicInfo";
import { TeamProjectInfo } from "./components/TeamProjectInfo";
import { TeamTaskManagement } from "./components/TeamTaskManagement";

const TeamDetailPage = () => {
	const { id } = useParams();

	const [team, setTeam] = useState();
	const [loading, setLoading] = useState(false);

	const getTeam = async (teamId) => {
		setLoading(true);
		const data = await TeamApi.getJoinedProjectTeamById(teamId);
		setTeam(data);
		setLoading(false);
	};

	useEffect(() => {
		if (id) {
			getTeam(id);
		}
	}, [id]);

	return (
		<Spin spinning={loading}>
			<TeamProvider team={team} onReload={() => getTeam(id)}>
				<BasePageContent>
					<div className="mt-4">
						<TeamBasicInfo />
					</div>
					<div className="mt-2">
						<TeamProjectInfo />
					</div>
					<div className="mt-4">
						<TeamTaskManagement />
					</div>
				</BasePageContent>
			</TeamProvider>
		</Spin>
	);
};

export default TeamDetailPage;
