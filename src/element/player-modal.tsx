import { useEffect } from "react";
import { createPortal } from "react-dom";

interface PlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  magnet: string;
  path?: string;
}

export function PlayerModal({ isOpen, onClose, magnet, path }: PlayerModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const playerData = {
    magnet,
    ...(path && { path }),
  };

  const base64Data = btoa(JSON.stringify(playerData));
  const playerUrl = `https://wt-player.pages.dev/#${base64Data}`;

  const modalContent = (
    <div
      className="fixed inset-0 bg-black/80 bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white hover:text-gray-300 text-2xl font-bold"
          aria-label="Close"
        >
          ✕
        </button>
        <div className="aspect-video w-full">
          <iframe
            src={playerUrl}
            className="w-full h-full rounded-lg"
            allow="autoplay; fullscreen"
            title="WebTorrent Player"
          />
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
