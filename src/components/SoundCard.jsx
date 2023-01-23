import { useEffect, useState, useCallback } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import { useLongPress, LongPressDetectEvents } from "use-long-press";

import { Storage } from 'aws-amplify'


function SoundCard({ file }) {
  const [expanded, setExpanded] = useState(false);

  const deleteFile = useCallback(async (event, meta) => {
    await Storage.remove(meta.context);
  }, []);

  const onLongPress = useLongPress(deleteFile, {
    onStart: (event, meta) => console.log("Press started", meta),
    onCancel: (event, meta) => console.log("Press cancelled", meta),
    filterEvents: (event) => true, // All events can potentially trigger long press
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: LongPressDetectEvents.BOTH
  });

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="delete" {...onLongPress(file.key)}>
            <DeleteForeverIcon />
          </IconButton>
        }
        title={file.key.replace('.mp3', '')}
      />
      <CardContent>
        <audio preload="auto" controls src={file.uri} />
      </CardContent>
    </Card>
  );
}

export default SoundCard;