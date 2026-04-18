export type PredictionCardType = {
  id: number;
  home: string;
  away: string;
  competition: string;
  category: string;
  consensus: number;
  timeline: number;
  models: Model[];
  participantsNumber: number;
  growing?: boolean;
};

type Model = {
  title: string;
  precision: number;
}