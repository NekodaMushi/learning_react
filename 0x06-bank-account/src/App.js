import "./styles.css";
import { useReducer, useState } from "react";

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
        balance: 500,
        isActive: true,
      };
    case ACTION.DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case ACTION.WITHDRAW:
      if (state.balance < action.payload) {
        return state;
      }
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
  const [{ balance, loan, isActive }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [depositAmount, setDepositAmount] = useState();
  const [withdrawAmount, setWithdrawAmount] = useState();
  const [loanAmount, setLoanAmount] = useState();
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
        <input
          type="number"
          value={depositAmount}
          onChange={(e) => setDepositAmount(Number(e.target.value))}
        ></input>
        <button
          onClick={() =>
            dispatch({ type: ACTION.DEPOSIT, payload: depositAmount })
          }
          disabled={!isActive}
        >
          Deposit
        </button>
      </p>
      <p>
        <input
          type="number"
          value={withdrawAmount}
          onChange={(e) => setWithdrawAmount(Number(e.target.value))}
        ></input>
        <button
          onClick={() =>
            dispatch({ type: ACTION.WITHDRAW, payload: withdrawAmount })
          }
          disabled={!isActive}
        >
          Withdraw
        </button>
      </p>
      <p>
        <input
          type="number"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        ></input>
        <button
          onClick={() => {
            dispatch({ type: ACTION.REQUEST_LOAN, payload: loanAmount });
            setLoanAmount("");
          }}
          disabled={!isActive}
        >
          Request a loan of 5000
        </button>
      </p>
      <p>
        <button
          onClick={() => {
            dispatch({ type: ACTION.PAY_LOAN, payload: loanAmount });
            setLoanAmount(0);
          }}
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
