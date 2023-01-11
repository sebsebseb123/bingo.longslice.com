export default function Ships(props) {
  const ships = ['Destroyer', 'Cruiser', 'Submarine', 'Battleship', 'Carrier'];

  return (
    <>
      <h3>Targets Acuired</h3>
      <ul className="ships-sunk">
        {ships.map(ship => <li className={props.ships.includes(ship) ? 'sunk' : ''} key={ship}>{ship}</li>)}
      </ul>
    </>
  )
}
