import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { fetchSessions } from "../auth/studentApi";

const FALLBACK_SESSION_OPTIONS = [
  { id: "2025-26-II", label: "Session 2025-26 II" },
  { id: "2025-26-I", label: "Session 2025-26 I" },
  { id: "2024-25-II", label: "Session 2024-25 II" },
  { id: "2024-25-I", label: "Session 2024-25 I" },
  { id: "2023-24-II", label: "Session 2023-24 II" },
  { id: "2023-24-I", label: "Session 2023-24 I" },
];

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [sessionOptions, setSessionOptions] = useState(FALLBACK_SESSION_OPTIONS);
  const [selectedSessionId, setSelectedSessionId] = useState(
    FALLBACK_SESSION_OPTIONS[0].id,
  );

  useEffect(() => {
    fetchSessions()
      .then((data) => {
        const list = Array.isArray(data) ? data : data.sessions;
        if (Array.isArray(list) && list.length > 0) {
          setSessionOptions(list);
          setSelectedSessionId(list[0].id);
        }
      })
      .catch(() => {
        /* keep fallback */
      });
  }, []);

  const value = useMemo(
    () => ({
      SESSION_OPTIONS: sessionOptions,
      selectedSessionId,
      setSelectedSessionId,
      selectedSession:
        sessionOptions.find((s) => s.id === selectedSessionId) ||
        sessionOptions[0],
    }),
    [selectedSessionId, sessionOptions],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export { FALLBACK_SESSION_OPTIONS as SESSION_OPTIONS };
export default SessionContext;
