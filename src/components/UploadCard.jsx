import { useMemo } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  transition: 'all .2s ease-in-out',
};

const acceptStyle = {
  borderColor: '#ffeb3b',
  backgroundColor: '#ffeb3b77',
};

export default function UploadCard({ onSelectFile }) {
  // Setup drag n' drop.
  const {
    getRootProps,
    getInputProps,
    isDragAccept,
  } = useDropzone({
    onDrop: onSelectFile,
    accept: {
      'audio/mpeg': [],
      'audio/wav': [],
    },
    maxFiles: 1,
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragAccept ? acceptStyle : {}),
  }), [
    isDragAccept,
  ]);

  return (
    <div className="sound-card drop-sound card" {...getRootProps({ style })}>
      <div className="title">📂Drag'n'Drop📂</div>
      <input {...getInputProps()} />
      <div className="play-area">
        💿WAV or MP3🎵
      </div>
    </div>
  )
}