export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  cover: string;
  discountPercent?: number;
  isNew?: boolean;
  description: string;
}

export const CATEGORIES: string[] = [
  'Văn học',
  'Kinh tế',
  'Thiếu nhi',
  'Kỹ năng sống',
  'Truyện tranh',
  'Ngoại ngữ',
  'Lịch sử',
];

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'Dế Mèn Phiêu Lưu Ký',
    author: 'Tô Hoài',
    price: 45000,
    cover: 'https://picsum.photos/seed/book1/400/560',
    discountPercent: 20,
    description:
      'Cuốn sách kể về hành trình phiêu lưu của chú Dế Mèn, qua đó gửi gắm bài học về lòng dũng cảm, sự trưởng thành và tình bạn.',
  },
  {
    id: 2,
    title: 'Nhà Giả Kim',
    author: 'Paulo Coelho',
    price: 89000,
    cover: 'https://picsum.photos/seed/book2/400/560',
    isNew: true,
    description:
      'Câu chuyện ngụ ngôn về chàng chăn cừu Santiago trên hành trình đi tìm kho báu.',
  },
  {
    id: 3,
    title: 'Sapiens: Lược Sử Loài Người',
    author: 'Yuval Noah Harari',
    price: 129000,
    cover: 'https://picsum.photos/seed/book3/400/560',
    description:
      'Một góc nhìn tổng quan về lịch sử loài người, từ thời kỳ đồ đá cho đến cuộc cách mạng khoa học hiện đại.',
  },
  {
    id: 4,
    title: 'Điều Kỳ Diệu Của Tiệm Tạp Hoá Namiya',
    author: 'Higashino Keigo',
    price: 98000,
    cover: 'https://picsum.photos/seed/book4/400/560',
    discountPercent: 15,
    description:
      'Những lá thư gửi đến một tiệm tạp hoá cũ kỹ vượt thời gian, kết nối quá khứ và hiện tại.',
  },
  {
    id: 5,
    title: 'Muôn Kiếp Nhân Sinh',
    author: 'Nguyên Phong',
    price: 150000,
    cover: 'https://picsum.photos/seed/book5/400/560',
    description: 'Hành trình khám phá luân hồi và nhân quả qua nhiều kiếp sống.',
  },
  {
    id: 6,
    title: 'Cách Nghĩ Để Thành Công',
    author: 'Napoleon Hill',
    price: 79000,
    cover: 'https://picsum.photos/seed/book6/400/560',
    isNew: true,
    description: 'Đúc kết 13 nguyên tắc thành công từ hơn 500 nhân vật thành đạt nhất nước Mỹ.',
  },
];
