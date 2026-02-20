import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCartItems,
  selectIsValid,
  selectPotentialWin,
  selectStake,
  selectTotalOdd,
  selectRequiredMinBetCount,
} from "../../features/cart/cartSelector";
import { removeFromCart, setStake } from "../../features/cart/cartSlice";
import s from './index.module.scss';
import { formatCurrency } from "../../utils/formatter";

const BetSlip = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalOdd = useSelector(selectTotalOdd);
  const potentialWin = useSelector(selectPotentialWin);
  const isValid = useSelector(selectIsValid);
  const stake = useSelector(selectStake);
  const requiredMin = useSelector(selectRequiredMinBetCount);

  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (items.length > 0) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [items]);

  const mbsMissing = requiredMin > items.length ? requiredMin - items.length : 0;

  return (
    <div className={`${s.betSlip} ${isAnimating ? s.animate : ""}`}>
      <div className={s.betSlipHeaderContainer}>
        <h3 className={s.betSlipHeader}>Kupon</h3>

        <div className={s.betSlipCount}>
          <span className={s.betSlipCountLabel}>Toplam Bahis:</span>
          <span className={s.betSlipCountValue}>{items.length} / 20</span>
        </div>
      </div>

      <hr />

      <div className={s.betSlipItems}>
        {
          items.length === 0 ? (
            <div className={s.betSlipEmpty}>
              <div className={s.betSlipEmptyTitle}>Kuponunuzda bahis bulunamadı!</div>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.matchId}-${item.oddId}`} className={s.betSlipItem}>
                <div>
                  <strong>Kod:</strong> {item.code} Maç: {item.matchName} - {item.marketName} {item.oddLabel} <strong>(Oran: {item.oddValue})</strong>
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
        {mbsMissing > 0 && (
          <div className={s.betSlipAlertMbs}>
            MBS kuralı nedeniyle en az {mbsMissing} bahis daha eklemelisiniz.
          </div>
        )}

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
        <div className={s.betSlipFooterValue}>Olası Kazanç: {formatCurrency(potentialWin)}</div>

        <button disabled={!isValid} className={s.betSlipFooterButton}>Kuponu Oyna</button>
      </div>
    </div>
  );
};

export default BetSlip;

BetSlip.displayName = "BetSlip";