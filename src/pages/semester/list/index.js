import React, { useEffect, useState } from "react";
import { SemesterList } from "./components/SemesterList";
import SemesterApi from "../../../apis/semester";

const SemesterListPage = () => {
	const [semesters, setSemesters] = useState([]);
	const [loading, setLoading] = useState(false);

	const getSemesters = async () => {
		setLoading(true);
		const data = await SemesterApi.getSemesters();
		setSemesters(data);
		setLoading(false);
	};

	useEffect(() => {
		getSemesters();
	}, []);

	return <SemesterList loading={loading} semesters={semesters} />;
};

export default SemesterListPage;
