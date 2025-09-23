import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/style.css";
import "./assets/css/result.css";
import "./assets/css/home.css";
import "./assets/css/quiz.css";
import "./assets/css/auth.css";
import "./assets/css/leaderboard.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "./context/QuizContext";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AuthProvider>
      <Provider>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);
