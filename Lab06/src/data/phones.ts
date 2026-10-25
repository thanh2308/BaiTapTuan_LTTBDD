import { ColorKey, Phone } from '../types';
export const COLOR_ORDER: ColorKey[] = ['silver', 'red', 'black', 'blue'];
export const PHONE_COLORS: Record<ColorKey, { label: string; hex: string; image: number }> = {
  silver: { label: 'bạc', hex: '#C9EEFA', image: require('../../assets/phones/silver.png') },
  red: { label: 'đỏ', hex: '#E53A2F', image: require('../../assets/phones/red.png') },
  black: { label: 'đen', hex: '#000000', image: require('../../assets/phones/black.png') },
  blue: { label: 'xanh', hex: '#2A4494', image: require('../../assets/phones/blue.png') },
};
export const PHONES: Phone[] = [
  ['1', 'Vsmart Joy 3', 1790000, 1790000, 'blue'],
  ['2', 'Vsmart Live 4', 3990000, 4490000, 'black'],
  ['3', 'Vsmart Star 5', 2690000, 2990000, 'red'],
  ['4', 'Vsmart Active 3', 3490000, 3990000, 'blue'],
  ['5', 'Vsmart Aris Pro', 7490000, 9990000, 'silver'],
  ['6', 'Vsmart Bee 3', 1490000, 1790000, 'black'],
].map(([id, name, price, oldPrice, defaultColor]) => ({
  id: String(id), name: `Điện Thoại ${name} - Hàng chính hãng`, price: Number(price), oldPrice: Number(oldPrice),
  rating: 5, reviewCount: 828, supplier: 'Tiki Tradding', badge: 'Ở ĐÂU RẺ HƠN HOÀN TIỀN',
  colors: [...COLOR_ORDER], defaultColor: defaultColor as ColorKey,
}));
