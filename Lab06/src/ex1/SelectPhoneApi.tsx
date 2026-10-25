import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Phone } from '../types';
import { fetchPhone } from '../api/phoneApi';
import { ErrorBox, Loading } from '../components/Common';
import { SelectPhoneApp } from './SelectPhoneApp';
export function SelectPhoneApi() {
 const [phone, setPhone] = useState<Phone | null>(null);
 const [error, setError] = useState<string | null>(null);
 const request = useRef(0);
 const load = useCallback(async () => {
   const id = ++request.current; setError(null); setPhone(null);
   try { const p = await fetchPhone('1'); if (request.current === id) setPhone(p); }
   catch (e) { if (request.current === id) setError(e instanceof Error ? e.message : 'Không thể tải sản phẩm'); }
 }, []);
 useEffect(() => { void load(); return () => { request.current++; }; }, [load]);
 if (error) return <ErrorBox message={error} onRetry={load}/>;
 if (!phone) return <Loading/>;
 return <SelectPhoneApp phone={phone}/>;
}
