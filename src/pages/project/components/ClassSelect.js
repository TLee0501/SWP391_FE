import { Select } from "antd";
import React, { useEffect, useState } from "react";
import ClassApi from "../../../apis/class";

export const ClassSelect = ({ onChange, allowClear, className }) => {
	const [classes, setClasses] = useState([]);
	const [loading, setLoading] = useState(false);

	const getClasses = async () => {
		setLoading(true);
		const data = await ClassApi.getAllClasses();
		setClasses(data);
		setLoading(false);
	};

	useEffect(() => {
		getClasses();
	}, []);

	const classOptions = classes.map((e) => {
		return {
			value: e.classId,
			label: e.className,
		};
	});

	return (
		<Select
			className={className}
			showSearch
			options={classOptions}
			placeholder="Chọn lớp học"
			loading={loading}
			onChange={onChange}
			allowClear={allowClear}
		/>
	);
};
