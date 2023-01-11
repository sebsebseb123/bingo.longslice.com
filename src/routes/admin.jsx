import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Root from './root'
import { DataStore } from 'aws-amplify'
import { Game } from '../models'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

function Admin({ signOut, user }) {
  // Reset the board by sending blank arrays to AWS.
  async function resetGrid() {
    const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
    await DataStore.save(
      Game.copyOf(original, updated => {
        updated.shots = [];
        updated.ships = [];
      })
    )
  }

  function findShot(shots) {
    let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    let shot = alpha[Math.floor(Math.random() * 10)] + (Math.floor(Math.random() * 10) + 1);
    return shots.includes(shot) ? findShot(shots) : shot;
  }

  // Fire a shot and update AWS.
  async function fireShot() {
    const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
    if (original.shots.length >= 100) {
      return;
    }
    let shot = findShot(original.shots);
    await DataStore.save(
      Game.copyOf(original, updated => {
        updated.shots.push(shot);
      })
    )
  }

  // Define ships.
  const ships = ['Destroyer', 'Cruiser', 'Submarine', 'Battleship', 'Carrier'];
  // Sink a ship and update AWS.
  async function sinkShip(e) {
    let ship = e.target.value;
    const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
    await DataStore.save(
      Game.copyOf(original, updated => {
        updated.ships.includes(ship) ?
          (updated.ships = updated.ships.filter(v => v !== ship)) :
          updated.ships.push(ship);
      })
    )
  }

  return (
    <>
      <Button onClick={fireShot} variant="contained" color="error">💣Fire💥</Button>
      <hr />
      <ButtonGroup variant="contained" color="primary">
        {ships.map((ship) => <Button key={ship} value={ship} onClick={sinkShip}>{ship}</Button>)}
      </ButtonGroup>
      <hr />
      <Root />
      <hr />
      <Button onClick={signOut} variant="outlined" color="error">Sign out</Button>
      <Button onClick={resetGrid} variant="outlined" color="error">Reset Grid</Button>
    </>
  );
}

export default withAuthenticator(Admin, { hideSignUp: true });
