import { Down, Up } from "@icon-park/react";
import { Divider } from "antd";
import React, { useEffect, useState } from "react";
import { styled } from "styled-components";

const Container = styled.div`
	cursor: pointer;
	transition: 0.3s;
	border-radius: 4px;
	display: flex;
	align-items: center;
	&:hover {
		background-color: #efefef;
	}
`;

export const ClassDetailArea = ({ title, defaultOpen, children }) => {
	const [show, setShow] = useState(false);

	useEffect(() => {
		if (defaultOpen) {
			setShow(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div>
			<Divider orientation="center" style={{ fontSize: 20, padding: 0 }}>
				<Container onClick={() => setShow(!show)}>
					{title}{" "}
					{!show ? (
						<Down className="ml-2" size={18} />
					) : (
						<Up className="ml-2" size={18} />
					)}
				</Container>
			</Divider>
			{show && children}
		</div>
	);
};
