import React, { useMemo, useCallback } from "react";
import s from "./index.module.scss";
import { Match, Market, Odd } from "../../types/match";
import OddCell from "./OddCell";
import { MARKET_MS, MARKET_CS, MARKET_AU } from "../../constants/markets";

interface MatchRowProps {
    match: Match;
    onOddClick: (match: Match, market: Market, odd: Odd) => void;
}

const MatchRow: React.FC<MatchRowProps> = React.memo(({ match, onOddClick }) => {
    const { msMarket, csMarket, auMarket } = useMemo(() => {
        return {
            msMarket: match.markets.find((m) => m.id === MARKET_MS), // Maç Sonucu
            csMarket: match.markets.find((m) => m.id === MARKET_CS), // Çifte Şans
            auMarket: match.markets.find((m) => m.id === MARKET_AU), // Alt/Üst
        };
    }, [match.markets]);

    const handleLocalClick = useCallback(
        (market: Market, odd: Odd) => {
            onOddClick(match, market, odd);
        },
        [match, onOddClick]
    );

    return (
        <div className={s.matchRow}>
            {/* Info Column */}
            <div className={s.cellInfoColumn}>
                <div className={s.cellInfoHeader}>
                    {match.code} {match.time}
                </div>
                <div className={s.cellName}>{match.name}</div>
            </div>

            {/* Comments */}
            <div className={s.cell}>Yorumlar</div>

            {/* Static Placeholder */}
            <div className={s.cell}>4</div>

            {/* Maç Sonucu (1, X, 2) */}
            <OddCell market={msMarket} oddLabel="1" onClick={handleLocalClick} />
            <OddCell market={msMarket} oddLabel="X" onClick={handleLocalClick} />
            <div className={s.cellOddPlaceholder}>-</div>

            {/* Alt/Üst */}
            <OddCell market={auMarket} oddLabel="Alt" onClick={handleLocalClick} />
            <OddCell market={auMarket} oddLabel="Üst" onClick={handleLocalClick} />

            {/* Handikap (H1, 1, X, 2, H2) */}
            <div className={s.cellOddPlaceholder}></div>
            <div className={s.cellOddPlaceholder}></div>
            <div className={s.cellOddPlaceholder}></div>
            <div className={s.cellOddPlaceholder}></div>
            <div className={s.cellOddPlaceholder}></div>

            {/* Çifte Şans */}
            <OddCell market={csMarket} oddLabel="1-X" onClick={handleLocalClick} />
            <OddCell market={csMarket} oddLabel="1-2" onClick={handleLocalClick} />
            <OddCell market={csMarket} oddLabel="X-2" onClick={handleLocalClick} />

            {/* Var/Yok */}
            <div className={s.cellOddPlaceholder}>Var</div>
            <div className={s.cellOddPlaceholder}>Yok</div>

            {/* +99 */}
            <div className={s.cell}>+99</div>
        </div>
    );
});

MatchRow.displayName = "MatchRow";

export default MatchRow;
