export default function SoundCard({ file, onClickDelete }) {
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
        <audio src={file.uri} controls preload="true" />
      </div>
      <button className="trash" onClick={onClickDelete} value={file.name}>🗑️</button>
    </div>
  );
}