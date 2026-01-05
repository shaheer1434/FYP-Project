import Hls from "hls.js";
import { useEffect, useRef } from "react";

const HlsPlayer = ({ src }) => {
  const videoRef = useRef();

  useEffect(() => {
    if (!src) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    }
  }, [src]);

  return <video ref={videoRef} controls autoPlay style={{ width: "100%" }} />;
};

export default HlsPlayer;
