import { Plus } from "@icon-park/react";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { ProjectList } from "./components/ProjectList";
import { mockProjects } from "../../../apis/project";
import { CreateProjectModal } from "../components/CreateProjectModal";

const ProjectListPage = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div>
      <Row justify="space-between">
        <Input.Search placeholder="Tìm dự án..." className="w-1/2" />
        <Button
          className="flex-center"
          type="primary"
          icon={<Plus />}
          onClick={() => setShowCreateModal(true)}
        >
          Thêm dự án
        </Button>
      </Row>
      <ProjectList projects={mockProjects} />
      <CreateProjectModal
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
      />
    </div>
  );
};

export default ProjectListPage;
