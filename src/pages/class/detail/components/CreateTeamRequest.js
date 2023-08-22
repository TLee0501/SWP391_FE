import { Button, Form, Input, Row, Select } from "antd";
import React, { useRef } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import BaseModal from "../../../../components/BaseModal";
import { roles } from "../../../../constants/app";

const roleOptions = [
  {
    value: roles.STUDENT,
    label: "Sinh viên",
  },
  {
    value: roles.TEACHER,
    label: "Phạm Phú Minh Hưng",
  },
];

export const CreateTeamRequest = ({
  title,
  open,
  onCancel,
  onSubmit,
  confirmLoading,
}) => {
  const formRef = useRef();

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <BaseModal
      title={title}
      open={open}
      onCancel={onCancel}
      onOk={() => formRef.current.submit()}
      confirmLoading={confirmLoading}
    >
      <Form
        ref={formRef}
        layout="vertical"
        // initialValues={{
        //   code: teamName?.teamName,
        //   name: teamName?.listStudent,
        // }}
        onFinish={onFinish}
      >
        <Form.Item
          name="projectName"
          label="Chọn dự án"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn dự án",
            },
          ]}
        >
          <Select defaultValue={"- Chọn"} options={roleOptions} />
        </Form.Item>
        <Form.Item
          name="code"
          label="Tên nhóm"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên nhóm",
            },
          ]}
        >
          <Input placeholder="Tên nhóm..." />
        </Form.Item>
        <Form.List
          name="email"
          rules={[
            {
              validator: async (_, email) => {
                if (!email || email.length > 6) {
                  return Promise.reject(new Error("Tối đa 5 email"));
                }
              },
            },
          ]}
        >
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ field }) => (
                <Row align="middle" justify={"space-around"}>
                  <Form.Item
                    {...field}
                    label="Email"
                    style={{
                      width: "90%",
                      maxWidth: "100%"
                    }}
                  >
                    <Select defaultValue={"- Chọn"} options={roleOptions} />
                  </Form.Item>

                  <MinusCircleOutlined
                    style={{ color: "red", fontSize: "20px" }}
                    onClick={() => remove(field.name)}
                  />
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm sinh viên
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </BaseModal>
  );
};
