import { useReducer } from "react";

const ACTION = {
  DECREMENT: "dec",
  INCREMENT: "inc",
  SETTING_COUNT: "setCount",
  SETTING_STEP: "setStep",
};

function reducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case ACTION.DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    case ACTION.INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case ACTION.SETTING_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      throw new Error("ERROR");
  }
  // if (action.type === "inc") return state + 1;
  // if (action.type === "dec") return state - action.payload; // state - 1 is alright as well
  // if (action.type === "setCount") return action.payload;
}

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step, setStep] = useState(1);
  const initialState = { count: 0, step: 1 };
  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: ACTION.DECREMENT, payload: 1 });
    // setCount((count) => count - 1);
    // setCount((count) => count - step);
  };

  const inc = function () {
    dispatch({ type: ACTION.INCREMENT, payload: 1 });
    // setCount((count) => count + 1);
    // setCount((count) => count + step);
  };

  const defineCount = function (e) {
    dispatch({ type: ACTION.SETTING_COUNT, payload: Number(e.target.value) });
    // setCount(Number(e.target.value));
  };

  const defineStep = function (e) {
    dispatch({ type: ACTION.SETTING_STEP, payload: Number(e.target.value) });
    // setStep(Number(e.target.value));
  };

  const reset = function () {
    // setStep(1);
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
