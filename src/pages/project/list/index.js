import { Plus } from "@icon-park/react";
import { Button, Col, Input, Row } from "antd";
import React, { useEffect, useState } from "react";
import { ProjectList } from "./components/ProjectList";
import { mockProjects } from "../../../__mocks__/project";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { ClassSelect } from "../components/ClassSelect";
import { useSearchParams } from "react-router-dom";

const ProjectListPage = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const [showCreateModal, setShowCreateModal] = useState(false);
	const [projects, setProjects] = useState([]);

	const handleCreateProjectSuccess = () => {};

	const handleChangeClass = (classId) => {
		setSearchParams({
			class: classId,
		});
	};

	useEffect(() => {
		const classId = searchParams.get("class");
	}, [searchParams]);

	return (
		<div>
			<Row justify="space-between">
				<Col span={18}>
					<Row>
						<Input.Search placeholder="Tìm dự án..." className="w-1/2 mr-2" />
						<ClassSelect allowClear onChange={handleChangeClass} />
					</Row>
				</Col>
				<Col span={6}>
					<Row justify="end">
						<Button
							className="flex-center"
							type="primary"
							icon={<Plus />}
							onClick={() => setShowCreateModal(true)}
						>
							Thêm dự án
						</Button>
					</Row>
				</Col>
			</Row>
			<ProjectList projects={mockProjects} />
			<CreateProjectModal
				open={showCreateModal}
				onCancel={() => setShowCreateModal(false)}
				onSuccess={handleCreateProjectSuccess}
			/>
		</div>
	);
};

export default ProjectListPage;
