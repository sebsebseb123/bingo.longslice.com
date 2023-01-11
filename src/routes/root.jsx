import { useEffect, useState } from 'react'

import { DataStore } from '@aws-amplify/datastore'
import { Game } from '../models';

import {
  Container,
  Grid,
  Box,
} from '@mui/material'

import GameGrid from '../components/GameGrid'
import History from '../components/History'
import Ships from '../components/Ships'
import '../assets/styles.css'

export default function Root() {
  const [shots, setShots] = useState([]);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    /**
     * This keeps the grid fresh.
     */
    const sub = DataStore.observeQuery(Game, (c) =>
      c.id.eq("4e2f7a61-3aa9-416e-af73-ec2784006ed7")
    ).subscribe(({ items }) => {
      setShots(items[0].shots);
      setShips(items[0].ships);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <>
      <Container>
        <Box sx={{ flexGrow: 1 }} display={{ sm: "none" }}>
          <Grid container spacing={0}>
            <Grid xs={12}>
              <svg viewBox='0 0 635 230'>
                <text x="40" y="100" fill="#24c200">Battleship</text>
                <text x="180" y="180" fill="#24c200">Bingo</text>
              </svg>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <Grid container spacing={0}>
            <Grid xs={12} md={6} lg={4}>
              <hr />
              <GameGrid shots={shots} />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <hr />
              <History shots={shots} />
            </Grid>
            <Grid xs={12} md={12} lg={4}>
              <hr />
              <Ships ships={ships} />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  )
}
