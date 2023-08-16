import { Plus } from "@icon-park/react";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { ProjectModal } from "../components/ProjectModal";
import AccountList from "../../account/list/components/AccountList";

const ProjectListPage = () => {
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
	const [showUpdateProjectModal, setShowUpdateProjectModal] = useState(false);

	const handleShowCreateProjectModal = () => {
		setShowCreateProjectModal(true);
	};
	const handleCloseCreateProjectModal = () => {
		setShowCreateProjectModal(false);
	};

	const handleShowUpdateProjectModal = () => {
		setShowUpdateProjectModal(true);
	};
	const handleCloseUpdateProjectModal = () => {
		setShowUpdateProjectModal(false);
	};

	return (
		<div>
			<Row justify="space-between mb-2">
				<Input.Search placeholder="Tìm dự án..." className="w-1/2" />
				<Button
					onClick={handleShowCreateProjectModal}
					type="primary"
					className="flex-center"
					icon={<Plus />}
				>
					Thêm dự án
				</Button>
			</Row>
			<AccountList onEditAccount={handleShowUpdateProjectModal} />
			<ProjectModal
				title="Thêm dự án"
				open={showCreateProjectModal}
				onCancel={handleCloseCreateProjectModal}
			/>
			<ProjectModal
				title="Cập nhật dự án"
				open={showUpdateProjectModal}
				onCancel={handleCloseUpdateProjectModal}
			/>
		</div>
	);
};

export default ProjectListPage;
