import React, { useMemo, useCallback } from "react";
import { useGetMatchesQuery } from "../../services/bettingApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import s from "./index.module.scss";
import { Virtuoso } from "react-virtuoso";
import MatchRow from "./MatchRow";
import { Market, Odd, Match } from "../../types/match";

type ListItem = { type: "header"; value: string } | { type: "match"; value: Match };

const MatchList = () => {
  const { data, isLoading } = useGetMatchesQuery();
  const dispatch = useDispatch();

  const items: ListItem[] = useMemo(() => {
    if (!data) return [];

    // Create grouped matches
    const groupedMatches: Record<string, Match[]> = {};
    data.forEach((match) => {
      const key = `${match.date} ${match.day} ${match.league}`;
      if (!groupedMatches[key]) {
        groupedMatches[key] = [];
      }
      groupedMatches[key].push(match);
    });

    // Flatten to list for Virtuoso
    const flattenedItems: ListItem[] = [];
    Object.entries(groupedMatches).forEach(([key, matches]) => {
      flattenedItems.push({ type: "header", value: key });
      matches.forEach((match) =>
        flattenedItems.push({ type: "match", value: match })
      );
    });

    return flattenedItems;
  }, [data]);

  const handleOddClick = useCallback(
    (match: Match, market: Market, odd: Odd) => {
      dispatch(
        addToCart({
          code: match.code,
          matchId: match.id,
          matchName: match.name,
          marketId: market.id,
          marketName: market.name,
          oddId: odd.id,
          oddLabel: odd.label,
          oddValue: odd.value,
        })
      );
    },
    [dispatch]
  );

  const itemContent = useCallback(
    (index: number, item: ListItem) => {
      if (item.type === "header") {
        return <div className={s.groupHeader}>{item.value}</div>;
      }
      return <MatchRow match={item.value} onOddClick={handleOddClick} />;
    },
    [handleOddClick]
  );

  if (isLoading) {
    return (
      <div className={s.matchListContainer}>
        <div style={{ padding: "20px", textAlign: "center" }}>Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className={s.matchListContainer}>
      <div className={s.matchTable}>
        <div className={s.headerRow}>
          <div className={s.headerCell}>Maçlar: {data?.length}</div>
          <div className={s.headerCell}>Yorumlar</div>
          <div className={s.headerCell}></div>
          <div className={s.headerCell}>1</div>
          <div className={s.headerCell}>x</div>
          <div className={s.headerCell}>2</div>
          <div className={s.headerCell}>Alt</div>
          <div className={s.headerCell}>Üst</div>
          <div className={s.headerCell}>H1</div>
          <div className={s.headerCell}>1</div>
          <div className={s.headerCell}>x</div>
          <div className={s.headerCell}>2</div>
          <div className={s.headerCell}>H2</div>
          <div className={s.headerCell}>1-X</div>
          <div className={s.headerCell}>1-2</div>
          <div className={s.headerCell}>X-2</div>
          <div className={s.headerCell}>Var</div>
          <div className={s.headerCell}>Yok</div>
          <div className={s.headerCell}>+99</div>
        </div>

        <Virtuoso
          useWindowScroll
          data={items}
          itemContent={itemContent}
          computeItemKey={(index, item) =>
            item.type === "header" ? `header-${item.value}` : `match-${item.value.id}`
          }
        />
      </div>
    </div>
  );
};

export default MatchList;

MatchList.displayName = "MatchList";