import { FC } from 'react';
import { useQuestionsData } from '../hooks/useQuestionsData';
import { Button } from '@mui/material';
import { useQuestionsStore } from '../store/questions.store';

export const Footer: FC = () => {
	const { correct, incorrect, unanswered } = useQuestionsData();
	const reset = useQuestionsStore((state) => state.reset);

	return (
		<footer style={{ marginTop: '16px' }}>
			<p>
				<span style={{ color: 'green' }}>{correct}</span> correct -{' '}
				<span style={{ color: 'red' }}>{incorrect}</span> incorrect -{' '}
				<span style={{ color: 'gray' }}>{unanswered}</span> unanswered
			</p>
			<Button onClick={() => reset()}>Reset</Button>
		</footer>
	);
};
