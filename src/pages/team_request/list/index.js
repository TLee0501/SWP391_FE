import { Plus } from "@icon-park/react";
import { Button, Input, Row } from "antd";
import React, { useState } from "react";
import { AccountModal } from "../components/AccountModal";
import AccountList from "./components/AccountList";
import { usePermissions } from "../../../hooks/permission";
import { ALL_PERMISSIONS } from "../../../constants/app";

export const TeamRequestPage = () => {
	const permissions = usePermissions();
	const canCreate = permissions?.includes(ALL_PERMISSIONS.account.create);
	const canView = permissions?.includes(ALL_PERMISSIONS.account.view);

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
				{canView && (
					<Input.Search placeholder="Tìm tài khoản..." className="w-1/2" />
				)}
				{canCreate && (
					<Button
						onClick={handleShowCreateAccountModal}
						type="primary"
						className="flex-center"
						icon={<Plus />}
					>
						Thêm tài khoản
					</Button>
				)}
			</Row>
			{canView && <AccountList onEditAccount={handleShowUpdateAccountModal} />}
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
