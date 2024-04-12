import { createContext, useState } from "react";

const storeContext = createContext<any>(null);

export function StoreProvider({ children }: any) {
  const [user, setUser] = useState<any>();
  const [leaves, setLeaves] = useState<any[]>([]);
  const [refreshEffect, setRefreshEffect] = useState<boolean>(false);

  return (
    <storeContext.Provider
      value={{
        user,
        setUser,
        refreshEffect,
        setRefreshEffect,
        leaves,
        setLeaves,
      }}
    >
      {children}
    </storeContext.Provider>
  );
}
export default storeContext;
