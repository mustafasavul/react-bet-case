import { MatchList, BetSlip } from "./components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/global.scss";

function App() {
  return (
    <div className="app">
      <MatchList />
      <BetSlip />
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default App;

App.displayName = "App";