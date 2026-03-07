import { useSession } from "next-auth/react";

export default function UseImg({ size = 40 }: { size?: number }) {
  const { data: session } = useSession();

  if (!session) return null;

  if (session.user?.image) {
    return (
      <div
        style={{ 
          width: size, 
          height: size, 
          backgroundImage: `url(${session.user.image})`, 
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
        className="rounded-full flex items-center justify-center"
      >
      </div>
    );
  }

  // Si no hay foto, mostramos la inicial
  return (
    <div
      style={{ width: size, height: size }}
      className="rounded-full bg-[rgb(224,179,254)] flex items-center justify-center"
    >
      <span className="text-white font-bold">
        {session.user?.name?.[0]?.toUpperCase()}
      </span>
    </div>
  );
}