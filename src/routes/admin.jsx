import { useEffect, useState } from 'react'
import { withAuthenticator } from '@aws-amplify/ui-react'
import {
  ObserveBingo,
  ResetBingo,
  GetAudioFilez,
  PutAudioFile,
  DeleteAudioFile,
} from '../api/Bingo'
import Header from '../components/Header'
import SoundBoard from '../components/SoundBoard'
import GameGrid from '../components/GameGrid'
import History from '../components/History'
import Ships from '../components/Ships'
import '../assets/sass/styles.sass'
import '../assets/sass/Admin.sass'

const Admin = function ({ signOut }) {
  const [shots, setShots] = useState([]);
  const [shipsSunk, setShipsSunk] = useState([]);
  const [filez, setFilez] = useState([]);
  const [editMode, setEditMode] = useState(false);

  // On page load.
  useEffect(() => {
    // Get the audio file data.
    updateFilez();

    // Subscribe to game data.
    const sub = ObserveBingo()
      .subscribe(({ items }) => {
        setShots(items[0].shots);
        setShipsSunk(items[0].ships);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  const updateFilez = function () {
    async function fetchData() {
      let resultz = await GetAudioFilez() ?? [];
      setFilez(resultz);
    }
    fetchData();
  }

  const onClickDelete = async function (e) {
    await DeleteAudioFile(e.target.value);
    updateFilez();
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

  const onClickEditMode = function () {
    setEditMode(!editMode);
  }

  return (
    <>
      <SoundBoard filez={filez} editMode={editMode} onClickDelete={onClickDelete} onSelectFile={onSelectFile} />
      <hr />
      <div className="cards">
        <GameGrid
          admin={true}
          filez={filez}
          shots={shots}
          onClickDelete={onClickDelete}
        />
        <History shots={shots} />
        <Ships admin={true} shipsSunk={shipsSunk} />
      </div>
      <hr />
      <footer>
        <div className="reset-buttons">
          <button onClick={signOut}>Sign out</button>
          <button className={`edit-button${editMode ? ' edit' : ''}`} onClick={onClickEditMode}>Edit Mode</button>
          <button onClick={ResetBingo}>Reset Grid</button>
        </div>
        &copy; Longslice Brewery Inc.
      </footer>
    </>
  );
}

export default withAuthenticator(Admin, { hideSignUp: true });
