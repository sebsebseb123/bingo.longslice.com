import { useState } from 'react'

import {
  FireShot,
  ShipValues,
  SinkShip,
} from '../api/Bingo'
import '../assets/sass/Ships.sass'

export default function Ships({ shipsSunk, admin }) {
  const [firing, setFiring] = useState(false);
  let ships = [];
  shipsSunk = shipsSunk ?? [];

  function onClickSinkShip(e) {
    let ship = e.target.value;
    SinkShip(ship);
  }

  const onClickFire = async function () {
    // Set this to true to disable the button.
    setFiring(true);
    // Set a 2 sec timer to enable it again.
    setTimeout(() => {
      setFiring(false);
    }, 1000);

    // Get a shot and fire it over to AWS.
    let shot = await FireShot();


    let element = document.getElementById('audio-' + shot);

    if (element !== null) {
      element.play();
    }
  }

  if (admin) {
    // Create button elements.
    ships = ShipValues.map(ship => {
      return (
        <button
          className={shipsSunk.includes(ship) ? 'sunk ship' : 'ship'}
          key={ship}
          value={ship}
          onClick={onClickSinkShip}
        >
          {ship}
        </button>
      );
    });

    ships.unshift(
      <button
        key="_fire"
        className='fire-button'
        onClick={onClickFire}
        disabled={firing}
      >
        💣Fire💥
      </button>
    );
  }
  else {
    // Just make them divs.
    ships = ShipValues.map(ship => {
      return (
        <div
          className={shipsSunk.includes(ship) ? 'sunk ship' : 'ship'}
          key={ship}
        >
          {ship}
        </div>
      );
    });
  }
  return (
    <div className={admin ? "card control-buttons" : "card"}>
      <h3>{admin ? "Command Panel" : "Targets Acuired"}</h3>
      <div className="ships-sunk play-area">
        {ships}
      </div>
    </div>
  )
}
