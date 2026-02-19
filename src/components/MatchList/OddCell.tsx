import React from "react";
import s from "./index.module.scss";
import { Market, Odd } from "../../types/match";

interface OddCellProps {
    market: Market | undefined;
    oddLabel: string;
    onClick: (market: Market, odd: Odd) => void;
}

const OddCell: React.FC<OddCellProps> = React.memo(({ market, oddLabel, onClick }) => {
    const odd = market?.odds.find((o) => o.label === oddLabel);

    if (!odd) {
        return <div className={s.cellOddPlaceholder}>-</div>;
    }

    return (
        <div className={s.cell}>
            <button className={s.oddButton} onClick={() => onClick(market!, odd)}>
                {odd.value.toFixed(2)}
            </button>
        </div>
    );
});

OddCell.displayName = "OddCell";

export default OddCell;
