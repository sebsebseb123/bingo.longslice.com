export default function History({ shots }) {
  return (
    <>
      <h3>Target History</h3>
      <div className="history">{shots.join(', ')}</div>
    </>
  );
}
