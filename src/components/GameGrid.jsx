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

            if (admin && filez.autoSoundKeys.length > 0 && filez.autoSoundKeys.includes(key)) {
              let file = filez.autoSounds.filter(sound => key == sound.name.replace(/\.wav|\.mp3/gi, ''))[0];
              return (
                <div key={key} id={key} className={className}>
                  <audio
                    id={'audio-' + key}
                    src={file.uri}
                    preload="true"
                  />
                  <div className="controls">
                    <button
                      className="auto-play"
                      onClick={() => document.getElementById('audio-' + key).play()}
                    >
                      &#9654;
                    </button>
                    <button className="auto-trash" onClick={onClickDelete} value={file.name}>🗑️</button>
                  </div>
                </div>
              );

            }
            else {
              return (
                <div key={key} id={key} className={className}>
                  {label}
                </div>
              );
            }
          })
        })}
      </div>
    </div>
  )
}
