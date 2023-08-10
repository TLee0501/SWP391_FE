import { Button, Card, Form, Input, Row, Typography } from "antd";
import React from "react";
import styled from "styled-components";

const { Text } = Typography;

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
	return (
		<Container>
			<LoginFormWrapper>
				<Card title="SWP Projects On-going Report System">
					<Form layout="vertical">
						<Form.Item name="email" label="Email">
							<Input placeholder="Email của bạn..." size="large" />
						</Form.Item>
						<Form.Item className="mb-2" name="password" label="Mật khẩu">
							<Input.Password placeholder="Mật khẩu..." size="large" />
						</Form.Item>
						<Row justify="end" className="mb-2">
							<Button type="link">Quên mật khẩu?</Button>
						</Row>
						<Button className="w-full mb-2" type="primary" size="large">
							Đăng nhập
						</Button>
						<Row justify="end">
							<Row align="middle">
								<Text className="mr-1">Chưa có tài khoản?</Text>
								<Button className="p-0 font-bold" type="link">
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
