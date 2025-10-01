export type PredictionType =
  {
    id: string,
    title: string,
    category: string,
    content: string,
    consensus: number,
    timeline: number,
    participantsNumber: number,
    growing: boolean,
    models: {
      title: string,
      precision: number,
    } []
  }

export type ModelForDetailedPrediction = {
  modelTab: string,
  modelTitle: string,
  answerIsPositive: boolean,
  prediction?: string,
  confidence: number,
  historicPrecision: number,
  predictionsNumber: number,
  sources: string[],
  reasonings: { title: string, text: string }[],
  detailedAnalysis: string,
  resume: string,
}

export type CommentForDetailedPrediction = {
  sendingTime: string,  // потом будет timestamp - number
  sender: { name: string, level: number, avatar: string | null },
  message: string,
  likes: number,
}

export type Voting = { label: string, percent: number, peopleNumber: number }[]

export type PredictionDetailed =
  {
    id: string,
    title: string,
    category: string,
    description: string,
    models: ModelForDetailedPrediction[],
    voting: Voting,
    comments: CommentForDetailedPrediction[],
    timeline: number,
    participantsNumber: number,
    consensus?: ConsensusType
  }


type ConsensusType = { title: string, value: number }[]

