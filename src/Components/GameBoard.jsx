import "./styles/game-board.css";
import { useState, forwardRef } from 'react';

export const GameBoard = forwardRef(({ props: { answersLeft, currentFishToName, handleGuess } }, ref) => {
  const [guess, setGuess] = useState('');

  const handleInput = ({ target: { value } }) => setGuess(value);

  const guessFish = (e, guess) => {
    e.preventDefault();
    handleGuess(guess);
    setGuess('');
  };

  return (
    <div id="game-board">
      <div id="fish-container">
        <img src={currentFishToName.url} alt={currentFishToName.name} />
      </div>
      <form id="fish-guess-form" onSubmit={(e) => guessFish(e, guess)}>
        <label htmlFor="fish-guess">What kind of fish is this?</label>
        <input ref={ref} type="text" name="fish-guess" value={guess} onChange={(e) => handleInput(e)} />
        <input type="submit" disabled={!answersLeft.includes(guess)} />
      </form>
    </div>
  );
});
