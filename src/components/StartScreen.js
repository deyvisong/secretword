import "./StartScreen.css";

const StartScreen = ({ startGame }) => {
  return (
    <div className="start">
      <h1>Secret Sword</h1>
      <p>Click to start to play</p>
      <button onClick={startGame}>Start game</button>
    </div>
  );
};

export default StartScreen;
