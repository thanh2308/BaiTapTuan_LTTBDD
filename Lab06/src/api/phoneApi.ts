import { PHONES, COLOR_ORDER } from '../data/phones';
import { Phone } from '../types';
export const API_URL = (process.env.EXPO_PUBLIC_API_URL ?? 'https://6addbf314e88f1bba4a494f8.mockapi.io').trim().replace(/\/+$/, '');
export const USING_API = API_URL !== '';
export function parsePhone(value: unknown): Phone {
  if (!value || typeof value !== 'object') throw new Error('Dữ liệu sản phẩm không hợp lệ');
  const p = value as Record<string, unknown>;
  const numbers = ['price', 'oldPrice', 'rating', 'reviewCount'] as const;
  const strings = ['id', 'name', 'supplier', 'badge'] as const;
  if (strings.some(k => typeof p[k] !== 'string' || !p[k]) ||
      numbers.some(k => typeof p[k] !== 'number' || !Number.isFinite(p[k]) || (p[k] as number) < 0) ||
      (p.rating as number) > 5 || !Array.isArray(p.colors) || p.colors.length !== 4 ||
      !COLOR_ORDER.every(c => (p.colors as unknown[]).includes(c)) ||
      !COLOR_ORDER.includes(p.defaultColor as Phone['defaultColor'])) throw new Error('Dữ liệu sản phẩm không hợp lệ');
  return p as unknown as Phone;
}
export async function fetchPhone(id: string): Promise<Phone> {
  if (!USING_API) {
    await new Promise(resolve => setTimeout(resolve, 600));
    const phone = PHONES.find(p => p.id === id);
    if (!phone) throw new Error('Không tìm thấy sản phẩm');
    return phone;
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);
  try {
    const res = await fetch(`${API_URL}/phones/${encodeURIComponent(id)}`, { signal: controller.signal });
    if (!res.ok) throw new Error(`Máy chủ trả về lỗi ${res.status}`);
    return parsePhone(await res.json());
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') throw new Error('Kết nối quá thời gian. Vui lòng thử lại.');
    throw error;
  } finally { clearTimeout(timeout); }
}
