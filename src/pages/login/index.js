import { Button, Card, Form, Input, Row, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../constants/routes";
import AuthApi from "../../apis/auth";

const { Text, Title } = Typography;

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background-image: linear-gradient(to bottom right, #08203e, #557c93);
`;

const LoginFormWrapper = styled.div`
  width: 40%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleNavigateRegisterPage = () => {
    navigate(routes.register);
  };

  const handleLogin = (email, password) => {
    AuthApi.login(email, password).then((response) => {
      if (response === true) {
        // Login success
        setLoading(false);
        navigate(routes.dashboard.root);
      } else {
        // Login fail - show error
        setLoading(false);
      }
    });
  };

  return (
    <Container>
      <Title
        level={6}
        className="text-center"
        style={{
          marginTop: "50px",
          color: "#ffffff",
          fontFamily: "Segoe UI Emoji",
        }}
      >
        SWP projects ongoing report
      </Title>
      <LoginFormWrapper>
        <Card bordered={false}>
          <Title level={6} className="text-center">
            Đăng nhập
          </Title>
          <Form
            layout="vertical"
            onFinish={async (values) => {
              console.log("data: ", values);
              const { email, password } = values;
              const response = await handleLogin(email, password);
            }}
          >
            <Form.Item
              name="email"
              label="Email"
              labelAlign="right"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập địa chỉ email",
                },
              ]}
            >
              <Input placeholder="Email của bạn..." size="large" />
            </Form.Item>
            
            <Form.Item
              className="mb-2"
              name="password"
              label="Mật khẩu"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu",
                },
              ]}
            >
              <Input.Password placeholder="Mật khẩu..." size="large" />
            </Form.Item>
            <Row justify="end" className="mb-2">
              <Button type="link">Quên mật khẩu?</Button>
            </Row>
            <Button
              className="w-full mb-2"
              type="primary"
              size="large"
              htmlType="submit"
            >
              Đăng nhập
            </Button>
            <Row justify="end">
              <Row align="middle">
                <Text className="mr-1">Chưa có tài khoản?</Text>
                <Button
                  className="p-0 font-bold"
                  type="link"
                  onClick={handleNavigateRegisterPage}
                >
                  Đăng ký ngay
                </Button>
              </Row>
            </Row>
          </Form>
        </Card>
      </LoginFormWrapper>
    </Container>
  );
};
