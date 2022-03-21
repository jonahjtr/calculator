import React from "react";
import { ACTIONS } from "./App";

function OperationButton({ dispatch, operation, classname }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATION, payload: { operation } })
      }
      className={classname}
    >
      {operation}
    </button>
  );
}

export default OperationButton;
