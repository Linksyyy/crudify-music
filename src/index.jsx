import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

setTimeout(() => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}, 800 // delay proposital pq vão ver meu cubo bonitinho sim
)
