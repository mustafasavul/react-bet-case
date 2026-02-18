import MatchList from "./components/MatchList";
import BetSlip from "./components/BetSlip";

function App() {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <MatchList />

      <BetSlip />
    </div>
  );
}

export default App;