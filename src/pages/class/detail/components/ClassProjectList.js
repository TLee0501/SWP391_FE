import { Delete, Edit, More, Plus } from "@icon-park/react";
import { Button, Col, Dropdown, Row, message } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import ClassApi from "../../../../apis/class";
import ProjectApi from "../../../../apis/project";
import TeamApi from "../../../../apis/team";
import { BaseTable } from "../../../../components/BaseTable";
import { ConfirmDeleteModal } from "../../../../components/ConfirmDeleteModal";
import { ALL_PERMISSIONS, roles } from "../../../../constants/app";
import { usePermissions } from "../../../../hooks/permission";
import { useRole } from "../../../../hooks/role";
import { ClassContext } from "../../../../providers/class";
import { ProjectDetailModal } from "../../../project/components/ProjectDetailModal";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { TeamRegistrationModal } from "./TeamRegistrationModal";
import { UserContext } from "../../../../providers/user";

export const ClassProjectList = ({ onViewDescription }) => {
	const role = useRole();
	const data = useContext(ClassContext);
	const { user } = useContext(UserContext);
	const permissions = usePermissions();
	const canCreateProject = permissions?.includes(
		ALL_PERMISSIONS.project.create
	);

	const canRegisterTeamRequest = permissions?.includes(
		ALL_PERMISSIONS.team.create
	);
	const [students, setStudents] = useState([]);
	const [loading, setLoading] = useState(false);
	const [projects, setProjects] = useState([]);
	const [projectCreating, setProjectCreating] = useState(false);
	const [projectDeleting, setProjectDeleting] = useState(false);

	const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const [showDeleteProjectModal, setShowDeleteProjectModal] = useState(false);
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);
	const [teamCreating, setTeamCreating] = useState(false);

	const projectIdRef = useRef();
	const projectRef = useRef();

	const getProjectsInClass = async (classId) => {
		setLoading(true);
		const result = await ProjectApi.getProjects(classId);
		setProjects(result);
		setLoading(false);
	};

	const handleCreateProject = async (values) => {
		setProjectCreating(true);
		const { classId } = data;
		const success = await ProjectApi.createProject({ ...values, classId });
		if (success) {
			message.success("Tạo dự án thành công");
			getProjectsInClass(classId);
		} else {
			message.error("Tạo dự án thất bại");
		}
		setProjectCreating(false);
	};

	useEffect(() => {
		const { classId } = data;
		if (!classId) return;
		getProjectsInClass(classId);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	const handleCloseCreateTeamRequestModal = () => {
		setShowCreateTeamModal(false);
		setTeamCreating(false);
	};

	const getStudents = async (classId) => {
		setLoading(true);
		const result = await ClassApi.getClassStudents(classId);
		setStudents(result);
		setLoading(false);
	};

	useEffect(() => {
		const { classId } = data;
		if (!classId) return;

		getStudents(classId);
	}, [data]);

	const handleCreateTeam = async (request) => {
		setTeamCreating(true);

		const { projectId, listStudent } = request;
		const data = {
			projectId: projectId,
			users: listStudent.filter((item) => item !== user?.userId),
		};

		const response = await TeamApi.registerProjectTeam(data);
		if (response.success) {
			message.success("Đã đăng ký nhóm");
		} else {
			message.error("Đăng ký nhóm thất bại");
		}
		setTeamCreating(false);
		setShowCreateTeamModal(false);
	};

	const handleDeleteProject = () => {
		const projectId = projectIdRef.current;
		if (!projectId) return;
		setProjectDeleting(true);
		ProjectApi.deleteProject(projectId).then((success) => {
			if (success) {
				message.success("Đã xóa dự án");
				const { classId } = data;
				if (!classId) return;
				getProjectsInClass(classId);
			} else {
				message.error("Xóa dự án thất bại");
			}
		});
		setProjectDeleting(false);
		setShowDeleteProjectModal(false);
	};

	const teacherActionItems = (record) => [
		{
			label: "Cập nhật",
			icon: <Edit />,
			onClick: () => {
				onViewDescription(record);
			},
		},
		{
			label: "Xóa",
			danger: true,
			icon: <Delete />,
			onClick: () => {
				projectIdRef.current = record.projectId;
				setShowDeleteProjectModal(true);
			},
		},
	];

	const columns = [
		{
			title: "Tên dự án",
			dataIndex: "projectName",
		},
		{
			title: "Thao tác",
			render: (_, record) => {
				return (
					<Row gutter={8}>
						<Col>
							{canRegisterTeamRequest && (
								<Button
									type="primary"
									onClick={() => {
										projectRef.current = record;
										setShowCreateTeamModal(true);
									}}
								>
									Đăng ký nhóm
								</Button>
							)}
						</Col>
						<Col>
							{role === roles.TEACHER && (
								<Dropdown menu={{ items: teacherActionItems(record) }}>
									<Button icon={<More />} className="flex-center" />
								</Dropdown>
							)}
						</Col>
					</Row>
				);
			},
		},
	];

	return (
		<ClassDetailArea
			title="Danh sách dự án"
			defaultOpen
			action={
				canCreateProject && (
					<Row>
						<Button
							type="primary"
							icon={<Plus />}
							className="flex-center"
							onClick={(e) => {
								e.stopPropagation();
								setShowCreateProjectModal(true);
							}}
						>
							Thêm dự án
						</Button>
					</Row>
				)
			}
		>
			<BaseTable
				loading={loading}
				dataSource={projects}
				columns={columns}
				searchOptions={{
					visible: false,
				}}
				pagination={false}
			/>
			<ProjectDetailModal
				title="Thêm dự án"
				open={showCreateProjectModal}
				onCancel={() => setShowCreateProjectModal(false)}
				onSubmit={handleCreateProject}
				submitting={projectCreating}
			/>
			<TeamRegistrationModal
				open={showCreateTeamModal}
				title="Đăng ký nhóm làm dự án"
				onCancel={handleCloseCreateTeamRequestModal}
				confirmLoading={teamCreating}
				students={students}
				onSubmit={handleCreateTeam}
				project={projectRef.current}
				classId={data.classId}
			/>
			<ConfirmDeleteModal
				title="Bạn muốn xóa dự án này?"
				open={showDeleteProjectModal}
				onCancel={() => setShowDeleteProjectModal(false)}
				onOk={handleDeleteProject}
				loading={projectDeleting}
			/>
		</ClassDetailArea>
	);
};
