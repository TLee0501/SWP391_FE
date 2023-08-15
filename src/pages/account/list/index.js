import { Plus } from "@icon-park/react";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { AccountModal } from "../components/AccountModal";
import AccountList from "./components/AccountList";

export const AccountListPage = () => {
	const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);
	const [showUpdateAccountModal, setShowUpdateAccountModal] = useState(false);

	const handleShowCreateAccountModal = () => {
		setShowCreateAccountModal(true);
	};
	const handleCloseCreateAccountModal = () => {
		setShowCreateAccountModal(false);
	};

	const handleShowUpdateAccountModal = () => {
		setShowUpdateAccountModal(true);
	};
	const handleCloseUpdateAccountModal = () => {
		setShowUpdateAccountModal(false);
	};

	return (
		<div>
			<Row justify="space-between mb-2">
				<Input.Search placeholder="Tìm tài khoản..." className="w-1/2" />
				<Button
					onClick={handleShowCreateAccountModal}
					type="primary"
					className="flex-center"
					icon={<Plus />}
				>
					Thêm tài khoản
				</Button>
			</Row>
			<AccountList onEditAccount={handleShowUpdateAccountModal} />
			<AccountModal
				title="Thêm tài khoản"
				open={showCreateAccountModal}
				onCancel={handleCloseCreateAccountModal}
			/>
			<AccountModal
				title="Cập nhật tài khoản"
				open={showUpdateAccountModal}
				onCancel={handleCloseUpdateAccountModal}
			/>
		</div>
	);
};
