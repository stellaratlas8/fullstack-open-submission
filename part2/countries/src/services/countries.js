import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1";


const arrToFields = (fields) => fields.reduce((t, a) => t + (t === "" ? t : ",") + a, "");
const fields = {
  name: "name",
  capital: "capital",
  area: "area",
  languages: "languages",
  currencies: "currencies",
  flags: "flags",
  capitalInfo: "capitalInfo",
};

const searchByName = (name, fields) =>
  axios.get(`${baseUrl}/name/${name}?fields=${arrToFields(fields)}`).then(response => response.data);

const countries = {
  baseUrl,
  fields,
  searchByName,
}

export default countries;