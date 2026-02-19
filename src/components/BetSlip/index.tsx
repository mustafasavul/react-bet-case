import { useSelector, useDispatch } from "react-redux";
import {
  selectCartItems,
  selectPotentialWin,
  selectTotalOdd,
  selectIsValid,
  selectStake,
} from "../../features/cart/cartSelector";
import { removeFromCart, setStake } from "../../features/cart/cartSlice";
import s from './index.module.scss'

const BetSlip = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalOdd = useSelector(selectTotalOdd);
  const potentialWin = useSelector(selectPotentialWin);
  const isValid = useSelector(selectIsValid);
  const stake = useSelector(selectStake);

  return (
    <div className={s.betSlip}>
      <h3 className={s.betSlipHeader}>Kupon</h3>

      <div className={s.betSlipItems}>
        {
          items.length === 0 ? (
            <div className={s.betSlipEmpty}>Kuponunuzda bahis bulunamadı!</div>
          ) : (
            items.map((item) => (
              <div key={`${item.matchId}-${item.oddId}`} className={s.betSlipItem}>
                <div>
                  Kod: {item.code} Maç: {item.matchName} - {item.marketName} {item.oddLabel} (Oran: {item.oddValue})
                </div>


                <button onClick={() => dispatch(removeFromCart({ matchId: item.matchId, oddId: item.oddId }))} className={s.betSlipItemRemove}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            ))
          )
        }
      </div>


      <div className={s.betSlipFooter}>
        <div className={s.betSlipFooterStake}>
          <span className={s.betSlipFooterStakeLabel}>Kupon Tutarı:</span>
          <input
            type="number"
            value={stake}
            min={1}
            max={20000}
            onChange={(e) => dispatch(setStake(Number(e.target.value)))}
            className={s.betSlipFooterStakeInput}
          />
          <span className={s.betSlipFooterStakeCurrency}>TL</span>
        </div>

        <div className={s.betSlipFooterValue}>Toplam Oran: {totalOdd.toFixed(2)}</div>
        <div className={s.betSlipFooterValue}>Olası Kazanç: {potentialWin.toFixed(2)} TL</div>

        <button disabled={!isValid} className={s.betSlipFooterButton}>Kuponu Oyna</button>
      </div>
    </div>
  );
};

export default BetSlip;

BetSlip.displayName = "BetSlip";