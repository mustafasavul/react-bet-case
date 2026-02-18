import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectStake = (state: RootState) => state.cart.stake;

export const selectTotalOdd = createSelector(
  selectCartItems,
  (items) => items.reduce((acc, item) => acc * item.oddValue, 1)
);

export const selectPotentialWin = createSelector(
  [selectTotalOdd, selectStake],
  (totalOdd, stake) => totalOdd * stake
);

// min mbs suspend selector
export const selectRequiredMinBetCount = createSelector(
  selectCartItems,
  (items) => {
    if (items.length === 0) return 0;
    return Math.max(...items.map(i => i.mbs).filter((mbs): mbs is number => mbs !== undefined));
  }
);

// max/min stake money control
export const selectIsValid = createSelector(
  [selectCartItems, selectStake, selectRequiredMinBetCount],
  (items, stake, requiredMin) =>
    items.length >= requiredMin &&
    stake >= 1 &&
    stake <= 20000
);