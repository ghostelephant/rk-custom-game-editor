const testReducer = (state, action) => {
  switch(action.type){
    case "add":
      return {...state,
        value: state.value + action.payload
      };
    case "subtract":
      return {...state,
        value: state.value - action.payload
      };
    case "editText":
      return {...state,
        increment: action.value
      }
    default:
      return state;
  }
};

export default testReducer;