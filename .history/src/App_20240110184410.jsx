import { useState } from "react";

import "./App.css";

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
