import { useEffect, useState, useMemo } from 'react'

export default function AutoSoundBoard({ filez }) {
  const autoSounds = filez.autoSounds ?? [];
  const [gridCells, setGridCells] = useState([]);

  const alphaValues = ['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const numValues = ['', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  useEffect(() => {
    let autoSoundKeys = autoSounds.map(sound => sound.name.toUpperCase().replace(/\.wav|\.mp3/gi, ''));

    let cells = [];
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        // Set the key, label, class.
        let key = alphaValues[j] + numValues[i];
        let label = (j == 0 || i == 0) ? key : '-';
        let className = (j == 0 || i == 0) ? 'header' : 'grid';

        // Add "hit" class to any hits we have.
        // className += shots.includes(key) ? ' hit' : '';

        // Great, add to our cells array.
        if (j == 0 || i == 0) {
          cells.push(
            <div key={key} className={className + ' ' + key}>
              {label}
            </div>
          );
        }
        else if (autoSoundKeys.includes(key)) {
          // Get file info.
          let file = autoSounds.filter(sound => key == sound.name.toUpperCase().replace(/\.wav|\.mp3/gi, ''))[0];
          cells.push(
            <div key={key} className={className + ' ' + key}>
              <audio id={'audio-' + key} src={file.uri} preload="true" />
              <div className="controls">
                <button onClick={() => document.getElementById('audio-' + key).play()}>Play</button>
              </div>
            </div>
          );
        }
        else {
          cells.push(
            <div key={key} className={className + ' ' + key}>
              {label}
            </div>
          );
        }
      }
    }

    // Update our grid cells.
    setGridCells(cells);
  }, [filez]);

  return (
    <div className="card auto-sound">
      <h3>Auto-Play Sounds</h3>
      <div className="game-grid play-area">
        {gridCells}
      </div>
    </div>
  )
}
