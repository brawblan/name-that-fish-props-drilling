import "./App.css";
import { useState, useRef, useEffect } from 'react';
import { GameBoard } from "./Components/GameBoard";
import { ScoreBoard } from "./Components/ScoreBoard";
import { FinalScore } from "./Components/FinalScore";
import { INIT_ANSWERS, INIT_FISHES } from './constants';

function App() {
  const reset = useRef(null);
  const input = useRef(null);

  const [incorrectCount, setIncorrectCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [answersLeft, setAnswersLeft] = useState(INIT_ANSWERS);
  const [fishInfo, setFishInfo] = useState(INIT_FISHES);
  const [currentFishToName, setCurrentFishToName] = useState(fishInfo[0]);

  const handleCount = (guess) => {
    if (guess === currentFishToName.name) {
      setCorrectCount(correctCount + 1);
    } else {
      setIncorrectCount(incorrectCount + 1);
    }
  };

  const handleAnswers = (guess) => {
    const guessIndex = answersLeft.indexOf(guess);
    const removeGuess = answersLeft.filter((_, index) => guessIndex !== index);
    setAnswersLeft(removeGuess);
  };

  const handleFishInfo = (guess) => {
    const newFishInfo = fishInfo.filter(({ name }) => guess !== name);
    setFishInfo(newFishInfo);
    setCurrentFishToName(newFishInfo[0]);
  };

  const handleFocusReset = () => {
    (incorrectCount + correctCount === 3) && reset.current.focus();
  };

  const handleGuess = (guess) => {
    handleCount(guess);
    handleAnswers(guess);
    handleFishInfo(guess);
    handleFocusReset();
  };

  useEffect(() => {
    (incorrectCount + correctCount === 0) && input.current.focus();
  });

  const resetGame = () => {
    setIncorrectCount(0);
    setCorrectCount(0);
    setAnswersLeft(INIT_ANSWERS);
    setFishInfo(INIT_FISHES);
    setCurrentFishToName(INIT_FISHES[0]);
  };

  const propsToDrill = {
    incorrectCount,
    correctCount,
    answersLeft,
    currentFishToName,
    handleGuess
  };

  return (
    <div className="App">
      <header>
        <ScoreBoard props={propsToDrill} />
        {answersLeft.length ? (
          <GameBoard props={propsToDrill} ref={input} />
        ) : (
          <FinalScore props={propsToDrill} />
        )}
      </header>
      <button ref={reset} onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default App;
