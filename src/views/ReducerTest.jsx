import {useReducer} from "react";

import testReducer from "../reducers/testReducer";

const ReducerTest = () => {
  const [{increment, value}, dispatch] = useReducer(
    testReducer,
    {
      increment: "0",
      value: 0
    }
  );

  return (
    <>
      <p>
        Current value: {value}
      </p>

      <div className="input-field col s12">
        <input
          type="text"
          id="increment"
          name="increment"
          value={increment}
          onChange={e => dispatch({
            type: "editText",
            value: e.target.value
              .split("")
              .every(char =>
                "0123456789".includes(char)
              ) ? e.target.value : increment
          })}
          onBlur={() => 
            dispatch(increment ?
              {}
              :
              {
                type: "editText",
                value: "0"
              }
            )
          }
        />
      </div>

      <button
        className="btn purple darken-2"
        onClick={() => dispatch({
          type: "add",
          payload: parseInt(increment)
        })}
        disabled={!increment}
      >
        Add
      </button>

      <button
        className="btn purple darken-2"
        onClick={() => dispatch({
          type: "subtract",
          payload: parseInt(increment)
        })}
        disabled={!increment}
      >
        Subtract
      </button>
    </>
  );
};

export default ReducerTest;