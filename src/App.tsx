import { useEffect, useState } from "react";
import "./App.css";
import Welcome from "./assets/Components/Welcome";
import Game from "./assets/Components/Game";
import Result from "./assets/Components/Result";

// 1. skriv om quiz appen
// 2. modifiera quiz appen till att använda ett api i stället tex // https://opentdb.com/
// 3. Bygg ut welcome till år välja kategori att användaren fav frågor osv

enum Screen {
    WELCOME = "welcome",
    GAME = "game",
    RESULT = "result",
}

function App() {
    const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.WELCOME);
    const [score, setScore] = useState<number>(0);
    // [data , setData ]

    let content: React.ReactElement | null = null;

    useEffect(() => {
        // let recivedData = fetch()
        // setData(recivedData)
    }, []);

    const restartQuiz = () => {
        setScore(0);
        setCurrentScreen(Screen.WELCOME);
    };

    switch (currentScreen) {
        case Screen.WELCOME:
            content = <Welcome nextScreen={() => setCurrentScreen(Screen.GAME)} />;
            break;
        case Screen.GAME:
            content = <Game showResult={() => setCurrentScreen(Screen.RESULT)} answeredCorrectly={() => setScore(score + 1)} />;
            break;
        case Screen.RESULT:
            content = <Result score={score} restartQuiz={restartQuiz} />;
            break;
        default:
            content = null;
    }

    return <>{content}</>;
}

export default App;
