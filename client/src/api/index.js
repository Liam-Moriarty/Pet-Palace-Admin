import axios from "axios";

const url = "http://localhost:5000/adoption";

export const fetchAdoption = () => axios.get(url);
