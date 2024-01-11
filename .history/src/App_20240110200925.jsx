import { useEffect } from "react";

import Dashboard from "./Dashboard";
import "./App.css";

const App = () => {
  useBodyBgVariant("primary-subtle");

  return (
    <>
      <Container>
        <Dashboard></Dashboard>
      </Container>
    </>
  );
};

const Container = ({ children }) => {
  return (
    <>
      <main className="container">
        <div className="my-3 p-3 bg-body rounded shadow-sm">{children}</div>
      </main>
    </>
  );
};

export default App;
