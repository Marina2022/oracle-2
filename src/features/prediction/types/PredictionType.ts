
export type PredictionType = {
  id: number;
  home: string;
  away: string;
  category: string;
  timeline: number;
  consensus: Consensus;
  models: PredictionModel[];
  participantsNumber: number;
  voiting: PredictionVoting[];
  comments: PredictionCommentType[];
  result?: {
    score: string;
    won: string;
    source: string;
  };
};


type Consensus = {
  p_home: number;
  p_away: number;
  p_draw: number;
  p_ai_selected: number;
  oracul_score: number;
  p_book: number;
};


export type PredictionModel = {
  model_title: string;
  confidence: number;
  prediction: string;
  reasonigs: Reasonings;
  detailed_analysis: string;
  historic_precision: number;
  predictions_number: number;
  data_sources: DataSource[];
};

type Reasonings = {
  factors: Factor[];
  data_gaps: string[];
};

type Factor = {
  title: string;
  text: string;
};

type DataSource = {
  name: string;
};

export type PredictionVoting = {
  lable: string;
  percent: number;
  peopleNumber: number;
};

export type PredictionCommentType = {
  sendingTime: string;
  sender: Sender;
  message: string;
  likes: number;
};

type Sender = {
  name: string;
  level: number;
  avatar: string | null;
};
