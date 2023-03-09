import { useEffect } from 'react'
import '../assets/sass/Header.sass'

export default function Header() {
  // Add event handler to track mouse movement and add transform to bust class.
  useEffect(() => {
    const bust = document.querySelector('#bust');
    const handleMouseMove = (e) => {
      // Rotate bust on x and z axis based on mouse position so that the bust is always facing the mouse.
      // Get the x and y position of the mouse and divide by the window size to get a percentage.
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / -window.innerHeight;
      bust.style.transform = `rotateX(${y * 20 - 10}deg) rotateY(${x * 20 - 10}deg)`;
    }
    window.addEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <header>
      <h1>Battleship<div id="bust"></div> Bingo</h1>
    </header>
  )
}