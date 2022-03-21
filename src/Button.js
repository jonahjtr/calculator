import React from "react";
import { ACTIONS } from "./App";
function Button({ dispatch, digit, classname }) {
  return (
    <button
      onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
      className={classname}
    >
      {digit}
    </button>
  );
}

export default Button;
