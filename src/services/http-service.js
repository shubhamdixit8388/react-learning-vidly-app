import axios from "axios";
import { toast } from "react-toastify";

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
  if (error.response && error.response.status === 403) {
    toast.error("Invalid action");
  }
  if (error.response && error.response.status === 401) {
    toast.error("Acces denied");
  }
  return Promise.reject(error);
});

export function setJwt(jwt) {
  console.log(jwt);
  axios.defaults.headers.common["x-auth-token"] = jwt ? jwt : undefined;
}

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
