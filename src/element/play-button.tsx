import { useState } from "react";
import PlayIcon from "./icon/play";
import { PlayerModal } from "./player-modal";

interface PlayButtonProps {
  magnet: string;
  path?: string;
  size?: number;
}

export function PlayButton({ magnet, path, size = 16 }: PlayButtonProps) {
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsPlayerOpen(true)}
        className="hover:text-indigo-400 transition-colors cursor-pointer"
        title="Play in WebTorrent Player"
      >
        <PlayIcon size={size} />
      </button>
      <PlayerModal isOpen={isPlayerOpen} onClose={() => setIsPlayerOpen(false)} magnet={magnet} path={path} />
    </>
  );
}
