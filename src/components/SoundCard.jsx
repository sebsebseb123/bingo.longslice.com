import { useEffect, useState } from 'react'

export default function SoundCard({ file, onClickDelete }) {
  const [playingAudio, setPlayingAudio] = useState(false);
  const [audio, setAudio] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let element = document.getElementById('audio-' + file.name.toUpperCase().replace(/\.WAV|\.MP3/gi, ''));

    element.addEventListener('loadedmetadata', () => {
      setAudio(element);
    });

    element.addEventListener('timeupdate', (e) => {
      setCurrentTime(e.target.currentTime);
    });

    element.addEventListener('ended', (e) => {
      setPlayingAudio(false);
      setCurrentTime(0);
    });
  }, []);

  const emojis = ["✌", "😂", "😝", "😁", "😱", "👉", "🙌", "🍻", "🔥", "🌈", "☀", "🎈", "🌹", "💄", "🎀", "⚽", "🎾", "🏁", "😡", "👿", "🐻", "🐶", "🐬", "🐟", "🍀", "👀", "🚗", "🍎", "💝", "💙", "👌", "❤", "😍", "😉", "😓", "😳", "💪", "💩", "🍸", "🔑", "💖", "🌟", "🎉", "🌺", "🎶", "👠", "🏈", "⚾", "🏆", "👽", "💀", "🐵", "🐮", "🐩", "🐎", "💣", "👃", "👂", "🍓", "💘", "💜", "👊", "💋", "😘", "😜", "😵", "🙏", "👋", "🚽", "💃", "💎", "🚀", "🌙", "🎁", "⛄", "🌊", "⛵", "🏀", "🎱", "💰", "👶", "👸", "🐰", "🐷", "🐍", "🐫", "🔫", "👄", "🚲", "🍉", "💛", "💚", "🥶", "👻", "💫", "💦", "💅", "🦴", "👩‍🚀", "🎅"];

  function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 3) - hash + chr;
    }
    return hash;
  }

  const hashmoji = hashCode(file.name);

  const onClickPlay = function () {
    if (playingAudio) {
      audio.pause();
    }
    else {
      audio.play();
    }
    setPlayingAudio(!playingAudio);
  }

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return minutes + ':' + String(seconds).padStart(2, '0');
  }

  return (
    <div className="sound-card card">
      <div
        className="title"
        style={{
          textShadow: "0 0 5px #" + hashmoji.toString(16).substring(0, 6)
            + ", 0 0 15px #" + hashmoji.toString(16).substring(0, 6),
        }}
      >
        {emojis[parseInt(hashmoji.toString().slice(-2))]}{file.name.toUpperCase().replace(/\.WAV|\.MP3/gi, '')}
      </div>
      <div className="play-area">
        <div className="audio-player">
          <button
            className="play-icon"
            value={'audio-' + file.name.toUpperCase().replace(/\.WAV|\.MP3/gi, '')}
            onClick={onClickPlay}
          >
            {playingAudio ? '▶' : '▷'}
          </button>
          <span className="current-time time">{audio ? calculateTime(currentTime) : '-:--'}</span>
          /
          <span className="duration time">{audio ? calculateTime(audio.duration) : '-:--'}</span>
          <audio
            src={file.uri}
            id={'audio-' + file.name.toUpperCase().replace(/\.WAV|\.MP3/gi, '')}
            preload="true"
          />
        </div>
      </div>
      <button className="trash" onClick={onClickDelete} value={file.name}>🗑️</button>
    </div>
  );
}