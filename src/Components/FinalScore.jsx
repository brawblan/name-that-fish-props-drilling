import "../Components/styles/final-score.css";

export const FinalScore = ({ props: { incorrectCount, correctCount } }) => {
  const totalCount = incorrectCount + correctCount;

  return (
    <div id="final-score">
      <h1>Your Final Score Was</h1>
      <div id="score">
        <p>{correctCount}</p>
        <hr />
        <p>{totalCount}</p>
      </div>
    </div>
  );
};
