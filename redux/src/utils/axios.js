import axios from "axios";

const URL = "http://localhost:9000";

axios.defaults.withCredentials = true; //쿠키 데이터를 전송받기 위해

export const request = (method, url, data) => {
  return axios({
    method,
    url: URL + url,
    data,
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
};
