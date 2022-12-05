import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "bulma/css/bulma.css";
import { initText } from "./transcripts";

initText();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
