import { Button, Card, Form, Input, Row, Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import routes from "../../constants/routes";

const { Text, Title } = Typography;

const Container = styled.div`
	position: fixed;
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(to bottom right, #08203e, #557c93);
`;

const FormWrapper = styled.div`
	width: 40%;
	max-height: 600px;

	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	overflow-y: scroll;
	&::-webkit-scrollbar {
		width: 0;
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

export const RegisterAccountPage = () => {
	const navigate = useNavigate();

	const handleNavigateLoginPage = () => {
		navigate(routes.login);
	};

	return (
		<Container>
			<FormWrapper>
				<Card bordered={false} title="SWP Projects On-going Report System">
					<Title level={4} className="text-center">
						Tạo tài khoản
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
						<Form.Item
							name="confirmPassword"
							label="Xác nhận mật khẩu"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập lại mật khẩu",
								},
							]}
						>
							<Input.Password placeholder="Xác nhận mật khẩu..." size="large" />
						</Form.Item>
						<Form.Item
							name="fullName"
							label="Họ tên"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập họ và tên",
								},
							]}
						>
							<Input placeholder="Tên của bạn là gì ?" size="large" />
						</Form.Item>
						<Form.Item
							name="phoneNumber"
							label="Số điện thoại"
							rules={[
								{
									required: true,
									message: "Vui lòng nhập số điện thoại",
								},
							]}
						>
							<Input placeholder="Số điện thoại của bạn..." size="large" />
						</Form.Item>
						<Button className="w-full my-2" type="primary" size="large">
							Đăng ký
						</Button>
						<Row justify="end">
							<Row align="middle">
								<Text className="mr-1">Đã có tài khoản?</Text>
								<Button
									className="p-0 font-bold"
									type="link"
									onClick={handleNavigateLoginPage}
								>
									Đăng nhập ngay
								</Button>
							</Row>
						</Row>
					</Form>
				</Card>
			</FormWrapper>
		</Container>
	);
};
