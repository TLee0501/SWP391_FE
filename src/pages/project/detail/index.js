import { Button, Card, Row, Spin, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectApi from "../../../apis/project";
import { RawHtml } from "../../../components/RawHtml";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { ProjectDetailModal } from "../components/ProjectDetailModal";
import { DeleteProjectModal } from "./components/DeleteProjectModal";

const ProjectDetailPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	const [loading, setLoading] = useState(false);
	const [project, setProject] = useState({});
	const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);
	const [projectUpdating, setProjectUpdating] = useState(false);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const getProject = async () => {
		setLoading(true);
		const data = await ProjectApi.getProjectById(id);
		if (data) {
			setProject(data);
		}
		setLoading(false);
	};

	const handleUpdateProject = async (values) => {
		const { projectName, description } = values;
		const data = {
			projectId: project?.projectId,
			projectName: projectName,
			description: description,
		};
		setProjectUpdating(true);
		const success = await ProjectApi.updateProject(data);
		if (success) {
			message.success("Cập nhật dự án thành công");
			await getProject();
		} else {
			message.success("Cập nhật dự án thất bại");
		}
		setProjectUpdating(false);
		setShowUpdateProjectModal(false);
	};

	useEffect(() => {
		if (!id) return;

		getProject();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	return (
		<>
			<Spin spinning={loading}>
				<BasePageContent title={<span>{project?.projectName}</span>}>
					<Card title="Mô tả dự án" className="mt-4">
						<RawHtml html={project?.description} />
					</Card>
					<Row className="mt-4">
						<Button
							type="primary"
							className="mr-2"
							onClick={() => setShowUpdateProjectModal(true)}
						>
							Cập nhật
						</Button>
						<Button danger onClick={() => setShowDeleteModal(true)}>
							Xóa
						</Button>
					</Row>
				</BasePageContent>
			</Spin>
			<ProjectDetailModal
				project={project}
				open={showUpdateProjectModal}
				onCancel={() => setShowUpdateProjectModal(false)}
				onSubmit={handleUpdateProject}
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
		</>
	);
};

export default ProjectDetailPage;
