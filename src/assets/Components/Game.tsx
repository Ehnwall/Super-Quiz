import { useState } from "react";

interface Question {
    question: string; // När är julafton
    answers: string[]; // ["24 dec", "8 maj" , "3 jul"]
    correct: number; // 0
}

type GameProps = {
    showResult: () => void;
    answeredCorrectly: () => void;
};

const Game = (props: GameProps) => {
    const questions: Question[] = getQuestions();

    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    const question: Question = questions[currentQuestion];

    const options = question.answers.map((answer, index) => (
        <p key={index}>
            <label>
                <input type="radio" name="answers" onClick={() => setSelectedAnswer(index)} />
                {answer}
            </label>
        </p>
    ));

    const handleDecided = () => {
        // kolla om rätt
        if (selectedAnswer == question.correct) {
            props.answeredCorrectly();
        }

        // byt fråga
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // gå vidare till result
            props.showResult();
        }
    };

    return (
        <section>
            <h3>{question.question}</h3>
            {options}
            <button onClick={handleDecided}>Svara</button>
        </section>
    );
};

const getQuestions = (): Question[] => {
    return [
        {
            question: "När är Julafton?",
            answers: ["24 maj", "24 dec", "3 maj"],
            correct: 1,
        },
        {
            question: "Vad är bäst?",
            answers: ["javascript", "typescript", "css"],
            correct: 1,
        },
        {
            question: "Vad är bäst?",
            answers: ["discord", "zoom", "teams"],
            correct: 0,
        },
        {
            question: "Vad är bäst?",
            answers: ["MacOs", "windows", "Linux"],
            correct: 2,
        },
    ];
};

export default Game;
