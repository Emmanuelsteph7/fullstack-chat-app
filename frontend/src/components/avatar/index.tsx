import { useState } from "react";

interface Props {
  size?: number;
  src: string;
  initials: string;
  textSize?: number;
}

const Avatar = ({ initials, src, size = 30, textSize = 16 }: Props) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="rounded-full overflow-hidden bg-primary/80 flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {!!src && !imageError ? (
        <img
          src={src}
          className="rounded-full"
          style={{ width: size, height: size }}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          style={{
            fontSize: textSize,
          }}
          className="text-white"
        >
          {initials}
        </div>
      )}
    </div>
  );
};

export default Avatar;
