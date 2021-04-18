import { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  useEffect(() => {
    axios
      .post("http://localhost:3001/game/01010101/play")
      .then((data) => {
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
