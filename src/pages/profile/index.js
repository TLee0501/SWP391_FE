import React, { useContext } from "react";
import { Form, Input, Typography } from "antd";
import { UserContext } from "../../providers/user";

const { Title } = Typography;

const ProfilePage = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  return (
    <div>
      <Title level={3}>Hồ sơ của bạn</Title>
      <Form
        layout="vertical"
        className="w-1/2"
        initialValues={{
          email: user.email,
          fullName: user.fullName,
        }}
      >
		<Form.Item name="fullName" label="Họ tên">
          <Input placeholder="Họ và tên của bạn..." disabled readOnly />
        </Form.Item>
        <Form.Item name="email" label="Email">
          <Input placeholder="Email..." disabled readOnly />
        </Form.Item>
        
      </Form>
    </div>
  );
};

export default ProfilePage;
