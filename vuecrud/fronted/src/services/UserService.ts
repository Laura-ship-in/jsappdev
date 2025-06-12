import http from "../http-common";
class UserService {
  getAll() {
    return http.get("/users");
  }
  get(id: number | string) {
    return http.get(`/users/${id}`);
  }
  create(data: any) {
    return http.post("/users", data);
  }
  update(id: number | string, data: any) {
    return http.put(`/users/${id}`, data);
  }
  delete(id: number | string) {
    return http.delete(`/users/${id}`);
  }
  status(id: number | string, status: number | string) {
    return http.put(`/users/status/${id}/${status}`);
  }
  deleteAll() {
    return http.delete(`/users`);
  }
  findByName(nume: string) {
    return http.get(`/users?name=${nume}`);
  }
}
export default new UserService();
