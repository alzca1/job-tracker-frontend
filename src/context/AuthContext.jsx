import React, { useEffect, useMemo, useState } from "react";

export const AuthContext = React.createContext(null);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const memoizedContent = useMemo(
    () => ({ isAuthenticated, setIsAuthenticated }),
    [isAuthenticated, setIsAuthenticated]
  );
  return <AuthContext.Provider value={memoizedContent}>{children}</AuthContext.Provider>;
}
