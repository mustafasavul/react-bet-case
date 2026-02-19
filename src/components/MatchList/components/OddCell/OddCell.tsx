import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/store";
import s from "./OddCell.module.scss";
import { OddCellProps } from "../../type";

const OddCell: React.FC<OddCellProps> = React.memo(({ market, oddLabel, matchId, onClick }) => {
    const odd = market?.odds.find((o) => o.label === oddLabel);

    const isSelected = useSelector((state: RootState) => {
        if (!odd || typeof matchId === "undefined") return false;
        return state.cart.items.some(
            (item) => String(item.matchId) === String(matchId) && String(item.oddId) === String(odd.id)
        );
    });

    if (!odd) {
        return <div className={s.oddPlaceholder}>-</div>;
    }

    // Using inline style to guarantee background color change without modifying SCSS modules
    return (
        <div>
            <button
                className={`${s.oddButton} ${isSelected ? s.selected : ''}`}
                style={isSelected ? { backgroundColor: "#ffeb3b" } : {}}
                onClick={() => onClick(market!, odd)}
            >
                {odd.value.toFixed(2)}
            </button>
        </div>
    );
});

OddCell.displayName = "OddCell";

export default OddCell;
