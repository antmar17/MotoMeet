import axios from "axios";
const LOGIN_URL = "/api/Login";
const REGISTER_URL = "/api/users";

export default axios.create({
  baseURL: "https://localhost:44366",
});

export { LOGIN_URL ,REGISTER_URL};
