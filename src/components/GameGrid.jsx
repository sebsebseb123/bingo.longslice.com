import { useEffect, useState } from 'react'

import '../assets/sass/GameGrid.sass'

export default function GameGrid({ shots }) {
  const [gridCells, setGridCells] = useState([]);

  const alphaValues = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numValues = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  useEffect(() => {
    let cells = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        // Set the key, label, class.
        let key = alphaValues[j] + numValues[i];
        let label = (j == 0 || i == 0) ? key : '';
        let className = (j == 0 || i == 0) ? 'header' : 'grid';

        // Add "hit" class to any hits we have.
        className += shots.includes(key) ? ' hit' : '';

        // Great, add to our cells array.
        cells.push(<div className={className} key={key}>{label}</div>);
      }
    }

    // Update our grid cells.
    setGridCells(cells);
  }, [shots]);

  return (
    <div className="card">
      <h3>Targeting Scanner</h3>
      <div className="game-grid play-area">
        {gridCells}
      </div>
    </div>
  )
}
