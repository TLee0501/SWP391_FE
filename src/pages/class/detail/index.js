import { Card, Descriptions, List, Row, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { mockStudents } from "../../../__mocks__/account";
import { mockClasses } from "../../../__mocks__/class";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import { formatDate } from "../../../utils";
import { StudentList } from "./components/StudentList";
import { Collapse, Divider, Typography } from "antd";

const datas = [
  "Nguyễn Văn A",
  "Nguyễn Văn B",
  "Nguyễn Văn C",
  "Nguyễn Văn D",
  "Nguyễn Văn E",
];

const ClassDetailPage = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const items = [
    {
      key: "CLASS_NAME",
      label: "Tên lớp",
      children: <strong>{data.name?.toUpperCase()}</strong>,
    },
    {
      key: "START_DATE",
      label: "Ngày bắt đầu",
      children: formatDate(data.startDate, "DD/MM/yyyy"),
    },
    {
      key: "END_DATE",
      label: "Ngày kết thúc",
      children: formatDate(data.endDate, "DD/MM/yyyy"),
    },
    {
      key: "COURSE",
      label: "Môn học",
      children: (
        <strong>{`${data?.course?.code} - ${data?.course?.name}`}</strong>
      ),
    },
  ];

  useEffect(() => {
    const currentClass = mockClasses.find((e) => e.id === id);
    console.log("currentClass", currentClass);
    if (data) {
      setData(currentClass);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <BasePageContent title={`Lớp ${data.name}`}>
      <Card className="mt-3 mb-4" title="Thông tin cơ bản">
        <Descriptions layout="vertical" items={items} />
      </Card>
      <Divider orientation="center" STYLE="font-size:20px;">
        Danh sách nhóm làm dự án
      </Divider>

      <Collapse
        items={[
          {
            key: "1",
            label: "Nhóm 1 - Đề tài A",
            children: (
              <List
                dataSource={datas}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            ),
          },
          {
            key: "2",
            label: "Nhóm 1 - Đề tài A",
            children: (
              <List
                dataSource={datas}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark></Typography.Text> {item}
                  </List.Item>
                )}
              />
            ),
          },
          {
            key: "3",
            label: "Nhóm 1 - Đề tài A",
            children: (
              <List
                dataSource={datas}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>
                      <p></p>
                    </Typography.Text>{" "}
                    {item}
                  </List.Item>
                )}
              />
            ),
          },
        ]}
      ></Collapse>

      <Card className="mb-4"></Card>
      <Divider orientation="center" STYLE="font-size:20px;">
        Danh sách sinh viên
      </Divider>
      <Card>
        <StudentList students={mockStudents} />
      </Card>
    </BasePageContent>
  );
};

export default ClassDetailPage;
