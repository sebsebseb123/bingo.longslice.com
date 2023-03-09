import '../assets/sass/History.sass'

export default function History({ shots }) {
  const lastShot = shots[0] ? shots[0] : '';
  // Create a copy of the shots array with the first element removed.
  const oldShots = shots.slice(1);
  return (
    <div className="card">
      <h3>Target History</h3>
      <div className="history play-area">
        <div className="last-shot">{lastShot}</div>
        {oldShots.map((shot) => {
          return (
            <div className="shot" key={shot}>
              {shot},
            </div>
          );
        })}
      </div>
    </div>
  );
}
