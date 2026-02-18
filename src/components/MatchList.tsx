import { useGetMatchesQuery } from "../services/bettingApi";
import { useDispatch, UseDispatch } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";

const MatchList = () => {
  const { data, isLoading } = useGetMatchesQuery();
  const dispatch = useDispatch();

  // TODO: Loading görünümü ve diğer görünümleri değiştir.
  if (isLoading) {
    return (
      <div>Yükleniyor...</div>
    )
  }

  return (
    <div>
      {data?.map((match) => (
        <div key={match.id}>
          <h4>{match.name}</h4>

          {match.markets.map((market) => (
            <div key={market.id}>
              <strong>{market.name}</strong>

              <div>
                {market.odds.map((odd) => (
                  <button
                    key={odd.id}
                    onClick={() =>
                      dispatch(
                        addToCart({
                          matchId: match.id,
                          matchName: match.name,
                          marketId: market.id,
                          marketName: market.name,
                          oddId: odd.id,
                          oddLabel: odd.label,
                          oddValue: odd.value,
                        })
                      )
                    }
                  >
                    {odd.label}
                    ({odd.value})
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MatchList;