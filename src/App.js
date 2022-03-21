import { useReducer } from "react";
import "./App.css";
import Button from "./Button";
import OperationButton from "./OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currnum: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currnum === "0") return state;
      if (payload.digit === "." && state.currnum.includes(".")) return state;
      return {
        ...state,
        currnum: `${state.currnum || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currnum == null && state.prevnum == null) {
        return state;
      }
      if (state.currnum == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.prevnum == null) {
        return {
          ...state,
          operation: payload.operation,
          prevnum: state.currnum,
          currnum: null,
        };
      }
      return {
        ...state,
        prevnum: evaluate(state),
        operation: payload.operation,
        currnum: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currnum: null,
        };
      }
      if (state.currnum == null) return state;
      if (state.currnum.length === 1) {
        return { ...state, currnum: null };
      }
      return {
        ...state,
        currnum: state.currnum.slice(0, -1),
      };
    case ACTIONS.EVALUATE:
      if (
        state.prevnum == null ||
        state.currnum == null ||
        state.operation == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        prevnum: null,
        operation: null,
        currnum: evaluate(state),
      };
  }
}
function evaluate({ currnum, prevnum, operation }) {
  const prev = parseFloat(prevnum);
  const curr = parseFloat(currnum);
  if (isNaN(prev) || isNaN(curr)) return " ";
  let computation = " ";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "x":
      computation = prev * curr;
      break;
    case "/":
      computation = prev / curr;
      break;
  }
  return computation;
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});
function formatNum(num) {
  if (num == null) return;
  if (typeof num == "number") {
    num = num.toString();
  }
  const [integer, decimal] = num.split(".");
  if (decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function App() {
  const [{ currnum, prevnum, operation }, dispatch] = useReducer(reducer, {});

  return (
    <div className="app">
      <div className="container">
        <div className="output">
          <div className="prevnum">
            {formatNum(prevnum)} {operation}
          </div>
          <div className="currnum">{formatNum(currnum)}</div>
        </div>
        <button
          onClick={() => dispatch({ type: ACTIONS.CLEAR })}
          className="span2"
        >
          AC
        </button>
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.DELETE_DIGIT });
          }}
          className="single"
        >
          DEL
        </button>
        <OperationButton
          operation="/"
          dispatch={dispatch}
          classname={"single"}
        />
        <Button digit={"1"} dispatch={dispatch} classname={"single"} />
        <Button digit={"2"} dispatch={dispatch} classname={"single"} />
        <Button digit={"3"} dispatch={dispatch} classname={"single"} />
        <OperationButton
          operation="x"
          dispatch={dispatch}
          classname={"single"}
        />

        <Button digit={"4"} dispatch={dispatch} classname={"single"} />
        <Button digit={"5"} dispatch={dispatch} classname={"single"} />
        <Button digit={"6"} dispatch={dispatch} classname={"single"} />
        <OperationButton
          operation="-"
          dispatch={dispatch}
          classname={"single"}
        />

        <Button digit={"7"} dispatch={dispatch} classname={"single"} />
        <Button digit={"8"} dispatch={dispatch} classname={"single"} />
        <Button digit={"9"} dispatch={dispatch} classname={"single"} />
        <OperationButton
          operation="+"
          dispatch={dispatch}
          classname={"single"}
        />

        <Button digit={"0"} dispatch={dispatch} classname={"single"} />
        <Button digit={"."} dispatch={dispatch} classname={"single"} />
        <button
          onClick={() => {
            dispatch({ type: ACTIONS.EVALUATE });
          }}
          className="span2"
        >
          =
        </button>
      </div>
    </div>
  );
}

export default App;
