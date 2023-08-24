import { Col, Row, Spin } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import TeamApi from "../../../apis/team";
import { ALL_PERMISSIONS } from "../../../constants/app";
import { usePermissions } from "../../../hooks/permission";
import { ClassSelect } from "../../project/components/ClassSelect";
import { TeamRequestDetailModal } from "../components/TeamRequestDetailModal";
import { TeamRequestList } from "./components/TeamRequestList";

export const TeamListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const permissions = usePermissions();
	const canView = permissions?.includes(ALL_PERMISSIONS.team.view);

	const [showTeamRequestModal, setShowTeamRequestModal] = useState(false);

	const [teamLoading, setTeamLoading] = useState(false);
	const [teamRequests, setTeamRequests] = useState([]);

	const teamRequestRef = useRef();

	const getTeamRequests = async (classId) => {
		setTeamLoading(true);
		const data = await TeamApi.getProjectTeamRequests(classId);
		setTeamRequests(data);
		setTeamLoading(false);
	};

	const onLoadClasses = (classList) => {
		if (!classList || classList.length <= 0) return;
		searchParams.set("class", classList[0]?.classId);
		setSearchParams(searchParams);
	};
	const handleChangeClass = (classId) => {
		searchParams.set("class", classId);
		setSearchParams(searchParams);
	};

	const handleClickTeamRequest = (request) => {
		teamRequestRef.current = request;
		setShowTeamRequestModal(true);
	};

	useEffect(() => {
		const classId = searchParams.get("class");
		getTeamRequests(classId);
	}, [searchParams]);

	return (
		<div>
			{canView && (
				<>
					<Row>
						<Col span={12}>
							<span className="mr-2">Lớp học:</span>
							<ClassSelect
								value={searchParams.get("class")}
								onLoaded={onLoadClasses}
								onChange={handleChangeClass}
							/>
						</Col>
					</Row>
					<Spin spinning={teamLoading}>
						<TeamRequestList
							teamRequests={teamRequests}
							onClickItem={handleClickTeamRequest}
						/>
					</Spin>
				</>
			)}
			<TeamRequestDetailModal
				teamRequest={teamRequestRef.current}
				open={showTeamRequestModal}
				onCancel={() => setShowTeamRequestModal(false)}
			/>
		</div>
	);
};
