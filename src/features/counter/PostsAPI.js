import axios from "../../axios/axiosInstance";

export function fetchPosts() {
  return axios.get("posts");
}
export function createPosts(title, body) {
  return axios.post("posts", { title, body, userId: 1 });
}

export function updatePosts(title, body, id) {
  return axios.put("posts/" + id, { title, body, id, userId: 1 });
}

export function deletePosts(id) {
  return axios.delete("posts/" + id);
}
