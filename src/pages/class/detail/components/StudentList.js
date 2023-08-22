import { Table, Tag, Tooltip } from "antd";
import React, { useContext, useEffect, useState } from "react";
import ClassApi from "../../../../apis/class";
import { ClassContext } from "../../../../providers/class";

export const StudentList = () => {
  const data = useContext(ClassContext);
  const [studentLoading, setStudentLoading] = useState(false);
  const [student, setStudent] = useState([]);


  // const getUsers = async (classId) => {
  //   setStudentLoading(true);
  //   const data = await ClassApi.getUserInClass(classId);
  //   setStudent(data);
  //   setStudentLoading(false);
  // };

  // useEffect(() => {
  //   const { classId } = data;
  //   if (!classId) return;
  //   getUsers(classId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);

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
      loading={studentLoading}
      pagination={false}
      bordered
      dataSource={student}
      columns={columns}
    />
  );
};
