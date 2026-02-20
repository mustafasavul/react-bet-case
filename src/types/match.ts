export interface Odd {
  id: string;
  label: string;
  value: number;
}

export interface Market {
  id: string;
  name: string;
  mbs?: number;
  odds: Odd[];
}

export interface Match {
  id: string;
  code: string;
  name: string;
  date: string;
  day: string;
  time: string;
  league: string;
  markets: Market[];
}
