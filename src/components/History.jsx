import '../assets/sass/History.sass'

export default function History({ shots }) {
  return (
    <div className="card">
      <h3>Target History</h3>
      <div className="history play-area">{shots.join(', ')}</div>
    </div>
  );
}
