import { useSession } from "next-auth/react";
import { SessionUserProfile } from "../types";

interface Auth {
  loading: boolean;
  loggedIn: boolean;
  isAdmin: boolean;
  profile?: SessionUserProfile | null;
}

export default function useAuth(): Auth {
  const session = useSession();
  const user = session.data?.user;

  return {
    loading: session.status === "loading",
    loggedIn: session.status === "authenticated",
    isAdmin: user?.role === "admin",
    profile: user,
  };
}
