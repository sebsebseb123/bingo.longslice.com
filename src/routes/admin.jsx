import { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'

import {
  Box,
  Button,
  ButtonGroup,
} from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'

import Root from './root'
import { DataStore, Storage } from 'aws-amplify'
import { Game } from '../models'
import { withAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { resolveAuthenticatorComponents } from '@aws-amplify/ui-react-core'

import SoundCard from '../components/SoundCard'

function Admin({ signOut, user }) {
  const [filez, setFilez] = useState([]);

  // On page load.
  useEffect(() => {
    listFilez();
  }, []);


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

  // Recursive until we find a spot available.
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

  function listFilez() {
    const fileResultz = [];
    Storage.list('')
      .then((response) => {
        response.results.map(async (result) => {
          let fileURI = await Storage.get(result.key);
          result.uri = fileURI;
          fileResultz.push(result);
          setFilez(fileResultz);
        })
      })
      .catch((err) => console.log(err));
  }

  async function selectFile(files) {
    // if (e.type == undefined) return;
    const file = files[0];
    try {
      await Storage.put(file.name, file, {
        contentType: file.type,
      });
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop: selectFile,
    accept: {
      'audio/mpeg': [],
    },
    maxFiles: 1,
  });
  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <hr />
      {
        filez.map((file, i) => {
          return (<SoundCard key={file.key} file={file} />);
        })
      }
      <hr />
      <Box sx={{ display: 'flex', flexGrow: 1, textAlign: 'center' }}>
        <Grid container spacing={2}>
          <Grid>
            <Button onClick={fireShot} variant="contained" color="error">💣Fire💥</Button>
          </Grid>
          <Grid>
            <ButtonGroup variant="contained" color="primary">
              {ships.map((ship) => <Button key={ship} value={ship} onClick={sinkShip}>{ship}</Button>)}
            </ButtonGroup>
          </Grid>
        </Grid>
      </Box>
      <hr />
      <Root />
      <hr />
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid>
            <Button onClick={signOut} variant="outlined" color="error">Sign out</Button>
          </Grid>
          <Grid>
            <Button onClick={resetGrid} variant="outlined" color="error">Reset Grid</Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default withAuthenticator(Admin, { hideSignUp: true });
