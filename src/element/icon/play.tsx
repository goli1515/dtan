export default function PlayIcon({ size }: { size?: number }) {
  return (
    <svg width={size ?? 20} height={size ?? 20} viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
