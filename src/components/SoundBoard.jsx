import UploadCard from './UploadCard';
import SoundCard from './SoundCard'
import '../assets/sass/SoundBoard.sass'

export default function SoundBoard({ filez, onClickDelete, onSelectFile }) {
  // Set to empty if there's nothing.
  const boardSounds = filez.boardSounds ?? [];

  return (
    <div className="sound-board">
      <UploadCard onSelectFile={onSelectFile} />
      {
        boardSounds.map((file) => {
          return (<SoundCard onClickDelete={onClickDelete} key={file.name} file={file} />);
        })
      }
    </div>
  );
}