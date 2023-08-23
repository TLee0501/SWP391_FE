import { Col, Row, Spin, message } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { useSearchParams } from "react-router-dom";
import { mockProjectTeams } from "../../../__mocks__/team";
import CourseApi from "../../../apis/course";
import TeamApi from "../../../apis/team";
import { ALL_PERMISSIONS } from "../../../constants/app";
import { usePermissions } from "../../../hooks/permission";
import { ClassSelect } from "../../project/components/ClassSelect";
import { TeamFormModal } from "../components/TeamFormModal";
import { TeamRequestDetailModal } from "../components/TeamRequestDetailModal";
import { TeamRequestList } from "./components/TeamRequestList";

export const TeamListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const permissions = usePermissions();
	const canView = permissions?.includes(ALL_PERMISSIONS.team.view);

	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const [teamCreating, setTeamCreating] = useState(false);

	const [showTeamRequestModal, setShowTeamRequestModal] = useState(false);

	const [teamLoading, setTeamLoading] = useState(false);
	const [teams, setTeams] = useState([]);

	const teamRequestRef = useRef();

	const getTeams = async (classId) => {
		setTeamLoading(true);
		const data = TeamApi.getProjectTeamRequests(classId);
		setTeams(data);
		setTeamLoading(false);
	};

	const handleCloseCreateTeamModal = () => {
		setShowCreateTeamModal(false);
		setTeamCreating(false);
	};
	const handleAddTeam = (course) => {
		setTeamCreating(true);
		const { code, name } = course;
		const data = {
			courseCode: code,
			courseName: name,
		};

		CourseApi.createCourse(data).then(({ success, data }) => {
			if (success) {
				message.success(data);
				handleCloseCreateTeamModal();
				getTeams();
			} else {
				message.error(data);
			}
			setTeamCreating(false);
		});
	};

	const handleUpdateTeam = (team) => {
		console.log("Update team: ", team);
	};

	const handleDeleteSuccess = () => {
		getTeams();
	};

	const onLoadClasses = (classList) => {
		if (!classList) return;
		const { classId } = classList[0];
		searchParams.set("class", classId);
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
		getTeams(classId);
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
							teamRequests={mockProjectTeams}
							onClickItem={handleClickTeamRequest}
						/>
					</Spin>
				</>
			)}
			<TeamFormModal
				open={showCreateTeamModal}
				title="Tạo nhóm"
				onCancel={handleCloseCreateTeamModal}
				onSubmit={handleAddTeam}
				confirmLoading={teamCreating}
			/>
			<TeamRequestDetailModal
				teamRequest={teamRequestRef.current}
				open={showTeamRequestModal}
				onCancel={() => setShowTeamRequestModal(false)}
			/>
		</div>
	);
};
