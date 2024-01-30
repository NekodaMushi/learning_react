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
        balance: Math.max(state.balance - 50, 0),
      };
    case ACTION.REQUEST_LOAN:
      if (state.activeLoan) {
        return state;
      }
      return {
        ...state,
        activeLoan: true,
        balance: state.balance + 5000,
        loan: state.loan + 5000,
      };
    case ACTION.PAY_LOAN:
      if (state.activeLoan === false && state.balance <= 5000) {
        return state;
      }
      return {
        ...state,
        balance: state.balance - 5000,
        loan: state.loan - 5000,
        activeLoan: false,
      };

    case ACTION.ClOSE_ACCOUNT:
      return {
        ...state,
        isActive:
          state.balance === 0 && state.activeLoan === false ? false : true,
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
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>

      <p>
        <button
          onClick={() => dispatch({ type: ACTION.OPEN_ACCOUNT })}
          disabled={isActive}
        >
          Open account
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.DEPOSIT })}
          disabled={!isActive}
        >
          Deposit 150
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.WITHDRAW })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.REQUEST_LOAN })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.PAY_LOAN })}
          disabled={!isActive}
        >
          Pay loan
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.ClOSE_ACCOUNT })}
          disabled={!isActive}
        >
          Close account
        </button>
      </p>
    </div>
  );
}
