import React from "react";
import { Button, Input, Row, Typography } from "antd";
import { Plus } from "@icon-park/react";
import { ClassList } from "./components/ClassList";
import { mockClasses } from "../../../__mocks__/class";

const { Title } = Typography;

const ClassListPage = () => {
  return (
    <div>
      <Row justify="space-between" className="mb-4">
        <Input.Search className="w-1/2" placeholder="Tìm lớp học..." />
        <Button className="flex-center" type="primary" icon={<Plus />}>
          Thêm lớp học
        </Button>
      </Row>
      <Title level={4}>Sắp diễn ra</Title>
      <ClassList classes={mockClasses} />
      <Title level={4}>Đang diễn ra</Title>
      <ClassList classes={mockClasses} />
      <Title level={4}>Đã kết thúc</Title>
      <ClassList classes={mockClasses} />
    </div>
  );
};

export default ClassListPage;
