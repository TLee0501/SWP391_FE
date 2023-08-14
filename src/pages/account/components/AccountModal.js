import React from "react";
import BaseModal from "../../../components/BaseModal";

export const AccountModal = ({ open, onCancel, account, title }) => {
	return <BaseModal title={title} open={open} onCancel={onCancel}></BaseModal>;
};
