import {
  DataStore,
  Storage,
} from 'aws-amplify'
import { Game } from '../models'

// Observes the game board.
export function ObserveBingo() {
  return DataStore.observeQuery(Game, (c) => c.id.eq("4e2f7a61-3aa9-416e-af73-ec2784006ed7"));
}

// Reset the board by sending blank arrays to AWS.
export async function ResetBingo() {
  const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
  await DataStore.save(
    Game.copyOf(original, updated => {
      updated.shots = [];
      updated.ships = [];
    })
  )
}

// Recursive until we find a spot available to fire a shot.
function findShot(shots) {
  let alpha = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  let shot = alpha[Math.floor(Math.random() * 10)] + (Math.floor(Math.random() * 10) + 1);
  return shots.includes(shot) ? findShot(shots) : shot;
}

// Fire a shot and update AWS.
export async function FireShot() {
  const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
  if (original.shots.length >= 100) {
    return;
  }
  let shot = findShot(original.shots);
  await DataStore.save(
    Game.copyOf(original, updated => {
      updated.shots.unshift(shot);
    })
  )

  return shot;
}

// Possible ship values.
export const ShipValues = [
  'Destroyer [2x]',
  'Submarine [3x]',
  'Cruiser [3x]',
  'Battleship [4x]',
  'Carrier [5x]',
];

// Sink a ship and update AWS.
export async function SinkShip(ship) {
  const original = await DataStore.query(Game, "4e2f7a61-3aa9-416e-af73-ec2784006ed7");
  await DataStore.save(
    Game.copyOf(original, updated => {
      updated.ships.includes(ship) ?
        (updated.ships = updated.ships.filter(v => v !== ship)) :
        updated.ships.push(ship);
    })
  )
}

export function PutAudioFile(file) {
  return Storage.put(file.name, file, {
    contentType: file.type,
  })
    .catch(error => console.log("Error uploading file: ", error))
}

export function DeleteAudioFile(fileName) {
  return Storage.remove(fileName);
}

export function GetAudioFilez() {
  // Call AWS list.
  return Storage.list('', { pageSize: 'ALL' })
    .then((response) => response.results)
    .then((results) => {
      // Sort by upload date.
      results = results.sort((a, b) => {
        return (a.lastModified.getTime() <= b.lastModified.getTime()) ? 1 : -1;
      })
      return Promise.all(results.map(async (result, i) => {
        let uri = await Storage.get(result.key);
        return ({
          uri: uri,
          name: result.key,
        })
      }))
    })
    .catch((err) => console.log(err));
}
