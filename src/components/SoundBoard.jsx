export default function SoundBoard({ file }) {
  return (
    <audio src={file.uri} controls />
  );
}