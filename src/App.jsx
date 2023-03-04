import { BrowserRouter } from "react-router-dom";
import All_routes from "./All_routes";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useDispatch } from "react-redux";
import {fetchAllTodos} from "./actions/todo"
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  },[]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <All_routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
