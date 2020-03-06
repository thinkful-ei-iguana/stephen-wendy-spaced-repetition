import "unfetch/polyfill";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { WordProvider } from "./contexts/WordContext";
import App from "./components/App/App";
import "./setup-icons";
import "./index.css";
// import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <BrowserRouter>
    <WordProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </WordProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

// serviceWorker.unregister();
