import "./styles.css";
import { useReducer } from "react";

const initialState = {
  balance: 0,
  loan: 0,
  isActive: false,
  activeLoan: false,
  depositAmount: 0,
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
        balance: state.balance + action.payload,
        depositAmount: state.depositAmount,
      };
    case ACTION.WITHDRAW:
      return {
        ...state,
        balance: Math.max(state.balance - action.payload, 0),
      };
    case ACTION.REQUEST_LOAN:
      if (state.activeLoan) {
        return state;
      }
      return {
        ...state,
        activeLoan: true,
        balance: state.balance + action.payload,
        loan: state.loan + action.payload,
      };
    case ACTION.PAY_LOAN:
      if (state.balance < action.payload || state.activeLoan === false) {
        return state;
      }
      return {
        ...state,
        balance: state.balance - action.payload,
        loan: state.loan - action.payload,
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
  const [{ balance, loan, isActive, depositAmount }, dispatch] = useReducer(
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
          onClick={() =>
            dispatch({ type: ACTION.DEPOSIT, payload: { depositAmount } })
          }
          disabled={!isActive}
        >
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => e.target.value}
          ></input>
          Deposit
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.WITHDRAW, payload: 50 })}
          disabled={!isActive}
        >
          Withdraw 50
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.REQUEST_LOAN, payload: 5000 })}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => dispatch({ type: ACTION.PAY_LOAN, payload: 5000 })}
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
