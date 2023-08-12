import React, { useState } from "react";
import { Button, Divider, Input, Row, Typography } from "antd";
import { Plus } from "@icon-park/react";
import { ClassList } from "./components/ClassList";
import { mockClasses } from "../../../__mocks__/class";
import { CreateClassModal } from "../components/CreateClassModal";

const { Title } = Typography;

const ClassListPage = () => {
  const [showCreateClassModal, setShowCreateClassModal] = useState(false);

  const handleShowCreateClassModal = () => {
    setShowCreateClassModal(true);
  };
  const handleCloseCreateClassModal = () => {
    setShowCreateClassModal(false);
  };

  return (
    <div>
      <Row justify="space-between" className="mb-4">
        <Input.Search className="w-1/2" placeholder="Tìm lớp học..." />
        <Button
          className="flex-center"
          type="primary"
          icon={<Plus />}
          onClick={handleShowCreateClassModal}
        >
          Thêm lớp học
        </Button>
      </Row>
      <Title level={4}>Sắp diễn ra</Title>
      <ClassList classes={mockClasses} />
      <Divider />
      <Title level={4}>Đang diễn ra</Title>
      <ClassList classes={mockClasses} />
      <Divider />
      <Title level={4}>Đã kết thúc</Title>
      <ClassList classes={mockClasses} />
      <CreateClassModal
        open={showCreateClassModal}
        onCancel={handleCloseCreateClassModal}
      />
    </div>
  );
};

export default ClassListPage;
