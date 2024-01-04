import React from "react";
import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      message={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    />
    <StarRating maxRating={15} defaultRating={3} />
    <StarRating size={24} color="red" />
  </React.StrictMode>
);
