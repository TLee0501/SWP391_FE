import { Plus } from "@icon-park/react";
import { Button, Input, Row, Spin, message } from "antd";
import React, { useEffect, useRef, useState } from "react";

import { TeamFormModal } from "../components/TeamFormModal";
import { DeleteTeamModal } from "../components/DeleteTeamModal";
import { usePermissions } from "../../../hooks/permission";
import { ALL_PERMISSIONS, USER_PERMISSIONS } from "../../../constants/app";
import CourseApi from "../../../apis/course";
import { TeamList } from "./components/TeamList";
import { UpdateTeamModal } from "../components/UpdateTeamModal";

export const TeamListPage = () => {
<<<<<<< HEAD
  const permissions = usePermissions();
  const canView = permissions.includes(ALL_PERMISSIONS.team.view);
  const canCreate = permissions.includes(ALL_PERMISSIONS.team.create,);
  const canUpdate = permissions.includes(ALL_PERMISSIONS.team.update);
=======
	const permissions = usePermissions();
	const canView = permissions?.includes(ALL_PERMISSIONS.team.view);
	const canCreate = permissions?.includes(ALL_PERMISSIONS.team.create);
	const canUpdate = permissions?.includes(ALL_PERMISSIONS.team.update);
>>>>>>> 3d869c0eada0ab8788d4af99074e8d691484cb8a

	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const [teamCreating, setTeamCreating] = useState(false);

	const [showUpdateTeamModal, setShowUpdateTeamModal] = useState(false);

	const [showDeleteTeamModal, setShowDeleteTeamModal] = useState(false);

	const [teamLoading, setTeamLoading] = useState(false);
	const [teams, setTeams] = useState([]);

	const updatingTeam = useRef();
	const deletingTeam = useRef();

	useEffect(() => {
		getTeams();
	}, []);

	//   Get courses
	const getTeams = async (keyword) => {
		setTeamLoading(true);
		// const data = await CourseApi.searchTeams(keyword);
		// setTeams(data);
		setTeamLoading(false);
	};
	// End get courses

	// Add course
	const handleShowAddTeamModal = () => {
		setShowCreateTeamModal(true);
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
	//   End add course

	// Update course
	const handleShowUpdateTeamModal = (course) => {
		if (!canUpdate) return;

		updatingTeam.current = course;
		setShowUpdateTeamModal(true);
	};
	const handleCloseUpdateCourseModal = () => {
		updatingTeam.current = undefined;
		setShowUpdateTeamModal(false);
	};
	const handleUpdateTeam = (team) => {
		console.log("Update team: ", team);
	};
	// End update course

	// Delete course
	const handleShowDeleteTeamModal = (team) => {
		deletingTeam.current = team;
		setShowDeleteTeamModal(true);
	};
	const handleCloseDeleteTeamModal = () => {
		deletingTeam.current = undefined;
		setShowDeleteTeamModal(false);
	};
	const handleDeleteSuccess = () => {
		getTeams();
	};
	// End delete course

<<<<<<< HEAD
  return (
    <div>
      <Row justify="space-between">
        {canView && (
          <Input.Search
            style={{ width: "50%" }}
            placeholder="Tìm tên nhóm..."
            onSearch={(value) => getTeams(value)}
          />
        )}
        {canCreate && (
          <Button
            className="flex-center"
            type="primary"
            icon={<Plus />}
            onClick={handleShowAddTeamModal}
          >
            Tạo nhóm
          </Button>
        )}
      </Row>
      {canView && (
        <Spin spinning={teamLoading}>
          <TeamList
            teams={teams}
            onUpdate={handleShowUpdateTeamModal}
            onDelete={handleShowDeleteTeamModal}
          />
        </Spin>
      )}
      <TeamFormModal
        open={showCreateTeamModal}
        title="Tạo nhóm"
        onCancel={handleCloseCreateTeamModal}
        onSubmit={handleAddTeam}
        confirmLoading={teamCreating}
      />
      {/* <UpdateTeamModal
        open={showUpdateTeamModal}
        title="Cập nhật nhóm"
        team={updatingTeam.current}
        onCancel={handleCloseUpdateCourseModal}
        onSubmit={handleUpdateTeam}
        edit={true}
      /> */}
      <DeleteTeamModal
        onCancel={handleCloseDeleteTeamModal}
        onDeleteSuccess={handleDeleteSuccess}
        open={showDeleteTeamModal}
        team={deletingTeam.current}
      />
    </div>
  );
=======
	return (
		<div>
			<Row justify="space-between">
				{canView && (
					<Input.Search
						style={{ width: "50%" }}
						placeholder="Tìm tên nhóm..."
						onSearch={(value) => getTeams(value)}
					/>
				)}
				{canCreate && (
					<Button
						className="flex-center"
						type="primary"
						icon={<Plus />}
						onClick={handleShowAddTeamModal}
					>
						Tạo nhóm
					</Button>
				)}
			</Row>
			{canView && (
				<Spin spinning={teamLoading}>
					<TeamList
						teams={teams}
						onUpdate={handleShowUpdateTeamModal}
						onDelete={handleShowDeleteTeamModal}
					/>
				</Spin>
			)}
			<TeamFormModal
				open={showCreateTeamModal}
				title="Tạo nhóm"
				onCancel={handleCloseCreateTeamModal}
				onSubmit={handleAddTeam}
				confirmLoading={teamCreating}
			/>
			<TeamFormModal
				open={showUpdateTeamModal}
				title="Cập nhật nhóm"
				team={updatingTeam.current}
				onCancel={handleCloseUpdateCourseModal}
				onSubmit={handleUpdateTeam}
				edit={true}
			/>
			<DeleteTeamModal
				onCancel={handleCloseDeleteTeamModal}
				onDeleteSuccess={handleDeleteSuccess}
				open={showDeleteTeamModal}
				team={deletingTeam.current}
			/>
		</div>
	);
>>>>>>> 3d869c0eada0ab8788d4af99074e8d691484cb8a
};
