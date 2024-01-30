import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
};

const ACTION = {
  OPEN_ACCOUNT: "openAccount",
  DEPOSIT: "deposit",
  WITHDRAW: "withdraw",
  REQUEST_LOAN: "requestLoan",
  PAY_LOAN: "payLoan",
  ClOSE_ACCOUNT: "CloseAccount",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTION.OPEN_ACCOUNT:
      return {
        ...state,
        isActive: false,
      };
    case ACTION.DEPOSIT:
      return {};
    case ACTION.WITHDRAW:
      return {};
    case ACTION.REQUEST_LOAN:
      return {};
    case ACTION.PAY_LOAN:
      return {};
    case ACTION.ClOSE_ACCOUNT:
      return {};
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
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: "openAccount" })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Deposit 150
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Withdraw 50
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Pay loan
        </button>
      </p>
      <p>
        <button onClick={() => {}} disabled={!isActive}>
          Close account
        </button>
      </p>
    </div>
  );
}
