// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import React from "react";

import { AppContextProvider } from "./AppContextProvider.jsx";
import { Container } from "./components/Container.jsx";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Container>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </Container>
  </React.StrictMode>
);
