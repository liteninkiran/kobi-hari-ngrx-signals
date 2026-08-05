import { Question } from '../models/question.model';

type Props = {
  answers: number[];
  questions: Question[];
};

export const getCorrectCount = ({ answers, questions }: Props): number => {
  return answers.filter((answer, i) => answer === questions[i]?.correctIndex).length;
};
