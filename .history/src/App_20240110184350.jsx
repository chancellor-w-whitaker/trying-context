import { useState } from "react";

import reactLogo from "./assets/react.svg";
import "./App.css";

import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <main className="container">
        <div className="my-3 p-3 bg-body rounded shadow-sm"></div>
      </main>
    </>
  );
}

export default App;
