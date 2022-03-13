import axios from "axios";

export function searchItems(route, search, page) {
	const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
	return axios
		.get(`/api/${route}?page=${page}&text=${search}`)
		.then((r) => r.data.data)
		.catch((error) => {
			console.error(error);
			return [];
		});
}
