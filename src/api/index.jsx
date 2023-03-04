import axios from "axios";

const API = axios.create({baseURL: "https://todo-server-h3sk.onrender.com"});

export const getAllTodos = () => API.get("/todo/get");

export const addTodo = (todoData) => API.post("/todo/add", todoData);
export const deleteTodo = (todoData) => API.patch("/todo/delete", todoData);
export const checkTodo = (todoData) => API.patch("/todo/check", todoData);