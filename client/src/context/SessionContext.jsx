import React, { createContext, useContext, useState, useMemo } from "react";

const SESSION_OPTIONS = [
  { id: "2025-26-II", label: "Session 2025-26 II" },
  { id: "2025-26-I", label: "Session 2025-26 I" },
  { id: "2024-25-II", label: "Session 2024-25 II" },
  { id: "2024-25-I", label: "Session 2024-25 I" },
  { id: "2023-24-II", label: "Session 2023-24 II" },
  { id: "2023-24-I", label: "Session 2023-24 I" },
];

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const [selectedSessionId, setSelectedSessionId] = useState(
    SESSION_OPTIONS[0].id,
  );

  const value = useMemo(
    () => ({
      SESSION_OPTIONS,
      selectedSessionId,
      setSelectedSessionId,
      selectedSession:
        SESSION_OPTIONS.find((s) => s.id === selectedSessionId) ||
        SESSION_OPTIONS[0],
    }),
    [selectedSessionId],
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

export { SESSION_OPTIONS };
export default SessionContext;
