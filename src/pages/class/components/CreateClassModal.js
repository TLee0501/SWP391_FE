import React from "react";
import BaseModal from "../../../components/BaseModal";
import { Form, Input, DatePicker } from "antd";
import moment, { now } from "moment";

const { RangePicker } = DatePicker;

export const CreateClassModal = ({ open, onCancel }) => {
  return (
    <BaseModal title="Tạo lớp học" open={open} onCancel={onCancel}>
      <Form layout="vertical">
        <Form.Item
          name="name"
          label="Tên lớp học"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập tên lớp",
            },
          ]}
        >
          <Input placeholder="Nhập tên lớp học..." />
        </Form.Item>
        <Form.Item
          name="dates"
          label="Thời gian"
          rules={[
            {
              required: true,
              message: "Vui lòng chọn ngày bắt đầu & kết thúc của lớp học",
            },
          ]}
        >
          <RangePicker
            placeholder={["Ngày bắt đầu", "Ngày kết thúc"]}
            disabledDate={(date) => date.isBefore(moment().subtract(1, "days"))}
          />
        </Form.Item>
      </Form>
    </BaseModal>
  );
};
