import UploadCard from './UploadCard';
import SoundCard from './SoundCard'
import '../assets/sass/SoundBoard.sass'

export default function SoundBoard({ filez, onClickDelete, onSelectFile }) {
  console.log(filez);
  return (
    <div className="sound-board">
      <UploadCard onSelectFile={onSelectFile} />
      {
        filez.map((file) => {
          return (<SoundCard onClickDelete={onClickDelete} key={file.name} file={file} />);
        })
      }
    </div>
  );
}
