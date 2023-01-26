import { useEffect, useState } from 'react'
import { ObserveBingo } from '../api/Bingo'

import AnimatedTitle from '../components/AnimatedTitle'
import GameGrid from '../components/GameGrid'
import History from '../components/History'
import Ships from '../components/Ships'
import '../assets/sass/styles.sass'

export default function Root() {
  const [shots, setShots] = useState([]);
  const [ships, setShips] = useState([]);

  useEffect(() => {
    /**
     * This keeps the grid fresh.
     */
    const sub = ObserveBingo()
      .subscribe(({ items }) => {
        setShots(items[0].shots);
        setShips(items[0].ships);
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <>
      <header>
        <h1>Battleship Bingo</h1>
        <hr />
      </header>
      <div className="cards">
        <GameGrid shots={shots} />
        <History shots={shots} />
        <Ships ships={ships} />
      </div>
      <footer>
        &copy; Longslice Brewery Inc.
      </footer>
    </>
  )
}
