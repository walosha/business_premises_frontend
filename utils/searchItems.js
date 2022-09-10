import axios from "axios";

export function searchItems(route, search, page) {
  return axios
    .get(`/api/${route}?page=${page}&text=${search}`)
    .then((r) => r.data.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
}
