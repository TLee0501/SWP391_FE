import axios from "axios";
import config from "../constants/config";

// Get JWT stored in local
const jwt = localStorage.getItem("jwt");

const BaseApi = axios.create({
	baseURL: config.BASE_URL,
	headers: {
		Authorization: `Bearer ${jwt}`,
	},
});

export default BaseApi;
