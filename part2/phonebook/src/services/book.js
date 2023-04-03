import axios from "axios"

const baseUrl = "http://localhost:3001/persons";

const getAll = () => axios.get(baseUrl).then(response => response.data);
const create = object => axios.post(baseUrl, object).then(response => response.data);
const update = (id, object) => axios.put(`${baseUrl}/${id}`, object).then(response => response.data);
const deleteId = id => axios.delete(`${baseUrl}/${id}`).then(response => response.data);

const book = { getAll, create, update, deleteId };

export default book