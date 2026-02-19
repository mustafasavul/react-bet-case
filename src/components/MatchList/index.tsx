import React, { useMemo } from "react";
import { useGetMatchesQuery } from "../../services/bettingApi";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/cart/cartSlice";
import s from "./index.module.scss";
import { Virtuoso } from "react-virtuoso";

const MatchList = () => {
  const { data, isLoading } = useGetMatchesQuery();
  const dispatch = useDispatch();

  const items = useMemo(() => {
    if (!data) return [];

    // Create grouped matches
    const groupedMatches: Record<string, typeof data> = {};
    data.forEach((match) => {
      const key = `${match.date} ${match.day} ${match.league}`;
      if (!groupedMatches[key]) {
        groupedMatches[key] = [];
      }
      groupedMatches[key].push(match);
    });

    // Flatten to list for Virtuoso
    const flattenedItems: Array<{ type: "header"; value: string } | { type: "match"; value: typeof data[0] }> = [];
    Object.entries(groupedMatches).forEach(([key, matches]) => {
      flattenedItems.push({ type: "header", value: key });
      matches.forEach((match) =>
        flattenedItems.push({ type: "match", value: match })
      );
    });

    return flattenedItems;
  }, [data]);

  const itemContent = (index: number, item: typeof items[0]) => {
    if (item.type === "header") {
      return <div className={s.groupHeader}>{item.value}</div>;
    }

    const match = item.value;
    const msMarket = match.markets.find((m) => m.id === "1"); // Maç Sonucu
    const csMarket = match.markets.find((m) => m.id === "2"); // Çifte Şans
    const auMarket = match.markets.find((m) => m.id === "5"); // Alt/Üst
    const code = match.code;

    const getOdd = (market: any, label: string) =>
      market?.odds.find((o: any) => o.label === label);

    const handleOddClick = (market: any, odd: any) => {
      dispatch(
        addToCart({
          code,
          matchId: match.id,
          matchName: match.name,
          marketId: market.id,
          marketName: market.name,
          oddId: odd.id,
          oddLabel: odd.label,
          oddValue: odd.value,
        })
      );
    };

    const renderOddButton = (market: any, label: string) => {
      const odd = getOdd(market, label);
      if (!odd) return <div className={s.cellOddPlaceholder}>-</div>;

      return (
        <div className={s.cell}>
          <button
            className={s.oddButton}
            onClick={() => handleOddClick(market, odd)}
          >
            {odd.value.toFixed(2)}
          </button>
        </div>
      );
    };

    return (
      <div className={s.matchRow}>
        {/* Info Column */}
        <div className={s.cellInfoColumn}>
          <div className={s.cellInfoHeader}>{match.code} {match.time}</div>
          <div className={s.cellName}>{match.name}</div>
        </div>

        {/* Comments */}
        <div className={s.cell}>Yorumlar</div>

        {/* Static Placeholder */}
        <div className={s.cell}>4</div>

        {/* Maç Sonucu (1, X, 2) */}
        {renderOddButton(msMarket, "1")}
        {renderOddButton(msMarket, "X")}
        <div className={s.cellOddPlaceholder}>-</div>

        {/* Alt/Üst */}
        {renderOddButton(auMarket, "Alt")}
        {renderOddButton(auMarket, "Üst")}

        {/* Handikap (H1, 1, X, 2, H2) */}
        <div className={s.cellOddPlaceholder}></div>
        <div className={s.cellOddPlaceholder}></div>
        <div className={s.cellOddPlaceholder}></div>
        <div className={s.cellOddPlaceholder}></div>
        <div className={s.cellOddPlaceholder}></div>

        {/* Çifte Şans */}
        {renderOddButton(csMarket, "1-X")}
        {renderOddButton(csMarket, "1-2")}
        {renderOddButton(csMarket, "X-2")}

        {/* Var/Yok */}
        <div className={s.cellOddPlaceholder}>Var</div>
        <div className={s.cellOddPlaceholder}>Yok</div>

        {/* +99 */}
        <div className={s.cell}>+99</div>
      </div>
    );
  };

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
          computeItemKey={(index, item) => `${item.type}-${index}`}
        />
      </div>
    </div>
  );
};

export default MatchList;