import * as api from "../api";

export const fetchAllTodos = () => async (dispatch) => {
  try {
    const { data } = await api.getAllTodos();
    dispatch({ type: "FETCH_ALL_TODOS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const addTodo = (todoData)  => async (dispatch) => {
  try {
    await api.addTodo(todoData);
    dispatch(fetchAllTodos());
  } catch (error) {
    console.log(error)
  }
}

export const deleteTodo = (todoData) => async (dispatch) => {
  try {
    await api.deleteTodo(todoData);
    dispatch(fetchAllTodos());
  } catch (error) {
    console.log(error)
  }
}

export const checkTodo = (todoData) => async (dispatch) => {
  try {
    await api.checkTodo(todoData);
    dispatch(fetchAllTodos());
  } catch (error) {
    console.log(error)
  }
}