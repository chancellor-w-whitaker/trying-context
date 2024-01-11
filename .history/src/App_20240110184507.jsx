import "./App.css";

const App = () => {
  return (
    <>
      <main className="container">
        <div className="my-3 p-3 bg-body rounded shadow-sm"></div>
      </main>
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
