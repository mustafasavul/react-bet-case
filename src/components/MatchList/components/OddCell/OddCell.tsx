import React from "react";
import s from "./OddCell.module.scss";
import { OddCellProps } from "../../type";

const OddCell: React.FC<OddCellProps> = React.memo(({ market, oddLabel, onClick }) => {
    const odd = market?.odds.find((o) => o.label === oddLabel);

    if (!odd) {
        return <div className={s.oddPlaceholder}>-</div>;
    }

    return (
        <div>
            <button className={s.oddButton} onClick={() => onClick(market!, odd)}>
                {odd.value.toFixed(2)}
            </button>
        </div>
    );
});

OddCell.displayName = "OddCell";

export default OddCell;
