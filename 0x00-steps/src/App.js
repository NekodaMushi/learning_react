import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your time wisely 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
      {/* <Steps /> */}
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrev() {
    if (step > 1) setStep(step - 1);
  }
  function handleNext() {
    if (step < 3) {
      setStep((step) => step + 1);
    }
  }

  return (
    <div>
      <button className="close" onClick={() => setIsOpen(!isOpen)}>
        &times;
      </button>
      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={`${step >= 1 ? "active" : ""}`}>1</div>
            <div className={`${step >= 2 ? "active" : ""}`}>2</div>
            <div className={`${step >= 3 ? "active" : ""}`}>3</div>
          </div>

          <p className="message">
            Step : {step} : {messages[step - 1]}
          </p>
          <div className="buttons">
            <Btn
              text="Last"
              onClick={handlePrev}
              bgColor="#7950f2"
              textColor="#fff"
            />
            <Btn text="Next" onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
}

function Btn({ text, onClick, bgColor, textColor }) {
  return (
    <button style={{ bgColor, textColor }} onClick={onClick}>
      {text}
    </button>
  );
}
