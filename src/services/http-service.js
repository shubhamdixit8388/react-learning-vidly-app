import axios from "axios";
import { toast } from "react-toastify";
// import Logger from "./logger-service";

axios.interceptors.response.use(null, (error) => {
  console.log("error....", error);
  const expectedError =
    error &&
    error.response &&
    error.response.status >= 400 &&
    error.response.status <= 500;
  if (!expectedError) {
    console.log(error);
    toast.error("Unexpected error occured");
  }
  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
