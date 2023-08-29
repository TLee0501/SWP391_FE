import React, { useEffect, useRef, useState } from "react";
import { SemesterBasicInfo } from "./components/SemesterBasicInfo";
import { BasePageContent } from "../../../layouts/containers/BasePageContent";
import SemesterApi from "../../../apis/semester";
import { useParams } from "react-router-dom";

const SemesterDetailPage = ({ }) => {
	const [data, setData] = useState({});
	const [loading, setLoading] = useState({});
	const { id } = useParams();

	const getSemesterById = async (handleLoading) => {
		if (handleLoading) {
			setLoading(true);
		}
		const response = await SemesterApi.getSemesterById(id);
		if (response) {
			setData(response);
		}
		if (handleLoading) {
			setLoading(false);
		}
	};

	return (
		<BasePageContent title={
			<span>{`Lớp ${data.className ?? ""}`} </span>
		}
		>
			<SemesterBasicInfo></SemesterBasicInfo>
		</BasePageContent>

	)
};

export default SemesterDetailPage;
