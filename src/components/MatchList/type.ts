import { Match } from '../../types/match';
import { Market, Odd } from '../../types/match';

export type GroupedMatches = {
  [key: string]: Match[];
};

export type ListItem = { type: 'header'; value: string } | { type: 'match'; value: Match };

export interface MatchRowProps {
  match: Match;
  onOddClick: (match: Match, market: Market, odd: Odd) => void;
}

export interface OddCellProps {
  market: Market | undefined;
  oddLabel: string;
  matchId: string;
  onClick: (market: Market, odd: Odd) => void;
}
