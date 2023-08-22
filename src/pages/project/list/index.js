import { Plus } from "@icon-park/react";
import { Button, Col, Input, Row, Spin, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProjectApi from "../../../apis/project";
import { ClassSelect } from "../components/ClassSelect";
import { ProjectDetailModal } from "../components/ProjectDetailModal";
import { ProjectList } from "./components/ProjectList";
import { useRole } from "../../../hooks/role";
import { roles } from "../../../constants/app";

const ProjectListPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const role = useRole();
  const projectRef = useRef();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);
  const [projectCreating, setProjectCreating] = useState(false);

  const [showProjectDescModal, setShowProjectDescModal] = useState(false);

  const handleChangeClass = (classId) => {
    setSearchParams({
      class: classId,
    });
  };

  const onClassesLoaded = (data) => {
    if (data && data.length > 0) {
      searchParams.set("class", data[0].classId);
      setSearchParams(searchParams);
    }
  };

  const getProjects = async () => {
    const classId = searchParams.get("class");
    if (!classId) return;

    const search = searchParams.get("search");

    setProjectLoading(true);
    const data = await ProjectApi.getProjects(
      classId,
      search,
      // hasUserId
      role === roles.STUDENT
    );
    setProjects(data);
    setProjectLoading(false);
  };

  const handleCreateProject = async (data) => {
    setProjectCreating(true);
    const success = await ProjectApi.createProject(data);
    if (success) {
      message.success("Tạo dự án thành công");
      getProjects();
    } else {
      message.error("Tạo dự án thất bại");
    }
    setProjectCreating(false);
  };

  const handleSearchProjects = (keyword) => {
    if (keyword) {
      searchParams.set("search", keyword);
    } else {
      searchParams.delete("search");
    }
    setSearchParams(searchParams);
  };

  useEffect(() => {
    getProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div>
      <Row justify="space-between">
        <Col span={18}>
          <Row align="middle">
            <Input.Search
              placeholder="Tìm dự án..."
              className="w-1/2 mr-2"
              onSearch={handleSearchProjects}
            />
            <span className="mr-2">Lớp:</span>
            <ClassSelect
              value={searchParams.get("class")}
              onChange={handleChangeClass}
              onLoaded={onClassesLoaded}
            />
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
      <Spin spinning={projectLoading}>
        <ProjectList projects={projects} />
      </Spin>
      <ProjectDetailModal
        title="Thêm dự án"
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        onSubmit={handleCreateProject}
        submitting={projectCreating}
      />
    </div>
  );
};

export default ProjectListPage;
