export default function History(props) {
  return (
    <>
      <h3>Target History</h3>
      <div className="history">{props.shots.join(', ')}</div>
    </>
  );
}
