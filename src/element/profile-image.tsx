import { NostrPrefix } from "@snort/shared";
import { NostrLink } from "@snort/system";
import { useUserProfile } from "@snort/system-react";
import { CSSProperties, HTMLProps } from "react";
import { Link } from "react-router-dom";

type ProfileImageProps = HTMLProps<HTMLDivElement> & {
  pubkey?: string;
  size?: number;
  withName?: boolean;
  link?: boolean;
};

export function ProfileImage({ pubkey, size, withName, link = true, children, ...props }: ProfileImageProps) {
  const profile = useUserProfile(pubkey);
  const url =
    (profile?.picture?.length ?? 0) > 0
      ? profile?.picture
      : `https://nostr.api.v0l.io/api/v1/avatar/cyberpunks/${pubkey}`;

  const v = {
    backgroundImage: `url(${url})`,
  } as CSSProperties;
  if (size) {
    v.width = `${size}px`;
    v.height = `${size}px`;
  }
  const avatar = (
    <div
      {...props}
      className="rounded-full aspect-square w-12 bg-neutral-800 border border-neutral-500 bg-cover bg-center"
      style={v}
    ></div>
  );

  if (!link) {
    return (
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {avatar}
          {withName === true && <>{profile?.name}</>}
        </div>
        {children}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between">
      <Link
        to={pubkey ? `/p/${new NostrLink(NostrPrefix.Profile, pubkey).encode()}` : ""}
        className="flex items-center gap-2"
      >
        {avatar}
        {withName === true && <>{profile?.name}</>}
      </Link>
      {children}
    </div>
  );
}
