export const roles = {
	ADMIN: "Admin",
	STUDENT: "Student",
	TEACHER: "Teacher",
};

export const ALL_PERMISSIONS = {
	account: {
		view: "account.view",
		create: "account.create",
		update: "account.update",
	},
	class: {
		view: "class.view",
		create: "class.create",
		update: "class.update",
		delete: "class.delete",
	},
	course: {
		view: "course.view",
		create: "course.create",
		update: "course.update",
		delete: "course.delete",
	},
	project: {
		view: "project.view",
		create: "project.create",
		update: "project.update",
		delete: "project.delete",
	},
};

export const USER_PERMISSIONS = {
	[roles.ADMIN]: [
		// ACCOUNT
		ALL_PERMISSIONS.account.view,
		ALL_PERMISSIONS.account.create,
		ALL_PERMISSIONS.account.update,
		// CLASS
		ALL_PERMISSIONS.class.view,
		ALL_PERMISSIONS.class.create,
		ALL_PERMISSIONS.class.update,
		ALL_PERMISSIONS.class.delete,
		// COURSE
		ALL_PERMISSIONS.course.view,
		ALL_PERMISSIONS.course.create,
		ALL_PERMISSIONS.course.update,
		ALL_PERMISSIONS.course.delete,
		// PROJECT
		ALL_PERMISSIONS.project.view,
		ALL_PERMISSIONS.project.create,
		ALL_PERMISSIONS.project.update,
		ALL_PERMISSIONS.project.delete,
	],
	[roles.STUDENT]: [
		// CLASS
		ALL_PERMISSIONS.class.view,
		// COURSE
		ALL_PERMISSIONS.course.view,
		// PROJECT
		ALL_PERMISSIONS.project.view,
	],
	[roles.TEACHER]: [
		// CLASS
		ALL_PERMISSIONS.class.view,
		ALL_PERMISSIONS.class.create,
		ALL_PERMISSIONS.class.update,
		ALL_PERMISSIONS.class.delete,
		// COURSE
		ALL_PERMISSIONS.course.view,
		// PROJECT
		ALL_PERMISSIONS.project.view,
		ALL_PERMISSIONS.project.create,
		ALL_PERMISSIONS.project.update,
		ALL_PERMISSIONS.project.delete,
	],
};
