import { useEffect, useState } from 'react'
import { ObserveBingo } from '../api/Bingo'

import Header from '../components/Header'
import GameGrid from '../components/GameGrid'
import History from '../components/History'
import Ships from '../components/Ships'
import '../assets/sass/styles.sass'

export default function Root() {
  const [shots, setShots] = useState([]);
  const [shipsSunk, setShipsSunk] = useState([]);
  const maxBustImage = 44;

  // Function to update the image src in #bust.
  function updateBustImage() {
    const bust = document.querySelector('#bust');
    bust.style.backgroundImage = `url(/jimjams/bust-${Math.ceil(Math.random() * maxBustImage)}.png)`;
  }

  useEffect(() => {
    /**
     * Update the bust image every 5 seconds.
     */
    const interval = setInterval(() => {
      updateBustImage();
    }, 20000);

    /**
     * This keeps the grid fresh.
     */
    const sub = ObserveBingo()
      .subscribe(({ items }) => {
        setShots(items[0].shots);
        setShipsSunk(items[0].ships);
        updateBustImage();
      });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  return (
    <div>
      <Header />
      <div className="cards">
        <GameGrid shots={shots} />
        <History shots={shots} />
        <Ships shipsSunk={shipsSunk} />
      </div>
      <footer>
        &copy; Longslice Brewery Inc.
      </footer>
    </div>
  )
}
