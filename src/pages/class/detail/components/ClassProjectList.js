import React, { useContext, useEffect, useState } from "react";
import { ClassDetailArea } from "../../components/ClassDetailArea";
import { ClassContext } from "../../../../providers/class";
import { Button, Card, Empty, List, Row, Spin, Typography } from "antd";
import ProjectApi from "../../../../apis/project";
import { CreateTeamRequest } from "./CreateTeamRequest";

const { Text } = Typography;

export const ClassProjectList = ({ onViewDescription }) => {
  const data = useContext(ClassContext);

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCreateTeamRequestModal, setShowCreateTeamRequestModal] =
    useState(false);
  const [teamRequestCreating, setTeamRequestCreating] = useState(false);

  const getProjectsInClass = async (classId) => {
    setLoading(true);
    const result = await ProjectApi.getProjects(classId);
    setProjects(result);
    setLoading(false);
  };

  useEffect(() => {
    const { classId } = data;
    if (!classId) return;
    getProjectsInClass(classId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const handleCloseCreateTeamRequestModal = () => {
    setShowCreateTeamRequestModal(false);
    setTeamRequestCreating(false);
  };

  const renderItem = (item) => {
    return (
      <List.Item>
        <Card className="w-full">
          <Row justify="space-between" align="middle">
            <Text>{item.projectName}</Text>
            <Row align="middle">
              <Button
                type="text"
                style={{ color: "#1677FF" }}
                onClick={() => onViewDescription(item)}
              >
                Xem mô tả
              </Button>
              <Button
                type="primary"
                className="mr-2"
                onClick={() => setShowCreateTeamRequestModal(true)}
              >
                Đăng ký
              </Button>
            </Row>
          </Row>
        </Card>
      </List.Item>
    );
  };

  return (
    <div>
      <ClassDetailArea title="Danh sách dự án" defaultOpen>
        <Spin spinning={loading}>
          <List
            dataSource={projects}
            renderItem={renderItem}
            locale={{
              emptyText: (
                <Empty description={<Text disabled>Chưa có dự án nào</Text>} />
              ),
            }}
          />
        </Spin>
      </ClassDetailArea>
      <CreateTeamRequest
        open={showCreateTeamRequestModal}
        title="Đăng ký nhóm và dự án"
        onCancel={handleCloseCreateTeamRequestModal}
        // onSubmit={handleAddCourse}
        confirmLoading={teamRequestCreating}
      />
    </div>
  );
};
