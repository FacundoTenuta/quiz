import { create } from 'zustand';
import { Question } from '../types';
import confetti from 'canvas-confetti';
import { devtools, persist } from 'zustand/middleware';
import { getAllQuestions } from '../services/questions.service';

interface State {
	questions: Question[];
	currentQuestion: number;
	fetchQuestions: (limit: number) => Promise<void>;
	selectAnswer: (questionId: number, answerIndex: number) => void;
	goToNextQuestion: () => void;
	goToPreviousQuestion: () => void;
	reset: () => void;
}

/* const logger = (config: any) => (set: any, get: any, api: any) =>
	config(
		(args: any) => {
			console.log('  applying', args);
			set(args);
			console.log('  new state', get());
		},
		get,
		api
	); */

export const useQuestionsStore = create<State>()(
	devtools(
		persist(
			(set, get) => ({
				questions: [],
				currentQuestion: 0,
				fetchQuestions: async (limit: number) => {
					let questions: Question[] = await getAllQuestions();
					questions = questions.sort(() => Math.random() - 0.5).slice(0, limit);
					set({ questions });
				},
				selectAnswer: (questionId: number, answerIndex: number) => {
					const newQuestions = structuredClone(get().questions);

					const questionIndex = newQuestions.findIndex((q) => q.id === questionId);
					const questionInfo = newQuestions[questionIndex];
					const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex;

					if (isCorrectUserAnswer) confetti();

					newQuestions[questionIndex] = {
						...questionInfo,
						isCorrectUserAnswer,
						userSelectedAnswer: answerIndex,
					};

					set({ questions: newQuestions });
				},
				goToNextQuestion: () => {
					const currentQuestion = get().currentQuestion;
					const questions = get().questions;

					const nextQuestion = currentQuestion + 1;

					if (nextQuestion < questions.length) {
						set({ currentQuestion: nextQuestion });
					}
				},
				goToPreviousQuestion: () => {
					const currentQuestion = get().currentQuestion;

					const previousQuestion = currentQuestion - 1;

					if (previousQuestion >= 0) {
						set({ currentQuestion: previousQuestion });
					}
				},
				reset: () => {
					set({ questions: [], currentQuestion: 0 });
				},
			}),
			{
				name: 'questions-store',
			}
		)
	)
);
