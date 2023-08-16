import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";

export const CreateProjectModal = ({ open, onCancel }) => {
  return (
    <BaseModal title="Thêm dự án" open={open} onCancel={onCancel}>
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Tên dự án"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên dự án",
            },
          ]}
        >
          <Input placeholder="Nhập tên dự án..." />
        </Form.Item>
        <Form.Item name="description" label="Mô tả">
          <TextArea placeholder="Nhập mô tả dự án..." />
        </Form.Item>
      </Form>
    </BaseModal>
  );
};
