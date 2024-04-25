import { useState, useEffect } from "react";

interface Question {
    question: string;
    answers: string[];
    correct: number;
}

type GameProps = {
    showResult: () => void;
    answeredCorrectly: () => void;
};

const Game = (props: GameProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
            const data = await response.json();
            if (data.response_code === 5) {
                console.error("The requested number of questions exceeds the number of available questions.");
            } else if (data.results) {
                const fetchedQuestions: Question[] = data.results.map((result: any) => {
                    const question: Question = {
                        question: result.question,
                        answers: [...result.incorrect_answers, result.correct_answer],
                        correct: result.incorrect_answers.length, // Index of correct answer in answers array
                    };
                    // Shuffle answers
                    question.answers.sort(() => Math.random() - 0.5);
                    return question;
                });
                setQuestions(fetchedQuestions);
            } else {
                console.error("Unexpected API response:", data);
            }
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const question: Question | undefined = questions[currentQuestion];

    const options = question
        ? question.answers.map((answer, index) => (
              <p key={index}>
                  <label>
                      <input type="radio" name="answers" onClick={() => setSelectedAnswer(index)} />
                      {answer}
                  </label>
              </p>
          ))
        : null;

    const handleDecided = () => {
        if (selectedAnswer === question?.correct) {
            props.answeredCorrectly();
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            props.showResult();
        }
    };

    return (
        <section>
            {question && (
                <>
                    <h3>{question.question}</h3>
                    {options}
                    <button onClick={handleDecided}>Svara</button>
                </>
            )}
        </section>
    );
};

export default Game;
