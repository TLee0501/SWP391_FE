import { Add, Delete, Edit, Info, More } from "@icon-park/react";
import {
	Button,
	Card,
	Divider,
	Dropdown,
	Spin,
	Typography,
	message,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectApi from "../../../apis/project";
import { ProgressIndicator } from "../../../components/ProgressIndicator";
import { RawHtml } from "../../../components/RawHtml";
import { ALL_PERMISSIONS, TaskStatus, roles } from "../../../constants/app";
import { usePermissions } from "../../../hooks/permission";
import { useRole } from "../../../hooks/role";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ProjectDescriptionModal } from "../components/ProjectDescriptionModal";
import { ProjectDetailModal } from "../components/ProjectDetailModal";
import { DeleteProjectModal } from "./components/DeleteProjectModal";
import { TaskListSection } from "./components/TaskListSection";
import { TaskModal } from "./components/TaskModal";
import { DeleteTaskModal } from "./components/DeleteTaskModal";
import TaskApi from "../../../apis/task";

const { Text } = Typography;

const ProjectDetailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const role = useRole();
	const permissions = usePermissions();
	const canDelete = permissions?.includes(ALL_PERMISSIONS.project.delete);
	const canUpdate = permissions?.includes(ALL_PERMISSIONS.project.update);

	// Loading states
	const [loading, setLoading] = useState(false);
	const [taskLoading, setTaskLoading] = useState(false);
	const [taskCreating, setTaskCreating] = useState(false);

	// Data states
	const [project, setProject] = useState({});
	const [tasks, setTasks] = useState([]);
	const newTasks = tasks.filter((e) => e.status === TaskStatus.NEW);
	const inProgressTasks = tasks.filter(
		(e) => e.status === TaskStatus.INPROGRESS
	);
	const completedTasks = tasks.filter((e) => e.status === TaskStatus.COMPLETED);

	// Modal states
	const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
	const [projectUpdating, setProjectUpdating] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [showDescModal, setShowDescModal] = useState(false);
	const [showCreateTaskModal, setShowCreateTaskModal] = useState(false);
	const [showUpdateTaskModal, setShowUpdateTaskModal] = useState(false);
	const [showDeleteTaskModal, setShowDeleteTaskModal] = useState(false);

	const updatingTask = useRef();
	const deletingTask = useRef();

	const actionItems = [
		{
			key: "UPDATE_PROJECT",
			label: "Cập nhật",
			icon: <Edit />,
			onClick: () => setShowUpdateProjectModal(true),
		},
		{
			key: "DELETE_PROJECT",
			label: "Xóa",
			icon: <Delete />,
			danger: true,
			onClick: () => setShowDeleteModal(true),
		},
	];

	const getProject = async () => {
		setLoading(true);
		const data = await ProjectApi.getProjectById(id);
		if (data) {
			setProject(data);
		}
		setLoading(false);
	};
	const getProjectTasks = async () => {
		setTaskLoading(true);
		const data = await TaskApi.getAllTasks(id);
		if (data) {
			setTasks(data);
		}
		setTaskLoading(false);
	};

	useEffect(() => {
		if (!id) return;
		getProject();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	const handleTaskItemClick = (task) => {
		updatingTask.current = task;
		setShowUpdateTaskModal(true);
	};
	const handleTaskItemDelete = (task) => {
		deletingTask.current = task;
		setShowDeleteTaskModal(true);
	};

	const handleCreateTask = async (values) => {
		const { taskName, taskDescription } = values;
		setTaskCreating(true);
		const success = await TaskApi.createTask({
			projectId: id,
			taskName,
			taskDescription,
		});
		if (success) {
			message.success("Đã thêm công việc mới");
			getProjectTasks();
		} else {
			message.error("Thêm công việc thất bại");
		}
		setTaskCreating(false);
		setShowCreateTaskModal(false);
	};

	useEffect(() => {
		if (!id) return;

		getProject();
		getProjectTasks();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<Spin spinning={loading || taskLoading}>
				<BasePageContent
					title={
						<span>
							{project?.projectName}{" "}
							{role === roles.STUDENT && (
								<Button
									size={32}
									type="link"
									icon={<Info />}
									onClick={() => setShowDescModal(true)}
								/>
							)}
						</span>
					}
					action={
						(canDelete || canUpdate) && (
							<Dropdown menu={{ items: actionItems }}>
								<Button className="flex-center" icon={<More />} />
							</Dropdown>
						)
					}
				>
					{role !== roles.STUDENT && (
						<Card title="Mô tả dự án" className="mt-4">
							<RawHtml html={project?.description} />
						</Card>
					)}
					<div className="my-3">
						<Text>
							Công việc đã hoàn thành:{" "}
							<strong>
								{completedTasks.length}/{tasks.length}
							</strong>
						</Text>
						<ProgressIndicator
							completed={completedTasks.length}
							total={tasks.length}
						/>
					</div>
					<TaskListSection
						title="Công việc cần làm"
						tasks={newTasks}
						action={
							<Button
								type="primary"
								icon={<Add />}
								className="flex-center"
								onClick={() => setShowCreateTaskModal(true)}
							>
								Thêm công việc
							</Button>
						}
						onTaskItemClick={handleTaskItemClick}
						onTaskItemDelete={handleTaskItemDelete}
					/>
					<Divider />
					<TaskListSection
						title="Công việc đang làm"
						tasks={inProgressTasks}
						onTaskItemClick={handleTaskItemClick}
						onTaskItemDelete={handleTaskItemDelete}
					/>
					<Divider />
					<TaskListSection
						title="Công việc đã hoàn thành"
						tasks={completedTasks}
						onTaskItemClick={handleTaskItemClick}
						onTaskItemDelete={handleTaskItemDelete}
					/>
				</BasePageContent>
			</Spin>
			<ProjectDetailModal
				project={project}
				open={showUpdateProjectModal}
				onCancel={() => setShowUpdateProjectModal(false)}
				// onSubmit={handleUpdateProject}
				submitting={projectUpdating}
				title="Cập nhật dự án"
				edit
			/>
			<DeleteProjectModal
				open={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
				projectId={project?.projectId}
				onSuccess={() => navigate(-1)}
			/>
			<ProjectDescriptionModal
				open={showDescModal}
				project={project}
				onCancel={() => setShowDescModal(false)}
			/>
			<TaskModal
				open={showCreateTaskModal}
				onCancel={() => setShowCreateTaskModal(false)}
				title="Thêm công việc"
				onSubmit={handleCreateTask}
				confirmLoading={taskCreating}
			/>
			<TaskModal
				open={showUpdateTaskModal}
				onCancel={() => setShowUpdateTaskModal(false)}
				title="Cập nhật công việc"
				task={updatingTask.current}
			/>
			<DeleteTaskModal
				task={deletingTask}
				open={showDeleteTaskModal}
				onCancel={() => setShowDeleteTaskModal(false)}
			/>
		</>
	);
};

export default ProjectDetailPage;
