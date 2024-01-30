import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  activeLoan: false,
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
        isActive: true,
      };
    case ACTION.DEPOSIT:
      return {
        ...state,
        balance: state.balance + 150,
      };
    case ACTION.WITHDRAW:
      return {
        ...state,
        balance: state.balance - 50,
      };
    case ACTION.REQUEST_LOAN:
      return {
        ...state,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
        activeLoan: true,
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
        <button onClick={() => {}} disabled={false}>
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
