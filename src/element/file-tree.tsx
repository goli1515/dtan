import { useState } from "react";
import { NostrTorrent } from "../nostr-torrent";
import { FormatBytes } from "../const";
import { PlayButton } from "./play-button";

interface TorrentFileListProps {
  torrent: NostrTorrent;
}

const VIDEO_EXTENSIONS = [
  ".mp4",
  ".mkv",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".m4v",
  ".mpg",
  ".mpeg",
  ".3gp",
  ".ogv",
];

function isVideoFile(filename: string): boolean {
  const lowerName = filename.toLowerCase();
  return VIDEO_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
}

export default function TorrentFileList({ torrent }: TorrentFileListProps) {
  const [showFileList, setShowFileList] = useState(false);

  return (
    <div className="bg-neutral-900 p-4 rounded-lg">
      <h3 className="mb-2">File List ({torrent.files.length} files)</h3>
      <div className="flex flex-col gap-1">
        {torrent.files.slice(0, showFileList ? torrent.files.length : 5).map((file, idx) => (
          <div key={idx} className="pl-1 flex justify-between items-center hover:bg-neutral-700">
            <div className="flex gap-2 min-w-0 flex-1">
              <span>📄</span>
              <span className="truncate" title={file.name}>
                {file.name}
              </span>
            </div>
            <div className="flex gap-2 items-center flex-shrink-0 ml-2">
              {isVideoFile(file.name) && <PlayButton magnet={torrent.magnetLink} path={file.name} size={16} />}
              <div>{FormatBytes(file.size)}</div>
            </div>
          </div>
        ))}
        {torrent.files.length > 5 && (
          <button
            className="mt-2 text-blue-400 hover:text-blue-300 text-left"
            onClick={() => setShowFileList(!showFileList)}
          >
            {showFileList ? "Show less" : `Show ${torrent.files.length - 5} more files`}
          </button>
        )}
      </div>
    </div>
  );
}
