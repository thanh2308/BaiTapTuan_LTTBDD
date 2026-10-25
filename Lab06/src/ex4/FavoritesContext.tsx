import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
type Ctx = { ids: string[]; toggle: (id: string) => void; has: (id: string) => boolean };
const FavoritesContext = createContext<Ctx | null>(null);
export function FavoritesProvider({ children }: { children: React.ReactNode }) {
 const [ids,setIds] = useState<string[]>([]);
 const toggle = useCallback((id: string) => setIds(cur => cur.includes(id) ? cur.filter(x => x !== id) : [...cur,id]), []);
 const value = useMemo(() => ({ ids,toggle,has: (id: string) => ids.includes(id) }), [ids,toggle]);
 return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}
export function useFavorites() { const ctx = useContext(FavoritesContext); if (!ctx) throw new Error('Thiếu FavoritesProvider'); return ctx; }
