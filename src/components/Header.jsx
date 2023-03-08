import { useEffect } from 'react'
import '../assets/sass/Header.sass'

export default function Header() {
  // Add event handler to track mouse movement and add transform to bust class.
  useEffect(() => {
    const bust = document.querySelector('.bust');
    const handleMouseMove = (e) => {
      // Rotate bust on x and z axis based on mouse position so that the bust is always facing the mouse.
      bust.style.transform = `rotateX(${(e.clientY / 10) - 20}deg) rotateZ(${(e.clientX / -100) + 10}deg)`;
    }
    window.addEventListener('mousemove', handleMouseMove);
  }, []);

  // Use a public image api to fetch a random image of a bust.
  const bustImage = `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/200/300`;

  return (
    <header>
      <div className="bust">
        <img src={bustImage} />
      </div>
      <h1>Battleship Bingo</h1>
    </header>
  )
}