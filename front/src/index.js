import "semantic-ui-css/semantic.min.css";
import "./styles/index.css";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { GameProvider } from "./contexts/game";
import { TMBProvider } from "./contexts/tmb";
import MainSteps from "./pages/steps";

ReactDOM.render(
  <TMBProvider>
    <GameProvider>
      <MainSteps />
    </GameProvider>
  </TMBProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
