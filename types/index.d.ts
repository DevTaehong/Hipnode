import React from "react";

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export type AnswersType = string | string[];

export type UserAnswersType = {
  answerQuestion1?: string;
  answerQuestion2?: string;
  answersQuestion3?: string[];
};

export type QuestionKeysMapType = {
  [key: number]: string;
};

export type PostItem = {
  title: string;
  icon: React.FC<{ additionalClass?: string }>;
  iconBgColor: string;
};
