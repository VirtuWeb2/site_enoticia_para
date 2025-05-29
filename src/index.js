import React from "react";
import ReactDOM from "react-dom/client";
import { AuthContexProvider } from "./views/admin/context/authContext";
import App from "./App";
import { GlobalContextProvider } from "./views/admin/context/GlobalContext";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <AuthContexProvider>
      <App />
    </AuthContexProvider>
  </GlobalContextProvider>
);
