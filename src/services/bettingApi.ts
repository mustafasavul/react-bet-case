import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Match } from "../types/match";

export const bettingApi = createApi({
  reducerPath: "bettingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://nesine-case-study.onrender.com",
  }),
  endpoints: (builder) => ({
    getMatches: builder.query<Match[], void>({
      query: () => "/bets",
      transformResponse: (response: any[]): Match[] => {
        return response
          .filter(node => node.S === "Open") // IMF suspended control "S"
          .map((node) => ({
            id: node.NID,
            code: node.C,
            name: node.N,
            date: node.D,
            day: node.DAY,
            time: node.T,
            league: node.LN,
            markets: Object.values(node.OCG).map((market: any) => ({
              id: market.ID,
              name: market.N,
              mbs: Number(market.MBS),
              odds: Object.values(market.OC)
                .filter((odd: any) => !odd.IMF) // not suspended
                .map((odd: any) => ({
                  id: odd.ID,
                  label: odd.N,
                  value: Number(odd.O),
                })),
            })),
          }));
      },
    }),
  }),
});

export const { useGetMatchesQuery } = bettingApi;

// API Data short code Descriptions

// D → Tarih (Date)
// DAY → Gün bilgisi (Day)
// LN → Lig adı (League Name)

// C → Maç kodu (Coupon/Event Code)
// T → Saat (Time)
// N → Maç adı (Match Name)

// MBS → Minimum bahis seçimi (Minimum Bet Selection)

// OCG>1>OC>0>O → Maç sonucu 1 oranı (Home Win Odds)

// OCG>5>OC>26>N → Üst 2.5 gol seçeneği adı (Over Option Label)

// OCG>2>OC>3>O → Çifte şans 1-X oranı
// OCG>2>OC>4>O → Çifte şans 1-2 oranı
// OCG>2>OC>5>O → Çifte şans X-2 oranı