import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { DecisionTreeProvider } from "./context/DecisionTreeContext";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <DecisionTreeProvider>
    <App />
  </DecisionTreeProvider>
);
