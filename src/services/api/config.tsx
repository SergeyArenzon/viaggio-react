import axios from "axios";


const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL, 
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  return ({
    ...config,
    headers: {
      "Content-Type": "application/json",
    },
  })
},
  error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
  response,
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

const { get, post, put, delete: destroy } = apiClient;
export { get, post, put, destroy };