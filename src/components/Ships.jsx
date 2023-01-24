import '../assets/sass/Ships.sass'

export default function Ships({ ships }) {
  const shipList = ['Destroyer', 'Cruiser', 'Submarine', 'Battleship', 'Carrier'];

  return (
    <div className="card">
      <h3>Targets Acuired</h3>
      <div className="ships-sunk">
        {shipList.map(ship => <div className={ships.includes(ship) ? 'sunk' : ''} key={ship}>{ship}</div>)}
      </div>
    </div>
  )
}
