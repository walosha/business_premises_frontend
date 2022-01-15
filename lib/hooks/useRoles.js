import { useRouter } from "next/router";
import { useEffect } from "react";
import { parseJwt } from "utils/parseCookie";

export default function useAllowedRoles(token, allowedRoles = ["admin"]) {
  const router = useRouter();
  useEffect(() => {
    const user = parseJwt(token);
    if (!allowedRoles.includes(user?.role)) {
      router.push("/");
    }
  }, []);
}
