import { ReactNode } from "react";

export type Model = {
  id: string;
  title: string;
  description: string;
  precision: number;
  predictionNumber: number;
  icon: ReactNode;
}