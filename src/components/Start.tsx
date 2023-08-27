import { Button } from '@mui/material';
import { FC } from 'react';
import { useQuestionsStore } from '../store/questions.store';

const LIMIT_QUESTIONS = 10;

export const Start: FC = () => {
	const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

	const handleClick = () => {
		fetchQuestions(LIMIT_QUESTIONS);
	};
	return (
		<Button onClick={handleClick} variant="contained">
			Start
		</Button>
	);
};
