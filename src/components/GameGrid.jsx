import '../assets/sass/GameGrid.sass'

export default function GameGrid({ shots, admin, filez, onClickDelete }) {
  const alphaValues = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numValues = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  return (
    <div className="card">
      <h3>Targeting Scanner</h3>
      <div className="game-grid play-area">
        {alphaValues.map((alphaVal, i) => {
          return numValues.map((numValue, j) => {
            let key = alphaValues[j] + numValues[i];
            let label = (j == 0 || i == 0) ? key : '';
            let className = (j == 0 || i == 0) ? 'header' : 'grid';

            // Add "hit" class to any hits we have.
            className += shots.includes(key) ? ' hit' : '';

            return (
              <div key={key} id={key} className={className}>
                {label}
              </div>
            );
          })
        })}
      </div>
    </div>
  )
}
