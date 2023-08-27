import {
	Card,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';
import { useQuestionsStore } from '../store/questions.store';
import { Question as QuestionType } from '../types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { FC } from 'react';
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { Footer } from './Footer';

interface QuestionProps {
	info: QuestionType;
}

const getBackgroundColor = (info: QuestionType, index: number) => {
	const { userSelectedAnswer, correctAnswer } = info;

	if (userSelectedAnswer == null) return 'transparent';
	if (index !== correctAnswer && index !== userSelectedAnswer)
		return 'transparent';
	if (index === correctAnswer) return 'green';
	if (index === userSelectedAnswer) return 'red';

	return 'transparent';
};

const Question: FC<QuestionProps> = ({ info }) => {
	const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

	const createHandleClick = (answerIndex: number) => () => {
		selectAnswer(info.id, answerIndex);
	};

	return (
		<Card
			variant="outlined"
			sx={{
				padding: 2,
				bgcolor: '#222',
				textAlign: 'left',
				marginTop: 4,
			}}
		>
			<Typography variant="h5" component="h2">
				{info.question}
			</Typography>

			<SyntaxHighlighter language="javascript" style={gradientDark}>
				{info.code}
			</SyntaxHighlighter>

			<List sx={{ bgcolor: '#444' }} disablePadding>
				{info.answers.map((answer, index) => (
					<ListItem key={index} disablePadding divider>
						<ListItemButton
							disabled={info.userSelectedAnswer != null}
							onClick={createHandleClick(index)}
							sx={{
								backgroundColor: getBackgroundColor(info, index),
							}}
						>
							<ListItemText
								primary={answer}
								sx={{
									textAlign: 'center',
								}}
							/>
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Card>
	);
};

export const Game = () => {
	const questions = useQuestionsStore((state) => state.questions);
	const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
	const goToNextQuestion = useQuestionsStore((state) => state.goToNextQuestion);
	const goToPreviousQuestion = useQuestionsStore(
		(state) => state.goToPreviousQuestion
	);

	const questionInfo = questions[currentQuestion];

	return (
		<>
			<Stack direction="row" gap={2} alignItems="center" justifyContent="center">
				<IconButton onClick={goToPreviousQuestion} disabled={currentQuestion === 0}>
					<ArrowBackIosNew />
				</IconButton>

				<Typography variant="h5" component="h2">
					{currentQuestion + 1} / {questions.length}
				</Typography>
				<IconButton
					onClick={goToNextQuestion}
					disabled={currentQuestion >= questions.length - 1}
				>
					<ArrowForwardIos />
				</IconButton>
			</Stack>

			<Question info={questionInfo} />

			<Footer />
		</>
	);
};
