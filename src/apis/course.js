import BaseApi from ".";

const resoure = "Courses";

const getCourseById = async (id) => {
	const response = await BaseApi.post(`/${resoure}/GetCourseByID/${id}`);
	return response;
};

const createCourse = async (course) => {
	const response = await BaseApi.post(`/${resoure}/CreateCourse`, course);
	return response;
};

const deleteCourse = async (id) => {
	const response = await BaseApi.delete(`/${resoure}/DeleteCourse/${id}`);
	return response;
};

const searchCourse = async (keyword) => {
	const response = await BaseApi.post(
		`/${resoure}/SearchCourse?searchText=${keyword}`
	);
	return response;
};

const CourseApi = {
	getCourseById,
	createCourse,
	deleteCourse,
	searchCourse,
};

export default CourseApi;
