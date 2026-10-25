import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { Phone } from '../types';
import { fetchPhone } from '../api/phoneApi';
import { ErrorBox, Loading } from '../components/Common';
import { SelectPhoneApp } from '../ex1/SelectPhoneApp';

export function SelectPhoneApi() {
  const [phone, setPhone] = useState<Phone | null>(null);
  const [error, setError] = useState<string | null>(null);
  const request = useRef(0);

  const load = useCallback(async () => {
    const requestId = ++request.current;
    setError(null);
    setPhone(null);

    try {
      const result = await fetchPhone('1');
      if (request.current === requestId) {
        setPhone(result);
      }
    } catch (e) {
      if (request.current === requestId) {
        setError(e instanceof Error ? e.message : 'Không thể tải sản phẩm');
      }
    }
  }, []);

  useEffect(() => {
    void load();
    return () => {
      // Bỏ qua phản hồi cũ khi rời màn hình.
      request.current++;
    };
  }, [load]);

  if (error) return <ErrorBox message={error} onRetry={load} />;
  if (!phone) return <Loading />;

  // Bài 2 dùng dữ liệu API với giao diện chọn điện thoại của Bài 1.
  return <SelectPhoneApp phone={phone} />;
}
