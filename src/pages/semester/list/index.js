import React, { useContext, useEffect, useState } from "react";
import SemesterApi from "../../../apis/semester";
import { SemesterList } from "./components/SemesterList";
import { SemesterTypeContext } from "../../../providers/semesterType";

const SemesterListPage = () => {
	const data = useContext(SemesterTypeContext);

	const [semesters, setSemesters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [semestersType, setSemestersType] = useState([]);

	const getSemesterType = async (Id) => {
		setLoading(true);
		const result = await SemesterApi.getSemesterByTypeId(Id);
		setSemestersType(result);
		setLoading(false);
	};

	const getSemesters = async () => {
		setLoading(true);
		const data = await SemesterApi.getSemesters();
		const { semestersTypeId } = data;
		if (data) {
			getSemesterType(semestersTypeId);
		} else {
			return false;
		}
		setSemesters(data);
		setLoading(false);
	};

	useEffect(() => {
		const { semestersTypeId } = data;
		getSemesterType(semestersTypeId);
		getSemesters();
	}, [data]);

	return <SemesterList loading={loading} semesters={semesters}/>;
};

export default SemesterListPage;
