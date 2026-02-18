import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectPotentialWin,
  selectTotalOdd,
  selectIsValid,
  selectStake,
} from "../features/cart/cartSelector";
import { removeFromCart, setStake } from "../features/cart/cartSlice";

const BetSlip = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalOdd = useSelector(selectTotalOdd);
  const potentialWin = useSelector(selectPotentialWin);
  const isValid = useSelector(selectIsValid);
  const stake = useSelector(selectStake);

  // TODO: inline styles change to scss or css, perofrmance issue
  const betStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: "5rem",
    border: "1px solid black",
    padding: "15px",
  }

  return (
    <div style={betStyle}>
      <h3>Kupon</h3>

      {items.map((item) => (
        <div key={item.oddId}>
          {item.matchName} - {item.marketName} - {item.oddLabel} (
          {item.oddValue})
          <button onClick={() => dispatch(removeFromCart(item.oddId))}>
            Sil
          </button>
        </div>
      ))}

      <div>
        <input
          type="number"
          value={stake}
          min={1}
          max={20000}
          onChange={(e) => dispatch(setStake(Number(e.target.value)))}
        />
        <span>TL</span>
      </div>

      <div>Toplam Oran: {totalOdd.toFixed(2)}</div>
      <div>Olası Kazanç: {potentialWin.toFixed(2)} TL</div>

      <button disabled={!isValid}>Kuponu Oyna</button>
    </div>
  );
};

export default BetSlip;