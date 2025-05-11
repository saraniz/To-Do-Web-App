import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // ✅ Make sure this path is correct
import "./index.css"; // (Optional: If you have global styles)
import { Provider } from "react-redux";
import store from './Storage/Store'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
