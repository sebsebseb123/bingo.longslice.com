import { useState } from 'react'
import UploadCard from './UploadCard';
import SoundCard from './SoundCard'
import '../assets/sass/SoundBoard.sass'

export default function SoundBoard({ filez, editMode, onClickDelete, onSelectFile }) {
  const [filterz, setFilterz] = useState('');

  let groupz = [];
  filez.map((file) => {
    // Check for '-' character, if not, skip.
    if (file.name.indexOf('-') === -1) return;

    // Get the group name.
    let group = file.name.split('-')[0];
    if (!groupz.includes(group)) {
      groupz.push(group);
    }
  })
  console.log(groupz);

  const onClickSetFilter = function (e) {
    e.target.value === filterz ? setFilterz('') :
      setFilterz(e.target.value);
  }

  return (
    <>
      <div className="sound-board-filters">
        {groupz.map((group) => {
          return (
            <button
              key={group}
              onClick={onClickSetFilter}
              value={group}
              className={filterz === group ? 'active' : ''}
            >
              {group}
            </button>
          )
        })}
      </div>
      <div className="sound-board">
        {editMode &&= <UploadCard onSelectFile={onSelectFile} />}
        {
          filez.map((file) => {
            // If file name doesn't contain the filter, set hide flag.
            const hide = (filterz !== '' && file.name.indexOf(filterz) === -1);
            return (<SoundCard hide={hide} editMode={editMode} onClickDelete={onClickDelete} key={file.name} file={file} />);
          })
        }
      </div>
    </>
  );
}
