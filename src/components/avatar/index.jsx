import clsx from "clsx";
import immm from "@/img/avatar/rosina.jpg";
import { useMemo } from "react";

const excluded = ["none", "N/A", ""];

const Avatar = ({ user, width = 32, onClick, className }) => {
  const avatar = useMemo(() => {
    try {
      const image = require(`@/img/avatar/${user?.username}.jpg`);
      return image?.default?.src || null;
    } catch (e) {
      return null;
    }
  }, [user]);

  return avatar ? (
    <div
      className={clsx(
        "block rounded-full aspect-square shadow-[0_0_0_1px_rgba(150,150,150,0.5)] overflow-hidden",
        className
      )}
      onClick={onClick}
      style={{ width }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar}
        alt={user?.firstname}
        width={width}
        height={width}
        className="object-cover w-full aspect-square block"
      />
    </div>
  ) : (
    <div
      className="bg-red-800 h-full aspect-square text-white font-bold rounded-full flex flex-col items-center justify-center "
      onClick={onClick}
      style={{ width }}
    >
      {user?.firstname.charAt(0)}
    </div>
  );
};
export default Avatar;
