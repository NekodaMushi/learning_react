import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  // status: "ready",
};

// const ACTION = {
//   READY: "ready",
//   RUNNING: "running",
// };

function reducer(state, action) {
  switch (action.type) {
    case "openAccount":
      return {
        ...state,
        isActive: true,
      };
    case "deposit":
      return {
        ...state,
        isActive,
      };
    default:
      throw new Error("Unknown Error");
  }
}

export default function App() {
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <div className="App">
      <h1>useReducer Bank Account</h1>
      <p>Balance: X</p>
      <p>Loan: X</p>

      <p>
        <button
        // onClick={() => dispatch({ type:  })}
        // disabled={!isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={false}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={false}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={false}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={false}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={false}>
          Close account
        </button>
      </p>
    </div>
  );
}
