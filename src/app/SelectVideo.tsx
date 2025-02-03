"use client";

import { useEffect, useState } from "react";

type Props = {
  setVideoId: React.Dispatch<React.SetStateAction<string>>;
};

export const VideoList = ({ setVideoId }: Props) => {
  const [videos, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  useEffect(() => {
    const constraints = { audio: false, video: { width: 1920, height: 1080 } };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(() => {
        const getDevice = async () => {
          const videos = (
            await navigator.mediaDevices.enumerateDevices()
          ).filter(({ kind }) => kind === "videoinput");
          setVideoDevices(videos);
        };
        getDevice();
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <select onChange={(e) => setVideoId(e.target.value)}>
        {videos.map((video) => (
          <option key={video.deviceId} value={video.deviceId}>
            {video.label || `Camera ${video.deviceId}`}
          </option>
        ))}
      </select>
    </>
  );
};
