export default function SoundCard({ file, editMode, onClickDelete, hide }) {
  const emojis = ["â", "ð", "ð", "ð", "ðą", "ð", "ð", "ðŧ", "ðĨ", "ð", "â", "ð", "ðđ", "ð", "ð", "â―", "ðū", "ð", "ðĄ", "ðŋ", "ðŧ", "ðķ", "ðŽ", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "âĪ", "ð", "ð", "ð", "ðģ", "ðŠ", "ðĐ", "ðļ", "ð", "ð", "ð", "ð", "ðš", "ðķ", "ð ", "ð", "âū", "ð", "ð―", "ð", "ðĩ", "ðŪ", "ðĐ", "ð", "ðĢ", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "ð", "ðĩ", "ð", "ð", "ð―", "ð", "ð", "ð", "ð", "ð", "â", "ð", "âĩ", "ð", "ðą", "ð°", "ðķ", "ðļ", "ð°", "ð·", "ð", "ðŦ", "ðŦ", "ð", "ðē", "ð", "ð", "ð", "ðĨķ", "ðŧ", "ðŦ", "ðĶ", "ð", "ðĶī", "ðĐâð", "ð"];

  const name = file.name.split('-')[1] ? file.name.split('-')[1] : file.name;

  function hashCode(str) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
      let chr = str.charCodeAt(i);
      hash = (hash << 3) - hash + chr;
    }
    return hash;
  }

  const hashmoji = hashCode(file.name);

  // Generate random hex colour values based on the file name as a seed.
  const randomColor1 = (hashmoji & 0x00FFFFFF).toString(16).toUpperCase();
  const randomColor2 = ((hashmoji + 123456) & 0x00FFFFFF).toString(16).toUpperCase();
  const randomColor3 = ((hashmoji - 123456) & 0x00FFFFFF).toString(16).toUpperCase();

  return (
    <div className={`sound-card card${hide ? ' hide' : ''}`}>
      {editMode &&= <button className="trash" onClick={onClickDelete} value={file.name}>ðïļ</button>}
      <div
        className="title"
        style={{
          backgroundImage: `linear-gradient(315deg, #${randomColor1}99, #${randomColor2}99)`,
          backgroundColor: `#${randomColor3}99`
        }}
      >
        {name.toUpperCase().replace(/\.WAV|\.MP3/gi, '')}
        <span className="emoji">
          {emojis[parseInt(hashmoji.toString().slice(-2))]}
        </span>
      </div>
      <div className="play-area">
        <audio
          controls
          src={file.uri}
          id={'audio-' + file.name.toUpperCase().replace(/\.WAV|\.MP3/gi, '')}
          preload="true"
        />
      </div>
    </div>
  );
}