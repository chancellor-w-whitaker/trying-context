import { useEffect } from "react";

import "./App.css";

const App = () => {
  useBodyBgVariant();

  return (
    <>
      <Container></Container>
    </>
  );
};

const useBodyBgVariant = (variant) => {
  useEffect(() => {
    document.body.classList.add(`bg-${variant}`);

    return () => {
      document.body.classList.remove(`bg-${variant}`);
    };
  }, [variant]);
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
