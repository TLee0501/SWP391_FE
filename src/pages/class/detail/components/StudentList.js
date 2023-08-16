import { Table, Tag, Tooltip } from "antd";
import React from "react";

export const StudentList = ({ students }) => {
  const columns = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Trạng thái nhóm",
      dataIndex: "team",
      key: "team",
      render: (_, { team }) => {
        return (
          <Tooltip
            title={
              team ? team.members.map((e) => e.name).join(", ") : undefined
            }
          >
            <Tag
              STYLE={"font-size:14px"}
              color={team ? "blue-inverse" : "default"}
            >
              {team ? team.name : "Chưa có"}
            </Tag>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <Table
      pagination={false}
      bordered
      dataSource={students}
      columns={columns}
    />
  );
};
