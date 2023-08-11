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

	const handleLogin = () => {
		setLoading(true);
		// Call api to handle authentication
		AuthApi.login("tester123@gmail.com", "dXz1145").then((response) => {
			if (response === true) {
				// Login success
				setLoading(false);
				navigate(routes.root);
			} else {
				// Login fail - show error
				setLoading(false);
			}
		});
	};

	return (
		<Container>
			<LoginFormWrapper>
				<Card bordered={false} title="SWP Projects On-going Report System">
					<Title level={4} className="text-center">
						Đăng nhập
					</Title>
					<Form layout="vertical">
						<Form.Item
							name="email"
							label="Email"
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
							loading={loading}
							onClick={handleLogin}
							className="w-full mb-2"
							type="primary"
							size="large"
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