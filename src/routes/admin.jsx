import {
  ObserveBingo,
  ResetBingo,
  GetAudioFilez,
  PutAudioFile,
  DeleteAudioFile,
  FireShot,
} from '../api/Bingo'

import { useEffect, useState } from 'react'

import Root from './root'
import { withAuthenticator } from '@aws-amplify/ui-react'
import { resolveAuthenticatorComponents } from '@aws-amplify/ui-react-core'

import SoundBoard from '../components/SoundBoard'
import AutoSoundBoard from '../components/AutoSoundBoard'
import '../assets/sass/Admin.sass'

const Admin = function ({ signOut, user }) {
  const [filez, setFilez] = useState([]);

  // On page load.
  useEffect(() => {
    updateFilez();
  }, []);

  const updateFilez = function () {
    async function fetchData() {
      let resultz = await GetAudioFilez();
      const regex = new RegExp('^[A-J][1-9]0?');
      let autoSounds = resultz.filter(result => regex.test(result.name));
      let boardSounds = resultz.filter(result => !regex.test(result.name));
      let tmp = {
        autoSounds: autoSounds,
        boardSounds: boardSounds,
      }
      setFilez(tmp);
    }
    fetchData();
  }

  const onClickDelete = async function (e) {
    await DeleteAudioFile(e.target.value);
    updateFilez();
  }

  const onClickFire = async function () {
    let shot = await FireShot();

    try {
      document.getElementById('audio-' + shot).play();
    } catch (e) {
      // Do nothing.
    }
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

  // When we pick files, do something.
  async function onSelectFile(files) {
    const file = files[0];
    // Check for a file.
    if (file == undefined) return;
    // Upload it.
    await PutAudioFile(file);
    // Update the filez available.
    updateFilez();
  }

  return (
    <>
      <SoundBoard filez={filez} onClickDelete={onClickDelete} onSelectFile={onSelectFile} />
      <hr />
      <div className="admin-buttons">
        <div className="action-buttons">
          <button onClick={onClickFire}>💣Fire💥</button>
        </div>
        <div className="ship-buttons">
          {ships.map((ship) => <button key={ship} value={ship} onClick={sinkShip}>{ship}</button>)}
        </div>
      </div>
      <hr />
      <Root />
      <hr />
      <AutoSoundBoard filez={filez} />
      <div className="reset-buttons">
        <button onClick={signOut}>Sign out</button>
        <button onClick={ResetBingo}>Reset Grid</button>
      </div>
    </>
  );
}

export default withAuthenticator(Admin, { hideSignUp: true });
