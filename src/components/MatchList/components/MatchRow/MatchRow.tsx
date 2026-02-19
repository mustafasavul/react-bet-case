import React, { useCallback, useMemo } from "react";
import { MARKET_AU, MARKET_CS, MARKET_MS } from "../../../../constants/markets";
import { Market, Odd } from "../../../../types/match";
import s from "./MatchRow.module.scss";
import OddCell from "../OddCell/OddCell";
import { MatchRowProps } from "../../type";

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
            <div className={s.matchRowCellInfoColumn}>
                <div className={s.matchRowCellInfoHeader}>
                    {match.code} {match.time}
                </div>
                <div className={s.matchRowCellName}>{match.name}</div>
            </div>

            {/* Comments */}
            <div className={s.matchRowCell}>Yorumlar</div>

            {/* Static Placeholder */}
            <div className={s.matchRowCell}>4</div>

            {/* Maç Sonucu (1, X, 2) */}
            <OddCell matchId={match.id} market={msMarket} oddLabel="1" onClick={handleLocalClick} />
            <OddCell matchId={match.id} market={msMarket} oddLabel="X" onClick={handleLocalClick} />
            <div className={s.matchRowCellOddPlaceholder}>-</div>

            {/* Alt/Üst */}
            <OddCell matchId={match.id} market={auMarket} oddLabel="Alt" onClick={handleLocalClick} />
            <OddCell matchId={match.id} market={auMarket} oddLabel="Üst" onClick={handleLocalClick} />

            {/* Handikap (H1, 1, X, 2, H2) */}
            <div className={s.matchRowCellOddPlaceholder}></div>
            <div className={s.matchRowCellOddPlaceholder}></div>
            <div className={s.matchRowCellOddPlaceholder}></div>
            <div className={s.matchRowCellOddPlaceholder}></div>
            <div className={s.matchRowCellOddPlaceholder}></div>

            {/* Çifte Şans */}
            <OddCell matchId={match.id} market={csMarket} oddLabel="1-X" onClick={handleLocalClick} />
            <OddCell matchId={match.id} market={csMarket} oddLabel="1-2" onClick={handleLocalClick} />
            <OddCell matchId={match.id} market={csMarket} oddLabel="X-2" onClick={handleLocalClick} />

            {/* Var/Yok */}
            <div className={s.matchRowCellOddPlaceholder}></div>
            <div className={s.matchRowCellOddPlaceholder}></div>

            {/* +99 */}
            <div className={s.matchRowCell}>+99</div>
        </div>
    );
});

MatchRow.displayName = "MatchRow";

export default MatchRow;
