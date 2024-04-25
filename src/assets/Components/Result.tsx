type ResultProps = {
    score: number;
    restartQuiz: () => void;
};

const Result = (props: ResultProps) => {
    return (
        <section>
            <h2>Resultat</h2>
            <p>Du fick {props.score} rätta svar!</p>
            <button onClick={props.restartQuiz}>Börja om</button>
        </section>
    );
};

export default Result;
