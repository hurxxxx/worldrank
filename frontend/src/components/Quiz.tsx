import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { questions } from '../data/questions';
import './Quiz.css';

interface QuizProps {
    onFinish: (answers: boolean[], questionTimes: number[]) => void;
}

export const Quiz = ({ onFinish }: QuizProps) => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [questionTimes, setQuestionTimes] = useState<number[]>([]);
    const questionStartTime = useRef<number>(0);
    const [direction, setDirection] = useState(1); // 1: forward, -1: backward

    // Reset timer when question changes
    useEffect(() => {
        questionStartTime.current = Date.now();
    }, [index]);

    const handleAnswer = (answer: boolean) => {
        const now = Date.now();
        if (questionStartTime.current === 0) {
            questionStartTime.current = now;
        }

        // Calculate time spent on this question
        const timeSpent = now - questionStartTime.current;

        // Update or add answer and time
        const newAnswers = [...answers];
        const newTimes = [...questionTimes];

        if (index < answers.length) {
            // Updating existing answer
            newAnswers[index] = answer;
            newTimes[index] = timeSpent;
        } else {
            // New answer
            newAnswers.push(answer);
            newTimes.push(timeSpent);
        }

        setAnswers(newAnswers);
        setQuestionTimes(newTimes);

        // Move to next question or finish
        if (index < questions.length - 1) {
            setDirection(1);
            setTimeout(() => {
                setIndex(index + 1);
            }, 200);
        } else {
            onFinish(newAnswers, newTimes);
        }
    };

    const handleBack = () => {
        if (index > 0) {
            setDirection(-1);
            setIndex(index - 1);
        }
    };

    const question = questions[index];
    const progress = ((index + 1) / questions.length) * 100;

    return (
        <div className="quiz-container">
            <div className="progress-container">
                <div className="progress-bar">
                    <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
                <div className="progress-text">
                    {index + 1} / {questions.length}
                </div>
            </div>

            <div className="quiz-content">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={question.id}
                        initial={{ x: direction * 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: direction * -20, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="question-card glass-panel"
                    >
                        <div className="question-header">
                            <motion.button
                                className={`btn-back ${index === 0 ? 'hidden' : ''}`}
                                onClick={handleBack}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                aria-label={t('Back')}
                                disabled={index === 0}
                            >
                                ←
                            </motion.button>
                            <div className="category-badge">{t(question.category).split('(')[0].trim()}</div>
                        </div>
                        <h2 className="question-text">{t(question.id)}</h2>

                        <div className="options-grid">
                            <button
                                className={`btn-option yes ${answers[index] === true ? 'selected' : ''}`}
                                onClick={() => handleAnswer(true)}
                            >
                                {t('YES')}
                                <span className="key-hint">{t('Yes_Hint')}</span>
                            </button>

                            <button
                                className={`btn-option no ${answers[index] === false ? 'selected' : ''}`}
                                onClick={() => handleAnswer(false)}
                            >
                                {t('NO')}
                                <span className="key-hint">{t('No_Hint')}</span>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
