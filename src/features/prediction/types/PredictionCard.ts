export type PredictionCardType = {
  id: number;
  home: string;
  away: string;
  competition: string;
  category: string;
  consensus: number;
  timeline: number;
  models: PredictionCardModel[];
  participantsNumber: number;
  growing?: boolean;
};

export type PredictionCardModel = {
  title: string;
  precision: number;
}