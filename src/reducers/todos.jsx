const todoReducer = (state = { data: null }, action) => {
    switch (action.type) {
      case "FETCH_ALL_TODOS":
        return { data: action.payload };
      default:
        return state;
    }
  };
  
  export default todoReducer;